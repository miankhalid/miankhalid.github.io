/* ============================================================
   Renders window.SITE (see content.js) into the page.
   Do not edit content here. Edit content.js instead.
   ============================================================ */
(function () {
  const SITE = window.SITE || {};

  const ICONS = {
    email: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16v16H4z" opacity="0"/><path d="M4 6h16v12H4z"/><path d="M4 7l8 6 8-6"/></svg>',
    github: '<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.58 2 12.25c0 4.53 2.87 8.37 6.84 9.73.5.1.68-.22.68-.49 0-.24-.01-.87-.01-1.71-2.78.62-3.37-1.37-3.37-1.37-.45-1.18-1.11-1.49-1.11-1.49-.91-.64.07-.63.07-.63 1 .07 1.53 1.05 1.53 1.05.89 1.57 2.34 1.11 2.91.85.09-.67.35-1.11.63-1.37-2.22-.26-4.56-1.14-4.56-5.07 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.31.1-2.72 0 0 .84-.27 2.75 1.05a9.32 9.32 0 0 1 5 0c1.91-1.32 2.75-1.05 2.75-1.05.55 1.41.2 2.46.1 2.72.64.72 1.03 1.63 1.03 2.75 0 3.94-2.34 4.81-4.57 5.06.36.32.68.94.68 1.9 0 1.37-.01 2.48-.01 2.81 0 .27.18.6.69.49A10.26 10.26 0 0 0 22 12.25C22 6.58 17.52 2 12 2z"/></svg>',
    linkedin: '<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M6.94 5a2 2 0 1 1-4-.02 2 2 0 0 1 4 .02zM7 8.48H3V21h4V8.48zm6.32 0H9.35V21h3.94v-6.57c0-3.66 4.77-3.96 4.77 0V21H22v-7.93c0-6.17-7.06-5.94-8.68-2.91V8.48z"/></svg>',
    x: '<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M18.9 2H22l-7.4 8.46L23 22h-6.6l-5.2-6.8L5.2 22H2l7.9-9.03L1 2h6.8l4.7 6.24L18.9 2zM17.7 20h1.8L7.4 4H5.5l12.2 16z"/></svg>',
    website: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15 15 0 0 1 0 20 15 15 0 0 1 0-20z"/></svg>',
    sun: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2M2 12h2m16 0h2M4.9 4.9l1.4 1.4m11.4 11.4 1.4 1.4M19.1 4.9l-1.4 1.4M6.3 17.7l-1.4 1.4"/></svg>',
    moon: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/></svg>'
  };

  function el(tag, opts) {
    const node = document.createElement(tag);
    if (!opts) return node;
    if (opts.class) node.className = opts.class;
    if (opts.text) node.textContent = opts.text;
    if (opts.html) node.innerHTML = opts.html;
    if (opts.href) node.href = opts.href;
    if (opts.attrs) Object.entries(opts.attrs).forEach(([k, v]) => node.setAttribute(k, v));
    return node;
  }

  function hasContent(v) {
    if (Array.isArray(v)) return v.length > 0;
    if (typeof v === 'string') return v.trim().length > 0;
    return !!v;
  }

  function renderNav() {
    const links = document.getElementById('nav-links');
    const sections = [
      ['about', 'About'],
      ['experience', 'Experience'],
      ['projects', 'Projects'],
      ['skills', 'Skills'],
      ['education', 'Education'],
      ['contact', 'Contact']
    ];
    sections.forEach(([id, label]) => {
      const section = document.getElementById(id);
      if (section && !section.classList.contains('hidden')) {
        links.appendChild(el('a', { href: '#' + id, text: label }));
      }
    });
  }

  function renderHero() {
    const hero = document.getElementById('hero');
    const text = el('div', { class: 'hero-text' });
    text.appendChild(el('h1', { text: SITE.name || '' }));
    if (hasContent(SITE.role)) text.appendChild(el('div', { class: 'hero-role', text: SITE.role }));
    if (hasContent(SITE.tagline)) text.appendChild(el('p', { class: 'hero-tagline', text: SITE.tagline }));
    if (hasContent(SITE.location)) text.appendChild(el('div', { class: 'hero-location', text: SITE.location }));

    const actions = el('div', { class: 'hero-actions' });
    if (hasContent(SITE.resume)) {
      actions.appendChild(el('a', { class: 'btn btn-primary', text: 'Download CV', href: SITE.resume, attrs: { download: '' } }));
    }
    if (SITE.contact && hasContent(SITE.contact.github)) {
      actions.appendChild(el('a', { class: 'btn btn-secondary', text: 'GitHub', href: SITE.contact.github, attrs: { target: '_blank', rel: 'noopener' } }));
    }
    if (SITE.contact && hasContent(SITE.contact.linkedin)) {
      actions.appendChild(el('a', { class: 'btn btn-secondary', text: 'LinkedIn', href: SITE.contact.linkedin, attrs: { target: '_blank', rel: 'noopener' } }));
    }
    if (actions.children.length) text.appendChild(actions);

    hero.appendChild(text);

    if (hasContent(SITE.avatar)) {
      hero.appendChild(el('img', { class: 'hero-avatar', attrs: { src: SITE.avatar, alt: SITE.name || 'Profile photo' } }));
    }
  }

  function renderAbout() {
    const section = document.getElementById('about');
    if (!hasContent(SITE.about)) { section.classList.add('hidden'); return; }
    section.appendChild(el('div', { class: 'section-label', text: 'About' }));
    section.appendChild(el('h2', { text: 'About Me' }));
    const wrap = el('div', { class: 'about-text' });
    SITE.about.forEach(p => wrap.appendChild(el('p', { text: p })));
    section.appendChild(wrap);
  }

  function renderExperience() {
    const section = document.getElementById('experience');
    if (!hasContent(SITE.experience)) { section.classList.add('hidden'); return; }
    section.appendChild(el('div', { class: 'section-label', text: 'Experience' }));
    section.appendChild(el('h2', { text: 'Experience' }));
    SITE.experience.forEach(job => {
      const item = el('div', { class: 'exp-item' });
      const head = el('div', { class: 'exp-head' });
      const titleWrap = el('div');
      titleWrap.appendChild(el('h3', { text: job.role || '' }));
      if (hasContent(job.org)) titleWrap.appendChild(el('div', { class: 'exp-org', text: job.org }));
      head.appendChild(titleWrap);
      if (hasContent(job.period)) head.appendChild(el('div', { class: 'exp-period', text: job.period }));
      item.appendChild(head);
      if (hasContent(job.points)) {
        const list = el('ul', { class: 'exp-points' });
        job.points.forEach(pt => list.appendChild(el('li', { text: pt })));
        item.appendChild(list);
      }
      section.appendChild(item);
    });
  }

  function renderProjects() {
    const section = document.getElementById('projects');
    if (!hasContent(SITE.projects)) { section.classList.add('hidden'); return; }
    section.appendChild(el('div', { class: 'section-label', text: 'Projects' }));
    section.appendChild(el('h2', { text: 'Projects' }));
    const grid = el('div', { class: 'projects-grid' });
    SITE.projects.forEach(p => {
      const card = el('div', { class: 'project-card' });
      if (hasContent(p.image)) card.appendChild(el('img', { attrs: { src: p.image, alt: p.title || '' } }));
      card.appendChild(el('h3', { text: p.title || '' }));
      if (hasContent(p.blurb)) card.appendChild(el('p', { text: p.blurb }));
      if (hasContent(p.tags)) {
        const tags = el('div', { class: 'project-tags' });
        p.tags.forEach(t => tags.appendChild(el('span', { class: 'tag', text: t })));
        card.appendChild(tags);
      }
      if (hasContent(p.link)) {
        card.appendChild(el('a', { class: 'project-link', text: 'View -', href: p.link, attrs: { target: '_blank', rel: 'noopener' } }));
      }
      grid.appendChild(card);
    });
    section.appendChild(grid);
  }

  function renderSkills() {
    const section = document.getElementById('skills');
    if (!hasContent(SITE.skills)) { section.classList.add('hidden'); return; }
    section.appendChild(el('div', { class: 'section-label', text: 'Skills' }));
    section.appendChild(el('h2', { text: 'Skills' }));
    const grid = el('div', { class: 'skills-grid' });
    SITE.skills.forEach(g => {
      const col = el('div');
      col.appendChild(el('div', { class: 'skill-group-title', text: g.group || '' }));
      const items = el('div', { class: 'skill-items' });
      (g.items || []).forEach(i => items.appendChild(el('span', { class: 'skill-tag', text: i })));
      col.appendChild(items);
      grid.appendChild(col);
    });
    section.appendChild(grid);
  }

  function renderEducation() {
    const section = document.getElementById('education');
    if (!hasContent(SITE.education)) { section.classList.add('hidden'); return; }
    section.appendChild(el('div', { class: 'section-label', text: 'Education' }));
    section.appendChild(el('h2', { text: 'Education' }));
    SITE.education.forEach(e => {
      const item = el('div', { class: 'edu-item' });
      const head = el('div', { class: 'exp-head' });
      const titleWrap = el('div');
      titleWrap.appendChild(el('h3', { text: e.degree || '' }));
      if (hasContent(e.org)) titleWrap.appendChild(el('div', { class: 'edu-org', text: e.org }));
      head.appendChild(titleWrap);
      if (hasContent(e.period)) head.appendChild(el('div', { class: 'edu-period', text: e.period }));
      item.appendChild(head);
      section.appendChild(item);
    });
  }

  function renderContact() {
    const section = document.getElementById('contact');
    const c = SITE.contact || {};
    const active = Object.entries(c).filter(([k, v]) => hasContent(v));
    if (!active.length) { section.classList.add('hidden'); return; }
    section.appendChild(el('div', { class: 'section-label', text: 'Contact' }));
    section.appendChild(el('h2', { text: "Let's Connect" }));
    const wrap = el('div', { class: 'contact-links' });
    active.forEach(([key, value]) => {
      const href = key === 'email' ? 'mailto:' + value : value;
      const label = key === 'x' ? 'X' : key.charAt(0).toUpperCase() + key.slice(1);
      const btn = el('a', {
        class: 'btn btn-secondary',
        href: href,
        attrs: key === 'email' ? {} : { target: '_blank', rel: 'noopener' }
      });
      btn.innerHTML = (ICONS[key] || '') + ' ' + label;
      btn.style.gap = '8px';
      wrap.appendChild(btn);
    });
    section.appendChild(wrap);
  }

  function renderFooter() {
    const footer = document.getElementById('footer-inner');
    const year = new Date().getFullYear();
    footer.textContent = '© ' + year + ' ' + (SITE.name || '') + '. Built by hand, no framework.';
  }

  function renderThemeToggle() {
    const btn = document.getElementById('theme-toggle');
    if (!btn) return;
    btn.innerHTML = '<span class="icon-moon">' + (ICONS.moon || '') + '</span><span class="icon-sun">' + (ICONS.sun || '') + '</span>';
    btn.addEventListener('click', () => {
      const root = document.documentElement;
      const dark = (root.dataset.theme === 'dark') || (!root.dataset.theme && window.matchMedia('(prefers-color-scheme: dark)').matches);
      const next = dark ? 'light' : 'dark';
      root.dataset.theme = next;
      try { localStorage.setItem('theme', next); } catch (e) {}
    });
  }

  renderHero();
  renderAbout();
  renderExperience();
  renderProjects();
  renderSkills();
  renderEducation();
  renderContact();
  renderNav();
  renderThemeToggle();
  renderFooter();
})();
