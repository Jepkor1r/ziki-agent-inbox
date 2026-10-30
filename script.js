// Ziki Agent Inbox prototype. Mock data only, no backend.

const svg = (d) => `<svg viewBox="0 0 24 24" aria-hidden="true">${d}</svg>`;
const I = {
  up: svg('<path d="m18 15-6-6-6 6"/>'),
  check: svg('<path d="m5 12 4 4L19 6"/>'),
  x: svg('<path d="M18 6 6 18M6 6l12 12"/>'),
  ask: svg('<path d="M21 12a8 8 0 0 1-11.6 7.1L4 20l1-4.6A8 8 0 1 1 21 12Z"/>'),
  play: svg('<path d="M8 5v14l11-7L8 5Z"/>'),
  pause: svg('<path d="M9 6v12M15 6v12"/>'),
  stop: svg('<rect x="7" y="7" width="10" height="10" rx="1.5"/>'),
  search: svg('<circle cx="11" cy="11" r="6"/><path d="m20 20-4.5-4.5"/>'),
  target: svg('<circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="3"/>'),
  list: svg('<path d="M9 6h11M9 12h11M9 18h11M4.5 6h.01M4.5 12h.01M4.5 18h.01"/>'),
  you: svg('<circle cx="12" cy="8" r="3.5"/><path d="M5 20a7 7 0 0 1 14 0"/>'),
  clock: svg('<circle cx="12" cy="12" r="8"/><path d="M12 8v4l2.5 1.5"/>'),
  star: svg('<path d="m12 4 2.4 5 5.4.6-4 3.7 1.1 5.3L12 16l-4.9 2.6 1.1-5.3-4-3.7 5.4-.6L12 4Z"/>'),
  pts: svg('<path d="M8 21h8M12 17v4M7 4h10v5a5 5 0 0 1-10 0V4Z"/><path d="M17 5h3v2a3 3 0 0 1-3 3M7 5H4v2a3 3 0 0 0 3 3"/>'),
  shield: svg('<path d="M12 3 4.5 6v5.5c0 4.6 3.2 7.5 7.5 9.5 4.3-2 7.5-4.9 7.5-9.5V6L12 3Z"/>'),
  draft: svg('<path d="M4 20h4L19 9l-4-4L4 16v4Z"/>'),
  bot: '<svg viewBox="0 0 48 48" aria-hidden="true"><rect x="9" y="14" width="30" height="24" rx="8"/><path d="M24 8v6M17 25h.01M31 25h.01M20 31.5q4 2.5 8 0"/></svg>',
};

const STATUS = { bid: "Bid", verify: "Verify", low: "Optional" };

// level 3 = always asks (bids, publishing), 2 = big, 1 = small
const POOL = {
  653: { kind: "bid", level: 3, imp: 9, prio: 2, fit: 92, hint: ["star", "Your skill"], tip: "6 auth fixes merged",
    title: "[Web] Password-reset request gets API 404 and shows no feedback",
    a: { why: "You fixed 6 auth bugs.", pay: "+120 pts, about 30 min.", risks: "Session code. Merge gate applies." } },
  1404: { kind: "bid", level: 3, imp: 3, prio: 2, fit: 71, hint: ["pts", "+200 pts"], tip: "Copy is new for you",
    title: "[Marketing] Build SEO Comparison Pages (Zedu vs. Discord / Slack)",
    a: { why: "High points, docs you know.", pay: "+200 pts, about 3 hours.", risks: "Public pages. Brand review." } },
  1377: { kind: "verify", level: 2, imp: 5, prio: 3, fit: 84, hint: ["clock", "10 min"], tip: "One more check unlocks bids", auto: "Verified #1377",
    title: "[API] Rate-limit headers missing on /events/stream",
    a: { why: "One check unlocks bids.", pay: "+15 pts for 10 min.", risks: "Low. Read-only check." } },
  1398: { kind: "verify", level: 1, imp: 4, prio: 1, fit: 88, hint: ["star", "Your skill"], tip: "CSS is your top skill", auto: "Verified #1398",
    title: "[Web] Issue list jumps on mobile when votes update",
    a: { why: "CSS bugs are your strength.", pay: "+10 pts for 5 min.", risks: "None. Mobile repro only." } },
  1361: { kind: "low", level: 1, imp: 2, prio: 1, fit: 58, hint: ["clock", "15 min"], tip: "Low fit, low points", auto: "Skipped #1361",
    title: "[Docs] Broken links in llms.txt examples",
    a: { why: "Easy, but off your goal.", pay: "+20 pts for 15 min.", risks: "None. Docs only." } },
  1420: { kind: "bid", level: 3, imp: 6, prio: 2, fit: 86, hint: ["clock", "20 min"], tip: "Same code as last week",
    title: "[Web] Dark-mode toggle flickers on first load",
    a: { why: "You fixed this code recently.", pay: "+90 pts for 20 min.", risks: "Low. One component." } },
  1426: { kind: "verify", level: 2, imp: 7, prio: 3, fit: 79, hint: ["shield", "Security"], tip: "Needs a second check", auto: "Verified #1426",
    title: "[Security] Google sign-in retries are not rate-limited",
    a: { why: "Security needs two checks.", pay: "+25 pts for 10 min.", risks: "Test account only." } },
  1411: { kind: "bid", level: 3, imp: 5, prio: 2, fit: 85, hint: ["draft", "Draft ready"], tip: "Posting needs your OK",
    title: "[Marketing] Launch thread for Agent Inbox on X",
    a: { why: "Launch posts reach the most.", pay: "+60 pts. Already drafted.", risks: "Public. You check it first." } },
  1415: { kind: "verify", level: 2, imp: 4, prio: 3, fit: 80, hint: ["clock", "5 min"], tip: "Confirm before others bid", auto: "Verified #1415",
    title: "[Marketing] Homepage pricing table shows the old plan",
    a: { why: "Wrong prices hurt signups.", pay: "+15 pts for 5 min.", risks: "None. Read-only check." } },
  1418: { kind: "low", level: 1, imp: 2, prio: 1, fit: 64, hint: ["clock", "10 min"], tip: "Tone matters here", auto: "Skipped #1418",
    title: "[Marketing] Reply to 3 Product Hunt comments",
    a: { why: "Quick, but speaks for the brand.", pay: "+10 pts for 10 min.", risks: "Public. Hard to undo." } },
  1431: { kind: "bid", level: 3, imp: 4, prio: 2, fit: 83, hint: ["pts", "+80 pts"], tip: "Pairs with the SEO pages",
    title: "[Marketing] Write a Zedu vs. Slack blog post",
    a: { why: "Reuses your SEO research.", pay: "+80 pts, about 1 hour.", risks: "Public. Needs fact-checks." } },
  1442: { kind: "bid", level: 3, imp: 6, prio: 2, fit: 81, hint: ["clock", "40 min"], tip: "Repro steps are ready",
    title: "[Web] Vote button double-submits on slow networks",
    a: { why: "You know the vote code.", pay: "+100 pts, about 40 min.", risks: "Low. Add one guard." } },
};

const DATA = {
  work: { found: 12, items: [653, 1404, 1377, 1398, 1361], live: [1420, 1426] },
  promote: { found: 9, items: [1404, 1411, 1415, 1418], live: [1431], fit: { 1404: 90 } },
  bugs: { found: 10, items: [653, 1442, 1377, 1398], live: [1420, 1426], fit: { 653: 94 } },
};

const PHASES = [
  { name: "Search", icon: I.search, ms: 2400 },
  { name: "Match", icon: I.target, ms: 1800 },
  { name: "Shortlist", icon: I.list, ms: 1200 },
  { name: "You", icon: I.you },
];

const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
const EASE = "cubic-bezier(.2,.8,.2,1)";
const AUTO = ["", "Ask me", "Big things only", "Handle it"];

const S = {
  goal: null,
  auto: 2,
  mode: "idle", // idle | run | paused | stopped
  phase: 0,
  t: 0,
  items: [],
  live: [],
  liveT: 0,
  log: [],
  confirmed: 15,
  undo: null,
};

/* ---------- helpers ---------- */
const bind = (k, v) => $$(`[data-bind="${k}"]`).forEach((el) => (el.textContent = v));
const announce = (msg) => { $("#live").textContent = ""; setTimeout(() => ($("#live").textContent = msg), 30); };
const visible = () => S.items.filter((i) => !i.done && i.level >= S.auto);
const autoHandled = () => S.items.filter((i) => !i.done && i.level < S.auto);
const ds = () => DATA[S.goal || "work"];
const make = (ids) => ids.map((id) => ({ id, ...POOL[id], fit: ds().fit?.[id] ?? POOL[id].fit }));
const find = (id) => S.items.find((x) => x.id === id);
const ago = (d) => {
  const s = Math.round((Date.now() - d) / 1000);
  return s < 45 ? "now" : s < 3600 ? `${Math.round(s / 60)}m` : `${Math.round(s / 3600)}h`;
};
const addLog = (ok, text) => S.log.push({ ok, text, at: new Date(), fresh: true });
const center = (el) => { const r = el.getBoundingClientRect(); return [r.left + r.width / 2, r.top + r.height / 2]; };

/* ---------- run engine ---------- */
function start(goal) {
  if (goal) {
    S.goal = goal;
    S.items = [];
    S.live = make(ds().live);
    addLog(true, `Goal: ${$(`[data-goal="${goal}"]`).textContent.trim()}`);
  }
  S.mode = "run";
  S.phase = 0;
  S.t = 0;
  S.liveT = 0;
  announce("Agent working");
  renderAll();
}

function enterPhase(p) {
  S.phase = p;
  S.t = 0;
  if (p === 3) {
    if (!S.items.length) {
      S.items = make(ds().items);
      addLog(false, `Dropped ${ds().found - S.items.length} weak matches`);
    }
    S.items.forEach((i, k) => { i.from = "agent"; i.delay = k * 90; });
    const n = visible().length;
    announce(n ? `${n} need you` : "All clear");
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
  // Waiting on the user: keep the page alive with new matches
  S.liveT += 100;
  if (S.liveT >= (S.live.length === ds().live.length ? 5000 : 10000)) {
    S.liveT = 0;
    const next = S.live.shift();
    if (!next) return;
    next.from = "agent";
    next.isNew = true;
    S.items.unshift(next);
    react("nudge");
    announce(next.level >= S.auto ? `New: #${next.id}` : next.auto);
    renderAll();
  }
}
setInterval(tick, 100);

/* ---------- render: agent hero ---------- */
let lastState = "";
function renderRun() {
  const d = ds();
  const fit = d.items.length;
  const f = S.phase < 3 ? Math.min(1, S.t / PHASES[S.phase].ms) : 1;
  const n = visible().length;
  let pct = 0, found = 0, kept = 0, state = ["idle", "Standing by"];

  if (S.mode !== "idle") {
    if (S.phase === 0) { pct = 40 * f; found = Math.round(d.found * f); kept = found; }
    else if (S.phase === 1) { pct = 40 + 30 * f; found = d.found; kept = Math.round(d.found - (d.found - fit) * f); }
    else { pct = S.phase === 2 ? 70 + 20 * f : n ? 90 : 100; found = d.found; kept = fit; }
    state = S.phase < 3 ? ["work", "Working"] : n ? ["need", "Needs you"] : ["idle", "All clear"];
  }
  if (S.mode === "paused") state = ["paused", "Paused"];
  if (S.mode === "stopped") { state = ["stopped", "Stopped"]; pct = 0; }

  $("#n-found").textContent = found;
  $("#n-fit").textContent = kept;
  $("#prog").setAttribute("aria-label", `Found ${found}, ${kept} good fits`);
  const need = S.mode !== "stopped" && S.mode !== "idle" && S.phase === 3 && n > 0;
  $("#bar").style.transform = $("#bar-need").style.transform = `scaleX(${pct / 100})`;
  $("#bar-need").style.opacity = need ? 1 : 0;

  const ava = $("#ava");
  ["idle", "work", "need", "paused", "stopped"].forEach((k) => ava.classList.toggle(`is-${k}`, state[0] === k));
  if (state[1] !== lastState) {
    lastState = state[1];
    const el = $("#state");
    el.textContent = state[1];
    if (!reduced) el.animate([{ opacity: 0, transform: "translateY(4px)" }, { opacity: 1, transform: "none" }], { duration: 300, easing: EASE });
  }
}

function stepTip(i) {
  const d = ds();
  return [
    "Search · 359 open issues",
    "Match · your skills and points",
    `Shortlist · kept ${d.items.length} of ${d.found}`,
    `You · ${visible().length} need you`,
  ][i];
}

function renderSteps() {
  const active = S.mode !== "idle" && S.mode !== "stopped";
  const n = visible().length;
  $(".hero-run").classList.toggle("is-paused-run", S.mode === "paused");
  $("#steps").innerHTML = PHASES.map((p, i) => {
    let cls = "";
    if (active) {
      if (i < S.phase || (i === 3 && S.phase === 3 && !n)) cls = "done";
      else if (i === S.phase) cls = i === 3 ? "now need" : "now";
    }
    const state = cls === "done" ? "done" : cls ? "now" : "next";
    return `<li class="${cls}"><button type="button" class="step" data-tip="${esc(stepTip(i))}" data-tip-tap aria-label="${p.name}, ${state}">${cls === "done" ? I.check : p.icon}</button></li>`;
  }).join("");

  const pause = $("#btn-pause");
  const paused = S.mode === "paused";
  pause.innerHTML = paused ? I.play : I.pause;
  pause.dataset.tip = paused ? "Resume" : "Pause";
  pause.setAttribute("aria-label", pause.dataset.tip);
  pause.classList.toggle("is-on", paused);
  pause.disabled = S.mode === "idle" || S.mode === "stopped";
  const stop = $("#btn-stop");
  const stopped = S.mode === "stopped" || S.mode === "idle";
  stop.innerHTML = stopped ? I.play : I.stop;
  stop.dataset.tip = stopped ? "Start" : "Stop";
  stop.setAttribute("aria-label", stop.dataset.tip);
  stop.classList.toggle("danger", !stopped);
  $$(".goal").forEach((g) => g.setAttribute("aria-pressed", g.dataset.goal === S.goal));
}

/* ---------- agent reactions ---------- */
function react(kind) {
  const ava = $("#ava");
  ava.classList.remove("cheer", "nudge");
  void ava.offsetWidth;
  ava.classList.add(kind);
  setTimeout(() => ava.classList.remove(kind), 600);
  if (kind === "cheer" && !reduced) confetti();
}

function confetti() {
  const box = $(".confetti");
  const colors = ["var(--zk-ok-fg)", "var(--sky-tint)", "var(--zk-warn-fg)", "var(--electric-blue)"];
  for (let k = 0; k < 10; k++) {
    const dot = document.createElement("i");
    dot.style.background = colors[k % 4];
    box.append(dot);
    const a = (k / 10) * Math.PI * 2 + Math.random() * 0.4;
    const r = 62 + Math.random() * 18;
    dot.animate(
      [{ transform: "translate(0,0) scale(1)", opacity: 1 }, { transform: `translate(${Math.cos(a) * r}px,${Math.sin(a) * r}px) scale(.4)`, opacity: 0 }],
      { duration: 650, easing: "cubic-bezier(.1,.7,.3,1)" }
    ).onfinish = () => dot.remove();
  }
}

function lookAt(el) {
  const ava = $("#ava");
  if (!el || S.mode === "paused") { ava.style.setProperty("--ex", "0px"); ava.style.setProperty("--ey", "0px"); return; }
  const [ax, ay] = center(ava);
  const [x, y] = center(el);
  const dx = x - ax, dy = y - ay, len = Math.hypot(dx, dy) || 1;
  ava.style.setProperty("--ex", `${((dx / len) * 3.5).toFixed(1)}px`);
  ava.style.setProperty("--ey", `${((dy / len) * 3).toFixed(1)}px`);
}

/* ---------- render: rows ---------- */
function prioBars(p) {
  const name = ["low", "medium", "high"][p - 1];
  return `<span class="prio" role="img" aria-label="Priority ${name}" data-tip="Priority ${name}">${[1, 2, 3].map((k) => `<i class="${k <= p ? "on" : ""}"></i>`).join("")}</span>`;
}

function rowHTML(it) {
  const ring = `<svg viewBox="0 0 40 40" aria-hidden="true"><circle class="tr" cx="20" cy="20" r="16"/><circle class="vl" cx="20" cy="20" r="16" pathLength="100" stroke-dasharray="${it.fit} 100"/></svg>`;
  const verb = it.kind === "verify" ? "Confirm" : "Approve";
  return `<div class="swipe-bg" aria-hidden="true"><span class="sb sb-ok"><span class="chk">${I.check}</span>${verb}</span><span class="sb sb-skip">Skip${I.x}</span></div>
    <div class="row-main" role="group" tabindex="0" aria-label="#${it.id} ${esc(it.title)}" aria-describedby="row-help" aria-keyshortcuts="ArrowRight ArrowLeft A">
      <span class="imp" role="img" aria-label="Importance ${it.imp}">${I.up}${it.imp}</span>
      <div class="cell-issue">
        <h3 class="row-title" title="${esc(it.title)}">${esc(it.title)}</h3>
        <div class="sub"><span class="num">#${it.id}</span><button type="button" class="hint" data-tip="${esc(it.tip)}" data-tip-tap>${I[it.hint[0]]}${esc(it.hint[1])}</button></div>
      </div>
      <span class="fit${it.fit < 75 ? " mid" : ""}" role="img" aria-label="Fit ${it.fit}%" data-tip="Fit for you">${ring}${it.fit}</span>
      <span class="st ${it.kind}">${STATUS[it.kind]}</span>
      ${prioBars(it.prio)}
      <div class="acts">
        <button type="button" class="act ask" data-act="ask" data-tip="Ask" aria-label="Ask about #${it.id}" aria-expanded="${!!it.asking}">${I.ask}</button>
        <button type="button" class="act skip" data-act="skip" data-tip="Skip" aria-label="Skip #${it.id}">${I.x}</button>
        <button type="button" class="act approve" data-act="approve" data-tip="${verb}" aria-label="${verb} #${it.id}">${I.check}</button>
      </div>
    </div>
    ${it.asking ? `<div class="ask-box" role="group" aria-label="Ask your agent">
      <div class="ask-q">
        <button type="button" data-q="why" aria-pressed="${it.q === "why"}"><span aria-hidden="true">❓</span>Why</button>
        <button type="button" data-q="pay" aria-pressed="${it.q === "pay"}"><span aria-hidden="true">💰</span>Pay</button>
        <button type="button" data-q="risks" aria-pressed="${it.q === "risks"}"><span aria-hidden="true">⚠️</span>Risks</button>
      </div>
      <p class="ask-a"${it.q ? "" : " hidden"}><span class="mini-bot">${I.bot}</span><span class="ask-t">${it.q && it.typed ? esc(it.a[it.q]) : ""}</span></p>
    </div>` : ""}`;
}

function flyFromAgent(li, delay = 0) {
  if (reduced) return;
  const [ax, ay] = center($("#ava"));
  const [x, y] = center(li);
  li.animate(
    [{ transform: `translate(${ax - x}px,${ay - y}px) scale(.15)`, opacity: 0 }, { transform: "none", opacity: 1 }],
    { duration: 600, delay, easing: EASE, fill: "backwards" }
  );
}

function leave(li, how) {
  const ul = $("#rows");
  if (reduced) return li.remove();
  const top = li.offsetTop;
  li.style.top = `${top}px`;
  li.classList.add("leaving");
  if (how === "ok" || how === "skip") {
    li.classList.add(`to-${how}`, `out-${how}`);
    li.style.setProperty("--p", 1);
    $(".row-main", li).style.transform = "";
    li.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 200, delay: 380, fill: "forwards" }).onfinish = () => li.remove();
  } else {
    const [ax, ay] = center($("#ava"));
    const [x, y] = center(li);
    li.animate(
      [{ transform: "none", opacity: 1 }, { transform: `translate(${ax - x}px,${ay - y}px) scale(.15)`, opacity: 0 }],
      { duration: 550, easing: "cubic-bezier(.5,0,.75,0)", fill: "forwards" }
    ).onfinish = () => li.remove();
  }
  ul.append(li);
}

const rowEls = new Map();
function renderRows() {
  const ul = $("#rows");
  const show = S.phase === 3 && S.mode !== "idle" && S.mode !== "stopped" ? visible() : [];
  const ids = new Set(show.map((i) => i.id));
  const first = new Map([...rowEls].map(([id, li]) => [id, li.getBoundingClientRect().top]));

  for (const [id, li] of rowEls) {
    if (ids.has(id)) continue;
    rowEls.delete(id);
    leave(li, li.dataset.out || "agent");
  }
  let prev = null;
  show.forEach((it) => {
    let li = rowEls.get(it.id);
    if (!li) {
      li = document.createElement("li");
      li.className = "row";
      li.dataset.id = it.id;
      li.innerHTML = rowHTML(it);
      rowEls.set(it.id, li);
      it.enter = true;
    } else if (it.dirty) {
      const focused = document.activeElement;
      const sel = focused && li.contains(focused) ? (focused.dataset.q ? `[data-q=${focused.dataset.q}]` : focused.dataset.act ? `[data-act=${focused.dataset.act}]` : ".row-main") : null;
      li.innerHTML = rowHTML(it);
      if (sel) $(sel, li)?.focus();
    }
    it.dirty = false;
    li.classList.toggle("new", !!it.isNew);
    const want = prev ? prev.nextSibling : ul.firstChild;
    if (want !== li) ul.insertBefore(li, want);
    prev = li;
  });

  // FLIP the rows that stayed, fly in the new ones
  show.forEach((it) => {
    const li = rowEls.get(it.id);
    if (it.enter) {
      it.enter = false;
      if (it.from === "agent") flyFromAgent(li, it.delay || 0);
      else if (!reduced) li.animate([{ opacity: 0, transform: "translateY(-8px)" }, { opacity: 1, transform: "none" }], { duration: 300, easing: EASE });
      it.from = null;
      it.delay = 0;
    } else if (first.has(it.id) && !reduced) {
      const dy = first.get(it.id) - li.getBoundingClientRect().top;
      if (Math.abs(dy) > 1) li.animate([{ transform: `translateY(${dy}px)` }, { transform: "none" }], { duration: 320, easing: EASE });
    }
  });

  const n = show.length;
  $("#empty").hidden = n > 0;
  bind("emptyText", S.mode === "stopped" ? "Stopped" : S.mode === "idle" ? "Pick a goal" : S.phase < 3 ? "Looking…" : "All clear");
  bind("needs", n);
}

/* ---------- render: handled ---------- */
function renderHandled() {
  const derived = S.phase === 3 ? autoHandled().map((i) => ({ ok: i.kind !== "low", text: i.auto || `Shortlisted #${i.id}`, at: null })) : [];
  const all = [...derived, ...S.log.slice().reverse()];
  $("#handled-list").innerHTML = all.map((h) =>
    `<li class="${h.fresh ? "enter" : ""}"><span class="hi ${h.ok ? "" : "x"}" aria-hidden="true">${h.ok ? I.check : I.x}</span><span>${esc(h.text)}</span><span class="t">${h.at ? ago(h.at) : "auto"}</span></li>`
  ).join("");
  S.log.forEach((h) => (h.fresh = false));
  bind("handled", all.length);
}

function renderAll() {
  renderRun();
  renderSteps();
  renderRows();
  renderHandled();
  bind("ok", S.confirmed);
  $(".stat.ok").setAttribute("aria-label", `${S.confirmed} confirmed in 30 days`);
}

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
  if (li) li.dataset.out = act === "approve" ? "ok" : "skip";
  const had = li && li.contains(document.activeElement);
  const order = visible().map((i) => i.id);
  const nextId = order[order.indexOf(it.id) + 1] ?? order[order.indexOf(it.id) - 1];
  it.done = true;
  it.asking = false;
  const verb = act === "approve" ? (it.kind === "verify" ? "Confirmed" : "Bid sent ·") : "Skipped";
  addLog(act === "approve", `${verb} #${it.id}`);
  const entry = S.log[S.log.length - 1];
  if (act === "approve") {
    if (it.kind === "verify") S.confirmed++;
    react("cheer");
  }
  renderAll();
  if (had) (rowEls.get(nextId)?.querySelector(".row-main") || $("#t-need")).focus();
  announce(`${verb} #${it.id}`);
  toast(`${verb} #${it.id}`, () => {
    it.done = false;
    it.from = null;
    S.log = S.log.filter((l) => l !== entry);
    if (act === "approve" && it.kind === "verify") S.confirmed--;
    renderAll();
    rowEls.get(it.id)?.querySelector(".row-main")?.focus();
    announce(`Undone. #${it.id} is back`);
  });
}

function toggleAsk(it) {
  it.asking = !it.asking;
  it.dirty = true;
  renderRows();
  const el = rowEls.get(it.id);
  (it.asking ? el.querySelector("[data-q]") : el.querySelector("[data-act=ask]")).focus();
}

function ask(it, key) {
  it.q = key;
  it.typed = false;
  it.dirty = true;
  renderRows();
  const li = rowEls.get(it.id);
  const out = $(".ask-t", li);
  const text = it.a[key];
  announce(`Agent: ${text}`);
  clearInterval(it.timer);
  if (reduced) { out.textContent = text; it.typed = true; return; }
  let k = 0;
  out.innerHTML = '<span class="caret"></span>';
  setTimeout(() => {
    it.timer = setInterval(() => {
      k++;
      out.innerHTML = `${esc(text.slice(0, k))}<span class="caret"></span>`;
      if (k >= text.length) { clearInterval(it.timer); it.typed = true; setTimeout(() => (out.textContent = text), 500); }
    }, 22);
  }, 280);
}

const rowsEl = $("#rows");
const itemOf = (el) => { const li = el.closest(".row"); return li && !li.classList.contains("leaving") ? find(+li.dataset.id) : null; };

rowsEl.addEventListener("click", (e) => {
  if (swallowClick) return;
  const btn = e.target.closest("button");
  if (!btn) return;
  const it = itemOf(btn);
  if (!it || it.done) return;
  if (it.isNew) { it.isNew = false; rowEls.get(it.id).classList.remove("new"); }
  if (btn.dataset.q) return ask(it, btn.dataset.q);
  const act = btn.dataset.act;
  if (act === "ask") toggleAsk(it);
  else if (act === "approve" || act === "skip") decide(it, act);
});

rowsEl.addEventListener("keydown", (e) => {
  const it = itemOf(e.target);
  if (!it) return;
  if (e.key === "Escape" && it.asking) { toggleAsk(it); return; }
  if (!e.target.classList.contains("row-main")) return;
  const k = e.key;
  if (k === "ArrowRight") { e.preventDefault(); decide(it, "approve"); }
  else if (k === "ArrowLeft") { e.preventDefault(); decide(it, "skip"); }
  else if (k === "a" || k === "A") { e.preventDefault(); toggleAsk(it); }
  else if (k === "ArrowDown" || k === "ArrowUp") {
    e.preventDefault();
    const mains = $$(".row:not(.leaving) .row-main", rowsEl);
    mains[mains.indexOf(e.target) + (k === "ArrowDown" ? 1 : -1)]?.focus();
  }
});

// The agent looks at whatever card you point at
rowsEl.addEventListener("pointerover", (e) => { if (e.pointerType === "mouse") lookAt(e.target.closest(".row")); });
rowsEl.addEventListener("pointerleave", () => lookAt(null));
rowsEl.addEventListener("focusin", (e) => lookAt(e.target.closest(".row")));
rowsEl.addEventListener("focusout", () => lookAt(null));

/* ---------- swipe: right approves, left skips ---------- */
let drag = null;
let swallowClick = false;
rowsEl.addEventListener("pointerdown", (e) => {
  const main = e.target.closest(".row-main");
  if (!main || e.button || e.target.closest("button") || main.closest(".leaving")) return;
  drag = { li: main.parentElement, main, x0: e.clientX, y0: e.clientY, dx: 0, on: false, pid: e.pointerId, th: Math.min(110, main.offsetWidth * 0.3) };
});
rowsEl.addEventListener("pointermove", (e) => {
  if (!drag || e.pointerId !== drag.pid) return;
  const dx = e.clientX - drag.x0, dy = e.clientY - drag.y0;
  if (!drag.on) {
    if (Math.abs(dy) > 10 && Math.abs(dy) > Math.abs(dx)) { drag = null; return; }
    if (Math.abs(dx) < 8) return;
    drag.on = true;
    drag.main.setPointerCapture(e.pointerId);
    drag.li.classList.add("dragging");
    hideTip();
  }
  const lim = drag.main.offsetWidth * 0.6;
  const x = Math.max(-lim, Math.min(lim, dx));
  drag.dx = x;
  drag.main.style.transform = `translateX(${x}px)`;
  drag.li.style.setProperty("--p", Math.min(1, Math.abs(x) / drag.th).toFixed(2));
  drag.li.classList.toggle("to-ok", x > 0);
  drag.li.classList.toggle("to-skip", x < 0);
  drag.li.classList.toggle("armed", Math.abs(x) >= drag.th);
});
function endDrag() {
  if (!drag) return;
  const d = drag;
  drag = null;
  if (!d.on) return;
  swallowClick = true;
  setTimeout(() => (swallowClick = false), 50);
  d.li.classList.remove("dragging");
  const it = find(+d.li.dataset.id);
  if (it && Math.abs(d.dx) >= d.th) return decide(it, d.dx > 0 ? "approve" : "skip");
  d.main.style.transform = "";
  d.li.style.setProperty("--p", 0);
  d.li.classList.remove("to-ok", "to-skip", "armed");
}
rowsEl.addEventListener("pointerup", endDrag);
rowsEl.addEventListener("pointercancel", endDrag);

/* ---------- tooltips (hover, focus, or tap) ---------- */
const tip = $("#tip");
let tipFor = null;
function showTip(el) {
  const src = el.dataset.tip;
  if (!src) return;
  tip.innerHTML = src.startsWith("#") ? $(src).innerHTML : esc(src);
  tip.hidden = false;
  const r = el.getBoundingClientRect();
  const w = tip.offsetWidth, h = tip.offsetHeight;
  const left = Math.max(8, Math.min(innerWidth - w - 8, r.left + r.width / 2 - w / 2));
  const top = r.top - h - 8 < 8 ? r.bottom + 8 : r.top - h - 8;
  tip.style.left = `${left}px`;
  tip.style.top = `${top}px`;
  tip.classList.add("show");
  if (tipFor && tipFor !== el) tipFor.removeAttribute("aria-describedby");
  if (!el.hasAttribute("aria-describedby")) el.setAttribute("aria-describedby", "tip");
  tipFor = el;
}
function hideTip() {
  if (!tipFor) return;
  if (tipFor.getAttribute("aria-describedby") === "tip") tipFor.removeAttribute("aria-describedby");
  tipFor = null;
  tip.classList.remove("show");
  tip.hidden = true;
}
document.addEventListener("pointerover", (e) => {
  if (e.pointerType !== "mouse" || drag?.on) return;
  const el = e.target.closest("[data-tip]");
  if (el && el !== tipFor) showTip(el);
  else if (!el && tipFor) hideTip();
});
document.addEventListener("focusin", (e) => {
  const el = e.target.closest?.("[data-tip]");
  if (el && el.matches(":focus-visible")) showTip(el);
  else hideTip();
});
document.addEventListener("click", (e) => {
  const el = e.target.closest("[data-tip-tap]");
  if (!el) return e.target.closest("[data-tip]") ? null : hideTip();
  if (tipFor === el && e.pointerType !== "mouse") hideTip();
  else showTip(el);
});
document.addEventListener("keydown", (e) => { if (e.key === "Escape") hideTip(); });
addEventListener("scroll", hideTip, { passive: true });

/* ---------- agent controls ---------- */
$$(".goal").forEach((g) => g.addEventListener("click", () => start(g.dataset.goal)));

$("#btn-pause").addEventListener("click", () => {
  if (S.mode === "run") { S.mode = "paused"; lookAt(null); announce("Agent paused"); toast("Paused"); }
  else if (S.mode === "paused") { S.mode = "run"; announce("Agent resumed"); toast("Resumed"); }
  renderRun(); renderSteps();
  $("#btn-pause").focus();
});

$("#btn-stop").addEventListener("click", () => {
  if (S.mode === "stopped" || S.mode === "idle") start(S.goal ? null : "work");
  else { S.mode = "stopped"; addLog(false, "Stopped by you"); announce("Agent stopped"); toast("Stopped"); renderAll(); }
  $("#btn-stop").focus();
});

const autoEl = $("#auto");
function setAuto(v) {
  if (v === S.auto) return;
  S.auto = v;
  autoEl.value = v;
  autoEl.style.setProperty("--v", `${(v - 1) * 50}%`);
  autoEl.setAttribute("aria-valuetext", AUTO[v]);
  $$(".auto-ic button").forEach((b) => b.classList.toggle("on", +b.dataset.auto === v));
  // cards handed back by the agent fly out of it; cards it takes over fly into it
  S.items.forEach((i) => { if (!i.done && i.level >= v && !rowEls.has(i.id)) i.from = "agent"; });
  renderAll();
  const n = visible().length;
  announce(`${AUTO[v]}. ${n} need you.`);
  clearTimeout(setAuto.h);
  setAuto.h = setTimeout(() => S.phase === 3 && toast(`${AUTO[v]} · ${n} need you`), 350);
}
autoEl.addEventListener("input", () => setAuto(+autoEl.value));
$$(".auto-ic button").forEach((b) => b.addEventListener("click", () => setAuto(+b.dataset.auto)));

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

/* ---------- filter bar: fade the edge that has more to scroll ---------- */
(() => {
  const f = $(".filters");
  const sync = () => {
    f.classList.toggle("fade-l", f.scrollLeft > 2);
    f.classList.toggle("fade-r", f.scrollLeft + f.clientWidth < f.scrollWidth - 2);
  };
  f.addEventListener("scroll", sync, { passive: true });
  addEventListener("resize", sync);
  sync();
})();

/* ---------- boot ---------- */
S.log = [
  { ok: false, text: "Flagged #377 as duplicate", at: new Date(Date.now() - 52 * 60e3) },
  { ok: true, text: "Confirmed #401", at: new Date(Date.now() - 34 * 60e3) },
  { ok: true, text: "Kept claim on #389", at: new Date(Date.now() - 12 * 60e3) },
];
autoEl.style.setProperty("--v", "50%");
$('.auto-ic [data-auto="2"]').classList.add("on");
renderAll();
setTimeout(() => S.mode === "idle" && start("work"), 1200);
