/* Motor de la plataforma. Cada asignatura se registra en window.SUBJECTS con:
   {id, name, icon, intro, sections:[{id,title,html}], tips:[html], summary:[html], quiz:[{q,o:[],a:index,why}]} */
(function () {
  const S = window.SUBJECTS;
  const $ = (s, r = document) => r.querySelector(s);
  const app = $('#app'), tabs = $('#tabs');
  const store = {
    get(k, d) { try { const v = localStorage.getItem(k); return v === null ? d : JSON.parse(v); } catch (e) { return d; } },
    set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} }
  };
  const esc = s => String(s).replace(/[&<>]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' }[c]));
  let mermaidOk = false;
  if (window.mermaid) {
    mermaid.initialize({ startOnLoad: false, theme: document.documentElement.dataset.theme === 'light' ? 'default' : 'dark', securityLevel: 'loose' });
    mermaidOk = true;
  }

  // Tema
  document.documentElement.dataset.theme = store.get('theme', 'dark');
  $('#theme').onclick = () => {
    const t = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
    document.documentElement.dataset.theme = t; store.set('theme', t); route();
  };

  // Pestañas
  tabs.innerHTML = '<button data-id="">🏠 Inicio</button>' + S.map(s => `<button data-id="${s.id}">${s.icon} ${esc(s.name)}</button>`).join('');
  tabs.onclick = e => { const b = e.target.closest('button'); if (b) location.hash = b.dataset.id ? '#/' + b.dataset.id : '#/'; };

  function progress(id) { return store.get('quiz:' + id, null); }

  function home() {
    app.innerHTML = `<div class="block"><h2>Bienvenido, David 👋</h2><p>Elige una asignatura. Cada una tiene introducción, temario paso a paso, trucos de estudio, resumen y un test interactivo.</p></div>
      <div class="grid">${S.map(s => { const p = progress(s.id); return `<a class="card" href="#/${s.id}"><h3 style="margin-top:0">${s.icon} ${esc(s.name)}</h3><small>${esc(s.short || '')}</small><p><small>${p ? '✅ Último test: ' + p.score + '/' + p.total : '📝 Test sin hacer'}</small></p></a>`; }).join('')}</div>`;
  }

  function subject(s) {
    const toc = [['intro', 'A · Introducción'], ...s.sections.map(x => [x.id, x.title]), ['tips', 'C · Tips DAM'], ['resumen', 'D · Resumen'], ['test', 'E · Test']];
    app.innerHTML = `<h1 style="font-size:2rem">${s.icon} ${esc(s.name)}</h1>
      <div class="toc">${toc.map(t => `<a href="#/${s.id}" data-go="${t[0]}">${esc(t[1])}</a>`).join('')}</div>
      <section class="block" id="intro"><h2><span class="tag">A</span>Introducción</h2>${s.intro}</section>
      <section class="block" id="temario"><h2><span class="tag">B</span>Desarrollo del temario</h2>
        ${s.sections.map(x => `<div class="topic" id="${x.id}"><h3>${esc(x.title)}</h3>${x.html}</div>`).join('')}</section>
      <section class="block tips" id="tips"><h2><span class="tag">C</span>Trucos de estudio · Tips DAM</h2><ul>${s.tips.map(t => `<li>${t}</li>`).join('')}</ul></section>
      <section class="block summary" id="resumen"><h2><span class="tag">D</span>Resumen ejecutivo</h2><ul>${s.summary.map(t => `<li>${t}</li>`).join('')}</ul></section>
      <section class="block" id="test"><h2><span class="tag">E</span>Test de autoevaluación</h2><div id="quiz"></div></section>`;
    app.querySelectorAll('[data-go]').forEach(a => a.onclick = e => { e.preventDefault(); const el = document.getElementById(a.dataset.go); if (el) el.scrollIntoView({ behavior: 'smooth' }); });
    quiz(s);
    if (window.Prism) Prism.highlightAllUnder(app);
    if (mermaidOk) { const nodes = app.querySelectorAll('.mermaid'); if (nodes.length) mermaid.run({ nodes }).catch(() => {}); }
  }

  function quiz(s) {
    const box = $('#quiz'); let ok = 0, done = 0;
    const total = s.quiz.length;
    box.innerHTML = s.quiz.map((q, i) => `<div class="quiz-q" data-i="${i}"><p>${i + 1}. ${q.q}</p>${q.o.map((o, j) => `<button class="opt" data-j="${j}">${o}</button>`).join('')}<div class="why" hidden></div></div>`).join('') +
      `<div class="score"><span id="sc">Respondidas 0/${total} · Aciertos 0</span><button id="rs">Reiniciar</button></div>`;
    box.onclick = e => {
      const b = e.target.closest('.opt'); if (!b || b.disabled) return;
      const qEl = b.closest('.quiz-q'), q = s.quiz[+qEl.dataset.i], j = +b.dataset.j;
      qEl.querySelectorAll('.opt').forEach((x, k) => { x.disabled = true; if (k === q.a) x.classList.add('ok'); });
      if (j !== q.a) b.classList.add('bad'); else ok++;
      done++;
      const w = qEl.querySelector('.why'); w.hidden = false; w.innerHTML = (j === q.a ? '✅ <b>Correcto.</b> ' : '❌ <b>Incorrecto.</b> ') + q.why;
      $('#sc').textContent = `Respondidas ${done}/${total} · Aciertos ${ok}`;
      if (done === total) { store.set('quiz:' + s.id, { score: ok, total }); $('#sc').textContent += ` · 🏁 Nota final: ${ok}/${total}`; }
    };
    $('#rs').onclick = () => quiz(s);
  }

  function search(q) {
    q = q.trim().toLowerCase();
    if (q.length < 2) return route();
    const strip = h => h.replace(/<[^>]+>/g, ' ');
    const hits = [];
    S.forEach(s => {
      const parts = [['Introducción', s.intro], ...s.sections.map(x => [x.title, x.html]), ...s.tips.map(t => ['Tips', t]), ...s.summary.map(t => ['Resumen', t])];
      parts.forEach(([t, h]) => {
        const txt = strip(h), i = txt.toLowerCase().indexOf(q);
        if (i >= 0) hits.push({ s, t, snip: txt.slice(Math.max(0, i - 50), i + 90) });
      });
    });
    app.innerHTML = `<div class="block"><h2>🔎 ${hits.length} resultados para «${esc(q)}»</h2>${hits.slice(0, 60).map(h => `<div class="hit" onclick="location.hash='#/${h.s.id}'"><b>${h.s.icon} ${esc(h.s.name)}</b> · ${esc(h.t)}<br><small>…${esc(h.snip)}…</small></div>`).join('')}</div>`;
  }

  function route() {
    const id = location.hash.replace('#/', '');
    const s = S.find(x => x.id === id);
    tabs.querySelectorAll('button').forEach(b => b.classList.toggle('active', b.dataset.id === (s ? s.id : '')));
    window.scrollTo(0, 0);
    s ? subject(s) : home();
  }
  $('#search').oninput = e => search(e.target.value);
  window.addEventListener('hashchange', route);
  route();
})();
