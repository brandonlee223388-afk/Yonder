/* ---------- content ---------- */
const SUGAR = [[10, 95, 90, 92, 92.3], [25, 62, 65, 60, 62.3], [40, 35, 38, 36, 36.3], [60, 18, 20, 19, 19.0]];
const sugarTable = `<div class="scroll"><table class="data">
  <caption>Table 1: Effect of Water Temperature on the Time for Sugar to Dissolve</caption>
  <thead><tr><th>Water Temperature (°C)</th><th>Trial 1 (s)</th><th>Trial 2 (s)</th><th>Trial 3 (s)</th><th>Average Time (s)</th></tr></thead>
  <tbody>${SUGAR.map(r => `<tr><td>${r[0]}</td><td>${r[1]}</td><td>${r[2]}</td><td>${r[3]}</td><td><b>${r[4].toFixed(1)}</b></td></tr>`).join("")}</tbody>
</table></div>`;

const STEPS = [
  { title: "Title", summary: "Give your project a name that is clear, specific and interesting, so readers know what it's about at a glance.", parts: [
    { title: "What makes a good title", html: `
      <p>Your title should be <b>clear, specific and interesting</b>. It should catch the reader's attention and tell them what the experiment is about.</p>
      <ul><li>Make it catchy but scientifically appropriate.</li><li>Connect it to the main idea or purpose of the experiment.</li><li>Avoid titles that are too general, like "Science Lab" or "Experiment".</li></ul>
      <div class="compare"><div class="bad"><span>Instead of</span>Plant Experiment</div><div class="good"><span>Try</span>Let There Be Light! How Light Intensity Affects Plant Growth</div></div>` },
    { title: "Formatting your title", html: `
      <ul><li>Place the title in the <b>center of the title page</b>.</li><li>Use a <b>larger, easy-to-read font</b> than the rest of the page.</li><li>You can use a creative title followed by a more descriptive subtitle.</li></ul>
      <div class="tip"><b>Tip</b>Write the descriptive part first ("How ___ affects ___"), then add a catchy phrase in front of it.</div>` }
  ]},
  { title: "Aim & Hypothesis", summary: "Say what you want to find out (the aim), name your variables, and predict what will happen and why (the hypothesis).", parts: [
    { title: "The aim", html: `
      <p>The <b>aim</b> is the goal of your experiment: the "what". It is the question you want to answer.</p>
      <ul><li>Keep it short, usually one clear sentence.</li><li>Start with "To determine…", "To measure…" or "To investigate…".</li><li>Be specific about what you are testing.</li></ul>
      <div class="compare"><div class="bad"><span>Too vague</span>To test metal.</div><div class="good"><span>Specific</span>To determine the reaction rate of magnesium ribbon in hydrochloric acid.</div></div>
      <div class="ex"><b>Fill in the blank</b>To investigate how <u>[what you change]</u> affects <u>[what you measure]</u>.</div>
      <div class="ex"><b>Example</b>To investigate how the amount of sunlight affects the height of bean plants.</div>` },
    { title: "Know your variables", html: `
      <p>Variables are the things in an experiment that can change or be kept the same. Every experiment should name all three kinds.</p>
      <div class="scroll"><table class="data">
        <thead><tr><th>Variable</th><th>Remember it as</th><th>Ask yourself</th><th>On a graph</th></tr></thead>
        <tbody>
          <tr><td><b>Independent</b></td><td>I change</td><td>What am I changing?</td><td>X-axis</td></tr>
          <tr><td><b>Dependent</b></td><td>I measure</td><td>What am I measuring?</td><td>Y-axis</td></tr>
          <tr><td><b>Controlled</b></td><td>I keep the same</td><td>What needs to stay the same?</td><td>Not graphed</td></tr>
        </tbody></table></div>
      <div class="ex"><b>Example: How does the amount of sunlight affect plant growth?</b>
        Independent: amount of sunlight<br>Dependent: plant height<br>Controlled: type of plant, amount of water, soil, pot size, length of the experiment</div>
      <div class="tip"><b>Tip</b>Change only one thing at a time. That's what makes it a fair test.</div>` },
    { title: "The hypothesis", html: `
      <p>The <b>hypothesis</b> is your educated guess about what will happen and why. It must be something you can test.</p>
      <div class="formula">If [I change this], then [this will happen], because [scientific reason].</div>
      <div class="tip"><b>Key rule</b>A hypothesis is never "proven right". Your data can only <b>support</b> it or <b>refute</b> it.</div>
      <div class="ex"><b>Example</b>If a glow stick is placed in hot water, then it will glow brighter than one in cold water, because heat makes chemical reactions happen faster.</div>
      <div class="builder">
        <b>Try it: build your hypothesis</b>
        <label class="f" for="hIf">If we…<input class="input" id="hIf" placeholder="add more baking soda to the vinegar"></label>
        <label class="f" for="hThen">then…<input class="input" id="hThen" placeholder="the foam will rise higher"></label>
        <label class="f" for="hBecause">because…<input class="input" id="hBecause" placeholder="more baking soda makes more carbon dioxide gas"></label>
        <p class="preview" id="hOut">If we add more baking soda to the vinegar, then the foam will rise higher, because more baking soda makes more carbon dioxide gas.</p>
      </div>
      <div class="scroll"><table class="data">
        <thead><tr><th></th><th>Aim</th><th>Hypothesis</th></tr></thead>
        <tbody>
          <tr><td><b>Question</b></td><td>What are we trying to do?</td><td>What do we expect to happen?</td></tr>
          <tr><td><b>Format</b></td><td>"To investigate…"</td><td>"If… then… because…"</td></tr>
          <tr><td><b>Changes?</b></td><td>Stays the same no matter what</td><td>Supported or refuted by data</td></tr>
        </tbody></table></div>` }
  ]},
  { title: "Background Research", summary: "Research and explain the science behind your experiment before you start testing.", parts: [
    { title: "What to explain", html: `
      <p>Background information is the <b>research part</b> of your report. It explains the science someone needs to understand before reading about your experiment.</p>
      <ul><li>Explain the main science ideas behind the experiment.</li><li>Define important scientific vocabulary.</li><li>Explain how the science connects to what you are testing.</li><li>Include related images.</li></ul>
      <div class="ex"><b>Example: How does temperature affect yeast fermentation?</b>Explain what yeast is, what fermentation is, what yeast needs to grow, and why temperature might change how fast fermentation happens.</div>
      <div class="tip"><b>Ask yourself</b>What science do I need to understand before I can explain my experiment?</div>` },
    { title: "Using good sources", html: `
      <ul><li>Use information from <b>reliable sources</b>, like science websites, textbooks and encyclopedias.</li><li>Write in <b>your own words</b>. Don't copy and paste.</li><li>Include sources and citations when required.</li></ul>
      <div class="tip"><b>Tip</b>Write down where each fact came from as you research. It's much harder to find later.</div>` }
  ]},
  { title: "Materials", summary: "List everything you used, with amounts, so someone else could repeat your experiment.", parts: [
    { title: "List everything", html: `
      <p>Tell the reader <b>everything</b> you used: equipment, substances and supplies. Someone should be able to read this section and know exactly what they need to repeat your experiment.</p>
      <div class="tip"><b>Format rule</b>Write your materials as sentences, without numbers or bullet points.</div>
      <div class="ex"><b>Example</b>The materials used were four 250 mL beakers, 800 mL of water, 12 sugar cubes, a thermometer, a kettle, ice and a stopwatch.</div>` },
    { title: "Be specific", html: `
      <p>Include the amount, size or quantity whenever it matters.</p>
      <div class="compare"><div class="bad"><span>Instead of</span>water</div><div class="good"><span>Write</span>100 mL of water</div></div>
      <div class="compare"><div class="bad"><span>Instead of</span>cups</div><div class="good"><span>Write</span>3 plastic cups</div></div>` }
  ]},
  { title: "Procedure", summary: "Explain exactly how the experiment was done, step by step, so anyone could repeat it.", parts: [
    { title: "Numbered steps in order", html: `
      <p>The procedure explains how the experiment was done from beginning to end. Write it in <b>numbered steps</b>, in the <b>correct order</b>.</p>
      <ul><li>Make each step clear and specific.</li><li>Include measurements, times and temperatures.</li><li>Say how many trials were done.</li></ul>
      <div class="ex"><b>Example</b><ol><li>200 mL of water was heated to 10 °C and poured into a beaker.</li><li>One sugar cube was dropped into the water and a stopwatch was started.</li><li>The stopwatch was stopped when no sugar could be seen.</li><li>Steps 1–3 were repeated for 3 trials at 10, 25, 40 and 60 °C.</li></ol></div>` },
    { title: "Write in third person", html: `
      <p>Write the procedure in <b>third person</b> and past tense. Don't use "I" or "we".</p>
      <div class="compare"><div class="bad"><span>Instead of</span>I poured 100 mL of water into the beaker.</div><div class="good"><span>Write</span>100 mL of water was poured into the beaker.</div></div>
      <div class="tip"><b>Tip</b>Read your steps to a friend. If they could do the experiment without asking questions, your steps are clear enough.</div>` }
  ]},
  { title: "Data & Graph", summary: "Organize your measurements in a table, then show them on a graph.", parts: [
    { title: "Make a data table", html: `
      <p>Your data table organizes all the measurements and observations from the experiment.</p>
      <ul><li>Give the table a clear title.</li><li>Label every column and row, with units.</li><li>Include every trial, plus the average.</li><li>Make the independent and dependent variables easy to spot.</li></ul>
      ${sugarTable}
      <p class="muted small">Here, water temperature is the independent variable and the time for sugar to dissolve is the dependent variable.</p>` },
    { title: "Plot a graph", html: `
      <ol>
        <li>Give the graph a clear title.</li><li>Put the independent variable on the X-axis.</li><li>Put the dependent variable on the Y-axis.</li>
        <li>Label both axes with units (°C, seconds, cm, mL).</li><li>Choose an even scale that uses most of the space.</li>
        <li>Plot each point carefully from your data table.</li><li>Draw a line of best fit, or connect the points.</li><li>Check that it's neat, accurate and easy to read.</li>
      </ol>
      <figure class="graph"><figcaption>Effect of Water Temperature on Sugar Dissolving Time</figcaption><div id="graphMount"></div></figure>
      <p class="muted small">Most science fair projects use a line graph like this one.</p>` }
  ]},
  { title: "Analysis", summary: "Explain what your results mean. Describe the pattern and back it up with data.", parts: [
    { title: "Explain the pattern", html: `
      <p>The analysis is where you <b>explain what your results mean</b>. Don't just repeat the numbers from your table.</p>
      <ul><li>Describe patterns or trends in the data.</li><li>Explain the relationship between the independent and dependent variables.</li><li>Point out anything surprising.</li></ul>
      <div class="tip"><b>Ask yourself</b>As my independent variable went up, what happened to my dependent variable?</div>` },
    { title: "Use data as evidence", html: `
      <p>Support every claim with numbers from your results.</p>
      <div class="ex"><b>Example</b>The results showed that sugar dissolved faster as the water temperature increased. At 10 °C the sugar took an average of 92.3 seconds to dissolve, while at 60 °C it took only 19.0 seconds. This shows that increasing the water temperature decreased the time needed for sugar to dissolve.</div>` }
  ]},
  { title: "Conclusion & Evaluation", summary: "Answer your question, say whether your hypothesis was supported, and reflect on how the experiment could be better.", parts: [
    { title: "Write the conclusion", html: `
      <p>The conclusion answers your original question and says whether your results <b>supported your hypothesis</b>.</p>
      <ul><li>Summarize what you learned.</li><li>Say clearly if the hypothesis was supported or not supported.</li><li>Use your results as evidence.</li></ul>
      <div class="ex"><b>Question</b>Does increasing water temperature make sugar dissolve faster?</div>
      <div class="ex"><b>Hypothesis</b>If the water temperature increases, then the sugar will dissolve faster.</div>
      <div class="ex"><b>Conclusion</b>The results supported the hypothesis. As the water temperature increased, the sugar dissolved faster. The sugar took an average of 92.3 seconds at 10 °C but only 19.0 seconds at 60 °C. Therefore, increasing the temperature of the water decreased the time needed for the sugar to dissolve.</div>` },
    { title: "Evaluate your experiment", html: `
      <p>The evaluation explains how well the experiment worked.</p>
      <ul><li>Say what was done well.</li><li>Describe any <b>errors or limitations</b>.</li><li>Explain <b>how each error may have affected the data</b>.</li><li>Suggest how to <b>improve</b> the experiment if it were repeated.</li></ul>
      <div class="ex"><b>Example</b>One limitation was that the water temperature decreased during each trial. This may have affected the dissolving time. To improve the experiment, a water bath could be used to keep the temperature constant.</div>` }
  ]}
].map((s, i) => ({ ...s, n: i + 1 }));
const TOTAL_PARTS = STEPS.reduce((n, s) => n + s.parts.length, 0);

const TEAM = [
  { name: "Teammate 1", role: "Project lead", bio: "Planned Yonder, kept the team on schedule and turned the lab report guide into the 8 steps you see in the sidebar." },
  { name: "Teammate 2", role: "Researcher", bio: "Checked every step against the science lab report guide and the IB MYP rubric, and wrote the examples and tips." },
  { name: "Teammate 3", role: "Designer", bio: "Sketched the dashboard, chose the look of the site and made sure every page takes as few clicks as possible." },
  { name: "Teammate 4", role: "Developer", bio: "Built the site and the AI Grader, and tested it with sample lab reports to make the feedback useful." }
];

const CHECKLIST = [
  [1, "My title is specific and says what I tested."],
  [2, "My aim starts with \"To investigate…\", \"To determine…\" or \"To measure…\"."],
  [2, "My hypothesis uses \"If… then… because…\"."],
  [2, "I named my independent, dependent and controlled variables."],
  [3, "I explained the science behind my experiment in my own words."],
  [3, "I included related images and listed my sources."],
  [4, "My materials are written as sentences, with amounts and sizes."],
  [5, "My procedure steps are numbered, in order and in third person."],
  [5, "I said how many trials I did."],
  [6, "My data table has a title, labeled columns, units and every trial."],
  [6, "My graph has a title, labeled axes and units."],
  [7, "My analysis describes the trend and uses numbers as evidence."],
  [8, "My conclusion says whether my hypothesis was supported or refuted."],
  [8, "My evaluation explains errors, how they affected my data and how to improve."]
];
const FAQ = [
  ["Who is Yonder for?", "Students writing a science fair lab report, especially in Grades 7 and 8 (IB MYP Years 2–3). The steps work for any lab report, not just IB."],
  ["Where do I start?", "Open Step 1 in the sidebar and work through each part. Press Mark done at the end of a part to save a checkpoint. The dashboard always shows where you left off."],
  ["Is my progress saved?", "Yes, in this browser. If you switch to another computer or clear your browser data, your checkpoints start over."],
  ["How does the AI Grader work?", "Paste your report and press Grade my report. It gives you a percent grade, IB MYP marks for criteria A to D, and suggestions. Tap a suggestion to see how the AI would write that part."],
  ["Will the AI write my report for me?", "No. It shows short examples for the parts that need work, with [brackets] where your own details go. The writing is still yours."],
  ["Is the IB grade official?", "No. It's an estimate using your MYP Years 2–3 rubric, to help you improve before you hand in. Only your teacher gives your real grade."],
  ["Can I use my teacher's rubric?", "Yes. In the AI Grader, open \"Grade against your teacher's prompt instead\" and paste it in. The percent grade will follow your teacher's criteria."],
  ["Why does grading sometimes take longer?", "Longer inputs will take longer to grade and assess. Most reports take under a minute."],
  ["What do I need to use the AI Grader?", "You need to be signed in to Claude. Grading uses your own Claude account."],
  ["What's the difference between the aim and the hypothesis?", "The aim is what you want to find out. The hypothesis is your prediction of what will happen and why. Step 2 explains both with examples."]
];
const LINKS = [
  ["Science Buddies", "https://www.sciencebuddies.org/", "Project ideas and guides for every part of a science fair project."],
  ["Khan Academy: Science", "https://www.khanacademy.org/science", "Free lessons to help with your background research."],
  ["Purdue OWL", "https://owl.purdue.edu/", "How to cite your sources correctly."],
  ["NCES Kids' Zone: Create a Graph", "https://nces.ed.gov/nceskids/createagraph/", "Make a line or bar graph from your data table."],
  ["IB Middle Years Programme", "https://www.ibo.org/programmes/middle-years-programme/", "What the IB MYP is and how it's assessed."]
];

const PAGES = {
  about: { title: "About Us", html: () => `
    <p class="lead">Yonder is a step-by-step guide to writing a science fair lab report, made for students in Grades 7 and 8 (IB MYP Years 2–3).</p>
    <h3>Why we made it</h3>
    <p>Lab reports have a lot of parts, and it's easy to lose marks on small things, like a hypothesis with no "because" or materials with no amounts. We wanted one place that explains every part in plain language, with examples, and lets you check your work before you hand it in.</p>
    <h3>How it works</h3>
    <ol class="plain"><li><b>Learn the 8 steps.</b> Each step is split into short parts with tips and examples.</li><li><b>Mark each part done.</b> Every part you finish saves a checkpoint, so you always know where you left off.</li><li><b>Grade your report.</b> The AI Grader gives you a percent grade, IB MYP marks for criteria A to D, and suggestions you can tap.</li></ol>
    <h3>About the AI Grader</h3>
    <p>The AI Grader uses Claude, an AI model made by Anthropic. Its grades are estimates to help you improve, not official marks, and it never writes your report for you.</p>
    <h3>The team</h3>
    <p>Yonder was made by a team of four students. <button class="link" type="button" data-go="home">Meet them on the dashboard</button>.</p>` },
  resources: { title: "Resources", html: () => `
    <p class="lead">Everything you need beside the 8 steps.</p>
    <h3>Lab report checklist</h3>
    <p class="muted small">Tick these off before you hand in. Your ticks are saved in this browser.</p>
    <div class="checklist">${CHECKLIST.map(([s, t], i) => `<label class="check" for="ck${i}"><input type="checkbox" id="ck${i}" data-check="${i}" ${S.check.has(i) ? "checked" : ""}><span>${esc(t)}</span><button class="link small" type="button" data-go="step" data-s="${s}">Step ${s}</button></label>`).join("")}</div>
    <h3>Your rubric: IB MYP Sciences, Years 2–3</h3>
    <div class="scroll"><table class="data">
      <thead><tr><th>Criterion</th><th>What it looks for</th><th>Out of</th></tr></thead>
      <tbody>
        <tr><td><b>A: Knowing and understanding</b></td><td>Describing the science, applying it to problems, and making judgments supported by evidence.</td><td>8</td></tr>
        <tr><td><b>B: Inquiring and designing</b></td><td>The question, a testable hypothesis with reasoning, the variables and a safe, complete method.</td><td>8</td></tr>
        <tr><td><b>C: Processing and evaluating</b></td><td>Presenting and interpreting data, and discussing the hypothesis, the method and improvements.</td><td>8</td></tr>
        <tr><td><b>D: Reflecting on the impacts of science</b></td><td>How the science is used in real life, its implications, scientific language and sources.</td><td>8</td></tr>
      </tbody></table></div>
    <h3>Helpful websites</h3>
    <ul class="links">${LINKS.map(([n, u, d]) => `<li><a href="${u}" target="_blank" rel="noopener">${n}</a><span class="muted small">${d}</span></li>`).join("")}</ul>` },
  faq: { title: "FAQ", html: () => `
    <p class="lead">Quick answers to the questions students ask most.</p>
    <div>${FAQ.map(([q, a]) => `<details class="more qa"><summary>${q}</summary><p>${a}</p></details>`).join("")}</div>` },
  contact: { title: "Contact", html: () => `
    <p class="lead">Questions about your own report? Your science teacher is the best person to ask first.</p>
    <h3>Send the Yonder team feedback</h3>
    <p class="muted">Found a mistake, got stuck, or have an idea for the site? Tell us here.</p>
    ${S.fb.sent
      ? `<div class="tip"><b>Sent</b>Thanks! Your feedback reached the Yonder team.</div><button class="link" type="button" data-act="fb-again" style="align-self:flex-start">Send more feedback</button>`
      : S.session
        ? `<form id="fbForm" novalidate>
            <span class="label">What's it about?</span>
            <div class="chips" role="group" aria-label="Feedback topic">${["Question", "Something's wrong", "Idea"].map((t) => `<button type="button" class="chip" data-act="fb-topic" data-v="${t}" aria-pressed="${S.fb.topic === t}">${t}</button>`).join("")}</div>
            <label class="f" for="fbMsg">Your message<textarea id="fbMsg" class="report rubric" maxlength="2000">${esc(S.fb.msg)}</textarea></label>
            <p class="err" id="fbErr" hidden></p>
            <button class="btn btn-accent" type="submit" style="justify-self:start" ${S.fb.busy ? "disabled" : ""}>${S.fb.busy ? "Sending…" : "Send feedback"}</button>
          </form>`
        : `<div class="tip"><b>Log in needed</b>Log in on the dashboard to send feedback. Until then, pass your feedback to your teacher.</div><button class="btn btn-ink" type="button" data-go="home" style="align-self:flex-start">Go to log in</button>`}` }
};

/* ---------- state ---------- */
const store = {
  get(k, d) { try { const v = localStorage.getItem("sf:" + k); return v == null ? d : JSON.parse(v); } catch { return d; } },
  set(k, v) { try { localStorage.setItem("sf:" + k, JSON.stringify(v)); } catch {} }
};
const $ = (id) => document.getElementById(id);
const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]);
const key = (s, p) => `${s}-${p}`;

const S = {
  view: "home", step: null, part: null,
  done: new Set(store.get("done", [])),
  last: store.get("last", { s: 1, p: 1 }),
  open: new Set(),
  session: null,
  layer: null,
  check: new Set(store.get("check", [])),
  fb: { topic: "Question", msg: "", sent: false, busy: false }
};
let sb = null, clerk = null, dailyLimit = 5;
const CLERK_JS = "https://cdn.jsdelivr.net/npm/@clerk/clerk-js@6.42.3/dist/clerk.browser.js";
/* Make Clerk's sign-in screens match Yonder. */
const CLERK_LOOK = { variables: { colorPrimary: "#12a06e", colorText: "#18181b", fontFamily: "Geist, system-ui, sans-serif", borderRadius: "14px" } };
if (!STEPS[S.last.s - 1]?.parts[S.last.p - 1]) S.last = { s: 1, p: 1 };
S.open.add(S.last.s);
const main = $("main");
const narrow = matchMedia("(max-width: 900px)");

function nextOf(s, p) { return p < STEPS[s - 1].parts.length ? [s, p + 1] : s < STEPS.length ? [s + 1, 1] : null; }
function prevOf(s, p) { return p > 1 ? [s, p - 1] : s > 1 ? [s - 1, STEPS[s - 2].parts.length] : null; }
function firstUndone(s) { const i = STEPS[s - 1].parts.findIndex((_, i) => !S.done.has(key(s, i + 1))); return i < 0 ? 1 : i + 1; }

/* ---------- navigation ---------- */
function go(view, s = null, p = null) {
  S.view = view; S.step = s; S.part = p; S.layer = null;
  if (view === "step" && p) { S.last = { s, p }; saveProgress(); S.open.add(s); }
  if (narrow.matches) setSide(false);
  closeSearch();
  render(); renderLayer();
  window.scrollTo({ top: 0 });
}
function setSide(open) {
  document.body.classList.toggle("side-open", open);
  $("tabSteps").setAttribute("aria-expanded", String(open));
}
function measureTop() { document.documentElement.style.setProperty("--top", $("topbar").getBoundingClientRect().bottom + "px"); }

/* ---------- sidebar ---------- */
function renderSide() {
  $("sideCount").textContent = `${S.done.size} of ${TOTAL_PARTS} done`;
  $("steps").innerHTML = STEPS.map((s) => {
    const open = S.open.has(s.n), active = S.view === "step" && S.step === s.n;
    const doneN = s.parts.filter((_, i) => S.done.has(key(s.n, i + 1))).length;
    return `<li>
      <div class="step-row${active ? " active" : ""}">
        <button class="step-link" type="button" data-go="step" data-s="${s.n}"><small>Step ${s.n}${doneN === s.parts.length ? " · Done" : doneN ? ` · ${doneN}/${s.parts.length}` : ""}</small><b>${s.title}</b></button>
        <button class="toggle" type="button" data-act="toggle" data-s="${s.n}" aria-expanded="${open}">${open ? "Hide" : "Show"}</button>
      </div>
      ${open ? `<ul class="parts">${s.parts.map((p, i) => `<li><button type="button" class="${active && S.part === i + 1 ? "active" : ""}" data-go="step" data-s="${s.n}" data-p="${i + 1}"><span>${p.title}</span>${S.done.has(key(s.n, i + 1)) ? `<span class="tick" title="Done" aria-label="Done">✓</span>` : ""}</button></li>`).join("")}</ul>` : ""}
    </li>`;
  }).join("");
}

/* ---------- views ---------- */

function homeView() {
  const st = STEPS[S.last.s - 1], pt = st.parts[S.last.p - 1], pct = Math.round(S.done.size / TOTAL_PARTS * 100);
  const auth = S.session
    ? `<p>You're logged in as <b>${esc(S.session.name)}</b>. Your progress is saved to your account.</p>
       <div class="row"><button class="btn btn-ghost" type="button" data-act="account">Manage account</button><button class="link" type="button" data-act="signout">Log out</button></div>`
    : !clerk
    ? `<p class="muted">Accounts aren't available right now. You can still use the guide, and your progress saves in this browser.</p>`
    : `<p class="muted">Create a free account to save your progress on any device and use the AI Grader.</p>
       <div class="row"><button class="btn btn-ink" type="button" data-act="signup">Create account</button><button class="link" type="button" data-act="login">Log in</button></div>`;
  return `
    <h1 class="page-title">Dashboard</h1>
    <div class="cards">
      <section class="card">
        <span class="label">Start here</span>
        <h2>Welcome to Yonder!</h2>
        <p class="muted">Learn the 8 parts of a great lab report, then let the AI Grader check yours.</p>
        ${auth}
      </section>
      <section class="card">
        <span class="label">Where you left off</span>
        <button class="resume-link" type="button" data-go="step" data-s="${S.last.s}" data-p="${S.last.p}">
          <span class="muted small">Step ${S.last.s} · ${st.title}</span><b>Part ${S.last.p}: ${pt.title}</b>
        </button>
        <div class="meter" aria-hidden="true"><i style="width:${pct}%"></i></div>
        <p class="muted small">${S.done.size} of ${TOTAL_PARTS} parts done</p>
        <button class="btn btn-accent" type="button" data-go="ai">Open AI Grader</button>
      </section>
    </div>
    <section class="stack">
      <span class="label">Our team</span>
      <div class="team">${TEAM.map((m, i) => `<button class="mate" type="button" data-act="mate" data-i="${i}"><span class="pic" aria-hidden="true">${esc(m.name.split(/\s+/).map((w) => w[0]).join("").slice(0, 2))}</span><span class="who"><b>${esc(m.name)}</b><span>${esc(m.role)}</span></span></button>`).join("")}</div>
    </section>`;
}

function stepView() {
  const s = S.step, step = STEPS[s - 1];
  if (!S.part) {
    const any = step.parts.some((_, i) => S.done.has(key(s, i + 1))), fu = firstUndone(s);
    return `<section class="view">
      <span class="label">Step ${s} of ${STEPS.length}</span>
      <h1>${step.title}</h1>
      <p>${step.summary}</p>
      <ol class="part-list">${step.parts.map((pt, i) => `<li><button class="part-card" type="button" data-go="step" data-s="${s}" data-p="${i + 1}"><span><small>Part ${i + 1}</small><b>${pt.title}</b></span>${S.done.has(key(s, i + 1)) ? `<span class="tick" title="Done" aria-label="Done">✓</span>` : ""}</button></li>`).join("")}</ol>
      <div class="row"><button class="btn btn-accent" type="button" data-go="step" data-s="${s}" data-p="${fu}">${any ? `Continue with Part ${fu}` : "Start Part 1"}</button></div>
    </section>`;
  }
  const p = S.part, part = step.parts[p - 1], next = nextOf(s, p), prev = prevOf(s, p), isDone = S.done.has(key(s, p));
  return `<section class="view">
    <div class="view-head">
      <div><span class="label">Step ${s} · ${step.title} · Part ${p} of ${step.parts.length}</span><h1>${part.title}</h1></div>
      <div class="arrows">
        <button class="arrow" type="button" aria-label="Previous part" ${prev ? `data-go="step" data-s="${prev[0]}" data-p="${prev[1]}"` : "disabled"}>←</button>
        <button class="arrow" type="button" aria-label="Next part" ${next ? `data-go="step" data-s="${next[0]}" data-p="${next[1]}"` : "disabled"}>→</button>
      </div>
    </div>
    <div class="chips subparts" aria-label="Parts of this step">${step.parts.map((pt, i) => `<button class="chip${i + 1 === p ? " on" : ""}" type="button" data-go="step" data-s="${s}" data-p="${i + 1}">${s}.${i + 1} ${pt.title}${S.done.has(key(s, i + 1)) ? " ✓" : ""}</button>`).join("")}</div>
    <div class="content">${part.html}</div>
    <div class="part-foot">
      ${prev ? `<button class="btn btn-ghost" type="button" data-go="step" data-s="${prev[0]}" data-p="${prev[1]}">Previous</button>` : "<span></span>"}
      ${isDone
        ? `<div class="row"><span class="tag">Done</span>${next ? `<button class="btn btn-accent" type="button" data-go="step" data-s="${next[0]}" data-p="${next[1]}">Next part</button>` : `<button class="btn btn-accent" type="button" data-go="ai">Open AI Grader</button>`}</div>`
        : `<button class="btn btn-accent" type="button" data-act="done-part">Mark done</button>`}
    </div>
  </section>`;
}

function pageView() {
  const pg = PAGES[S.view];
  return `<section class="view"><h1>${pg.title}</h1>${pg.html()}</section>`;
}

function drawGraph() {
  const mount = $("graphMount");
  if (!mount) return;
  const L = 56, R = 420, T = 16, B = 236;
  const x = (t) => L + t / 60 * (R - L), y = (v) => B - v / 100 * (B - T);
  let g = "";
  for (let v = 0; v <= 100; v += 20) g += `<line x1="${L}" x2="${R}" y1="${y(v)}" y2="${y(v)}" class="grid"/><text x="${L - 8}" y="${y(v) + 4}" text-anchor="end">${v}</text>`;
  for (let t = 0; t <= 60; t += 10) g += `<text x="${x(t)}" y="${B + 18}" text-anchor="middle">${t}</text>`;
  const pts = SUGAR.map(r => [x(r[0]), y(r[4])]);
  g += `<line x1="${L}" x2="${R}" y1="${B}" y2="${B}" class="axis"/><line x1="${L}" x2="${L}" y1="${T}" y2="${B}" class="axis"/>`;
  g += `<polyline points="${pts.map(p => p.join(",")).join(" ")}" class="trend"/>`;
  g += pts.map((p, i) => `<circle cx="${p[0]}" cy="${p[1]}" r="5" class="dot"><title>${SUGAR[i][0]} °C: ${SUGAR[i][4].toFixed(1)} s</title></circle>`).join("");
  g += `<text x="${(L + R) / 2}" y="${B + 40}" text-anchor="middle" class="axis-label">Water Temperature (°C)</text>`;
  g += `<text transform="translate(16 ${(T + B) / 2}) rotate(-90)" text-anchor="middle" class="axis-label">Average Dissolving Time (s)</text>`;
  mount.innerHTML = `<svg viewBox="0 0 440 290" role="img" aria-label="Line graph: average dissolving time falls from 92.3 seconds at 10 °C to 19.0 seconds at 60 °C">${g}</svg>`;
}

function render() {
  main.innerHTML = S.view === "home" ? homeView() : S.view === "step" ? stepView() : S.view === "ai" ? aiView() : pageView();
  document.querySelectorAll(".tab[data-go]").forEach((t) => t.setAttribute("aria-current", String(t.dataset.go === S.view)));
  drawGraph();
  if (S.view === "ai") { updateAIControls(); renderAIResults(); }
  renderSide();
}

/* ---------- layers ---------- */
function renderLayer() {
  const L = S.layer, el = $("layer");
  if (!L) { el.innerHTML = ""; document.body.style.overflow = ""; return; }
  let inner = "";
  if (L.type === "celebrate") {
    const next = nextOf(L.s, L.p), all = S.done.size === TOTAL_PARTS;
    inner = `<div class="modal celebrate" role="dialog" aria-modal="true" aria-labelledby="lyTitle">
      <canvas id="confetti" aria-hidden="true"></canvas>
      <span class="label">Checkpoint saved</span>
      <div class="big">${S.done.size} of ${TOTAL_PARTS}</div>
      <h2 id="lyTitle">${all ? "You finished every part. Amazing work." : `Step ${L.s}, Part ${L.p} done. Nice work.`}</h2>
      ${all || !next
        ? `<button class="btn btn-accent wide" type="button" data-go="ai">Grade my report with AI</button>`
        : `<button class="btn btn-accent wide" type="button" data-go="step" data-s="${next[0]}" data-p="${next[1]}">Next: ${STEPS[next[0] - 1].parts[next[1] - 1].title}</button>`}
      <button class="link" type="button" data-go="home">Back to dashboard</button>
    </div>`;
  }
  if (L.type === "mate") {
    const m = TEAM[L.i];
    inner = `<div class="modal" role="dialog" aria-modal="true" aria-labelledby="lyTitle">
      <div class="row between"><span class="label">${esc(m.role)}</span><button class="link" type="button" data-act="close">Close</button></div>
      <h2 id="lyTitle">${esc(m.name)}</h2><p>${esc(m.bio)}</p>
    </div>`;
  }
  if (L.type === "sug") {
    const s = S.ai.result.suggestions[L.i];
    inner = `<div class="modal" role="dialog" aria-modal="true" aria-labelledby="lyTitle">
      <div class="row between"><span class="label">${esc(s.section)}</span><button class="link" type="button" data-act="close">Close</button></div>
      <h2 id="lyTitle">${esc(s.label)}</h2>
      <p class="muted">${esc(s.why)}</p>
      <span class="label">How the AI would write it</span>
      <div class="write" id="aiWrite">${esc(s.example)}</div>
      <button class="btn btn-ink" type="button" data-act="copy" style="align-self:flex-start">Copy</button>
    </div>`;
  }
  el.innerHTML = `<div class="scrim" data-act="close"></div>${inner}`;
  document.body.style.overflow = "hidden";
  el.querySelector(".modal button")?.focus({ preventScroll: true });
  if (L.type === "celebrate") confetti();
}
function confetti() {
  const c = $("confetti");
  if (!c || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const ctx = c.getContext("2d"), dpr = window.devicePixelRatio || 1;
  c.width = innerWidth * dpr; c.height = innerHeight * dpr; ctx.scale(dpr, dpr);
  const css = getComputedStyle(document.documentElement);
  const colors = ["--accent", "--ink", "--muted"].map((v) => css.getPropertyValue(v).trim());
  const bits = Array.from({ length: 90 }, () => ({ x: innerWidth / 2, y: innerHeight * 0.35, vx: (Math.random() - 0.5) * 10, vy: -Math.random() * 9 - 3, s: 5 + Math.random() * 5, r: Math.random() * 6, vr: (Math.random() - 0.5) * 0.3, col: colors[Math.floor(Math.random() * 3)] }));
  const t0 = performance.now();
  (function frame(t) {
    if (!document.body.contains(c)) return;
    const age = t - t0; ctx.clearRect(0, 0, innerWidth, innerHeight); ctx.globalAlpha = Math.max(0, 1 - age / 1700);
    bits.forEach((b) => { b.vy += 0.25; b.x += b.vx; b.y += b.vy; b.r += b.vr; ctx.save(); ctx.translate(b.x, b.y); ctx.rotate(b.r); ctx.fillStyle = b.col; ctx.fillRect(-b.s / 2, -b.s / 4, b.s, b.s / 2); ctx.restore(); });
    if (age < 1700) requestAnimationFrame(frame); else ctx.clearRect(0, 0, innerWidth, innerHeight);
  })(t0);
}

/* ---------- search: one bar for steps, parts, tips and pages ---------- */
const INDEX = [
  ...STEPS.map((s) => ({ title: `Step ${s.n}: ${s.title}`, sub: "Step overview", text: s.summary, go: ["step", s.n, null] })),
  ...STEPS.flatMap((s) => s.parts.map((p, i) => ({ title: p.title, sub: `Step ${s.n} · ${s.title} · Part ${i + 1}`, text: p.html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " "), go: ["step", s.n, i + 1] }))),
  { title: "AI Grader", sub: "Grade your lab report", text: "grade grading percent IB MYP criteria feedback suggestions rubric", go: ["ai"] },
  { title: "Dashboard", sub: "Home", text: "sign up log in where you left off team", go: ["home"] },
  ...Object.entries(PAGES).map(([k, pg]) => ({ title: pg.title, sub: "Page", text: pg.html().replace(/<[^>]+>/g, " "), go: [k] })),
  ...FAQ.map(([q, a]) => ({ title: q, sub: "FAQ", text: a, go: ["faq"] }))
];
let hits = [], hitFocus = 0;
function runSearch(q) {
  const words = q.toLowerCase().split(/\s+/).filter(Boolean), box = $("qResults");
  if (!words.length) return closeSearch();
  hits = INDEX.map((it) => {
    const hay = (it.title + " " + it.text).toLowerCase();
    if (!words.every((w) => hay.includes(w))) return null;
    return { it, score: words.reduce((n, w) => n + (it.title.toLowerCase().includes(w) ? 2 : 1), 0) };
  }).filter(Boolean).sort((a, b) => b.score - a.score).slice(0, 8).map((h) => h.it);
  hitFocus = 0;
  box.innerHTML = hits.length
    ? hits.map((h, i) => `<button type="button" class="result${i === 0 ? " focus" : ""}" data-hit="${i}"><b>${esc(h.title)}</b><span>${esc(h.sub)}</span></button>`).join("")
    : `<p class="muted small" style="padding:10px">No matches. Try a word like "hypothesis" or "graph".</p>`;
  box.hidden = false;
}
function closeSearch() { const b = $("qResults"); if (b) b.hidden = true; }
function pickHit(i) { const h = hits[i]; if (!h) return; $("q").value = ""; go(...h.go); }

/* ---------- AI Grader ---------- */
const LONG_WORDS = 800;
const MYP_BOUNDS = [[5, 1], [9, 2], [14, 3], [18, 4], [23, 5], [27, 6], [32, 7]];


const SAMPLE_REPORT = `Sugar Experiment

Aim: To investigate how water temperature affects how long it takes sugar to dissolve.

Hypothesis: If the water is hotter, then the sugar will dissolve faster.

Background: Dissolving is when a solid breaks up into a liquid. Sugar dissolves in water. Temperature is how hot or cold something is.

Materials:
- water
- sugar cubes
- beakers
- thermometer
- stopwatch

Procedure:
1. I heated the water to 10 °C and poured it into a beaker.
2. I dropped a sugar cube in and started the stopwatch.
3. I stopped the stopwatch when the sugar was gone.
4. I did this again at 25, 40 and 60 °C.

Results:
10 °C: 95, 90, 92 seconds (average 92.3)
25 °C: 62, 65, 60 seconds (average 62.3)
40 °C: 35, 38, 36 seconds (average 36.3)
60 °C: 18, 20, 19 seconds (average 19.0)

Analysis: At 10 °C it took 92.3 seconds. At 25 °C it took 62.3 seconds. At 40 °C it took 36.3 seconds. At 60 °C it took 19.0 seconds.

Conclusion: My hypothesis was correct. Hotter water made the sugar dissolve faster.`;

const EXAMPLE_RESULT = {
  meta: { mode: "builtin" },
  summary: "Your aim is clear and you collected all three trials with averages, which is a strong start. The biggest gains will come from naming your variables, adding a graph and evaluation, and explaining the trend instead of listing numbers.",
  rubric: [
    { name: "Title", earned: 3, possible: 10, comment: "\"Sugar Experiment\" is too general and doesn't say what was tested." },
    { name: "Aim & Hypothesis", earned: 7, possible: 10, comment: "Clear aim, but the hypothesis has no \"because\" and the variables aren't named." },
    { name: "Background Research", earned: 4, possible: 10, comment: "Defines dissolving but doesn't explain why temperature matters, and has no sources or images." },
    { name: "Materials", earned: 3, possible: 10, comment: "Written as a bullet list with no amounts or sizes." },
    { name: "Procedure", earned: 5, possible: 10, comment: "Steps are in order but use first person and leave out the water volume and number of trials." },
    { name: "Data & Graph", earned: 6, possible: 10, comment: "All trials and averages are recorded, but not in a titled table with units, and there's no graph." },
    { name: "Analysis", earned: 3, possible: 10, comment: "Repeats the numbers instead of describing the pattern." },
    { name: "Conclusion & Evaluation", earned: 4, possible: 10, comment: "Says the hypothesis was \"correct\" instead of \"supported\", and there's no evaluation." }
  ],
  ib: [
    { criterion: "A: Knowing and understanding", mark: 3, max: 8, comment: "Level 3–4. Strand i: states what dissolving is but doesn't outline why heat speeds it up." },
    { criterion: "B: Inquiring and designing", mark: 4, max: 8, comment: "Level 3–4. Strand iii: the variables aren't named, and it doesn't say how sufficient data will be collected." },
    { criterion: "C: Processing and evaluating", mark: 3, max: 8, comment: "Level 3–4. Strand iv: the method's validity isn't discussed, and no improvements are given (strand v)." },
    { criterion: "D: Reflecting on the impacts of science", mark: 2, max: 8, comment: "Level 1–2. Strand iv: no sources are documented, and real-life uses aren't stated (strand i)." }
  ],
  suggestions: [
    { label: "Name your variables", section: "Aim & Hypothesis", why: "The report never says what was changed, measured and kept the same.", example: "The independent variable was the water temperature (10, 25, 40 and 60 °C). The dependent variable was the time for one sugar cube to dissolve, in seconds. The controlled variables were the volume of water [200 mL], the size of the sugar cube and the type of beaker." },
    { label: "Add a \"because\"", section: "Hypothesis", why: "A hypothesis needs a scientific reason, not just a prediction.", example: "If the water temperature increases, then the sugar cube will dissolve faster, because water particles move faster in hot water and break the sugar apart more quickly." },
    { label: "Make the title specific", section: "Title", why: "The title should tell the reader what was tested.", example: "Hot or Cold? How Water Temperature Affects Sugar Dissolving Time" },
    { label: "Add amounts to materials", section: "Materials", why: "Materials should be written as sentences with amounts so someone could repeat the test.", example: "The materials used were four 250 mL beakers, [800] mL of water, 12 sugar cubes, a thermometer, a kettle, ice and a stopwatch." },
    { label: "Use third person", section: "Procedure", why: "Procedures are written in third person and past tense.", example: "200 mL of water was heated to 10 °C and poured into a beaker. One sugar cube was dropped into the water and a stopwatch was started." },
    { label: "Describe the trend", section: "Analysis", why: "Analysis should explain the pattern and back it up with data.", example: "As the water temperature increased, the sugar dissolved faster. The average time fell from 92.3 seconds at 10 °C to 19.0 seconds at 60 °C, almost five times faster." },
    { label: "Say \"supported\"", section: "Conclusion", why: "Data can support or refute a hypothesis, but never prove it correct.", example: "The results supported the hypothesis. As the water temperature increased, the sugar dissolved faster, from an average of 92.3 seconds at 10 °C to 19.0 seconds at 60 °C." },
    { label: "Add an evaluation", section: "Evaluation", why: "The report doesn't discuss errors, limitations or improvements.", example: "One limitation was that the water cooled during each trial, which may have made the dissolving times longer. To improve the experiment, a water bath could be used to keep the temperature constant." }
  ]
};

S.ai = { report: SAMPLE_REPORT, rubric: "", result: EXAMPLE_RESULT, example: true, busy: false, started: 0, error: "" };
let aiCtl = null, aiTimer = null;
const countWords = (t) => (t.trim() ? t.trim().split(/\s+/).length : 0);

function aiView() {
  const a = S.ai;
  return `<div class="row between" style="align-items:flex-end">
      <div style="display:grid;gap:6px"><h1 class="page-title" style="font-size:clamp(28px,5vw,40px)">AI Grader</h1>
      <p class="muted" style="max-width:62ch">Paste your lab report and press Grade. You'll get a percent grade, IB MYP marks for all four criteria and suggestions you can tap.</p></div>
    </div>
    <div class="ai">
      <div class="panel">
        <div class="row between"><label class="label" for="aiReport">Your lab report</label><button class="link small" type="button" data-act="ai-sample">Use the sample report</button></div>
        <textarea id="aiReport" class="report" spellcheck="true">${esc(a.report)}</textarea>
        <div class="row between"><span class="muted small" id="aiWords"></span><span class="long" id="aiLong" hidden>Longer inputs will take longer to grade and assess.</span></div>
        <details class="more" ${a.rubric ? "open" : ""}>
          <summary>Grade against your teacher's prompt instead</summary>
          <label class="f" for="aiRubric">Paste the assignment prompt or rubric. Leave it empty to use this site's 8-step checklist.
            <textarea id="aiRubric" class="report rubric" placeholder="e.g. Hypothesis (10 pts): testable, uses if/then/because">${esc(a.rubric)}</textarea>
          </label>
        </details>
        <div class="row">
          <button class="btn btn-accent" type="button" id="aiGo" data-act="ai-go">Grade my report</button>
          <button class="btn btn-ghost" type="button" id="aiStop" data-act="ai-stop" hidden>Stop</button>
          <span class="muted small" id="aiTime"></span>
        </div>
        <p class="err" id="aiErr" hidden></p>
        <p class="muted small" id="aiAvail"></p>
      </div>
      <div class="panel" id="aiResults" aria-live="polite"></div>
    </div>`;
}

function updateAIControls() {
  const a = S.ai, btn = $("aiGo");
  if (!btn) return;
  const w = countWords(a.report);
  $("aiWords").textContent = w + (w === 1 ? " word" : " words");
  $("aiLong").hidden = w < LONG_WORDS;
  btn.disabled = a.busy || !S.session;
  btn.textContent = a.busy ? "Grading…" : "Grade my report";
  $("aiStop").hidden = !a.busy;
  $("aiTime").textContent = a.busy ? Math.round((Date.now() - a.started) / 1000) + "s" : "";
  $("aiErr").textContent = a.error; $("aiErr").hidden = !a.error;
  $("aiAvail").textContent = !S.session
    ? `Log in on the dashboard to grade your report. Each student gets ${dailyLimit} grades a day. Until then, you're seeing an example result.`
    : `Graded by Claude against the MYP Years 2–3 rubric.${a.remaining != null ? ` ${a.remaining} of ${dailyLimit} grades left today.` : ""} Grades are estimates, not official IB marks.`;
}

function ibTotals(r) {
  const mark = r.ib.reduce((n, c) => n + c.mark, 0), max = r.ib.reduce((n, c) => n + c.max, 0) || 1;
  const grade = (MYP_BOUNDS.find(([hi]) => Math.round(mark / max * 32) <= hi) || [0, 7])[1];
  return { mark, max, grade };
}

function renderAIResults() {
  const box = $("aiResults"), a = S.ai;
  if (!box) return;
  if (a.busy) {
    box.innerHTML = `<div class="loading"><b>Grading your report…</b><p class="muted small">This usually takes under a minute.${countWords(a.report) >= LONG_WORDS ? " Longer inputs will take longer to grade and assess." : ""}</p></div>`;
    return;
  }
  const r = a.result;
  if (!r) { box.innerHTML = `<p class="muted">Your grades and suggestions will appear here.</p>`; return; }
  const earned = r.rubric.reduce((n, c) => n + c.earned, 0), possible = r.rubric.reduce((n, c) => n + c.possible, 0) || 1;
  const pct = Math.round(earned / possible * 100), ib = ibTotals(r);
  const crit = (name, got, max, comment) => `<div class="crit"><div class="crit-top"><b>${esc(name)}</b><span>${got}/${max}</span></div><div class="meter"><i style="width:${Math.round(got / (max || 1) * 100)}%"></i></div><p class="muted small">${esc(comment)}</p></div>`;
  box.innerHTML = `
    <div class="row between"><h2 style="font-size:20px">Results</h2>${a.example ? `<span class="badge">Example</span>` : ""}</div>
    <div class="grades">
      <div class="grade"><span class="label">${r.meta.mode === "custom" ? "Teacher's prompt" : "Percent grade"}</span><b class="big">${pct}%</b><div class="meter"><i style="width:${pct}%"></i></div><span class="muted small">${earned} of ${possible} points</span></div>
      <div class="grade"><span class="label">IB MYP</span>
        <div class="ib-grid">${r.ib.map((c) => `<div class="ib-c" title="${esc(c.criterion)}"><span>${(c.criterion.match(/\b([A-D])\b/) || [, "?"])[1]}</span><b>${c.mark}</b><small>of ${c.max}</small></div>`).join("")}</div>
        <span class="muted small">Total ${ib.mark}/${ib.max} · grade ${ib.grade} of 7</span></div>
    </div>
    <p>${esc(r.summary)}</p>
    <div style="display:grid;gap:8px">
      <span class="label">Suggestions · tap one to see how the AI would write it</span>
      <div class="chips">${r.suggestions.map((x, i) => `<button type="button" class="chip" data-act="sug" data-i="${i}">${esc(x.label)}</button>`).join("")}</div>
    </div>
    <details class="more"><summary>Percent grade breakdown</summary>${r.rubric.map((c) => crit(c.name, c.earned, c.possible, c.comment)).join("")}</details>
    <details class="more"><summary>IB MYP criteria</summary>${r.ib.map((c) => crit(c.criterion, c.mark, c.max, c.comment)).join("")}</details>`;
}



async function grade() {
  const a = S.ai;
  if (!S.session || a.busy) return;
  a.error = countWords(a.report) < 30 ? "Paste more of your report so there's enough to grade." : "";
  if (a.error) return updateAIControls();
  a.busy = true; a.started = Date.now(); aiCtl = new AbortController();
  updateAIControls(); renderAIResults();
  aiTimer = setInterval(() => { const t = $("aiTime"); if (t) t.textContent = Math.round((Date.now() - a.started) / 1000) + "s"; }, 1000);
  try {
    const token = await clerk?.session?.getToken();
    const res = await fetch("/api/grade", {
      method: "POST",
      signal: aiCtl.signal,
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token || ""}` },
      body: JSON.stringify({ report: a.report, rubric: a.rubric })
    });
    const body = await res.json().catch(() => ({}));
    if (body.remaining != null) a.remaining = body.remaining;
    if (!res.ok || !body.result) throw new Error(body.error || "The grade came back incomplete. Press Grade again.");
    a.result = body.result; a.example = false;
  } catch (e) {
    if (e?.name !== "AbortError") a.error = e instanceof TypeError ? "Couldn't reach Yonder's server. Check your connection and try again." : e.message;
  } finally {
    a.busy = false; clearInterval(aiTimer);
    updateAIControls(); renderAIResults();
  }
}

/* ---------- accounts and saved progress (Supabase) ---------- */
let saveTimer = null;
function saveProgress() {
  store.set("done", [...S.done]); store.set("check", [...S.check]); store.set("last", S.last);
  if (!sb || !S.session) return;
  clearTimeout(saveTimer);
  saveTimer = setTimeout(() => {
    sb.from("progress").upsert({
      user_id: S.session.id, done: [...S.done], checklist: [...S.check],
      last_step: S.last.s, last_part: S.last.p, updated_at: new Date().toISOString()
    }).then(() => {}, () => {});
  }, 600);
}
async function loadProgress() {
  const { data } = await sb.from("progress").select("done, checklist, last_step, last_part").maybeSingle();
  if (data) {
    /* The account's saved progress wins over whatever this browser had. */
    S.done = new Set(data.done || []); S.check = new Set(data.checklist || []);
    if (STEPS[data.last_step - 1]?.parts[data.last_part - 1]) S.last = { s: data.last_step, p: data.last_part };
    store.set("done", [...S.done]); store.set("check", [...S.check]); store.set("last", S.last);
  } else saveProgress();
}
function onUser(user) {
  const next = user ? { id: user.id, name: user.firstName || user.fullName || user.primaryEmailAddress?.emailAddress?.split("@")[0] || "you" } : null;
  const changed = next?.id !== S.session?.id;
  S.session = next;
  if (!next) S.ai.remaining = null;
  if (next && changed) loadProgress().catch(() => {}).finally(render);
  else render();
}
function loadScript(src, attrs = {}) {
  return new Promise((resolve, reject) => {
    const el = document.createElement("script");
    el.src = src; el.async = true; el.crossOrigin = "anonymous";
    Object.entries(attrs).forEach(([k, v]) => el.setAttribute(k, v));
    el.onload = resolve; el.onerror = reject;
    document.head.append(el);
  });
}
async function initAccounts() {
  try {
    const cfg = await (await fetch("/api/config")).json();
    dailyLimit = cfg.dailyLimit || dailyLimit;
    if (!cfg.supabaseUrl || !cfg.supabaseAnonKey || !cfg.clerkPublishableKey || !window.supabase) throw new Error("not configured");
    await loadScript(CLERK_JS, { "data-clerk-publishable-key": cfg.clerkPublishableKey });
    clerk = window.Clerk;
    await clerk.load({ appearance: CLERK_LOOK });
    /* Supabase trusts Clerk's login token, so each student's database rules still apply. */
    sb = window.supabase.createClient(cfg.supabaseUrl, cfg.supabaseAnonKey, {
      accessToken: async () => (await clerk.session?.getToken()) ?? null
    });
  } catch { clerk = null; sb = null; return render(); }
  onUser(clerk.user);
  clerk.addListener(({ user }) => { if ((user?.id ?? null) !== (S.session?.id ?? null)) onUser(user); });
}

/* ---------- events ---------- */
document.addEventListener("click", (e) => {
  const t = e.target;
  const hit = t.closest("[data-hit]"); if (hit) return pickHit(+hit.dataset.hit);
  if (!t.closest(".search")) closeSearch();
  const g = t.closest("[data-go]");
  if (g) return go(g.dataset.go, g.dataset.s ? +g.dataset.s : null, g.dataset.p ? +g.dataset.p : null);
  const a = t.closest("[data-act]"); if (!a) return;
  switch (a.dataset.act) {
    case "side": return setSide(!document.body.classList.contains("side-open"));
    case "side-close": return setSide(false);
    case "toggle": { const n = +a.dataset.s; S.open.has(n) ? S.open.delete(n) : S.open.add(n); return renderSide(); }
    case "signup": return clerk?.openSignUp();
    case "login": return clerk?.openSignIn();
    case "account": return clerk?.openUserProfile();
    case "signout": clerk?.signOut(); return;
    case "mate": S.layer = { type: "mate", i: +a.dataset.i }; return renderLayer();
    case "sug": S.layer = { type: "sug", i: +a.dataset.i }; return renderLayer();
    case "close": S.layer = null; return renderLayer();
    case "done-part":
      S.done.add(key(S.step, S.part)); saveProgress();
      S.layer = { type: "celebrate", s: S.step, p: S.part };
      render(); return renderLayer();
    case "copy": {
      const text = S.ai.result.suggestions[S.layer.i]?.example || "";
      navigator.clipboard.writeText(text).then(() => { a.textContent = "Copied"; }, () => {
        const r = document.createRange(); r.selectNodeContents($("aiWrite")); const sel = getSelection(); sel.removeAllRanges(); sel.addRange(r); a.textContent = "Selected";
      }).finally(() => setTimeout(() => { a.textContent = "Copy"; }, 1600));
      return;
    }
    case "fb-topic": S.fb.topic = a.dataset.v; document.querySelectorAll('[data-act="fb-topic"]').forEach((b) => b.setAttribute("aria-pressed", String(b === a))); return;
    case "fb-again": S.fb = { topic: "Question", msg: "", sent: false, busy: false }; return render();
    case "ai-sample": S.ai.report = SAMPLE_REPORT; $("aiReport").value = SAMPLE_REPORT; return updateAIControls();
    case "ai-go": return grade();
    case "ai-stop": return aiCtl?.abort();
  }
});
document.addEventListener("submit", async (e) => {
  if (e.target.id === "fbForm") {
    e.preventDefault();
    const msg = S.fb.msg.trim(), err = $("fbErr");
    if (!msg) { err.textContent = "Write a message first."; err.hidden = false; return; }
    S.fb.busy = true; render();
    try {
      const { error } = await sb.from("feedback").insert({ topic: S.fb.topic, message: msg.slice(0, 2000) });
      if (error) throw error;
      S.fb = { topic: "Question", msg: "", sent: true, busy: false };
    } catch (x) {
      S.fb.busy = false; render();
      const er = $("fbErr");
      if (er) { er.textContent = "Couldn't send your feedback. Try again in a moment."; er.hidden = false; }
      return;
    }
    return render();
  }
});
document.addEventListener("input", (e) => {
  const t = e.target;
  if (t.id === "q") return runSearch(t.value);
  if (t.id === "aiReport") { S.ai.report = t.value; return updateAIControls(); }
  if (t.id === "aiRubric") { S.ai.rubric = t.value; return; }
  if (t.id === "fbMsg") { S.fb.msg = t.value; return; }
  if (t.dataset.check != null) {
    const i = +t.dataset.check; t.checked ? S.check.add(i) : S.check.delete(i); saveProgress(); return;
  }
  if (t.closest(".builder")) {
    const val = (id) => { const el = $(id); return el.value.trim() || el.placeholder; };
    $("hOut").textContent = `If we ${val("hIf")}, then ${val("hThen")}, because ${val("hBecause")}.`;
  }
});
document.addEventListener("keydown", (e) => {
  if (e.target.id === "q") {
    const items = [...document.querySelectorAll(".result")];
    if (e.key === "ArrowDown" || e.key === "ArrowUp") {
      e.preventDefault(); if (!items.length) return;
      hitFocus = (hitFocus + (e.key === "ArrowDown" ? 1 : -1) + items.length) % items.length;
      items.forEach((b, i) => b.classList.toggle("focus", i === hitFocus));
    }
    if (e.key === "Enter") { e.preventDefault(); pickHit(hitFocus); }
    if (e.key === "Escape") { closeSearch(); e.target.blur(); }
    return;
  }
  if (e.key === "Escape") {
    if (S.layer) { S.layer = null; renderLayer(); }
    else if (narrow.matches) setSide(false);
  }
});
window.addEventListener("resize", measureTop);

/* ---------- boot ---------- */
measureTop();
setSide(!narrow.matches);
render();
initAccounts();
