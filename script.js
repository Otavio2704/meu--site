document.addEventListener('DOMContentLoaded', function () {
  // Boot sequence — stagger init for perceived smoothness
  initScrollProgress();
  initCustomCursor();
  initSpotlight();
  initNavbar();
  initSectionAnimations();
  initSkillTagAnimations();
  initProjectCardTilt();
  initRippleButtons();
  initOrbitAnimations();
  initSunPhotoModal();
  initSmoothScroll();
  initContactForm();
  initLanguageToggle();
  initTypingEffect(); // kept for compatibility
});

/* ============================================================
   SCROLL PROGRESS BAR
   ============================================================ */
function initScrollProgress() {
  const bar = document.createElement('div');
  bar.className = 'scroll-progress';
  document.body.prepend(bar);

  const update = () => {
    const scrolled = window.scrollY;
    const total = document.documentElement.scrollHeight - window.innerHeight;
    bar.style.width = total > 0 ? `${(scrolled / total) * 100}%` : '0%';
  };

  window.addEventListener('scroll', update, { passive: true });
  update();
}

/* ============================================================
   CUSTOM CURSOR — IDE BLOCK STYLE
   ============================================================ */
function initCustomCursor() {
  if (!window.matchMedia('(pointer: fine)').matches) return;

  // ── Build cursor elements ─────────────────────────────────
  const terminal = document.createElement('div');
  terminal.className = 'cursor-terminal';

  const block = document.createElement('span');
  block.className = 'cursor-block';

  const label = document.createElement('span');
  label.className = 'cursor-label';
  label.textContent = '[ ]';          // default label; swaps on context

  terminal.append(block, label);
  document.body.appendChild(terminal);

  // ── Position ──────────────────────────────────────────────
  document.addEventListener('mousemove', e => {
    terminal.style.left = `${e.clientX}px`;
    terminal.style.top  = `${e.clientY}px`;
  }, { passive: true });

  // ── Context-aware label & hover state ────────────────────
  // Maps element types to short dev tokens shown next to block
  const LABELS = {
    'a':            '→',
    'button':       'fn()',
    'input':        'str',
    'textarea':     'str',
    '.project-card':'{}',
    '.skill-tag':   '#',
    '.tech-icon':   '</>',
    '.sun-core':    '@',
    '.project-link':'GET',
    'label':        'var',
  };

  const interactive = Object.keys(LABELS).join(', ');

  document.addEventListener('mouseover', e => {
    const match = Object.keys(LABELS).find(sel => e.target.closest(sel));
    if (match) {
      label.textContent = LABELS[match];
      terminal.classList.add('hovering');
    }
  });

  document.addEventListener('mouseout', e => {
    if (e.target.closest(interactive)) {
      terminal.classList.remove('hovering');
      label.textContent = '[ ]';
    }
  });

  // ── Click ─────────────────────────────────────────────────
  document.addEventListener('mousedown', () => terminal.classList.add('clicking'));
  document.addEventListener('mouseup',   () => terminal.classList.remove('clicking'));

  // ── Trail characters ──────────────────────────────────────
  const TRAIL_CHARS = [
    'Java', 'void', '{}', '=>', '//',
    'int',  'new',  'GET', 'API', '::',
    '@',    'SQL',  'JWT', '200', 'mvn',
    'git',  '&&',   '||',  '!=',  '++',
  ];

  let lastX = -999, lastY = -999;
  const MIN_DIST = 30;
  let throttle = false;

  document.addEventListener('mousemove', e => {
    if (throttle) return;
    const dx = e.clientX - lastX;
    const dy = e.clientY - lastY;
    if (Math.sqrt(dx * dx + dy * dy) < MIN_DIST) return;

    lastX = e.clientX;
    lastY = e.clientY;
    throttle = true;
    setTimeout(() => { throttle = false; }, 65);
    spawnTrail(e.clientX, e.clientY);
  }, { passive: true });

  function spawnTrail(x, y) {
    const el = document.createElement('span');
    el.className = 'cursor-trail-char';
    el.textContent = TRAIL_CHARS[Math.floor(Math.random() * TRAIL_CHARS.length)];

    el.style.left     = `${x + (Math.random() - 0.5) * 22}px`;
    el.style.top      = `${y + (Math.random() - 0.5) * 12}px`;
    el.style.fontSize = `${9 + Math.random() * 5}px`;

    // Warm amber ↔ bright yellow hue variation
    el.style.color = `hsl(${40 + Math.floor(Math.random() * 20)}, 100%, 60%)`;

    document.body.appendChild(el);
    setTimeout(() => el.remove(), 780);
  }
}

/* ============================================================
   SPOTLIGHT (follows mouse slowly)
   ============================================================ */
function initSpotlight() {
  if (!window.matchMedia('(pointer: fine)').matches) return;

  const spotlight = document.createElement('div');
  spotlight.className = 'spotlight';
  document.body.append(spotlight);

  let tX = 0, tY = 0, cX = 0, cY = 0;

  document.addEventListener('mousemove', e => {
    tX = e.clientX;
    tY = e.clientY;
  }, { passive: true });

  function lerp(a, b, t) { return a + (b - a) * t; }

  (function animateSpot() {
    cX = lerp(cX, tX, 0.06);
    cY = lerp(cY, tY, 0.06);
    spotlight.style.left = `${cX}px`;
    spotlight.style.top  = `${cY}px`;
    requestAnimationFrame(animateSpot);
  })();
}

/* ============================================================
   NAVBAR — scroll shrink + active link
   ============================================================ */
function initNavbar() {
  const navbar    = document.getElementById('navbar');
  const hamburger = document.getElementById('hamburger');
  const navMenu   = document.getElementById('nav-menu');
  const navLinks  = document.querySelectorAll('.nav-link');
  const sections  = document.querySelectorAll('section');

  // Shrink on scroll
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 60);
  }, { passive: true });

  // Mobile hamburger
  hamburger.addEventListener('click', () => {
    const isOpen = hamburger.getAttribute('aria-expanded') === 'true';
    hamburger.setAttribute('aria-expanded', String(!isOpen));
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
    document.body.style.overflow = !isOpen ? 'hidden' : '';
  });

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      hamburger.setAttribute('aria-expanded', 'false');
      hamburger.classList.remove('active');
      navMenu.classList.remove('active');
      document.body.style.overflow = '';
    });
  });

  // Active section highlight
  const sectionObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(l => l.classList.remove('active'));
        const link = document.querySelector(`a[href="#${entry.target.id}"]`);
        if (link) link.classList.add('active');
      }
    });
  }, { threshold: 0.3, rootMargin: '-100px 0px -100px 0px' });

  sections.forEach(s => sectionObserver.observe(s));
}

/* ============================================================
   SECTION SCROLL ANIMATIONS (staggered)
   ============================================================ */
function initSectionAnimations() {
  const animated = document.querySelectorAll(
    '.slide-in-left, .slide-in-right, .slide-in-up, .animate-on-scroll, .section-title'
  );

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  animated.forEach(el => observer.observe(el));
}

/* ============================================================
   SKILL TAGS — staggered cascade reveal
   ============================================================ */
function initSkillTagAnimations() {
  const tags = document.querySelectorAll('.skill-tag');

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        tags.forEach((tag, i) => {
          setTimeout(() => {
            tag.classList.add('is-visible');
            tag.style.animationDelay = '0s'; // already delayed by timeout
          }, i * 70);
        });
        observer.disconnect();
      }
    });
  }, { threshold: 0.2 });

  const grid = document.querySelector('.skills-grid');
  if (grid) observer.observe(grid);
}

/* ============================================================
   PROJECT CARDS — staggered reveal + 3D tilt (desktop only)
   ============================================================ */
function initProjectCardTilt() {
  const cards = document.querySelectorAll('.project-card');

  // Staggered reveal observer
  const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -30px 0px' });

  cards.forEach(card => revealObserver.observe(card));

  // 3D tilt — only on pointer:fine devices
  if (!window.matchMedia('(pointer: fine)').matches) return;

  const MAX_TILT = 8; // degrees
  const SCALE = 1.025;

  cards.forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width  - 0.5; // -0.5 to 0.5
      const y = (e.clientY - rect.top)  / rect.height - 0.5;

      const rotX =  y * MAX_TILT * -1;
      const rotY =  x * MAX_TILT;

      // Smooth highlight follow
      card.style.background = `
        radial-gradient(
          circle at ${(x + 0.5) * 100}% ${(y + 0.5) * 100}%,
          rgba(255,215,0,0.07) 0%,
          rgba(0,0,0,0.3) 60%
        )
      `;

      card.style.transform = `
        perspective(1000px)
        rotateX(${rotX}deg)
        rotateY(${rotY}deg)
        scale(${SCALE})
      `;
      card.style.transition = 'transform 0.08s ease, box-shadow 0.4s ease, border-color 0.4s ease';
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)';
      card.style.background = '';
      card.style.transition = 'transform 0.6s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.4s ease, border-color 0.4s ease';
    });

    card.addEventListener('mouseenter', () => {
      card.style.transition = 'transform 0.08s ease, box-shadow 0.4s ease, border-color 0.4s ease';
    });
  });
}

/* ============================================================
   RIPPLE EFFECT on buttons
   ============================================================ */
function initRippleButtons() {
  const buttons = document.querySelectorAll(
    '.glow-genz-button, .outline-button, .project-link, .hero-social a'
  );

  buttons.forEach(btn => {
    btn.addEventListener('click', function (e) {
      const rect = this.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height) * 2;
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top  - size / 2;

      const ripple = document.createElement('span');
      ripple.className = 'ripple';
      ripple.style.cssText = `
        width: ${size}px;
        height: ${size}px;
        left: ${x}px;
        top: ${y}px;
      `;
      this.appendChild(ripple);
      setTimeout(() => ripple.remove(), 650);
    });
  });
}

/* ============================================================
   ORBIT ANIMATIONS — pause on hover
   ============================================================ */
function initOrbitAnimations() {
  const sunCore   = document.querySelector('.sun-core');
  const orbitItems = document.querySelectorAll('.orbit-item');

  if (!sunCore || orbitItems.length === 0) return;

  const pause  = () => orbitItems.forEach(i => { i.style.animationPlayState = 'paused'; });
  const resume = () => orbitItems.forEach(i => { i.style.animationPlayState = 'running'; });

  sunCore.addEventListener('mouseenter', pause);
  sunCore.addEventListener('mouseleave', resume);

  orbitItems.forEach(item => {
    item.addEventListener('mouseenter', () => { item.style.animationPlayState = 'paused'; });
    item.addEventListener('mouseleave', () => { item.style.animationPlayState = 'running'; });
  });
}

/* ============================================================
   SUN PHOTO MODAL (kept for compatibility)
   ============================================================ */
function initSunPhotoModal() {
  const sun = document.querySelector('.sun-core');
  const modal = document.getElementById('photo-modal');
  const closeBtn = document.querySelector('.close');
  const randomPhoto = document.getElementById('random-photo');

  if (sun && modal && closeBtn && randomPhoto) {
    sun.addEventListener('click', () => {
      const randomId = Math.floor(Math.random() * 1000) + 1;
      randomPhoto.src = `https://picsum.photos/600/400?random=${randomId}`;
      modal.style.display = 'block';
    });

    closeBtn.addEventListener('click', () => modal.style.display = 'none');

    window.addEventListener('click', e => {
      if (e.target === modal) modal.style.display = 'none';
    });

    document.addEventListener('keydown', e => {
      if (e.key === 'Escape' && modal.style.display === 'block') {
        modal.style.display = 'none';
      }
    });
  }
}

/* ============================================================
   SMOOTH SCROLL
   ============================================================ */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.getElementById(this.getAttribute('href').slice(1));
      if (target) {
        const offset = window.scrollY + target.getBoundingClientRect().top - 80;
        window.scrollTo({ top: offset, behavior: 'smooth' });
      }
    });
  });
}

/* ============================================================
   CONTACT FORM
   ============================================================ */
function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  // Upgrade inputs to floating-label groups
  form.querySelectorAll('.form-group').forEach(group => {
    const input    = group.querySelector('input, textarea');
    const label    = group.querySelector('label');
    if (!input || !label) return;

    group.classList.add('floating-label');
    if (input.tagName === 'TEXTAREA') group.classList.add('textarea-group');

    // Move label AFTER input for CSS sibling selector to work
    if (input.nextSibling !== label) {
      input.after(label);
    }

    // Remove sr-only so it's visible as floating label
    label.classList.remove('sr-only');

    // Clear placeholder (we use floating label now)
    input.placeholder = ' ';
  });

  // Submit handler
  form.addEventListener('submit', async e => {
    e.preventDefault();

    const btn = form.querySelector('button[type="submit"]');
    const origText = btn.innerHTML;
    const lang = localStorage.getItem('language') || 'pt';

    const msgs = {
      pt: { sending: 'Enviando…', success: 'Mensagem enviada! ✓', error: 'Falha ao enviar: ' },
      en: { sending: 'Sending…',  success: 'Message sent! ✓',   error: 'Failed to send: '  }
    };

    btn.innerHTML   = msgs[lang].sending;
    btn.disabled    = true;
    btn.style.opacity = '0.7';

    try {
      await emailjs.sendForm('service_EMAILJS', 'template_EMAILJS', form);
      btn.innerHTML = msgs[lang].success;
      btn.style.background = 'rgba(255,215,0,0.2)';
      form.reset();
      setTimeout(() => {
        btn.innerHTML   = origText;
        btn.disabled    = false;
        btn.style.opacity = '';
        btn.style.background = '';
      }, 3500);
    } catch (err) {
      alert(msgs[lang].error + (err.text || err));
      btn.innerHTML   = origText;
      btn.disabled    = false;
      btn.style.opacity = '';
      console.error('EmailJS error:', err);
    }
  });
}

/* ============================================================
   LANGUAGE TOGGLE (i18n)
   ============================================================ */
function initLanguageToggle() {
  const langToggle = document.getElementById('language-toggle');
  if (!langToggle) return;

  const translations = {
    pt: {
      'nav-home': 'Início',
      'nav-about': 'Sobre',
      'nav-projects': 'Projetos',
      'nav-contact': 'Contato',
      'greeting': 'Olá, eu sou <strong>Otávio Guedes</strong> 👋',
      'hero-title': 'Eng.Software - Desenvolvedor Back-end',
      'hero-quote': 'Foco em back-end com Java, Spring Boot, bancos relacionais e soluções em cloud.',
      'download-cv': 'Baixar CV',
      'view-projects': 'Ver projetos',
      'about-title': 'Sobre',
      'about-text': 'Sou estudante de Engenharia de Software com foco em desenvolvimento Back-end. Trabalho com Java e Spring Boot para construir APIs escaláveis, faço modelagem de banco de dados (PostgreSQL), escrevo testes com JUnit e Mockito e tenho interesse em IA generativa e cloud (AWS).',
      'skills-title': 'Tecnologias & Ferramentas',
      'skill-prompt-engineering': 'Engenharia de prompts',
      'code-name': 'nome',
      'code-name-value': '"Otávio Guedes"',
      'code-role': 'cargo',
      'code-role-value': '"Eng.Software / Back-end Java"',
      'code-focus': 'foco',
      'code-focus-value': '"APIs, testes, modelagem e cloud"',
      'projects-title': 'Projetos',
      'projects-subtitle': 'Seleção de projetos no meu GitHub — códigos e README disponíveis nos links.',
      'project1-title': 'API Amigo Secreto 2.0',
      'project1-desc': 'API REST moderna e completa para gerenciar sorteios de amigo secreto de forma digital e automatizada. Desenvolvida com Spring Boot, oferece recursos avançados de gerenciamento de grupos, algoritmo de sorteio inteligente e sistema de mensagens anônimas.',
      'project2-desc': 'Um jogo roguelike clássico desenvolvido em Java puro, jogado direto no terminal. Explore masmorras geradas proceduralmente, colete itens, derrote inimigos e tente sobreviver o máximo de níveis possível!',
      'project3-desc': 'API RESTful profissional para gerenciamento completo de academias de ginástica, desenvolvida com Spring Boot 3.2.5, Spring Data JPA, Bean Validation e arquitetura em camadas.',
      'project4-title': 'Sistema E-commerce — Modelagem de Banco',
      'project4-desc': 'Este projeto apresenta uma modelagem completa de banco de dados para um sistema de e-commerce, desenvolvida em PostgreSQL. O sistema foi projetado para suportar operações comerciais complexas, incluindo gestão de clientes (PF/PJ), produtos, pedidos, pagamentos, estoque e entregas.',
      'project4-tech': 'Modelagem ER',
      'project5-title': 'Gerenciador de Times e Jogadores',
      'project5-desc': 'Sistema completo em Java para gerenciamento de times de futebol e seus jogadores, com persistência de dados e interface de linha de comando intuitiva.',
      'project6-title': "Otavio's Bank — Sistema Bancário (Java POO)",
      'project6-desc': 'Um sistema bancário completo desenvolvido em Java que demonstra os principais conceitos de Programação Orientada a Objetos (POO), oferecendo uma experiência bancária simulada com funcionalidades modernas como PIX e investimentos.',
      'contact-title': 'Contato',
      'contact-text': 'Estou aberto a oportunidades e colaborações. Pode me encontrar no GitHub ou LinkedIn — ou enviar uma mensagem por aqui.',
      'whatsapp-link': 'Fale comigo',
      'send-message': 'Enviar mensagem',
      'name-placeholder': 'Seu nome',
      'email-placeholder': 'Seu e-mail',
      'message-placeholder': 'Mensagem',
      'form-name-label': 'Seu nome',
      'form-email-label': 'Seu e-mail',
      'form-message-label': 'Sua mensagem',
      'footer-rights': '© 2026 Otávio Guedes. Todos os direitos reservados.'
    },
    en: {
      'nav-home': 'Home',
      'nav-about': 'About',
      'nav-projects': 'Projects',
      'nav-contact': 'Contact',
      'greeting': "Hello, I'm <strong>Otávio Guedes</strong> 👋",
      'hero-title': 'SW Engineer - Backend Developer',
      'hero-quote': 'Focused on back-end with Java, Spring Boot, relational databases and cloud solutions.',
      'download-cv': 'Download CV',
      'view-projects': 'View Projects',
      'about-title': 'About',
      'about-text': "I'm a Software Engineering student focused on Back-end development. I work with Java and Spring Boot to build scalable APIs, design databases (PostgreSQL), write tests with JUnit and Mockito, and have interest in generative AI and cloud (AWS).",
      'skills-title': 'Technologies & Tools',
      'skill-prompt-engineering': 'Prompt Engineering',
      'code-name': 'name',
      'code-name-value': '"Otávio Guedes"',
      'code-role': 'role',
      'code-role-value': '"Software Eng. / Back-end Java"',
      'code-focus': 'focus',
      'code-focus-value': '"APIs, testing, modeling and cloud"',
      'projects-title': 'Projects',
      'projects-subtitle': 'Selection of projects on my GitHub — code and README available at the links.',
      'project1-title': 'Secret Santa API 2.0',
      'project1-desc': 'Modern and complete REST API to manage secret santa draws digitally and automatically. Developed with Spring Boot, it offers advanced group management features, intelligent draw algorithm and anonymous messaging system.',
      'project2-desc': 'A classic roguelike game developed in pure Java, played directly in the terminal. Explore procedurally generated dungeons, collect items, defeat enemies and try to survive as many levels as possible!',
      'project3-desc': 'Professional RESTful API for complete gym management, developed with Spring Boot 3.2.5, Spring Data JPA, Bean Validation and layered architecture.',
      'project4-title': 'E-commerce System — Database Modeling',
      'project4-desc': 'This project presents a complete database modeling for an e-commerce system, developed in PostgreSQL. The system was designed to support complex business operations, including customer management (individual/corporate), products, orders, payments, inventory and deliveries.',
      'project4-tech': 'ER Modeling',
      'project5-title': 'Teams and Players Manager',
      'project5-desc': 'Complete Java system for managing soccer teams and their players, with data persistence and intuitive command-line interface.',
      'project6-title': "Otavio's Bank — Banking System (Java OOP)",
      'project6-desc': 'A complete banking system developed in Java that demonstrates the main concepts of Object-Oriented Programming (OOP), offering a simulated banking experience with modern features like PIX and investments.',
      'contact-title': 'Contact',
      'contact-text': "I'm open to opportunities and collaborations. You can find me on GitHub or LinkedIn — or send a message here.",
      'whatsapp-link': 'Talk to me',
      'send-message': 'Send Message',
      'name-placeholder': 'Your name',
      'email-placeholder': 'Your email',
      'message-placeholder': 'Message',
      'form-name-label': 'Your name',
      'form-email-label': 'Your email',
      'form-message-label': 'Your message',
      'footer-rights': '© 2026 Otávio Guedes. All rights reserved.'
    }
  };

  let currentLang = localStorage.getItem('language') || 'pt';
  applyLanguage(currentLang);

  langToggle.addEventListener('click', () => {
    currentLang = currentLang === 'pt' ? 'en' : 'pt';
    localStorage.setItem('language', currentLang);
    // Animate the globe icon
    const icon = langToggle.querySelector('.lang-icon');
    icon.style.transition = 'transform 0.5s cubic-bezier(0.34,1.56,0.64,1)';
    applyLanguage(currentLang);
  });

  function applyLanguage(lang) {
    document.getElementById('html-root').setAttribute('lang', lang === 'pt' ? 'pt-BR' : 'en');

    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (translations[lang][key] !== undefined) {
        el.innerHTML = translations[lang][key];
      }
    });

    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
      const key = el.getAttribute('data-i18n-placeholder');
      if (translations[lang][key] !== undefined) {
        el.placeholder = ' '; // Keep space for floating label CSS
        el.setAttribute('aria-label', translations[lang][key]);
      }
    });

    // Update floating labels text
    document.querySelectorAll('.form-group label[data-i18n]').forEach(label => {
      const key = label.getAttribute('data-i18n');
      if (translations[lang][key]) label.textContent = translations[lang][key];
    });

    langToggle.querySelector('.lang-text').textContent = lang === 'pt' ? 'EN' : 'PT';
    langToggle.setAttribute('aria-label', lang === 'pt' ? 'Alternar idioma' : 'Switch language');
    updateCVLink(lang);
  }

  function updateCVLink(lang) {
    const cv = document.getElementById('cv-download');
    if (cv) cv.href = lang === 'en' ? 'Otavio_Guedes_Resume.pdf' : 'Otavio_Guedes_Curriculo.pdf';
  }
}

/* ============================================================
   TYPING EFFECT (kept for compatibility — element may not exist)
   ============================================================ */
function initTypingEffect() {
  const el = document.getElementById('typing-text');
  if (!el) return;

  const phrases = ['Web Developer', 'Front-End', 'Problem Solver', 'Code Explorer', 'AI Explorer', 'Innovator'];
  let idx = 0, charIdx = 0, deleting = false, speed = 100;

  (function type() {
    const phrase = phrases[idx];
    el.textContent = deleting
      ? phrase.slice(0, --charIdx)
      : phrase.slice(0, ++charIdx);

    if (!deleting && charIdx === phrase.length) { deleting = true; speed = 2000; }
    else if (deleting && charIdx === 0) { deleting = false; idx = (idx + 1) % phrases.length; speed = 500; }
    else { speed = deleting ? 50 : 100; }

    setTimeout(type, speed);
  })();
}
