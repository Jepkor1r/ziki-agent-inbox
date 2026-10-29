const state = {
  scanned: 42,
  decisions: [
    {
      id: 412, title: "Fix authentication timeout on token refresh", repo: "ziki/web",
      est: "~30 min", points: 120, expires: "Offer expires in 8 min",
      why: "<strong>Fits because:</strong> you've merged 6 TypeScript auth fixes. The issue is confirmed by 2 independent agents and has a clear reproduction.",
      flag: "Needs your judgement: this touches session code, so it will go through the human merge gate.",
      answer: "My plan: reproduce with a 5-minute expiry, patch the refresh race in useSession.ts and add a regression test. I won't touch login or 2FA flows.",
    },
    {
      id: 405, title: "Issue list jumps on mobile when votes update", repo: "ziki/web",
      est: "~45 min", points: 80, expires: "Offer expires in 22 min",
      why: "<strong>Fits because:</strong> it's a CSS/React layout bug, which matches your top skill. There's low overlap with other bidders.",
      answer: "The vote counter re-renders and changes the row height. I'd reserve space with a fixed-width badge. It's a low-risk, one-file change.",
    },
    {
      id: 398, title: "Add rate-limit headers to /api/v1/events/stream", repo: "ziki/api",
      est: "~1.5 h", points: 150, expires: "Offer expires in 41 min",
      why: "<strong>Fits because:</strong> high points and you know the API. It's longer than your usual 1-hour limit, so I'm asking first.",
      answer: "I'd add X-RateLimit-* headers in the middleware and document them in llms.txt. The estimate is high because the tests need a fake clock.",
    },
  ],
  handled: [
    { ok: true, text: "Scanned 42 confirmed issues across 5 projects", time: "1h ago" },
    { ok: false, text: "Skipped 31 issues: outside your skills or already claimed", time: "1h ago" },
    { ok: false, text: "Skipped #377: likely duplicate of #352 (flagged to the reporter)", time: "52m ago" },
    { ok: true, text: "Confirmed #401 as an independent verifier (allowed by your permissions)", time: "34m ago" },
    { ok: true, text: "Kept claim on #389 active and posted a progress note", time: "12m ago" },
  ],
  bids: 1,
};

const $ = (s) => document.querySelector(s);
const esc = (s) => s.replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

function toast(msg) {
  const t = $("#toast");
  t.textContent = msg;
  t.classList.add("show");
  clearTimeout(toast.t);
  toast.t = setTimeout(() => t.classList.remove("show"), 2600);
}

function renderProgress() {
  const n = state.decisions.length;
  $("#progress-text").textContent =
    `Your agent scanned ${state.scanned} issues, shortlisted 3 and handled the routine work. ` +
    (n ? `${n} ${n === 1 ? "decision needs" : "decisions need"} you.` : "Nothing needs you right now.");
  $("#stats").innerHTML = [
    [state.scanned, "issues scanned"],
    [n, "need you"],
    [state.bids, "bids submitted"],
    [state.handled.length, "handled alone"],
  ].map(([v, l]) => `<li><b>${v}</b><span>${l}</span></li>`).join("");
}

function renderDecisions() {
  const list = $("#decision-list");
  list.innerHTML = state.decisions.map((d) => `
    <li class="item" data-id="${d.id}">
      <div class="item-top">
        <h3>#${d.id} ${esc(d.title)}</h3>
        <span class="tag expiry">${d.expires}</span>
      </div>
      <div class="meta">
        <span class="tag">${d.repo}</span><span class="tag">${d.est}</span><span class="tag points">+${d.points} pts</span>
      </div>
      <p class="why">${d.why}</p>
      ${d.flag ? `<p class="flag">⚠ ${esc(d.flag)}</p>` : ""}
      ${d.reply ? `<p class="reply"><strong>Agent:</strong> ${esc(d.reply)}</p>` : ""}
      <div class="actions">
        <button class="approve" data-act="approve" aria-label="Approve bid on issue ${d.id}">Approve bid</button>
        <button class="reject" data-act="reject" aria-label="Reject issue ${d.id}">Reject</button>
        <button class="ask" data-act="ask" aria-expanded="${!!d.asking}" aria-label="Ask agent about issue ${d.id}">Ask a question</button>
      </div>
      ${d.asking ? `<form class="ask-form" data-act="send">
        <label class="sr-only" for="q-${d.id}">Your question</label>
        <input id="q-${d.id}" placeholder="e.g. What's your plan?" />
        <button class="button" type="submit">Send</button></form>` : ""}
    </li>`).join("");
  $("#decide-count").textContent = state.decisions.length;
  $("#empty").hidden = state.decisions.length > 0;
}

function renderHandled() {
  $("#handled-list").innerHTML = state.handled.slice().reverse().map((h) =>
    `<li><span class="ic ${h.ok ? "" : "x"}" aria-hidden="true">${h.ok ? "✓" : "–"}</span><span>${esc(h.text)}</span><span class="mono muted">${h.time}</span></li>`
  ).join("");
  $("#handled-count").textContent = state.handled.length;
}

function render() { renderProgress(); renderDecisions(); renderHandled(); }

$("#decision-list").addEventListener("click", (e) => {
  const btn = e.target.closest("button[data-act]");
  if (!btn) return;
  const id = +btn.closest(".item").dataset.id;
  const d = state.decisions.find((x) => x.id === id);
  const act = btn.dataset.act;
  if (act === "ask") {
    d.asking = !d.asking;
    render();
    if (d.asking) document.getElementById(`q-${id}`).focus();
    return;
  }
  state.decisions = state.decisions.filter((x) => x.id !== id);
  if (act === "approve") {
    state.bids++;
    state.handled.push({ ok: true, text: `Bid submitted on #${id} with your approval (${d.est}, +${d.points} pts)`, time: "just now" });
    toast(`Approved. Your agent bid on #${id}.`);
  } else {
    state.handled.push({ ok: false, text: `Dropped #${id} at your request. Similar issues will rank lower.`, time: "just now" });
    toast(`Rejected #${id}. Your agent will learn from this.`);
  }
  render();
  const next = document.querySelector("#decision-list button");
  (next || $("#handled summary")).focus();
});

$("#decision-list").addEventListener("submit", (e) => {
  e.preventDefault();
  const id = +e.target.closest(".item").dataset.id;
  const d = state.decisions.find((x) => x.id === id);
  d.asking = false;
  d.reply = "Thinking…";
  render();
  setTimeout(() => { d.reply = d.answer; render(); toast(`Your agent replied about #${id}`); }, 700);
});

$("#goal-form").addEventListener("submit", (e) => {
  e.preventDefault();
  const g = $("#goal-input").value.trim() || "Find me suitable work";
  state.scanned += 7;
  state.handled.push({ ok: true, text: `Goal updated: "${g}". Re-ranked the shortlist.`, time: "just now" });
  render();
  toast("Goal saved. Your agent only interrupts you for decisions.");
});

render();
