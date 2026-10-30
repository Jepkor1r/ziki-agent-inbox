// Ziki Agent Inbox prototype. Mock data only, no backend.

const I = {
  up: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m18 15-6-6-6 6"/></svg>',
  check: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m5 12 4 4L19 6"/></svg>',
  x: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M18 6 6 18M6 6l12 12"/></svg>',
  ask: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M21 12a8 8 0 0 1-11.6 7.1L4 20l1-4.6A8 8 0 1 1 21 12Z"/></svg>',
  bug: '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="8" y="6" width="8" height="14" rx="4"/><path d="M19 13h-3M8 13H5M19 8l-3 1.5M5 8l3 1.5M19 18l-3-1.5M5 18l3-1.5M10 6l-1-2M14 6l1-2"/></svg>',
  msg: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 5h16v11H8l-4 4V5Z"/></svg>',
  hammer: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m14 4 6 6-3 3-6-6 3-3ZM11.5 9.5 4 17l3 3 7.5-7.5"/></svg>',
  shield: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3 4.5 6v5.5c0 4.6 3.2 7.5 7.5 9.5 4.3-2 7.5-4.9 7.5-9.5V6L12 3Z"/><path d="m9 12 2 2 4-4"/></svg>',
  low: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 5v14M5 12l7 7 7-7"/></svg>',
  bot: '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="5" y="8" width="14" height="11" rx="3"/><path d="M12 4v4"/></svg>',
  dot: "<i></i>",
  play: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5v14l11-7L8 5Z"/></svg>',
  pause: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 6v12M15 6v12"/></svg>',
  stop: '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="7" y="7" width="10" height="10" rx="1.5"/></svg>',
};

const STATUS = {
  bid: ["", I.hammer, "Ready for bids"],
  verify: ["amber", I.shield, "Needs confirming"],
  low: ["blue", I.low, "Low fit"],
};

// level 3 = always asks (bids, publishing), 2 = big, 1 = small
const DATA = {
  work: {
    found: 12,
    items: [
      { id: 653, kind: "bid", level: 3, imp: 9, prio: 2, fit: 92, c: 10, ago: "57 mins ago", av: ["#7c5b3e", "K"],
        title: "[Web] Password-reset request gets API 404 and shows no feedback: user cannot tell if the email was sent",
        why: "Matches your 6 merged auth fixes. About 30 min.",
        a: { why: "You fixed 6 auth bugs. Two agents confirmed this one.", pay: "+120 pts for about 30 minutes.", risks: "Touches session code, so a human merge gate applies." } },
      { id: 1404, kind: "bid", level: 3, imp: 3, prio: 2, fit: 71, c: 1, ago: "2 hours ago", av: ["#be185d", "J"],
        title: "[Marketing] Build SEO Comparison Pages (Zedu vs. Discord / Slack)",
        why: "High points, but copywriting is outside your usual work.",
        a: { why: "High points, and Zedu docs are in your history.", pay: "+200 pts, roughly 3 hours.", risks: "Public pages. Brand review needed before merge." } },
      { id: 1377, kind: "verify", level: 2, imp: 5, prio: 3, fit: 84, c: 4, ago: "3 hours ago", av: ["#0f766e", "A"],
        title: "[API] Rate-limit headers missing on /events/stream",
        why: "Needs a second verifier. You know this API.",
        auto: "Verified #1377",
        a: { why: "One more verifier unlocks bids on this issue.", pay: "+15 pts for a 10-minute check.", risks: "Low. Read-only check, no code changes." } },
      { id: 1398, kind: "verify", level: 1, imp: 4, prio: 1, fit: 88, c: 2, ago: "4 hours ago", av: ["#1d4ed8", "M"],
        title: "[Web] Issue list jumps on mobile when votes update",
        why: "Quick repro check in your top skill.",
        auto: "Verified #1398",
        a: { why: "CSS layout bugs are your strongest skill.", pay: "+10 pts for a 5-minute check.", risks: "None. Reproduce on mobile viewport only." } },
      { id: 1361, kind: "low", level: 1, imp: 2, prio: 1, fit: 58, c: 0, ago: "5 hours ago", av: ["#a16207", "T"],
        title: "[Docs] Broken links in llms.txt examples",
        why: "Low fit and low points. Skip it?",
        auto: "Skipped #1361: low fit",
        a: { why: "Easy win, but docs are not your goal.", pay: "+20 pts for about 15 minutes.", risks: "None. Docs only." } },
    ],
    live: [
      { id: 1420, kind: "bid", level: 3, imp: 6, prio: 2, fit: 86, c: 3, ago: "just now", av: ["#4338ca", "R"],
        title: "[Web] Dark-mode toggle flickers on first load",
        why: "New today. Fits your CSS skill, about 20 min.",
        a: { why: "Same theme code you fixed last week.", pay: "+90 pts for about 20 minutes.", risks: "Low. One component, easy to test." } },
      { id: 1426, kind: "verify", level: 2, imp: 7, prio: 3, fit: 79, c: 6, ago: "just now", av: ["#b91c1c", "S"],
        title: "[Security] Google sign-in retries are not rate-limited",
        why: "Security report needs a second verifier.",
        auto: "Verified #1426",
        a: { why: "Security reports need two independent checks.", pay: "+25 pts for a 10-minute check.", risks: "Use the test account only. No real logins." } },
    ],
  },
  promote: {
    found: 9,
    items: [
      { id: 1404, kind: "bid", level: 3, imp: 3, prio: 2, fit: 90, c: 1, ago: "2 hours ago", av: ["#be185d", "J"],
        title: "[Marketing] Build SEO Comparison Pages (Zedu vs. Discord / Slack)",
        why: "Comparison pages drive signups. Strong match for your goal.",
        a: { why: "Search traffic is the fastest way to promote Zedu.", pay: "+200 pts, roughly 3 hours.", risks: "Public pages. Brand review needed before merge." } },
      { id: 1411, kind: "bid", level: 3, imp: 5, prio: 2, fit: 85, c: 7, ago: "1 hour ago", av: ["#0369a1", "D"],
        title: "[Marketing] Launch thread for Agent Inbox on X",
        why: "Draft is ready. Publishing needs your OK.",
        a: { why: "Launch posts get the most reach this week.", pay: "+60 pts. Thread is already drafted.", risks: "Public post. You review the final text first." } },
      { id: 1415, kind: "verify", level: 2, imp: 4, prio: 3, fit: 80, c: 2, ago: "3 hours ago", av: ["#0f766e", "A"],
        title: "[Marketing] Homepage pricing table shows the old plan",
        why: "Confirm the bug before others bid.",
        auto: "Verified #1415",
        a: { why: "Wrong pricing hurts signups. Quick to confirm.", pay: "+15 pts for a 5-minute check.", risks: "None. Read-only check." } },
      { id: 1418, kind: "low", level: 1, imp: 2, prio: 1, fit: 64, c: 3, ago: "6 hours ago", av: ["#a16207", "T"],
        title: "[Marketing] Reply to 3 Product Hunt comments",
        why: "Small task, but tone matters. Skip?",
        auto: "Skipped #1418: tone-sensitive",
        a: { why: "Quick engagement, but replies speak for the brand.", pay: "+10 pts for about 10 minutes.", risks: "Public replies. Wrong tone is hard to undo." } },
    ],
    live: [
      { id: 1431, kind: "bid", level: 3, imp: 4, prio: 2, fit: 83, c: 0, ago: "just now", av: ["#4338ca", "R"],
        title: "[Marketing] Write a Zedu vs. Slack blog post",
        why: "New. Pairs well with the SEO pages.",
        a: { why: "Reuses research from the comparison pages.", pay: "+80 pts, about 1 hour.", risks: "Public post. Needs fact-checking on Slack features." } },
    ],
  },
};

const PHASES = [
  { name: "Searching", ms: 2600 },
  { name: "Matching", ms: 1800 },
  { name: "Shortlisting", ms: 1400 },
  { name: "Needs you" },
];

const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;

const S = {
  goalKey: "work",
  goal: "Find work",
  auto: 2,
  mode: "idle", // idle | run | paused | stopped
  phase: 0,
  t: 0,
  items: [],
  live: [],
  liveT: 0,
  log: [],
  openStep: null,
  confirmed: 15,
  undo: null,
};

/* ---------- helpers ---------- */
const bind = (k, v) => $$(`[data-bind="${k}"]`).forEach((el) => (el.textContent = v));
const announce = (msg) => { $("#live").textContent = ""; setTimeout(() => ($("#live").textContent = msg), 30); };
const visible = () => S.items.filter((i) => !i.done && i.level >= S.auto);
const autoHandled = () => S.items.filter((i) => !i.done && i.level < S.auto);
const ds = () => DATA[S.goalKey];
const clone = (a) => a.map((x) => ({ ...x, a: { ...x.a }, replies: [] }));
const now = () => new Date();
const ago = (d) => {
  const s = Math.round((Date.now() - d) / 1000);
  return s < 45 ? "now" : s < 3600 ? `${Math.round(s / 60)}m` : `${Math.round(s / 3600)}h`;
};
const addLog = (ok, text) => S.log.push({ ok, text, at: now(), fresh: true });

/* ---------- run engine ---------- */
function start(goalText) {
  if (goalText) {
    S.goal = goalText;
    S.goalKey = /promot|market|launch|grow|seo/i.test(goalText) ? "promote" : "work";
    S.items = [];
    S.live = clone(ds().live);
    addLog(true, `Goal set: ${goalText}`);
    syncChips();
  }
  S.mode = "run";
  S.phase = 0;
  S.t = 0;
  S.liveT = 0;
  S.openStep = null;
  announce(`Agent searching: ${S.goal}`);
  renderAll();
}

function enterPhase(p) {
  S.phase = p;
  S.t = 0;
  if (p === 3) {
    if (!S.items.length) {
      S.items = clone(ds().items);
      addLog(false, `Dropped ${ds().found - S.items.length} weak matches`);
    }
    S.items.forEach((i) => (i.fresh = true));
    const n = visible().length;
    announce(n ? `${n} ${n === 1 ? "item needs" : "items need"} you` : "All clear");
  } else {
    announce(PHASES[p].name);
  }
  renderAll();
}

function tick() {
  if (S.mode !== "run") return;
  if (S.phase < 3) {
    S.t += 100;
    if (S.t >= PHASES[S.phase].ms) enterPhase(S.phase + 1);
    else renderRun();
    return;
  }
  // Needs-you / all-clear phase: keep the page alive
  S.liveT += 100;
  if (S.liveT >= 9000) {
    S.liveT = 0;
    const next = S.live.shift();
    if (next) {
      next.fresh = true;
      next.isNew = true;
      S.items.unshift(next);
      if (next.level >= S.auto) announce(`New: #${next.id} needs you`);
      else announce(`${next.auto}`);
    } else {
      addLog(false, `Scanned ${3 + Math.floor(Math.random() * 6)} new issues, no fit`);
    }
    renderAll();
  }
}
setInterval(tick, 100);

/* ---------- render: agent panel ---------- */
function renderRun() {
  const d = ds();
  const fit = d.items.length;
  const f = S.phase < 3 ? Math.min(1, S.t / PHASES[S.phase].ms) : 1;
  const n = visible().length;
  let pct = 0, line = "Standing by", badge = ["", "Standing by"];

  if (S.mode !== "idle") {
    if (S.phase === 0) { pct = 40 * f; line = `Searching · found ${Math.round(d.found * f)}`; }
    else if (S.phase === 1) { pct = 40 + 30 * f; line = `Found ${d.found} → ${Math.round(d.found - (d.found - fit) * f)} fit`; }
    else if (S.phase === 2) { pct = 70 + 20 * f; line = `Found ${d.found} → ${fit} fit · ranking`; }
    else { pct = n ? 90 : 100; line = n ? `Found ${d.found} → ${fit} fit · ${n} need you` : "All clear · watching"; }
    badge = S.phase < 3 ? ["", PHASES[S.phase].name] : n ? ["wait", "Waiting for you"] : ["ok", "All clear"];
  }
  if (S.mode === "paused") { badge = ["paused", "Paused"]; line = `Paused · ${line}`; }
  if (S.mode === "stopped") { badge = ["stopped", "Stopped"]; line = "Stopped"; pct = 0; }

  bind("line", line);
  bind("pct", `${Math.round(pct)}%`);
  const bar = $('[data-bind="bar"]');
  bar.style.transform = `scaleX(${pct / 100})`;
  bar.classList.toggle("wait", S.mode !== "stopped" && S.phase === 3 && n > 0);
  const b = $('[data-bind="badge"]');
  b.className = `badge ${badge[0]}`;
  b.textContent = badge[1];
  const dot = $('[data-bind="dot"]');
  dot.classList.toggle("live", S.mode === "run" && S.phase < 3);
  dot.style.background = S.mode === "stopped" ? "var(--zk-bad-fg)" : S.mode === "paused" ? "var(--zk-muted)" : S.phase === 3 && n && S.mode !== "idle" ? "var(--zk-warn-fg)" : "";
}

function stepDetail(i) {
  const d = ds();
  const fit = d.items.length;
  return [
    `Scanned 359 open issues for “${S.goal}”.`,
    "Ranked by your skills, history and points.",
    `Kept ${fit} best fits, dropped ${d.found - fit}.`,
    `${visible().length} waiting on you, ${autoHandled().length} handled alone.`,
  ][i];
}

function renderSteps() {
  const ol = $("#steps");
  const active = S.mode !== "idle" && S.mode !== "stopped";
  const n = visible().length;
  ol.className = `steps${S.mode === "paused" ? " paused-run" : ""}`;
  ol.parentElement.classList.toggle("paused-run", S.mode === "paused");
  ol.innerHTML = PHASES.map((p, i) => {
    let cls = "";
    if (active) {
      if (i < S.phase || (i === 3 && S.phase === 3 && !n)) cls = "done";
      else if (i === S.phase) cls = i === 3 ? "now need" : "now";
    }
    const label = i === 3 && cls === "done" ? "All clear" : p.name;
    const icon = cls === "done" ? I.check : cls.startsWith("now") ? I.dot : "";
    const state = cls === "done" ? "done" : cls ? "current" : "pending";
    return `<li class="${cls}"><button type="button" class="step" data-step="${i}" aria-expanded="${S.openStep === i}" aria-controls="step-detail" aria-label="${label}, ${state}"><span class="sd">${icon}</span><span class="sl">${label}</span></button></li>`;
  }).join("");
  const det = $("#step-detail");
  det.hidden = S.openStep === null;
  if (S.openStep !== null) det.textContent = stepDetail(S.openStep);
  // controls
  const pause = $("#btn-pause");
  const paused = S.mode === "paused";
  pause.innerHTML = `${paused ? I.play : I.pause}<span>${paused ? "Resume" : "Pause"}</span>`;
  pause.classList.toggle("is-on", paused);
  pause.disabled = S.mode === "idle" || S.mode === "stopped";
  pause.style.opacity = pause.disabled ? ".45" : "";
  const stop = $("#btn-stop");
  const stopped = S.mode === "stopped" || S.mode === "idle";
  stop.innerHTML = `${stopped ? I.play : I.stop}<span>${stopped ? "Start" : "Stop"}</span>`;
  stop.classList.toggle("danger", !stopped);
}

/* ---------- render: rows ---------- */
function prioBars(p) {
  const name = ["low", "medium", "high"][p - 1];
  return `<span class="prio" role="img" aria-label="Priority ${name}">${[1, 2, 3].map((k) => `<i class="${k <= p ? "on" : ""}"></i>`).join("")}</span>`;
}

function rowHTML(it) {
  const [sc, si, st] = STATUS[it.kind];
  const fitCls = it.fit >= 75 ? "" : "mid";
  const approveLbl = it.kind === "verify" ? "Confirm" : "Approve";
  return `<div class="row-main">
      <span class="imp" role="img" aria-label="Importance ${it.imp}">${I.up}${it.imp}</span>
      <div class="cell-issue">
        <h3 class="row-title" title="${esc(it.title)}">${esc(it.title)}</h3>
        <div class="meta"><span>#${it.id}</span><span>${I.bug}</span><span>${I.msg}${it.c}</span><span>${it.ago}</span></div>
        <div class="why"><span class="fit ${fitCls}" title="How well this fits your goal and skills"><span class="fit-bar"><i style="transform:scaleX(${it.fit / 100})"></i></span>${it.fit}% fit</span><span class="why-t" title="${esc(it.why)}">${esc(it.why)}</span></div>
        <div class="acts">
          <button type="button" class="act approve" data-act="approve" aria-label="${approveLbl} #${it.id}">${I.check}${approveLbl}</button>
          <button type="button" class="act skip" data-act="skip" aria-label="Skip #${it.id}">${I.x}Skip</button>
          <button type="button" class="act ask" data-act="ask" aria-expanded="${!!it.asking}" aria-controls="ask-${it.id}" aria-label="Ask agent about #${it.id}">${I.ask}Ask</button>
        </div>
      </div>
      <div class="cell-status"><span class="status ${sc}">${si}${st}</span></div>
      <div class="cell-prio">${prioBars(it.prio)}</div>
      <span class="av" style="background:${it.av[0]}" aria-hidden="true">${it.av[1]}</span>
    </div>
    ${it.asking ? `<div class="ask-box" id="ask-${it.id}">
      ${it.replies.map((r) => `<div class="reply"><span class="bot-s" aria-hidden="true">${I.bot}</span><span><span class="q">${esc(r.q)}</span> ${r.a ? esc(r.a) : '<span class="typing" aria-label="Agent is typing">•••</span>'}</span></div>`).join("")}
      <div class="ask-chips" role="group" aria-label="Quick questions">
        <button type="button" class="chip" data-q="why">Why this?</button>
        <button type="button" class="chip" data-q="pay">Pay?</button>
        <button type="button" class="chip" data-q="risks">Risks?</button>
      </div>
      <form class="ask-form" data-act="send"><label class="sr-only" for="q-${it.id}">Ask your agent</label><input id="q-${it.id}" placeholder="Ask anything…" maxlength="80" /><button type="submit">Send</button></form>
    </div>` : ""}`;
}

const rowEls = new Map();
function renderRows() {
  const ul = $("#rows");
  const show = S.phase === 3 && S.mode !== "idle" ? visible() : [];
  const ids = new Set(show.map((i) => i.id));
  for (const [id, li] of rowEls) {
    if (ids.has(id) || li.dataset.leaving) continue;
    li.dataset.leaving = "1";
    li.classList.add(li.dataset.out || "leave-skip");
    setTimeout(() => { li.remove(); rowEls.delete(id); }, reduced ? 0 : 340);
  }
  let prev = null;
  show.forEach((it) => {
    let li = rowEls.get(it.id);
    if (li && li.dataset.leaving) { li.remove(); rowEls.delete(it.id); li = null; }
    if (!li) {
      li = document.createElement("li");
      li.className = "row";
      li.dataset.id = it.id;
      li.innerHTML = rowHTML(it);
      rowEls.set(it.id, li);
      it.dirty = false;
    } else if (it.dirty) {
      li.innerHTML = rowHTML(it);
      it.dirty = false;
    }
    li.classList.toggle("new", !!it.isNew);
    if (it.fresh) { li.classList.remove("enter"); void li.offsetWidth; li.classList.add("enter"); it.fresh = false; }
    const want = prev ? prev.nextSibling : ul.firstChild;
    if (want !== li) ul.insertBefore(li, want);
    prev = li;
  });
  const n = show.length;
  const empty = $("#empty");
  empty.hidden = n > 0;
  bind("emptyText", S.mode === "stopped" ? "Agent stopped" : S.phase < 3 || S.mode === "idle" ? "Agent is looking…" : "All clear");
  bind("needs", n);
  bind("range", n ? `1–${n}` : "0");
  bind("total", n);
}

/* ---------- render: handled ---------- */
function renderHandled() {
  const derived = S.phase === 3 ? autoHandled().map((i) => ({ ok: true, text: `${i.auto || `Shortlisted #${i.id}`} (auto)`, at: null, auto: true, id: i.id })) : [];
  const all = [...derived, ...S.log.slice().reverse()];
  $("#handled-list").innerHTML = all.map((h) =>
    `<li class="${h.fresh || h.auto ? "enter" : ""}"><span class="hi ${h.ok ? "" : "x"}" aria-hidden="true">${h.ok ? I.check : I.x}</span><span>${esc(h.text)}</span><span class="t">${h.at ? ago(h.at) : "auto"}</span></li>`
  ).join("");
  S.log.forEach((h) => (h.fresh = false));
  bind("handled", all.length);
}

function renderAll() { renderRun(); renderSteps(); renderRows(); renderHandled(); bind("ok", S.confirmed); }

/* ---------- toast + undo ---------- */
function toast(msg, undo) {
  const t = $("#toast");
  $("#toast-msg").textContent = msg;
  $("#toast-undo").hidden = !undo;
  S.undo = undo || null;
  t.classList.add("show");
  clearTimeout(toast.h);
  toast.h = setTimeout(() => { t.classList.remove("show"); S.undo = null; }, 5000);
}
$("#toast-undo").addEventListener("click", () => {
  if (!S.undo) return;
  S.undo();
  S.undo = null;
  $("#toast").classList.remove("show");
});

/* ---------- row actions ---------- */
function decide(it, act) {
  const li = rowEls.get(it.id);
  if (li) li.dataset.out = act === "approve" ? "leave-ok" : "leave-skip";
  it.done = true;
  it.asking = false;
  const verb = act === "approve" ? (it.kind === "verify" ? "Confirmed" : "Bid sent on") : "Skipped";
  addLog(act === "approve", `${verb} #${it.id} (you)`);
  if (act === "approve" && it.kind === "verify") S.confirmed++;
  const entry = S.log[S.log.length - 1];
  // focus the next row's first action, or the tab if none left
  const order = visible().map((i) => i.id);
  renderAll();
  const nextId = order[0];
  setTimeout(() => {
    const nextBtn = nextId && rowEls.get(nextId)?.querySelector("[data-act=approve]");
    (nextBtn || $("#t-need")).focus();
  }, reduced ? 0 : 360);
  toast(`${verb} #${it.id}`, () => {
    it.done = false;
    it.fresh = true;
    it.dirty = true;
    S.log = S.log.filter((l) => l !== entry);
    if (act === "approve" && it.kind === "verify") S.confirmed--;
    renderAll();
    rowEls.get(it.id)?.querySelector("[data-act=approve]")?.focus();
    announce(`Undone. #${it.id} is back`);
  });
}

const ANSWER_FALLBACK = "Best guess: low risk, worth it. Approve if unsure.";
function ask(it, key, text) {
  const q = text || { why: "Why this?", pay: "Pay?", risks: "Risks?" }[key];
  const r = { q, a: "" };
  it.replies = [...it.replies.slice(-1), r];
  it.dirty = true;
  renderRows();
  setTimeout(() => {
    r.a = it.a[key] || ANSWER_FALLBACK;
    it.dirty = true;
    renderRows();
    announce(`Agent: ${r.a}`);
    rowEls.get(it.id)?.querySelector(`[data-q=${key || "why"}]`)?.focus();
  }, reduced ? 200 : 700);
}

$("#rows").addEventListener("click", (e) => {
  const btn = e.target.closest("button");
  if (!btn) return;
  const li = btn.closest(".row");
  const it = S.items.find((x) => x.id === +li.dataset.id);
  if (!it || it.done) return;
  it.isNew = false;
  if (btn.dataset.q) return ask(it, btn.dataset.q);
  const act = btn.dataset.act;
  if (act === "ask") {
    it.asking = !it.asking;
    it.dirty = true;
    renderRows();
    const el = rowEls.get(it.id);
    (it.asking ? el.querySelector("[data-q]") : el.querySelector("[data-act=ask]")).focus();
  } else if (act === "approve" || act === "skip") {
    decide(it, act);
  }
});

$("#rows").addEventListener("submit", (e) => {
  e.preventDefault();
  const li = e.target.closest(".row");
  const it = S.items.find((x) => x.id === +li.dataset.id);
  const v = e.target.querySelector("input").value.trim();
  if (!v) return;
  const key = /pay|point|money|pts/i.test(v) ? "pay" : /risk|safe|danger|break/i.test(v) ? "risks" : /why|reason/i.test(v) ? "why" : null;
  ask(it, key, v);
});

$("#rows").addEventListener("keydown", (e) => {
  if (e.key !== "Escape") return;
  const li = e.target.closest(".row");
  const it = li && S.items.find((x) => x.id === +li.dataset.id);
  if (it?.asking) { it.asking = false; it.dirty = true; renderRows(); rowEls.get(it.id).querySelector("[data-act=ask]").focus(); }
});

/* ---------- agent controls ---------- */
$("#steps").addEventListener("click", (e) => {
  const b = e.target.closest("[data-step]");
  if (!b) return;
  const i = +b.dataset.step;
  S.openStep = S.openStep === i ? null : i;
  renderSteps();
  $(`[data-step="${i}"]`).focus();
});

$("#btn-pause").addEventListener("click", () => {
  if (S.mode === "run") { S.mode = "paused"; announce("Agent paused"); toast("Agent paused"); }
  else if (S.mode === "paused") { S.mode = "run"; announce("Agent resumed"); toast("Agent resumed"); }
  renderRun(); renderSteps();
  $("#btn-pause").focus();
});

$("#btn-stop").addEventListener("click", () => {
  if (S.mode === "stopped" || S.mode === "idle") { start(); }
  else { S.mode = "stopped"; S.openStep = null; addLog(false, "Stopped by you"); announce("Agent stopped"); toast("Agent stopped"); renderAll(); }
  $("#btn-stop").focus();
});

$$('input[name="auto"]').forEach((r) => r.addEventListener("change", () => {
  const before = visible().length;
  S.auto = +r.value;
  S.items.forEach((i) => { if (!i.done && i.level >= S.auto && !rowEls.has(i.id)) i.fresh = true; });
  renderAll();
  const after = visible().length;
  const label = $(`label[for="${r.id}"]`).textContent;
  if (S.phase === 3) toast(`${label}: ${after} need you${after < before ? `, ${before - after} handled` : ""}`);
  announce(`${label}. ${after} items need you.`);
}));

/* ---------- goal ---------- */
function syncChips() {
  $$(".goal .chip").forEach((c) => c.setAttribute("aria-pressed", c.dataset.goal === S.goal));
}
$("#goal-form").addEventListener("submit", (e) => {
  e.preventDefault();
  const v = $("#goal-input").value.trim();
  if (!v) return $("#goal-input").focus();
  start(v);
});
$$(".goal .chip").forEach((c) => c.addEventListener("click", () => {
  $("#goal-input").value = c.dataset.goal;
  start(c.dataset.goal);
}));

/* ---------- tabs ---------- */
const tabs = $$('[role="tab"]');
function selectTab(t) {
  tabs.forEach((x) => { const on = x === t; x.setAttribute("aria-selected", on); x.tabIndex = on ? 0 : -1; });
  const need = t.id === "t-need";
  $("#p-need").hidden = !need;
  $("#p-other").hidden = need;
  if (!need) $("#p-other").setAttribute("aria-labelledby", t.id);
}
tabs.forEach((t, i) => {
  t.addEventListener("click", () => selectTab(t));
  t.addEventListener("keydown", (e) => {
    const d = e.key === "ArrowRight" ? 1 : e.key === "ArrowLeft" ? -1 : 0;
    if (!d) return;
    const n = tabs[(i + d + tabs.length) % tabs.length];
    selectTab(n); n.focus();
  });
});

/* ---------- boot ---------- */
S.live = clone(ds().live);
S.log = [
  { ok: false, text: "Flagged #377 as duplicate", at: new Date(Date.now() - 52 * 60e3) },
  { ok: true, text: "Confirmed #401 as verifier", at: new Date(Date.now() - 34 * 60e3) },
  { ok: true, text: "Kept claim on #389 active", at: new Date(Date.now() - 12 * 60e3) },
];
syncChips();
renderAll();
setTimeout(() => start("Find work"), 700);
