/* ============================================================
   POLYFILLS — Ensure compatibility with older browsers
   (Chrome < 51, Edge Legacy, older Firefox, etc.)
   ============================================================ */
(function () {
  // NodeList.prototype.forEach (Chrome < 51, IE11, Edge < 16)
  if (typeof NodeList !== 'undefined' && NodeList.prototype && !NodeList.prototype.forEach) {
    NodeList.prototype.forEach = Array.prototype.forEach;
  }

  // Element.prototype.matches (IE11, old WebKit)
  if (typeof Element !== 'undefined' && !Element.prototype.matches) {
    Element.prototype.matches =
      Element.prototype.msMatchesSelector ||
      Element.prototype.webkitMatchesSelector ||
      function (s) {
        var m = (this.document || this.ownerDocument).querySelectorAll(s);
        var i = m.length;
        while (--i >= 0 && m.item(i) !== this) {}
        return i > -1;
      };
  }

  // Element.prototype.closest (IE11, Chrome < 41)
  if (typeof Element !== 'undefined' && !Element.prototype.closest) {
    Element.prototype.closest = function (s) {
      var el = this;
      do {
        if (el.matches(s)) return el;
        el = el.parentElement || el.parentNode;
      } while (el !== null && el.nodeType === 1);
      return null;
    };
  }

  // Array.from (IE11)
  if (!Array.from) {
    Array.from = function (arrayLike) {
      return [].slice.call(arrayLike);
    };
  }

  // String.prototype.startsWith (IE11)
  if (!String.prototype.startsWith) {
    String.prototype.startsWith = function (search, pos) {
      pos = pos || 0;
      return this.indexOf(search, pos) === pos;
    };
  }

  // Element.prototype.remove (IE11)
  if (typeof Element !== 'undefined' && !Element.prototype.remove) {
    Element.prototype.remove = function () {
      if (this.parentNode) this.parentNode.removeChild(this);
    };
  }

  // Element.classList.toggle with force argument (IE11)
  (function () {
    var testEl = document.createElement('_');
    testEl.classList.toggle('c', false);
    if (testEl.classList.contains('c')) {
      var _toggle = DOMTokenList.prototype.toggle;
      DOMTokenList.prototype.toggle = function (token, force) {
        if (arguments.length > 1 && !this.contains(token) === !force) {
          return force;
        }
        return _toggle.call(this, token);
      };
    }
  })();

  // requestAnimationFrame (IE9, old Android)
  if (!window.requestAnimationFrame) {
    window.requestAnimationFrame =
      window.webkitRequestAnimationFrame ||
      window.mozRequestAnimationFrame ||
      function (cb) { return window.setTimeout(cb, 16); };
  }

  // Object.keys (IE8 — unlikely but safe)
  if (!Object.keys) {
    Object.keys = function (obj) {
      var keys = [];
      for (var k in obj) {
        if (obj.hasOwnProperty(k)) keys.push(k);
      }
      return keys;
    };
  }

  // Element.prepend (IE11, Edge < 17)
  if (typeof Element !== 'undefined' && !Element.prototype.prepend) {
    Element.prototype.prepend = function () {
      var docFrag = document.createDocumentFragment();
      for (var i = 0; i < arguments.length; i++) {
        var node = arguments[i];
        docFrag.appendChild(node instanceof Node ? node : document.createTextNode(String(node)));
      }
      this.insertBefore(docFrag, this.firstChild);
    };
  }
})();

/* ============================================================
   MAIN INIT — each function wrapped in try-catch so one
   broken feature never prevents the rest from loading.
   ============================================================ */
document.addEventListener('DOMContentLoaded', function () {
  var inits = [
    initScrollProgress,
    initCustomCursor,
    initSpotlight,
    initNavbar,
    initSectionAnimations,
    initSkillTagAnimations,
    initProjectCardTilt,
    initRippleButtons,
    initOrbitAnimations,
    initSmoothScroll,
    initContactForm,
    initLanguageToggle
  ];

  for (var i = 0; i < inits.length; i++) {
    try { inits[i](); }
    catch (e) { if (typeof console !== 'undefined' && console.warn) console.warn('Init error [' + inits[i].name + ']:', e); }
  }
});

/* ============================================================
   SAFE LOCALSTORAGE WRAPPER
   (Safari private mode and some Android webviews throw on access)
   ============================================================ */
const storage = {
  get: function (key, fallback) {
    try { return localStorage.getItem(key) || fallback; }
    catch (e) { return fallback; }
  },
  set: function (key, value) {
    try { localStorage.setItem(key, value); }
    catch (e) { /* silent */ }
  }
};

/* ============================================================
   INTERSECTION OBSERVER WITH FALLBACK
   ============================================================ */
function createObserver(callback, options) {
  if (!('IntersectionObserver' in window)) {
    // Fallback: immediately mark all as visible
    return {
      observe: function (el) { callback([{ isIntersecting: true, target: el }]); },
      unobserve: function () {},
      disconnect: function () {}
    };
  }
  return new IntersectionObserver(callback, options);
}

/* ============================================================
   SCROLL PROGRESS BAR
   ============================================================ */
function initScrollProgress() {
  var bar = document.createElement('div');
  bar.className = 'scroll-progress';
  document.body.prepend(bar);

  function update() {
    var scrolled = window.scrollY || window.pageYOffset;
    var total = document.documentElement.scrollHeight - window.innerHeight;
    bar.style.width = total > 0 ? ((scrolled / total) * 100) + '%' : '0%';
  }

  window.addEventListener('scroll', update, { passive: true });
  update();
}

/* ============================================================
   CUSTOM CURSOR — IDE BLOCK STYLE
   Only activates on pointer:fine (mouse) devices.
   Uses a class on body so CSS can respond too.
   ============================================================ */
function initCustomCursor() {
  // Only on true pointer devices — not touch, not stylus-only tablets
  if (!window.matchMedia || !window.matchMedia('(pointer: fine)').matches) return;

  // Signal to CSS that custom cursor is active
  document.body.classList.add('custom-cursor-active');

  var terminal = document.createElement('div');
  terminal.className = 'cursor-terminal';

  var block = document.createElement('span');
  block.className = 'cursor-block';
  block.innerHTML =
    '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="24" viewBox="0 0 20 24">' +
    '<defs>' +
    '<linearGradient id="cursorGrad" x1="0%" y1="0%" x2="100%" y2="100%">' +
    '<stop offset="0%" stop-color="#FFFC38"/>' +
    '<stop offset="50%" stop-color="#FFB700"/>' +
    '<stop offset="100%" stop-color="#FF7A00"/>' +
    '</linearGradient>' +
    '</defs>' +
    '<path d="M2 1 L2 20 L6.5 15.5 L10 23 L12.5 22 L9 14.5 L16 14.5 Z" ' +
    'fill="url(#cursorGrad)" stroke="#1a1a1a" stroke-width="1.5" stroke-linejoin="round"/>' +
    '</svg>';

  var label = document.createElement('span');
  label.className = 'cursor-label';
  label.textContent = '[ ]';

  terminal.appendChild(block);
  terminal.appendChild(label);
  document.body.appendChild(terminal);

  // Position update
  document.addEventListener('mousemove', function (e) {
    terminal.style.left = e.clientX + 'px';
    terminal.style.top  = e.clientY + 'px';
  }, { passive: true });

  // Context-aware labels
  var LABELS = {
    'a':            '→',
    'button':       'fn()',
    'input':        'str',
    'textarea':     'str',
    '.project-card':'{}',
    '.skill-tag':   '#',
    '.tech-icon':   '</>',
    '.sun-core':    '@',
    '.project-link':'GET',
    'label':        'var'
  };

  document.addEventListener('mouseover', function (e) {
    var match = null;
    var selectors = Object.keys(LABELS);
    for (var i = 0; i < selectors.length; i++) {
      if (e.target.closest(selectors[i])) {
        match = selectors[i];
        break;
      }
    }
    if (match) {
      label.textContent = LABELS[match];
      terminal.classList.add('hovering');
    }
  });

  document.addEventListener('mouseout', function (e) {
    var selectors = Object.keys(LABELS);
    for (var i = 0; i < selectors.length; i++) {
      if (e.target.closest(selectors[i])) {
        terminal.classList.remove('hovering');
        label.textContent = '[ ]';
        break;
      }
    }
  });

  document.addEventListener('mousedown', function () { terminal.classList.add('clicking'); });
  document.addEventListener('mouseup',   function () { terminal.classList.remove('clicking'); });

  // Oculta o cursor customizado ao passar por cima ou focar em campos de texto
  var TYPING_SELECTOR = 'input, textarea, [contenteditable]';
  document.addEventListener('mouseover', function (e) {
    if (e.target.matches(TYPING_SELECTOR)) {
      document.body.classList.add('cursor-typing');
    }
  });
  document.addEventListener('mouseout', function (e) {
    if (e.target.matches(TYPING_SELECTOR)) {
      document.body.classList.remove('cursor-typing');
    }
  });
  document.addEventListener('focusin', function (e) {
    if (e.target.matches(TYPING_SELECTOR)) {
      document.body.classList.add('cursor-typing');
    }
  });
  document.addEventListener('focusout', function (e) {
    if (e.target.matches(TYPING_SELECTOR)) {
      document.body.classList.remove('cursor-typing');
    }
  });

  // Trail characters
  var TRAIL_CHARS = [
    'Java','void','{}','=>','//',
    'int','new','GET','API','::',
    '@','SQL','JWT','200','mvn',
    'git','&&','||','!=','++'
  ];

  var lastX = -999, lastY = -999;
  var MIN_DIST = 30;
  var throttleTrail = false;

  document.addEventListener('mousemove', function (e) {
    if (throttleTrail) return;
    var dx = e.clientX - lastX;
    var dy = e.clientY - lastY;
    if (Math.sqrt(dx * dx + dy * dy) < MIN_DIST) return;

    lastX = e.clientX;
    lastY = e.clientY;
    throttleTrail = true;
    setTimeout(function () { throttleTrail = false; }, 65);
    spawnTrail(e.clientX, e.clientY);
  }, { passive: true });

  function spawnTrail(x, y) {
    var el = document.createElement('span');
    el.className = 'cursor-trail-char';
    el.textContent = TRAIL_CHARS[Math.floor(Math.random() * TRAIL_CHARS.length)];
    el.style.left     = (x + (Math.random() - 0.5) * 22) + 'px';
    el.style.top      = (y + (Math.random() - 0.5) * 12) + 'px';
    el.style.fontSize = (9 + Math.random() * 5) + 'px';
    el.style.color    = 'hsl(' + (40 + Math.floor(Math.random() * 20)) + ', 100%, 60%)';
    document.body.appendChild(el);
    setTimeout(function () { if (el.parentNode) el.parentNode.removeChild(el); }, 780);
  }
}

/* ============================================================
   SPOTLIGHT
   ============================================================ */
function initSpotlight() {
  if (!window.matchMedia || !window.matchMedia('(pointer: fine)').matches) return;

  var spotlight = document.createElement('div');
  spotlight.className = 'spotlight';
  document.body.appendChild(spotlight);

  var tX = 0, tY = 0, cX = 0, cY = 0;
  var spotActive = true;

  document.addEventListener('mousemove', function (e) {
    tX = e.clientX;
    tY = e.clientY;
  }, { passive: true });

  // Pause animation when tab is hidden (saves CPU)
  document.addEventListener('visibilitychange', function () {
    spotActive = !document.hidden;
    if (spotActive) requestAnimationFrame(animateSpot);
  });

  function lerp(a, b, t) { return a + (b - a) * t; }

  function animateSpot() {
    if (!spotActive) return;
    cX = lerp(cX, tX, 0.06);
    cY = lerp(cY, tY, 0.06);
    spotlight.style.left = cX + 'px';
    spotlight.style.top  = cY + 'px';
    requestAnimationFrame(animateSpot);
  }

  requestAnimationFrame(animateSpot);
}

/* ============================================================
   NAVBAR
   ============================================================ */
function initNavbar() {
  var navbar    = document.getElementById('navbar');
  var hamburger = document.getElementById('hamburger');
  var navMenu   = document.getElementById('nav-menu');
  var navLinks  = document.querySelectorAll('.nav-link');
  var sections  = document.querySelectorAll('section');

  if (!navbar || !hamburger || !navMenu) return;

  window.addEventListener('scroll', function () {
    var scrollY = window.scrollY || window.pageYOffset;
    navbar.classList.toggle('scrolled', scrollY > 60);
  }, { passive: true });

  hamburger.addEventListener('click', function () {
    var isOpen = hamburger.getAttribute('aria-expanded') === 'true';
    hamburger.setAttribute('aria-expanded', String(!isOpen));
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
    document.body.style.overflow = !isOpen ? 'hidden' : '';
  });

  navLinks.forEach(function (link) {
    link.addEventListener('click', function () {
      hamburger.setAttribute('aria-expanded', 'false');
      hamburger.classList.remove('active');
      navMenu.classList.remove('active');
      document.body.style.overflow = '';
    });
  });

  // Active link highlight via IntersectionObserver (with fallback)
  var sectionObserver = createObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        navLinks.forEach(function (l) { l.classList.remove('active'); });
        var link = document.querySelector('a[href="#' + entry.target.id + '"]');
        if (link) link.classList.add('active');
      }
    });
  }, { threshold: 0.3, rootMargin: '-100px 0px -100px 0px' });

  sections.forEach(function (s) { sectionObserver.observe(s); });
}

/* ============================================================
   SECTION SCROLL ANIMATIONS
   ============================================================ */
function initSectionAnimations() {
  var animated = document.querySelectorAll(
    '.slide-in-left, .slide-in-right, .slide-in-up, .animate-on-scroll, .section-title'
  );

  var observer = createObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  animated.forEach(function (el) { observer.observe(el); });
}

/* ============================================================
   SKILL TAGS — staggered cascade
   ============================================================ */
function initSkillTagAnimations() {
  var tags = document.querySelectorAll('.skill-tag');
  var grid = document.querySelector('.skills-grid');
  if (!grid) return;

  var triggered = false;

  var observer = createObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting && !triggered) {
        triggered = true;
        tags.forEach(function (tag, i) {
          setTimeout(function () {
            tag.classList.add('is-visible');
          }, i * 70);
        });
        observer.disconnect();
      }
    });
  }, { threshold: 0.2 });

  observer.observe(grid);
}

/* ============================================================
   PROJECT CARDS — reveal + 3D tilt (desktop only)
   ============================================================ */
function initProjectCardTilt() {
  var cards = document.querySelectorAll('.project-card');

  // Staggered reveal
  var revealObserver = createObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -30px 0px' });

  cards.forEach(function (card) { revealObserver.observe(card); });

  // 3D tilt — pointer:fine only
  if (!window.matchMedia || !window.matchMedia('(pointer: fine)').matches) return;

  var MAX_TILT = 8;
  var SCALE    = 1.025;

  cards.forEach(function (card) {
    card.addEventListener('mousemove', function (e) {
      var rect = card.getBoundingClientRect();
      var x = (e.clientX - rect.left) / rect.width  - 0.5;
      var y = (e.clientY - rect.top)  / rect.height - 0.5;

      var rotX =  y * MAX_TILT * -1;
      var rotY =  x * MAX_TILT;

      card.style.background = 'radial-gradient(circle at ' +
        ((x + 0.5) * 100) + '% ' + ((y + 0.5) * 100) + '%, ' +
        'rgba(255,215,0,0.07) 0%, rgba(0,0,0,0.3) 60%)';

      card.style.transform = 'perspective(1000px) rotateX(' + rotX + 'deg) rotateY(' + rotY + 'deg) scale(' + SCALE + ')';
      card.style.webkitTransform = card.style.transform;
      card.style.transition = 'transform 0.08s ease, box-shadow 0.4s ease, border-color 0.4s ease';
    });

    card.addEventListener('mouseleave', function () {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)';
      card.style.webkitTransform = card.style.transform;
      card.style.background = '';
      card.style.transition = 'transform 0.6s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.4s ease, border-color 0.4s ease';
    });

    card.addEventListener('mouseenter', function () {
      card.style.transition = 'transform 0.08s ease, box-shadow 0.4s ease, border-color 0.4s ease';
    });
  });
}

/* ============================================================
   RIPPLE EFFECT
   ============================================================ */
function initRippleButtons() {
  var buttons = document.querySelectorAll(
    '.glow-genz-button, .outline-button, .project-link, .hero-social a'
  );

  buttons.forEach(function (btn) {
    btn.addEventListener('click', function (e) {
      var rect = this.getBoundingClientRect();
      var size = Math.max(rect.width, rect.height) * 2;
      var x = e.clientX - rect.left - size / 2;
      var y = e.clientY - rect.top  - size / 2;

      var ripple = document.createElement('span');
      ripple.className = 'ripple';
      ripple.style.cssText = 'width:' + size + 'px;height:' + size + 'px;left:' + x + 'px;top:' + y + 'px;';
      this.appendChild(ripple);
      setTimeout(function () {
        if (ripple.parentNode) ripple.parentNode.removeChild(ripple);
      }, 650);
    });
  });
}

/* ============================================================
   ORBIT ANIMATIONS — pause all groups on hover
   ============================================================ */
function initOrbitAnimations() {
  var sunCore     = document.querySelector('.sun-core');
  var planets     = document.querySelectorAll('.planet');
  var orbitGroups = document.querySelectorAll('.orbit-group');

  if (!sunCore) return;

  var delay1 = -(Math.random() * 100).toFixed(2);
  var delay2 = -(Math.random() * 100).toFixed(2);
  var delay3 = -(Math.random() * 100).toFixed(2);
  var delay4 = -(Math.random() * 100).toFixed(2);
  var delay5 = -(Math.random() * 100).toFixed(2);
  var delay6 = -(Math.random() * 100).toFixed(2);

  var styleEl = document.createElement('style');
  styleEl.textContent =
    '.orbit-paused { animation-play-state: paused !important; -webkit-animation-play-state: paused !important; }' +
    '.orbit-paused .planet { animation-play-state: paused !important; -webkit-animation-play-state: paused !important; }\n' +
    '.orbit-group-1, .orbit-group-1 .planet { animation-delay: ' + delay1 + 's !important; }\n' +
    '.orbit-group-2, .orbit-group-2 .planet { animation-delay: ' + delay2 + 's !important; }\n' +
    '.orbit-group-3, .orbit-group-3 .planet { animation-delay: ' + delay3 + 's !important; }\n' +
    '.orbit-group-4, .orbit-group-4 .planet { animation-delay: ' + delay4 + 's !important; }\n' +
    '.orbit-group-5, .orbit-group-5 .planet { animation-delay: ' + delay5 + 's !important; }\n' +
    '.orbit-group-6, .orbit-group-6 .planet { animation-delay: ' + delay6 + 's !important; }';
  document.head.appendChild(styleEl);

  function pauseOrbits()  { orbitGroups.forEach(function(g) { g.classList.add('orbit-paused'); }); }
  function resumeOrbits() { orbitGroups.forEach(function(g) { g.classList.remove('orbit-paused'); }); }

  sunCore.addEventListener('mouseenter', pauseOrbits);
  sunCore.addEventListener('mouseleave', resumeOrbits);
  planets.forEach(function(p) {
    p.addEventListener('mouseenter', function() { p.closest('.orbit-group').classList.add('orbit-paused'); });
    p.addEventListener('mouseleave', function() { p.closest('.orbit-group').classList.remove('orbit-paused'); });
  });
}

/* ============================================================
   SMOOTH SCROLL
   ============================================================ */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(function (link) {
    link.addEventListener('click', function (e) {
      var targetId = this.getAttribute('href').slice(1);
      var target   = document.getElementById(targetId);
      if (!target) return;
      e.preventDefault();

      var offsetTop = window.pageYOffset + target.getBoundingClientRect().top - 80;

      // Use smooth scroll if supported, else fallback
      if ('scrollBehavior' in document.documentElement.style) {
        window.scrollTo({ top: offsetTop, behavior: 'smooth' });
      } else {
        // Animated fallback for older browsers
        var start    = window.pageYOffset;
        var distance = offsetTop - start;
        var duration = 600;
        var startTime = null;

        function ease(t) { return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t; }

        function step(timestamp) {
          if (!startTime) startTime = timestamp;
          var progress = Math.min((timestamp - startTime) / duration, 1);
          window.scrollTo(0, start + distance * ease(progress));
          if (progress < 1) requestAnimationFrame(step);
        }

        requestAnimationFrame(step);
      }
    });
  });
}

/* ============================================================
   CONTACT FORM
   ============================================================ */
function initContactForm() {
  var form = document.getElementById('contact-form');
  if (!form) return;

  // Floating label upgrade
  form.querySelectorAll('.form-group').forEach(function (group) {
    var input = group.querySelector('input, textarea');
    var lbl   = group.querySelector('label');
    if (!input || !lbl) return;

    group.classList.add('floating-label');
    if (input.tagName === 'TEXTAREA') group.classList.add('textarea-group');

    if (input.nextSibling !== lbl) input.after(lbl);

    lbl.classList.remove('sr-only');
    input.placeholder = ' ';
  });

  // Submit handler
  var statusEl = document.getElementById('form-status');

  function setStatus(text, kind) {
    if (!statusEl) return;
    statusEl.textContent = text;
    statusEl.classList.remove('success', 'error');
    if (kind) statusEl.classList.add(kind);
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    var btn      = form.querySelector('button[type="submit"]');
    var origText = btn.innerHTML;
    var lang     = storage.get('language', 'pt');

    var msgs = {
      pt: { sending: 'Enviando…', success: 'Mensagem enviada! ✓', error: 'Falha ao enviar: ',  noEmailJS: 'Serviço de e-mail indisponível. Tente novamente mais tarde.' },
      en: { sending: 'Sending…',  success: 'Message sent! ✓',     error: 'Failed to send: ',   noEmailJS: 'Email service unavailable. Please try again later.' }
    };

    // Guard: EmailJS may not be loaded (ad-blocker, offline, etc.)
    if (typeof emailjs === 'undefined' || !emailjs || !emailjs.sendForm) {
      setStatus(msgs[lang].noEmailJS, 'error');
      return;
    }

    btn.disabled      = true;
    btn.style.opacity = '0.7';
    setStatus(msgs[lang].sending, null);

    emailjs.sendForm('service_7ns62tk', 'template_nwlw00d', form)
      .then(function () {
        setStatus(msgs[lang].success, 'success');
        form.reset();

        setTimeout(function () {
          btn.innerHTML        = origText;
          btn.disabled         = false;
          btn.style.opacity    = '';
          btn.style.background = '';
        }, 3500);
      })
      .catch(function (err) {
        setStatus(msgs[lang].error + (err.text || err), 'error');
        btn.innerHTML     = origText;
        btn.disabled      = false;
        btn.style.opacity = '';
        console.error('EmailJS error:', err);
      });
  });
}

/* ============================================================
   LANGUAGE TOGGLE (i18n)
   ============================================================ */
function initLanguageToggle() {
  var langToggle = document.getElementById('language-toggle');
  if (!langToggle) return;

  var translations = {
    pt: {
      'nav-home': 'Início',
      'nav-about': 'Sobre',
      'nav-services': 'Serviços',
      'nav-projects': 'Projetos',
      'nav-contact': 'Contato',
      'services-title': 'Serviços',
      'services-subtitle': 'O que eu entrego — código limpo, prazo combinado e comunicação direta.',
      'service1-title': 'Criação & Manutenção de APIs REST',
      'service1-desc': 'Desenvolvimento de APIs RESTful com Java e Spring Boot — autenticação JWT, documentação Swagger, testes com JUnit e Mockito, deploy com Docker.',
      'service1-back-title': 'Disponível em',
      'service1-back-desc': 'Código limpo, arquitetura pensada e entrega no prazo. Me encontre nas plataformas abaixo:',
      'service2-title': 'Sites & Landing Pages',
      'service2-desc': 'Sites e landing pages para micro e pequenas empresas sem presença online. Do zero ao ar, com identidade visual, responsividade total e hospedagem inclusa.',
      'service2-back-title': 'Fale comigo',
      'service2-back-desc': 'Atendo micro e pequenas empresas em Suzano/SP e região. Me chame pelo WhatsApp ou Instagram:',
      'flip-hint': 'Ver onde contratar →',
      'flip-hint-2': 'Ver como contratar →',
      'photo-placeholder': 'Sua foto aqui',
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
      'project1-title': 'GamifyAPI',
      'project1-desc': 'Plataforma de gamificação pronta para ser integrada em apps, plataformas educacionais e sistemas de fidelidade. Com suporte multi-tenant, oferece XP, conquistas, streaks, leaderboard e webhooks assíncronos para engajar usuários via mecânicas de jogo.',
      'project2-desc': 'Um jogo roguelike clássico desenvolvido em Java puro, jogado direto no terminal. Explore masmorras geradas proceduralmente, colete itens, derrote inimigos e tente sobreviver o máximo de níveis possível!',
      'project3-title': 'API Amigo Secreto 2.0',
      'project3-desc': 'API REST moderna e completa para gerenciar sorteios de amigo secreto de forma digital e automatizada. Desenvolvida com Spring Boot, oferece recursos avançados de gerenciamento de grupos, algoritmo de sorteio inteligente e sistema de mensagens anônimas.',
      'project4-title': 'Kytrionyx AI',
      'project4-desc': 'Kytrionyx AI é uma interface web completa e local para interagir com modelos de linguagem open source via Ollama. Um assistente de IA que roda inteiramente no seu hardware, sem enviar dados para servidores externos.',
      'project4-tech': 'IA Local',
      'project5-title': 'Gerenciador de Times e Jogadores',
      'project5-desc': 'Sistema completo em Java para gerenciamento de times de futebol e seus jogadores, com persistência de dados e interface de linha de comando intuitiva.',
      'project6-title': "Otavio's Bank — Sistema Bancário (Java POO)",
      'project6-desc': 'Um sistema bancário completo desenvolvido em Java que demonstra os principais conceitos de Programação Orientada a Objetos (POO), oferecendo uma experiência bancária simulada com funcionalidades modernas como PIX e investimentos.',
      'project7-title': 'CommitGen AI — Gerador de Commits com IA',
      'project7-desc': 'Aplicação web que utiliza o modelo LLaMA 3.3 70B via GroqCloud para gerar mensagens de commit semânticas. Cole o git diff, escolha o estilo (Conventional Commits, Gitmoji ou Simple) e receba sugestões prontas para usar.',
      'project8-title': 'Galope Furioso — Simulador de Corrida no Terminal',
      'project8-desc': 'Simulador de corrida de cavalos no terminal feito em Java. Com animações em tempo real, contagem regressiva, pódio completo e suporte a múltiplas corridas — tudo via linha de comando.',
      'project9-title': 'Provisionamento Automático de Servidor Web',
      'project9-desc': 'Scripts Shell que automatizam com um único comando o provisionamento completo de um servidor Apache2: firewall UFW, cabeçalhos de segurança, página responsiva, monitoramento e desinstalação — Infraestrutura como Código.',
      'project10-desc': 'Aplicação full-stack para otimizar currículos para sistemas ATS, com backend em Java 17, Spring Boot e IA generativa via NVIDIA NIM.',
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
      'nav-services': 'Services',
      'nav-projects': 'Projects',
      'nav-contact': 'Contact',
      'services-title': 'Services',
      'services-subtitle': 'What I deliver — clean code, agreed deadlines and direct communication.',
      'service1-title': 'REST API Development & Maintenance',
      'service1-desc': 'RESTful APIs with Java and Spring Boot — JWT authentication, Swagger docs, JUnit and Mockito tests, Docker deployment.',
      'service1-back-title': 'Available on',
      'service1-back-desc': 'Clean code, thoughtful architecture and on-time delivery. Find me on the platforms below:',
      'service2-title': 'Websites & Landing Pages',
      'service2-desc': 'Sites and landing pages for micro and small businesses without an online presence. From zero to live, with visual identity, full responsiveness and hosting included.',
      'service2-back-title': 'Get in touch',
      'service2-back-desc': 'I serve micro and small businesses in Suzano/SP and the region. Reach me via WhatsApp or Instagram:',
      'flip-hint': 'See where to hire →',
      'flip-hint-2': 'See how to hire →',
      'photo-placeholder': 'Your photo here',
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
      'project1-title': 'GamifyAPI',
      'project1-desc': 'Gamification platform ready to be integrated into apps, educational platforms and loyalty systems. With multi-tenant support, it offers XP, achievements, streaks, leaderboards and async webhooks to engage users through game mechanics.',
      'project2-desc': 'A classic roguelike game developed in pure Java, played directly in the terminal. Explore procedurally generated dungeons, collect items, defeat enemies and try to survive as many levels as possible!',
      'project3-title': 'Secret Santa API 2.0',
      'project3-desc': 'Modern and complete REST API to manage secret santa draws digitally and automatically. Developed with Spring Boot, it offers advanced group management features, intelligent draw algorithm and anonymous messaging system.',
      'project4-title': 'Kytrionyx AI',
      'project4-desc': 'Kytrionyx AI is a complete local web interface to interact with open-source language models via Ollama. An AI assistant that runs entirely on your own hardware, without sending data to external servers.',
      'project4-tech': 'Local AI',
      'project5-title': 'Teams and Players Manager',
      'project5-desc': 'Complete Java system for managing soccer teams and their players, with data persistence and intuitive command-line interface.',
      'project6-title': "Otavio's Bank — Banking System (Java OOP)",
      'project6-desc': 'A complete banking system developed in Java that demonstrates the main concepts of Object-Oriented Programming (OOP), offering a simulated banking experience with modern features like PIX and investments.',
      'project7-title': 'CommitGen AI — AI-powered Commit Generator',
      'project7-desc': 'Web application that uses LLaMA 3.3 70B via GroqCloud to generate semantic commit messages. Paste your git diff, choose a style (Conventional Commits, Gitmoji or Simple) and get ready-to-use suggestions.',
      'project8-title': 'Galope Furioso — Terminal Horse Racing Simulator',
      'project8-desc': 'Terminal horse racing simulator built in Java. Features real-time animations, animated countdown, full podium display and support for multiple races — all via command line.',
      'project9-title': 'Automated Web Server Provisioning',
      'project9-desc': 'Shell scripts that fully automate web server provisioning with a single command: Apache2, UFW firewall, security headers, responsive page, monitoring and clean uninstall — Infrastructure as Code.',
      'project10-desc': 'Full-stack application to optimize resumes for Applicant Tracking Systems (ATS), with a Java 17 backend, Spring Boot, and generative AI powered by NVIDIA NIM.',
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

  var currentLang = storage.get('language', 'pt');
  applyLanguage(currentLang);

  langToggle.addEventListener('click', function () {
    currentLang = currentLang === 'pt' ? 'en' : 'pt';
    storage.set('language', currentLang);
    applyLanguage(currentLang);
  });

  function applyLanguage(lang) {
    var htmlRoot = document.getElementById('html-root');
    if (htmlRoot) htmlRoot.setAttribute('lang', lang === 'pt' ? 'pt-BR' : 'en');

    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      var key = el.getAttribute('data-i18n');
      if (translations[lang] && translations[lang][key] !== undefined) {
        el.innerHTML = translations[lang][key];
      }
    });

    document.querySelectorAll('[data-i18n-placeholder]').forEach(function (el) {
      var key = el.getAttribute('data-i18n-placeholder');
      if (translations[lang] && translations[lang][key] !== undefined) {
        el.placeholder = ' '; // Preserve floating label CSS trigger
        el.setAttribute('aria-label', translations[lang][key]);
      }
    });

    document.querySelectorAll('.form-group label[data-i18n]').forEach(function (lbl) {
      var key = lbl.getAttribute('data-i18n');
      if (translations[lang] && translations[lang][key]) {
        lbl.textContent = translations[lang][key];
      }
    });

    var langText = langToggle.querySelector('.lang-text');
    if (langText) langText.textContent = lang === 'pt' ? 'PT' : 'EN';
    langToggle.setAttribute('aria-label', lang === 'pt' ? 'Alternar idioma' : 'Switch language');

    updateCVLink(lang);
  }

  function updateCVLink(lang) {
    var cv = document.getElementById('cv-download');
    if (cv) cv.href = lang === 'en' ? 'Otavio_Guedes_Resume.pdf' : 'Otavio_Guedes_Curriculo.pdf';
  }
}
