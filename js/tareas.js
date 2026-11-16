/* Agenda: tareas del curso, calendario mensual y exámenes propios.
   Todo se guarda en localStorage (clave "agenda:v1") del navegador. */
(function () {
  'use strict';
  const SUBJ = {
    psp: { n: 'PSP', f: 'Servicios y Procesos', c: '#3b82f6' },
    pmdm: { n: 'PMDM', f: 'Móviles y Multimedia', c: '#a855f7' },
    'acceso-datos': { n: 'Acceso a Datos', f: 'Acceso a Datos', c: '#f59e0b' },
    despliegue: { n: 'Despliegue', f: 'Despliegue de Apps Web', c: '#14b8a6' },
    ingles: { n: 'Inglés', f: 'Inglés', c: '#ec4899' },
    sostenibilidad: { n: 'Sostenibilidad', f: 'Sostenibilidad', c: '#22c55e' },
    digitalizacion: { n: 'Digitalización', f: 'Digitalización Aplicada', c: '#06b6d4' },
    interfaces: { n: 'Interfaces', f: 'Diseño de Interfaces', c: '#f97316' },
    sge: { n: 'SGE', f: 'Sistemas de Gestión Empresarial', c: '#8b5cf6' },
    proyecto: { n: 'Proyecto', f: 'Proyecto intermodular 2', c: '#eab308' },
    otra: { n: 'Otra', f: 'Otra', c: '#94a3b8' }
  };
  const TYPES = {
    examen: { l: 'Examen', i: '📝', c: '#f85149' },
    tarea: { l: 'Tarea', i: '📌', c: '#58a6ff' },
    entrega: { l: 'Entrega', i: '📤', c: '#f0883e' },
    otro: { l: 'Otro', i: '🔖', c: '#bc8cff' }
  };
  const DAYC = [
    { c: '#f85149', l: 'Examen' }, { c: '#f0883e', l: 'Entrega importante' },
    { c: '#d29922', l: 'Repasar' }, { c: '#3fb950', l: 'Todo hecho' },
    { c: '#58a6ff', l: 'Evento' }, { c: '#bc8cff', l: 'Otro' }
  ];
  const MESES = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
  const DIAS = ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'];

  // Tareas del Aula Virtual (capturas del 16/11/2026)
  let n = 0;
  const b = (date, time, subj, title, type, extra) => Object.assign({ id: 'b' + (++n), date, time, subj, title, type: type || 'entrega' }, extra || {});
  const BASE = [
    b('2026-11-05', '23:59', 'psp', 'WordCounting syncronization · Project WordCountingShared'),
    b('2026-11-08', '23:59', 'digitalizacion', 'Caso práctico bloque 2'),
    b('2026-11-22', '23:59', 'sostenibilidad', 'T4 Diagnóstico circular'),
    b('2026-11-22', '23:59', 'psp', 'Partial Submission of Unit 1 Practice'),
    b('2026-11-27', '23:51', 'proyecto', '[PUNTO DE ENTREGA] HITO 2 · Diseño y planificación'),
    b('2026-11-28', '15:55', 'psp', 'BankAccount'),
    b('2026-11-29', '23:59', 'pmdm', 'Actividad de consolidación 8'),
    b('2026-11-29', '23:59', 'pmdm', 'Actividad de consolidación 9'),
    b('2026-11-29', '23:59', 'pmdm', 'Actividad de consolidación 10'),
    b('2026-11-29', '23:59', 'acceso-datos', 'Práctica UD3 · Sonoteca'),
    b('2026-11-29', '23:59', 'despliegue', 'Entrega práctica 1'),
    b('2026-11-29', '23:59', 'psp', 'Unit 1 Practice'),
    b('2026-12-01', '23:59', 'ingles', 'ACTIVITY 3 · GRAMMAR U7 (Review)', 'tarea', { tag: 'obligatoria' }),
    b('2026-12-01', '23:59', 'ingles', 'ACTIVITY 1 · VOCABULARY U7 (Review)', 'tarea', { tag: 'obligatoria' }),
    b('2026-12-01', '23:59', 'ingles', 'ACTIVITY 4 · READING U7', 'tarea', { tag: 'obligatoria' }),
    b('2026-12-01', '23:59', 'ingles', 'ACTIVITY 2 · VOCABULARY I (DAM · U7)', 'tarea', { tag: 'obligatoria' }),
    b('2026-12-01', '23:59', 'ingles', 'S1 · 10.1 Devices · VOCABULARY + LISTENING', 'tarea', { tag: 'obligatoria' }),
    b('2026-12-01', '23:59', 'ingles', 'S1 · 10.1 Devices · GRAMMAR · Comparatives and superlatives', 'tarea', { tag: 'obligatoria' }),
    b('2026-12-01', '23:59', 'ingles', 'S2 · 10.2 More comparative structures', 'tarea', { tag: 'opcional' }),
    b('2026-12-01', '23:59', 'ingles', 'LEVEL II · Comparatives & superlatives', 'tarea', { tag: 'una de las dos niveles' }),
    b('2026-12-01', '23:59', 'ingles', 'LEVEL I · Comparatives & superlatives', 'tarea', { tag: 'una de las dos niveles' }),
    b('2026-12-01', '23:59', 'ingles', 'S5 · Shark Tank (Vocabulary, Listening, Pitch)', 'tarea', { tag: 'obligatoria' }),
    b('2026-12-06', '23:59', 'pmdm', 'Desarrollo práctico guiado 3 · AppDummy v3'),
    b('2026-12-15', '23:59', 'pmdm', 'Selección del reto propuesto', 'tarea'),
    b('2026-12-20', '23:59', 'sostenibilidad', 'U4 Cuestionario', 'tarea'),
    b('2026-12-20', '23:59', 'sostenibilidad', 'T4 Ecodiseño'),
    b('2026-12-22', '23:59', 'pmdm', 'Reto final 1'),
    b('2027-01-17', '23:59', 'pmdm', 'Actividad de consolidación 11'),
    b('2027-01-17', '23:59', 'pmdm', 'Actividad de consolidación 12'),
    b('2027-01-18', '23:59', 'pmdm', 'Selección del reto propuesto (2.ª)', 'tarea'),
    b('2027-01-24', '23:59', 'pmdm', 'Desarrollo práctico guiado 4 · AppDummy v4'),
    b('2027-01-24', '23:59', 'pmdm', 'Proyecto + Defensa'),
    b('2027-01-31', '23:59', 'pmdm', 'Desarrollo práctico guiado 5 · Excursia'),
    b('2027-01-31', '23:59', 'pmdm', 'Reto final 2'),
    b('2027-02-07', '23:59', 'pmdm', 'Actividad de consolidación 13'),
    b('2027-02-07', '23:59', 'pmdm', 'Actividad de consolidación 14')
  ];

  // ---------- estado persistente ----------
  const KEY = 'agenda:v1';
  const defUI = { view: 'fecha', showDone: false, subj: 'all' };
  let S = { done: {}, custom: [], dayColors: {}, ui: Object.assign({}, defUI) };
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) { const p = JSON.parse(raw); S = Object.assign(S, p); S.ui = Object.assign({}, defUI, p.ui); }
  } catch (e) {}
  function save() { try { localStorage.setItem(KEY, JSON.stringify(S)); } catch (e) {} }

  // ---------- utilidades ----------
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const pad = x => String(x).padStart(2, '0');
  const ymd = d => d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate());
  const parse = s => { const [y, m, d] = s.split('-').map(Number); return new Date(y, m - 1, d); };
  const todayD = () => { const t = new Date(); return new Date(t.getFullYear(), t.getMonth(), t.getDate()); };
  const daysLeft = s => Math.round((parse(s) - todayD()) / 864e5);
  const fmtLong = s => { const d = parse(s); return DIAS[d.getDay()] + ' ' + d.getDate() + ' de ' + MESES[d.getMonth()].toLowerCase() + ' de ' + d.getFullYear(); };
  const fmtShort = s => { const d = parse(s); return DIAS[d.getDay()].slice(0, 3) + ' ' + d.getDate() + '/' + pad(d.getMonth() + 1); };
  const all = () => BASE.concat(S.custom.map(c => Object.assign({ custom: true }, c)));
  const isDone = it => !!S.done[it.id];
  function remaining(n, done) {
    if (done) return ['Hecha', 'ok'];
    if (n < 0) return ['Vencida hace ' + (-n) + (n === -1 ? ' día' : ' días'), 'late'];
    if (n === 0) return ['HOY', 'hot'];
    if (n === 1) return ['Mañana', 'hot'];
    if (n <= 3) return ['Faltan ' + n + ' días', 'hot'];
    if (n <= 7) return ['Faltan ' + n + ' días', 'soon'];
    return ['Faltan ' + n + ' días', 'far'];
  }

  let cur = { y: todayD().getFullYear(), m: todayD().getMonth() };
  let sel = ymd(todayD());
  let root = null;

  function row(it, withSubj) {
    const d = daysLeft(it.date), done = isDone(it), r = remaining(d, done), sj = SUBJ[it.subj] || SUBJ.otra, ty = TYPES[it.type] || TYPES.otro;
    return `<div class="ag-item ${done ? 'is-done' : ''}" style="--sc:${sj.c}">
      <input type="checkbox" data-ag="done" data-id="${it.id}" ${done ? 'checked' : ''} aria-label="Marcar como hecha: ${esc(it.title)}">
      <div class="ag-main"><b>${ty.i} ${esc(it.title)}</b>
        <small>${withSubj ? '<span class="ag-chip" style="--sc:' + sj.c + '">' + esc(sj.n) + '</span> ' : ''}${fmtShort(it.date)}${it.time && it.time !== '23:59' ? ' · ' + esc(it.time) : ' · 23:59'}${it.tag ? ' · <em>' + esc(it.tag) + '</em>' : ''}${it.custom ? ' · <em>' + esc(ty.l.toLowerCase()) + ' propio</em>' : ''}</small></div>
      <span class="ag-badge ${r[1]}">${r[0]}</span>
      <button class="ag-done ${done ? 'undo' : ''}" data-ag="toggle" data-id="${it.id}">${done ? '↩ Deshacer' : '✓ Hecha'}</button>
      ${it.custom ? '<button class="ag-x" data-ag="del" data-id="' + it.id + '" title="Borrar" aria-label="Borrar ' + esc(it.title) + '">×</button>' : ''}
    </div>`;
  }

  function stats(items) {
    const pend = items.filter(i => !isDone(i));
    const late = pend.filter(i => daysLeft(i.date) < 0).length;
    const week = pend.filter(i => { const d = daysLeft(i.date); return d >= 0 && d <= 7; }).length;
    const ex = pend.filter(i => i.type === 'examen' && daysLeft(i.date) >= 0).length;
    const next = pend.filter(i => daysLeft(i.date) >= 0).sort((a, b) => a.date.localeCompare(b.date))[0];
    const rn = next ? remaining(daysLeft(next.date), false)[0] : '';
    return `<div class="ag-stats">
      <div class="ag-stat"><b>${pend.length}</b><span>pendientes</span></div>
      <div class="ag-stat ${late ? 'late' : ''}"><b>${late}</b><span>vencidas</span></div>
      <div class="ag-stat ${week ? 'soon' : ''}"><b>${week}</b><span>en 7 días</span></div>
      <div class="ag-stat"><b>${ex}</b><span>exámenes</span></div>
      <div class="ag-stat wide"><span>Próxima entrega</span><b class="sm">${next ? esc(next.title) : 'Nada pendiente 🎉'}</b><small>${next ? esc((SUBJ[next.subj] || SUBJ.otra).n) + ' · ' + fmtShort(next.date) + ' · ' + rn : ''}</small></div>
    </div>`;
  }

  function listHtml(items) {
    let arr = items.slice().sort((a, b) => a.date.localeCompare(b.date) || (a.time || '').localeCompare(b.time || ''));
    if (S.ui.subj !== 'all') arr = arr.filter(i => i.subj === S.ui.subj);
    if (!S.ui.showDone) arr = arr.filter(i => !isDone(i));
    if (!arr.length) return '<p class="ag-empty">No hay tareas que mostrar con este filtro.</p>';
    if (S.ui.view === 'asig') {
      const g = {}; arr.forEach(i => (g[i.subj] = g[i.subj] || []).push(i));
      return Object.keys(g).sort((a, b) => g[a][0].date.localeCompare(g[b][0].date)).map(k => {
        const sj = SUBJ[k] || SUBJ.otra, pend = g[k].filter(i => !isDone(i)).length;
        return `<h3 class="ag-h" style="--sc:${sj.c}"><span class="ag-dot"></span>${esc(sj.f)} <small>${pend} pendiente${pend === 1 ? '' : 's'}</small></h3>` + g[k].map(i => row(i, false)).join('');
      }).join('');
    }
    const late = arr.filter(i => daysLeft(i.date) < 0 && !isDone(i));
    const rest = arr.filter(i => !(daysLeft(i.date) < 0 && !isDone(i)));
    let h = '';
    if (late.length) h += `<h3 class="ag-h late">⚠️ Vencidas sin marcar</h3>` + late.map(i => row(i, true)).join('');
    const g = {}; rest.forEach(i => (g[i.date] = g[i.date] || []).push(i));
    Object.keys(g).sort().forEach(d => { h += `<h3 class="ag-h">${fmtLong(d)}</h3>` + g[d].map(i => row(i, true)).join(''); });
    return h;
  }

  function calHtml(items) {
    const first = new Date(cur.y, cur.m, 1), off = (first.getDay() + 6) % 7, dim = new Date(cur.y, cur.m + 1, 0).getDate();
    const rows = Math.ceil((off + dim) / 7), byDay = {};
    items.forEach(i => (byDay[i.date] = byDay[i.date] || []).push(i));
    const td = ymd(todayD());
    let cells = '';
    for (let k = 0; k < rows * 7; k++) {
      const d = new Date(cur.y, cur.m, 1 - off + k), s = ymd(d), list = byDay[s] || [], col = S.dayColors[s];
      const pending = list.filter(i => !isDone(i)), hasEx = pending.some(i => i.type === 'examen');
      const shown = list.slice(0, 3).map(i => { const sj = SUBJ[i.subj] || SUBJ.otra; return `<span class="ag-pill ${isDone(i) ? 'fade' : ''} ${i.type === 'examen' ? 'ex' : ''}" style="--sc:${sj.c}" title="${esc(i.title)}"><i>${(TYPES[i.type] || TYPES.otro).i}</i><span>${esc(i.title)}</span></span>`; }).join('');
      cells += `<button class="ag-cell ${d.getMonth() !== cur.m ? 'other' : ''} ${s === td ? 'today' : ''} ${s === sel ? 'sel' : ''} ${hasEx ? 'hasex' : ''}" data-ag="day" data-d="${s}" ${col ? 'style="--dc:' + col + '"' : ''} ${col ? 'data-col="1"' : ''} aria-label="${fmtLong(s)}${list.length ? ', ' + list.length + ' elementos' : ''}">
        <span class="ag-num">${d.getDate()}</span><span class="ag-pills">${shown}${list.length > 3 ? '<span class="ag-more">+' + (list.length - 3) + '</span>' : ''}</span></button>`;
    }
    return `<div class="ag-calhead">
        <button data-ag="prev" aria-label="Mes anterior">‹</button>
        <h2>${MESES[cur.m]} ${cur.y}</h2>
        <button data-ag="next" aria-label="Mes siguiente">›</button>
        <button data-ag="today" class="ghost">Hoy</button></div>
      <div class="ag-week">${['L', 'M', 'X', 'J', 'V', 'S', 'D'].map(x => '<span>' + x + '</span>').join('')}</div>
      <div class="ag-grid">${cells}</div>
      <div class="ag-legend"><b>Colores del día:</b> ${DAYC.map(x => '<span><i style="background:' + x.c + '"></i>' + x.l + '</span>').join('')}<span><i class="exm"></i>Borde rojo = examen pendiente</span></div>`;
  }

  function dayHtml(items) {
    const list = items.filter(i => i.date === sel).sort((a, b) => (a.time || '').localeCompare(b.time || ''));
    const col = S.dayColors[sel];
    return `<h2>${fmtLong(sel)}</h2>
      <div class="ag-swatches"><span>Pintar este día:</span>${DAYC.map(x => `<button class="ag-sw ${col === x.c ? 'on' : ''}" data-ag="color" data-c="${x.c}" style="background:${x.c}" title="${x.l}" aria-label="Color ${x.l}"></button>`).join('')}<button class="ghost" data-ag="nocolor">Quitar color</button></div>
      ${list.length ? list.map(i => row(i, true)).join('') : '<p class="ag-empty">Sin entregas ni exámenes este día.</p>'}
      ${list.some(i => !isDone(i)) ? '<button class="ghost" data-ag="alldone">✓ Marcar todo este día como hecho</button>' : ''}
      <form class="ag-form" data-ag="add">
        <h3>Añadir en esta fecha</h3>
        <div class="ag-fields">
          <label class="f-title">Título<input id="ag-title" required maxlength="120" placeholder="Ej.: Examen PSP UP1"></label>
          <label>Fecha<input id="ag-date" type="date" required value="${sel}"></label>
          <label>Hora<input id="ag-time" type="time" value="09:00"></label>
          <label>Tipo<select id="ag-type">${Object.keys(TYPES).map(k => `<option value="${k}">${TYPES[k].i} ${TYPES[k].l}</option>`).join('')}</select></label>
          <label>Asignatura<select id="ag-subj">${Object.keys(SUBJ).map(k => `<option value="${k}">${esc(SUBJ[k].f)}</option>`).join('')}</select></label>
        </div>
        <button class="primary" type="submit">Añadir</button>
      </form>`;
  }

  function render() {
    const items = all();
    const scroll = window.scrollY;
    root.innerHTML = `<h1 style="font-size:2rem">📅 Agenda del curso</h1>
      ${stats(items)}
      <div class="ag-two">
        <section class="block ag-cal">${calHtml(items)}</section>
        <section class="block ag-day" id="ag-day">${dayHtml(items)}</section>
      </div>
      <section class="block">
        <h2>Lista de tareas</h2>
        <div class="ag-controls">
          <div class="ag-seg" role="tablist"><button data-ag="view" data-v="fecha" class="${S.ui.view === 'fecha' ? 'on' : ''}">Por fecha</button><button data-ag="view" data-v="asig" class="${S.ui.view === 'asig' ? 'on' : ''}">Por asignatura</button></div>
          <select id="ag-fsubj" aria-label="Filtrar por asignatura"><option value="all">Todas las asignaturas</option>${Object.keys(SUBJ).map(k => `<option value="${k}" ${S.ui.subj === k ? 'selected' : ''}>${esc(SUBJ[k].f)}</option>`).join('')}</select>
          <label class="ag-chk"><input type="checkbox" id="ag-showdone" ${S.ui.showDone ? 'checked' : ''}> Mostrar hechas</label>
        </div>
        ${listHtml(items)}
      </section>
      <p class="ag-note">Tus marcas, exámenes y colores se guardan en este navegador. Si borras los datos del sitio o cambias de navegador u ordenador, empezarás de cero.</p>`;
    window.scrollTo(0, scroll);
  }

  function onClick(e) {
    const t = e.target.closest('[data-ag]'); if (!t) return;
    const a = t.dataset.ag;
    if (a === 'day') { sel = t.dataset.d; const d = parse(sel); cur = { y: d.getFullYear(), m: d.getMonth() }; render(); }
    else if (a === 'prev') { cur.m--; if (cur.m < 0) { cur.m = 11; cur.y--; } render(); }
    else if (a === 'next') { cur.m++; if (cur.m > 11) { cur.m = 0; cur.y++; } render(); }
    else if (a === 'today') { const d = todayD(); cur = { y: d.getFullYear(), m: d.getMonth() }; sel = ymd(d); render(); }
    else if (a === 'color') { S.dayColors[sel] = t.dataset.c; save(); render(); }
    else if (a === 'nocolor') { delete S.dayColors[sel]; save(); render(); }
    else if (a === 'toggle') { const id = t.dataset.id; if (S.done[id]) delete S.done[id]; else S.done[id] = true; save(); render(); }
    else if (a === 'alldone') { all().filter(i => i.date === sel).forEach(i => { S.done[i.id] = true; }); save(); render(); }
    else if (a === 'view') { S.ui.view = t.dataset.v; save(); render(); }
    else if (a === 'del') { S.custom = S.custom.filter(c => c.id !== t.dataset.id); delete S.done[t.dataset.id]; save(); render(); }
  }
  function onChange(e) {
    const t = e.target;
    if (t.dataset && t.dataset.ag === 'done') { if (t.checked) S.done[t.dataset.id] = true; else delete S.done[t.dataset.id]; save(); render(); }
    else if (t.id === 'ag-fsubj') { S.ui.subj = t.value; save(); render(); }
    else if (t.id === 'ag-showdone') { S.ui.showDone = t.checked; save(); render(); }
    else if (t.id === 'ag-date' && t.value) { /* solo cambia la fecha del formulario */ }
  }
  function onSubmit(e) {
    const f = e.target.closest('form[data-ag="add"]'); if (!f) return;
    e.preventDefault();
    const title = f.querySelector('#ag-title').value.trim(), date = f.querySelector('#ag-date').value;
    if (!title || !date) return;
    S.custom.push({ id: 'c' + Date.now(), title, date, time: f.querySelector('#ag-time').value || '', type: f.querySelector('#ag-type').value, subj: f.querySelector('#ag-subj').value });
    sel = date; const d = parse(date); cur = { y: d.getFullYear(), m: d.getMonth() };
    save(); render();
  }

  window.renderAgenda = function (el) {
    root = el;
    el.onclick = onClick; el.onchange = onChange; el.onsubmit = onSubmit;
    render();
  };
  window.agendaSummary = function () {
    const pend = all().filter(i => !isDone(i));
    return { pend: pend.length, late: pend.filter(i => daysLeft(i.date) < 0).length, week: pend.filter(i => { const d = daysLeft(i.date); return d >= 0 && d <= 7; }).length };
  };
})();
