/* ============================================================
   Renders window.SITE (see content.js) into the page.
   Do not edit content here. Edit content.js instead.
   ============================================================ */
(function () {
  const SITE = window.SITE || {};

  const ICONS = {
    email: 'mdi:email-outline',
    github: 'simple-icons:github',
    linkedin: 'simple-icons:linkedin',
    x: 'simple-icons:x',
    website: 'mdi:web',
    sun: 'ph:sun-duotone',
    moon: 'ph:moon-duotone',
    cv: 'ph:file-arrow-down-duotone',
    arrow: 'ph:arrow-up-right-duotone'
  };

  function icon(name, className) {
    return '<span class="iconify' + (className ? ' ' + className : '') + '" data-icon="' + name + '"></span>';
  }

  function scanIcons() {
    if (window.Iconify) Iconify.scan(document.body);
  }

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
    const brand = document.getElementById('nav-brand');
    if (brand) brand.textContent = SITE.name || '';
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

    const menuBtn = document.getElementById('nav-menu');
    if (menuBtn) {
      menuBtn.innerHTML = icon('ph:list-bold');
      const nav = document.getElementById('nav-links');
      menuBtn.addEventListener('click', () => {
        const open = nav.classList.toggle('open');
        menuBtn.setAttribute('aria-expanded', String(open));
      });
      nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
        nav.classList.remove('open');
        menuBtn.setAttribute('aria-expanded', 'false');
      }));
    }
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
      const a = el('a', { class: 'btn btn-primary', href: SITE.resume, attrs: { download: '' } });
      a.innerHTML = icon(ICONS.cv) + ' Download CV';
      actions.appendChild(a);
    }
    if (SITE.contact && hasContent(SITE.contact.github)) {
      const a = el('a', { class: 'btn btn-secondary', href: SITE.contact.github, attrs: { target: '_blank', rel: 'noopener' } });
      a.innerHTML = icon(ICONS.github) + ' GitHub';
      actions.appendChild(a);
    }
    if (SITE.contact && hasContent(SITE.contact.linkedin)) {
      const a = el('a', { class: 'btn btn-secondary', href: SITE.contact.linkedin, attrs: { target: '_blank', rel: 'noopener' } });
      a.innerHTML = icon(ICONS.linkedin) + ' LinkedIn';
      actions.appendChild(a);
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
      if (hasContent(p.image)) {
        const media = el('div', { class: 'project-media' });
        const shimmer = el('div', { class: 'shimmer' });
        const img = el('img', { attrs: { src: p.image, alt: p.title || '', loading: 'lazy' } });
        if (img.complete) img.classList.add('loaded');
        else img.addEventListener('load', () => img.classList.add('loaded'));
        media.appendChild(img);
        media.appendChild(shimmer);
        card.appendChild(media);
      }
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
      btn.innerHTML = icon(ICONS[key] || 'mdi:link') + ' ' + label;
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
    btn.innerHTML = '<span class="icon-moon">' + icon('ph:moon-fill') + '</span><span class="icon-sun">' + icon('ph:sun-fill') + '</span>';
    btn.addEventListener('click', () => {
      const root = document.documentElement;
      const dark = (root.dataset.theme === 'dark') || (!root.dataset.theme && window.matchMedia('(prefers-color-scheme: dark)').matches);
      const next = dark ? 'light' : 'dark';
      root.dataset.theme = next;
      try { localStorage.setItem('theme', next); } catch (e) {}
    });
  }

  function renderParallax() {
    const shapes = document.querySelectorAll('.bg-shapes .shape');
    if (!shapes.length) return;
    let raf = null;
    function onScroll() {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = null;
        const y = window.scrollY || 0;
        shapes.forEach(s => {
          const speed = parseFloat(s.getAttribute('data-speed')) || 0;
          s.style.transform = 'translate3d(0,' + (y * speed) + 'px,0)';
        });
      });
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
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
  renderParallax();
  scanIcons();
})();
