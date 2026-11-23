/* Thin Ice — interactions. Edit the data just below to change figures, animals or actions. */

/* ---------- Data ---------- */
// September average Arctic sea ice extent, million km², every year 1979–2026
// (NSIDC Sea Ice Index v4.0, file N_09_extent_v4.0.csv). Used for the trend chart.
const SEPT = [[1979,7.05],[1980,7.67],[1981,7.14],[1982,7.30],[1983,7.39],[1984,6.81],[1985,6.70],[1986,7.41],[1987,7.28],[1988,7.37],[1989,7.01],[1990,6.14],[1991,6.47],[1992,7.47],[1993,6.40],[1994,7.14],[1995,6.08],[1996,7.58],[1997,6.69],[1998,6.54],[1999,6.12],[2000,6.25],[2001,6.73],[2002,5.83],[2003,6.12],[2004,5.98],[2005,5.50],[2006,5.86],[2007,4.27],[2008,4.69],[2009,5.26],[2010,4.87],[2011,4.56],[2012,3.57],[2013,5.21],[2014,5.22],[2015,4.62],[2016,4.53],[2017,4.82],[2018,4.79],[2019,4.36],[2020,4.00],[2021,4.95],[2022,4.90],[2023,4.38],[2024,4.35],[2025,4.75],[2026,4.81]];
const ext = y => SEPT.find(d => d[0] === y)[1];
// The years you can pick on the map slider, with a note for each
const YEARS = [
  [1979, ext(1979), '1979: the first full year of satellite records.'],
  [1985, ext(1985), 'Through the 1980s the ice still covered about 7 million km² every September.'],
  [1990, ext(1990), 'Some years bounce back a little. The trend does not.'],
  [1995, ext(1995), 'The 1990s: the loss starts to show.'],
  [2000, ext(2000), 'Some years bounce back a little. The trend does not.'],
  [2005, ext(2005), '2005: a new record low, for two years.'],
  [2007, ext(2007), '2007: a shock. The ice fell far below the previous record in a single summer.'],
  [2010, ext(2010), 'Some years bounce back a little. The trend does not.'],
  [2012, ext(2012), '2012: the record low, still unbroken. On its smallest day the ice covered only 3.4 million km².'],
  [2016, ext(2016), 'Some years bounce back a little. The trend does not.'],
  [2020, ext(2020), '2020: the second-lowest September on record.'],
  [2023, ext(2023), '2023: still far below anything seen in the 1980s.'],
  [2024, ext(2024), '2024: one of the five lowest Septembers on record.'],
  [2025, ext(2025), '2025: on its smallest day the ice was tied for the tenth-lowest minimum on record.'],
  [2026, ext(2026),'2026: the last 20 Septembers, 2007 to 2026, are the 20 lowest since satellites began.'],
];
const SPAIN = 0.506; // million km²

const ANIMALS = [
  ['Polar bear', 'Hunts seals from the edge of the ice and at their breathing holes. It needs the ice to eat.',
   'Shorter ice seasons', 'Less ice means more weeks stranded on land without food. In Western Hudson Bay, the ice-free season is now about three weeks longer than in the 1980s, and there are fewer bears.', 'bear'],
  ['Ringed seal', 'Digs snow caves on the ice to give birth, hidden from the cold and from bears.',
   'Collapsing lairs', 'When the snow and ice melt early, the caves collapse and the pups are left exposed.', 'seal'],
  ['Walrus', 'Rests on floating ice between dives for clams on the sea floor.',
   'Crowded beaches', 'With no ice above their feeding grounds, thousands now crowd onto beaches in Alaska and Russia. A panic there can crush the young.', 'walrus'],
  ['Arctic cod', 'A small fish that hides in cracks under the ice. Seals, whales and seabirds all eat it.',
   'A broken chain', 'Fewer cod means less food for almost every animal above it in the food chain.', 'fish'],
  ['Ice algae', 'Tiny plants that grow on the underside of the ice and start the spring food chain.',
   'Wrong timing', 'Earlier melt shifts when the algae bloom, and the animals that feed on them can miss it.', 'algae'],
];

const ACTIONS = [
  ['Take the train instead of one short flight', 'Flying is one of the fastest ways to add CO₂.'],
  ['Eat less red meat', 'Beef has one of the highest climate footprints of any food.'],
  ['Choose a renewable electricity plan', 'At home, or ask your student residence.'],
  ['Walk, cycle or take public transport', 'For trips under 5 km, it is often faster anyway.'],
  ['Buy second hand and keep things longer', 'Making new clothes and phones uses a lot of energy.'],
  ['Talk about it and vote', 'The biggest cuts come from laws, companies and cities.'],
];

/* ---------- Helpers ---------- */
const $ = s => document.querySelector(s), $$ = s => [...document.querySelectorAll(s)];
const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
const hex = h => [1, 3, 5].map(i => parseInt(h.slice(i, i + 2), 16));
const mix = (a, b, t) => a.map((v, i) => Math.round(v + (b[i] - v) * t));
const lum = ([r, g, b]) => (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255;

/* ---------- Melting background ---------- */
const KEYS = [[0, '#f3f8fa'], [.28, '#d3e6ee'], [.5, '#1b4a61'], [.78, '#102f43'], [1, '#08192a']].map(([p, c]) => [p, hex(c)]);
function colorAt(p){
  for (let i = 1; i < KEYS.length; i++){
    if (p <= KEYS[i][0]){ const [p0, c0] = KEYS[i - 1], [p1, c1] = KEYS[i]; return mix(c0, c1, (p - p0) / (p1 - p0)); }
  }
  return KEYS[KEYS.length - 1][1];
}
function onScroll(){
  const max = document.documentElement.scrollHeight - innerHeight;
  const p = clamp(scrollY / (max || 1), 0, 1);
  const c = colorAt(p), css = `rgb(${c})`;
  document.body.style.backgroundColor = css;
  document.body.classList.toggle('dark', lum(c) < .45);
  $('meta[name=theme-color]').setAttribute('content', css);
  $('#gaugeVal').textContent = Math.round(100 * (1 - p));
}
let ticking = false;
addEventListener('scroll', () => { if (!ticking){ ticking = true; requestAnimationFrame(() => { ticking = false; onScroll(); }); } }, {passive:true});
addEventListener('resize', onScroll);
onScroll();

/* ---------- Reveal on scroll ---------- */
const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target); } }), {threshold:.15});
$$('.rv').forEach(el => io.observe(el));

/* ---------- 001 Cracking ice ---------- */
(() => {
  const hero = $('.hero'), cv = $('#cracks'), ctx = cv.getContext('2d'), out = $('#crackCount');
  const MSG = ['Crack.', 'It is thinner than it looks.', 'Most Arctic ice is now less than four years old.', 'The floe just split in two. Without big floes, polar bears cannot reach the seals they hunt.', 'Careful. You would be swimming by now.'];
  let n = 0;
  // Falling snow
  if (!reduce){
    $('#snow').innerHTML = Array.from({length: 36}, () =>
      `<i style="left:${Math.random() * 100}%;--s:${2 + Math.random() * 4}px;--d:${7 + Math.random() * 8}s;--l:${-Math.random() * 15}s;--x:${-30 + Math.random() * 60}px"></i>`).join('');
  }
  function size(){
    const r = hero.getBoundingClientRect(), d = devicePixelRatio || 1;
    cv.width = r.width * d; cv.height = r.height * d; ctx.setTransform(d, 0, 0, d, 0, 0);
  }
  size(); addEventListener('resize', size);

  function branch(x, y, angle, len, width, segs){
    const pts = [[x, y]];
    for (let i = 0; i < segs; i++){
      angle += (Math.random() - .5) * .7;
      x += Math.cos(angle) * len / segs; y += Math.sin(angle) * len / segs;
      pts.push([x, y]);
    }
    return {pts, width};
  }
  function crack(x, y){
    const lines = [], arms = 6 + Math.floor(Math.random() * 4);
    for (let i = 0; i < arms; i++){
      const a = i / arms * Math.PI * 2 + Math.random() * .5, len = 90 + Math.random() * 200;
      const main = branch(x, y, a, len, 2, 8);
      lines.push(main);
      // A few smaller branches off each arm
      main.pts.forEach((p, k) => { if (k > 2 && Math.random() < .3) lines.push(branch(p[0], p[1], a + (Math.random() - .5) * 2, len * .35, 1, 4)); });
    }
    return lines;
  }
  function draw(lines, t){
    lines.forEach(({pts, width}) => {
      const upto = Math.max(1, Math.floor((pts.length - 1) * t));
      ctx.lineJoin = 'round'; ctx.lineCap = 'round';
      // a pale highlight under a blue line gives a little depth
      [['rgba(255,255,255,.9)', width + 2, 1], ['rgba(31,126,163,.75)', width, 0]].forEach(([col, w, off]) => {
        ctx.strokeStyle = col; ctx.lineWidth = w; ctx.beginPath();
        ctx.moveTo(pts[0][0] + off, pts[0][1] + off);
        for (let i = 1; i <= upto; i++) ctx.lineTo(pts[i][0] + off, pts[i][1] + off);
        ctx.stroke();
      });
    });
  }
  hero.addEventListener('click', e => {
    if (e.target.closest('a,button')) return;
    const r = hero.getBoundingClientRect(), lines = crack(e.clientX - r.left, e.clientY - r.top);
    if (reduce){ draw(lines, 1); }
    else {
      const t0 = performance.now();
      const step = now => { const t = clamp((now - t0) / 500, 0, 1); draw(lines, t); if (t < 1) requestAnimationFrame(step); };
      requestAnimationFrame(step);
    }
    out.textContent = MSG[Math.min(n, MSG.length - 1)];
    if (n === 3) $('#floeScene').classList.add('split');
    n++;
  });
})();

/* ---------- 002 Arctic map ---------- */
(() => {
  const range = $('#year');
  range.max = YEARS.length - 1;
  const K = 118 / Math.sqrt(7.05); // ice "radius" for 1979; area grows with extent
  function shape(ext){
    const base = K * Math.sqrt(ext), shift = (1 - ext / 7.05) * 34; // shrinking ice hangs on near Canada and Greenland
    let d = '';
    for (let i = 0; i <= 72; i++){
      const a = i / 72 * Math.PI * 2;
      const r = base * (1 + .1 * Math.sin(3 * a + 1) + .06 * Math.sin(5 * a + 2) + .04 * Math.sin(9 * a + .5));
      const x = 200 + r * Math.cos(a), y = 200 + shift + r * Math.sin(a);
      d += (i ? 'L' : 'M') + x.toFixed(1) + ' ' + y.toFixed(1);
    }
    return d + 'Z';
  }
  $('#ice1979').setAttribute('d', shape(YEARS[0][1]));
  // Trend chart: every year in the data, plus a straight least-squares trend line
  const tx = y => 44 + (y - 1979) / (2026 - 1979) * 456, ty = e => 170 - (e - 3) / 5 * 150;
  const n = SEPT.length, mx = SEPT.reduce((s, d) => s + d[0], 0) / n, my = SEPT.reduce((s, d) => s + d[1], 0) / n;
  const slope = SEPT.reduce((s, d) => s + (d[0] - mx) * (d[1] - my), 0) / SEPT.reduce((s, d) => s + (d[0] - mx) ** 2, 0);
  const fit = y => my + slope * (y - mx);
  let g = '';
  [4, 5, 6, 7].forEach(v => { g += `<line class="grid" x1="44" x2="500" y1="${ty(v)}" y2="${ty(v)}"/><text class="axis" x="36" y="${ty(v) + 4}" text-anchor="end">${v}</text>`; });
  g += `<text class="axis" x="44" y="192">1979</text><text class="axis" x="500" y="192" text-anchor="end">2026</text>`;
  g += `<text class="axis" x="44" y="12">million km²</text>`;
  g += `<line class="trend-fit" x1="${tx(1979)}" y1="${ty(fit(1979))}" x2="${tx(2026)}" y2="${ty(fit(2026))}"/>`;
  g += `<polyline class="trend-years" points="${SEPT.map(d => tx(d[0]) + ',' + ty(d[1])).join(' ')}"/>`;
  g += SEPT.map(d => `<circle class="trend-dot" cx="${tx(d[0])}" cy="${ty(d[1])}" r="2"/>`).join('');
  g += `<line id="trendCursor" class="trend-cursor" y1="20" y2="170"/><circle id="trendNow" class="trend-now" r="6"/>`;
  $('#trendSvg').innerHTML = g;

  const BEAR = [124, 138]; // where the bear stands: on the ice until 2005, in the water from 2007
  $('#mapBear').setAttribute('transform', `translate(${BEAR[0]} ${BEAR[1] - 4})`);
  const probe = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  probe.setAttribute('fill', 'none'); probe.setAttribute('visibility', 'hidden');
  $('#arcticSvg').appendChild(probe);
  function show(i){
    const [y, ext, note] = YEARS[i], lost = YEARS[0][1] - ext;
    $('#trendCursor').setAttribute('x1', tx(y)); $('#trendCursor').setAttribute('x2', tx(y));
    $('#trendNow').setAttribute('cx', tx(y)); $('#trendNow').setAttribute('cy', ty(ext));
    $('#iceNow').setAttribute('d', shape(ext));
    $('#yearOut').textContent = y;
    $('#extOut').textContent = (ext + 1e-9).toFixed(1);
    $('#lostOut').textContent = Math.round(lost / YEARS[0][1] * 100);
    $('#spainOut').textContent = (lost / SPAIN).toFixed(1).replace('.0', '');
    $('#yearNote').textContent = note;
    range.setAttribute('aria-valuetext', `${y}: ${ext.toFixed(1)} million square kilometres`);
    // Is the bear still standing on the ice?
    // (tested on an invisible copy of the shape, because the visible one is still animating)
    probe.setAttribute('d', shape(ext));
    const p = $('#arcticSvg').createSVGPoint();
    p.x = BEAR[0]; p.y = BEAR[1];
    const onIce = probe.isPointInFill ? probe.isPointInFill(p) : ext > 5;
    $('#mapBear').classList.toggle('wet', !onIce);
    $('#bearNote').classList.toggle('wet', !onIce);
    $('#bearNote').textContent = onIce ? 'The bear is on the ice. It can hunt seals.' : 'The ice has gone from under the bear. It has to swim, and cannot hunt.';
  }
  range.addEventListener('input', () => show(+range.value));
  show(0);
  // When the map first appears, play the years once
  let played = false;
  new IntersectionObserver(es => es.forEach(e => {
    if (!e.isIntersecting || played || reduce) return;
    played = true; let i = 0;
    const t = setInterval(() => { i++; range.value = i; show(i); if (i >= YEARS.length - 1) clearInterval(t); }, 260);
    range.addEventListener('pointerdown', () => clearInterval(t), {once:true});
  }), {threshold:.5}).observe($('#arcticSvg'));
})();

/* ---------- 003 Mirror (albedo) ---------- */
(() => {
  const range = $('#cover'), rays = $('#rays');
  const ICE = .85, OCEAN = .07;
  function show(){
    const c = +range.value / 100, edge = 400 * c;
    $('#iceStrip').setAttribute('width', edge);
    let html = '';
    [110, 170, 230, 290, 350].forEach(x => {
      html += `<line class="ray" x1="78" y1="74" x2="${x}" y2="222"/>`;
      if (x <= edge) html += `<line class="ray back" x1="${x}" y1="222" x2="${x + 50}" y2="40"/>`;
      else html += `<line class="ray in" x1="${x}" y1="230" x2="${x + 14}" y2="280"/><circle cx="${x + 14}" cy="282" r="5" fill="#ff8a5c" opacity=".7"/>`;
    });
    rays.innerHTML = html;
    const refl = Math.round((c * ICE + (1 - c) * OCEAN) * 100);
    $('#reflOut').textContent = refl + '%';
    $('#absOut').textContent = (100 - refl) + '%';
    $('#coverOut').textContent = Math.round(c * 100) + '%';
    // The ocean glows warmer as it absorbs more; the bear needs ice under its feet
    $('#waterHeat').style.opacity = ((100 - refl) / 100 * .55).toFixed(2);
    $('#mirrorBear').style.opacity = edge >= 86 ? 1 : 0;
    range.setAttribute('aria-valuetext', `${Math.round(c * 100)}% ice, ${refl}% of sunlight reflected`);
  }
  range.addEventListener('input', show);
  show();
})();

/* ---------- 004 Glass ---------- */
(() => {
  const cube = $('#seaCube'), land = $('#landCube'), water = $('#waterRect'), line = $('#levelLine'), txt = $('#levelText'), note = $('#glassNote');
  const melt = $('#meltBtn'), drop = $('#dropBtn');
  const setLevel = y => { water.setAttribute('y', y); line.setAttribute('y1', y); line.setAttribute('y2', y); txt.setAttribute('y', y - 6); };
  melt.addEventListener('click', () => {
    cube.classList.add('melted'); melt.disabled = true;
    note.textContent = 'The floating ice melted. The water level did not move: that is sea ice.';
  });
  drop.addEventListener('click', () => {
    land.classList.add('dropped'); drop.disabled = true;
    note.textContent = 'Ice from land falls in…';
    setTimeout(() => {
      setLevel(128);
      land.style.opacity = '0'; land.style.transition = 'transform 1.2s, opacity 2s';
      note.textContent = 'The water rose. That is what melting glaciers and ice sheets do to the sea.';
    }, reduce ? 0 : 1200);
  });
  $('#resetGlass').addEventListener('click', () => {
    cube.classList.remove('melted'); land.classList.remove('dropped'); land.style.opacity = ''; land.style.transition = '';
    setLevel(150); melt.disabled = drop.disabled = false;
    note.textContent = 'The dashed line is the sea level.';
  });
})();

/* ---------- 004 The loop ---------- */
(() => {
  const LABELS = [['Air warms', 200, 60], ['Ice melts', 340, 200], ['Dark water', 200, 340], ['Heat absorbed', 60, 200]];
  $('#loopNodes').innerHTML = LABELS.map(([t, x, y], i) =>
    `<g class="loop-node" transform="translate(${x} ${y})"><rect x="-62" y="-24" width="124" height="48" rx="24"/><text class="num" y="-6" text-anchor="middle">STEP ${i + 1}</text><text y="12" text-anchor="middle">${t}</text></g>`).join('');
  const nodes = $$('.loop-node'), arrows = $$('.loop-arrow'), steps = $$('#loopSteps li');
  let k = 0, turn = 1, timer;
  function go(i){
    nodes.forEach((n, j) => n.classList.toggle('on', j === i));
    steps.forEach((s, j) => s.classList.toggle('on', j === i));
    arrows.forEach((a, j) => a.classList.toggle('on', j === i));
    // the dot sits on the lit arrow, halfway to the next step
    const a = (i * 90 + 45) * Math.PI / 180;
    $('#loopDot').style.transform = `translate(${200 + 140 * Math.sin(a)}px, ${200 - 140 * Math.cos(a)}px)`;
    $('#loopTurn').textContent = 'Turn ' + turn;
  }
  function next(){ k = (k + 1) % 4; if (k === 0) turn++; go(k); }
  go(0);
  // Play only while the loop is on screen
  new IntersectionObserver(es => es.forEach(e => {
    clearInterval(timer);
    if (e.isIntersecting && !reduce) timer = setInterval(next, 2200);
  }), {threshold:.3}).observe($('#loopSvg'));
  steps.forEach((s, i) => { s.addEventListener('click', () => { k = i; go(i); }); });
})();

/* ---------- 006 Animal cards ---------- */
$('#cards').innerHTML = ANIMALS.map(([name, front, title, back, pic], i) => `
  <li class="card rv" style="transition-delay:${i * 80}ms">
    <button aria-pressed="false" aria-label="${name}. ${front} Click to see what changes without the ice.">
      <span class="face front"><span class="num">Nº ${String(i + 1).padStart(2, '0')}</span><svg class="pic" aria-hidden="true"><use href="#${pic}"/></svg><h3>${name}</h3><p>${front}</p><span class="turn">Without the ice →</span></span>
      <span class="face back" aria-hidden="true"><span class="num">Without the ice</span><h3>${title}</h3><p>${back}</p></span>
    </button>
  </li>`).join('');
$$('.card').forEach(card => {
  io.observe(card);
  const b = card.querySelector('button');
  b.addEventListener('click', () => {
    const on = card.classList.toggle('flipped');
    b.setAttribute('aria-pressed', on);
    card.querySelector('.back').setAttribute('aria-hidden', !on);
  });
});

/* ---------- 008 Actions ---------- */
(() => {
  const MSG = ['Start with one.', 'A start.', 'Good.', 'Halfway there.', 'Really good.', 'Nearly all of them.', 'All six. The ice thanks you.'];
  $('#actions').innerHTML = ACTIONS.map(([t, d], i) => `<li class="rv" style="transition-delay:${i * 60}ms"><label><input type="checkbox"><span><b>${t}</b><span>${d}</span></span></label></li>`).join('');
  $('#actMax').textContent = ACTIONS.length;
  $$('#actions li').forEach(li => io.observe(li));
  $('#actions').addEventListener('change', () => {
    const n = $$('#actions input:checked').length;
    $('#actCount').textContent = n;
    $('#actMsg').textContent = MSG[n];
  });
})();

/* ---------- Mobile menu ---------- */
(() => {
  const btn = $('#menuToggle'), nav = $('#mainNav');
  const set = open => { nav.classList.toggle('open', open); btn.setAttribute('aria-expanded', open); btn.setAttribute('aria-label', open ? 'Close menu' : 'Open menu'); };
  btn.addEventListener('click', () => set(!nav.classList.contains('open')));
  nav.addEventListener('click', e => { if (e.target.closest('a')) set(false); });
  addEventListener('keydown', e => { if (e.key === 'Escape' && nav.classList.contains('open')){ set(false); btn.focus(); } });
})();
