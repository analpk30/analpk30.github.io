/**
 * Analp Kalore - Developer Portfolio
 * Page transitions and client interactions
 */

document.addEventListener('DOMContentLoaded', () => {
  initAdvancedCanvas();
  initHeaderScroll();
  initPageTransitions();
  initMobileNav();
  initScrollspy();
  initCopyEmail();
  initCenteredNavScroll();
  initHeroVisual();
  initParallax();
  initProjectsCarousel();
  initThemeButton();
  initCustomCursor();
  initScrollDots();
  initRoleTypewriter();
});

/* ==========================================================================
   1. Advanced Subtle Tech Canvas Background
      Clean, non-distracting constellation mesh with cursor illumination.
      Professional, calm, and recruiter-focused (no gaming arcade glyphs).
   ========================================================================== */
function initAdvancedCanvas() {
  const canvas = document.getElementById('bg-canvas');
  if (!canvas) return;

  // Dot line animation is removed from the main page only; remains active on subpages
  const isMainPage = Boolean(document.querySelector('.main-home') || document.getElementById('home'));
  if (isMainPage) return;

  const ctx = canvas.getContext('2d');
  let W = window.innerWidth;
  let H = window.innerHeight;
  canvas.width = W;
  canvas.height = H;

  // Smooth mouse coordinates tracking with lerp
  const mouse = { x: -1000, y: -1000, currentX: -1000, currentY: -1000, radius: 150 };

  window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });

  window.addEventListener('mouseleave', () => {
    mouse.x = -1000;
    mouse.y = -1000;
  });

  window.addEventListener('resize', () => {
    W = window.innerWidth;
    H = window.innerHeight;
    canvas.width = W;
    canvas.height = H;
    createNodes();
  });

  let nodes = [];

  class TechNode {
    constructor() {
      this.x = Math.random() * W;
      this.y = Math.random() * H;
      this.vx = (Math.random() - 0.5) * 0.28;
      this.vy = (Math.random() - 0.5) * 0.28;
      this.radius = Math.random() * 1.3 + 0.9;
      
      // Aesthetic multi-color distribution: Faded Slate/White, Ruby Red, and Warm Gold
      const rand = Math.random();
      if (document.documentElement.getAttribute('data-theme') === 'light') {
        if (rand < 0.50) {
          this.color = { r: 120, g: 80, b: 40 };   // Warm brown
          this.alpha = Math.random() * 0.22 + 0.16;
        } else if (rand < 0.80) {
          this.color = { r: 194, g: 65, b: 12 };   // Burnt orange
          this.alpha = Math.random() * 0.25 + 0.2;
        } else {
          this.color = { r: 217, g: 119, b: 6 };   // Amber
          this.alpha = Math.random() * 0.25 + 0.2;
        }
      } else if (rand < 0.50) {
        this.color = { r: 160, g: 168, b: 180 }; // Faded Slate Grey / White
        this.alpha = Math.random() * 0.22 + 0.12;
      } else if (rand < 0.80) {
        this.color = { r: 225, g: 29, b: 72 };   // Aesthetic Ruby Red
        this.alpha = Math.random() * 0.28 + 0.18;
      } else {
        this.color = { r: 245, g: 158, b: 11 };  // Warm Gold
        this.alpha = Math.random() * 0.25 + 0.16;
      }
    }

    update() {
      // Soft repulsion from cursor
      const dx = this.x - mouse.x;
      const dy = this.y - mouse.y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < mouse.radius) {
        const force = (mouse.radius - dist) / mouse.radius;
        this.vx += (dx / dist) * force * 0.025;
        this.vy += (dy / dist) * force * 0.025;
      }

      // Gentle damping
      this.vx *= 0.99;
      this.vy *= 0.99;

      this.x += this.vx;
      this.y += this.vy;

      // Wrap around viewport edges
      if (this.x < -10) this.x = W + 10;
      if (this.x > W + 10) this.x = -10;
      if (this.y < -10) this.y = H + 10;
      if (this.y > H + 10) this.y = -10;
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, ${this.alpha})`;
      ctx.fill();
    }
  }

  function createNodes() {
    nodes = [];
    const count = Math.min(70, Math.floor((W * H) / 17000));
    for (let i = 0; i < count; i++) {
      nodes.push(new TechNode());
    }
  }

  createNodes();
  window.addEventListener('themechange', createNodes);

  // Animation Loop
  function animate() {
    ctx.clearRect(0, 0, W, H);

    // 1. Soft subtle radial glow around mouse cursor (Red & Gold aura)
    if (mouse.x > 0 && mouse.y > 0) {
      const gradient = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, 190);
      gradient.addColorStop(0, 'rgba(225, 29, 72, 0.04)');
      gradient.addColorStop(0.5, 'rgba(245, 158, 11, 0.015)');
      gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, W, H);
    }

    // 2. Connecting faint lines between nearby nodes
    const maxLinkDist = 135;
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const n1 = nodes[i];
        const n2 = nodes[j];

        const dx = n1.x - n2.x;
        const dy = n1.y - n2.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < maxLinkDist) {
          const lineAlpha = (1 - dist / maxLinkDist) * 0.12;
          ctx.beginPath();
          ctx.moveTo(n1.x, n1.y);
          ctx.lineTo(n2.x, n2.y);
          ctx.strokeStyle = `rgba(${n1.color.r}, ${n1.color.g}, ${n1.color.b}, ${lineAlpha})`;
          ctx.lineWidth = 0.65;
          ctx.stroke();
        }
      }
    }

    // 3. Draw nodes
    for (let i = 0; i < nodes.length; i++) {
      nodes[i].update();
      nodes[i].draw();
    }

    requestAnimationFrame(animate);
  }

  animate();
}

/* ==========================================================================
   2. Mobile Drawer Navigation Toggle
   ========================================================================== */
function initMobileNav() {
  const toggleBtn = document.getElementById('mobile-toggle');
  const drawer = document.getElementById('mobile-drawer');

  if (!toggleBtn || !drawer) return;

  toggleBtn.addEventListener('click', () => {
    const isOpen = drawer.classList.toggle('open');
    toggleBtn.setAttribute('aria-expanded', isOpen.toString());
  });

  // Close drawer when any mobile link is clicked
  drawer.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      drawer.classList.remove('open');
      toggleBtn.setAttribute('aria-expanded', 'false');
    });
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && drawer.classList.contains('open')) {
      drawer.classList.remove('open');
      toggleBtn.setAttribute('aria-expanded', 'false');
      toggleBtn.focus();
    }
  });
}

/* Helper: Compute true unscaled document offset top */
function getElementDocTop(el) {
  let top = 0;
  let curr = el;
  while (curr) {
    top += curr.offsetTop;
    curr = curr.offsetParent;
  }
  return top;
}

/* ==========================================================================
   Scrollspy Navigation Indicator
   Dynamically shifts active shade between section links on scroll
   ========================================================================== */
function initScrollspy() {
  const sectionIds = ['projects', 'system', 'achievements', 'contact'];
  const sections = sectionIds
    .map(id => document.getElementById(id))
    .filter(Boolean);

  if (sections.length === 0) return;

  const desktopLinks = document.querySelectorAll('.nav-desktop .nav-link');
  const mobileLinks = document.querySelectorAll('.mobile-drawer .mobile-link');

  function updateActive() {
    const scrollPos = window.scrollY || window.pageYOffset || document.documentElement.scrollTop || 0;
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;

    // Check if near bottom of document - activate About button (contact section)
    if (scrollPos + windowHeight >= documentHeight - 50) {
      setActive('contact');
      return;
    }

    // Responsive trigger line (around 32% of viewport height, bounded between 180px and 280px)
    const triggerOffset = Math.min(Math.max(windowHeight * 0.32, 180), 280);
    const triggerLine = scrollPos + triggerOffset;

    let currentId = null; // Stays null when in the hero section above projects

    for (let i = 0; i < sections.length; i++) {
      const section = sections[i];
      const secDocTop = getElementDocTop(section);
      if (triggerLine >= secDocTop) {
        currentId = section.id;
      }
    }

    setActive(currentId);
  }

  function setActive(id) {
    window.dispatchEvent(new CustomEvent('spychange', { detail: id || 'home' }));
    desktopLinks.forEach(link => {
      const href = link.getAttribute('href') || '';
      const isMatch = id ? href.endsWith(`#${id}`) : href.endsWith('#home');
      if (isMatch) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });

    mobileLinks.forEach(link => {
      const href = link.getAttribute('href') || '';
      const isMatch = id ? href.endsWith(`#${id}`) : href.endsWith('#home');
      if (isMatch) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  }

  // Smooth rAF throttling for jitter-free scroll responsiveness
  let ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        updateActive();
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });

  window.addEventListener('resize', updateActive, { passive: true });
  updateActive();
}

/* ==========================================================================
   3. Toast Notification
   ========================================================================== */
function showToast(message) {
  let toast = document.getElementById('site-toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'site-toast';
    toast.className = 'toast-msg';
    document.body.appendChild(toast);
  }
  toast.textContent = message;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 3200);
}

/* ==========================================================================
   4. Copy Email to Clipboard
   ========================================================================== */
function initCopyEmail() {
  const copyBtns = document.querySelectorAll('[data-copy-email]');
  copyBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      const email = btn.getAttribute('data-copy-email') || '';
      if (!email) return;

      const markSuccess = () => {
        showToast('Mail Copied : ' + email);
        btn.classList.add('copied');
        setTimeout(() => btn.classList.remove('copied'), 2200);
      };

      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(email)
          .then(markSuccess)
          .catch(() => {
            try {
              const tempInput = document.createElement('input');
              tempInput.value = email;
              document.body.appendChild(tempInput);
              tempInput.select();
              document.execCommand('copy');
              document.body.removeChild(tempInput);
              markSuccess();
            } catch (err) {
              window.location.href = 'mailto:' + email;
            }
          });
      } else {
        try {
          const tempInput = document.createElement('input');
          tempInput.value = email;
          document.body.appendChild(tempInput);
          tempInput.select();
          document.execCommand('copy');
          document.body.removeChild(tempInput);
          markSuccess();
        } catch (err) {
          window.location.href = 'mailto:' + email;
        }
      }
    });
  });
}

/* ==========================================================================
   8. Header Scroll Elevation
   Refines translucent glass depth smoothly as user scrolls past hero
   ========================================================================== */
function initHeaderScroll() {
  const header = document.querySelector('.site-header');
  if (!header) return;

  function onScroll() {
    const scrollPos = window.scrollY || window.pageYOffset || document.documentElement.scrollTop || 0;
    if (scrollPos > 15) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }

  let ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        onScroll();
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });

  onScroll();
}

/* ==========================================================================
   9. Page Transitions (Dual-Screen Black Shutters with Clean White Seam)
      Smooth closing (720ms) and opening (750ms).
      When navigating between portfolio pages (and returning), two black screens
      close inward with a solid white seam, and part smoothly on arrival.
   ========================================================================== */
function initPageTransitions() {
  // Ensure overlay DOM exists
  let overlay = document.getElementById('screen-split-overlay');
  if (!overlay) {
    overlay = document.createElement('div');
    overlay.id = 'screen-split-overlay';
    overlay.className = 'screen-split-overlay';
    overlay.setAttribute('aria-hidden', 'true');
    overlay.innerHTML = `
      <div class="split-curtain split-curtain-left"></div>
      <div class="split-curtain split-curtain-right"></div>
    `;
    document.body.prepend(overlay);
  }

  // Check if this page load is arriving from a portfolio page redirect transition
  let wasTransition = false;
  try {
    wasTransition = sessionStorage.getItem('portfolio_page_transition') === '1';
    if (wasTransition) {
      sessionStorage.removeItem('portfolio_page_transition');
    }
  } catch (err) {}

  try {
    if (window.location.search.indexOf('transition=1') !== -1) {
      wasTransition = true;
      const cleanUrl = new URL(window.location.href);
      cleanUrl.searchParams.delete('transition');
      window.history.replaceState({}, '', cleanUrl.pathname + cleanUrl.search + cleanUrl.hash);
    }
  } catch (err) {}

  if (wasTransition || document.documentElement.classList.contains('split-transition-active')) {
    overlay.classList.add('is-held-closed');

    // Prevent browser auto-scroll race conditions
    if ('scrollRestoration' in history) {
      try { history.scrollRestoration = 'manual'; } catch (e) {}
    }

    // Determine target section to restore on index.html
    let targetSectionId = window.location.hash ? window.location.hash.substring(1) : '';
    try {
      const savedSection = sessionStorage.getItem('portfolio_return_section');
      if (savedSection && !targetSectionId) {
        targetSectionId = savedSection;
      }
      if (savedSection) {
        sessionStorage.removeItem('portfolio_return_section');
      }
    } catch (e) {}

    // Position behind closed curtains instantly
    if (targetSectionId) {
      const targetEl = document.getElementById(targetSectionId);
      if (targetEl) {
        targetEl.scrollIntoView({ behavior: 'instant', block: 'start' });
      }
    }

    requestAnimationFrame(() => {
      // Re-affirm position in case layout rendered
      if (targetSectionId) {
        const targetEl = document.getElementById(targetSectionId);
        if (targetEl) {
          targetEl.scrollIntoView({ behavior: 'instant', block: 'start' });
        }
      }

      requestAnimationFrame(() => {
        if (targetSectionId) {
          const targetEl = document.getElementById(targetSectionId);
          if (targetEl) {
            targetEl.scrollIntoView({ behavior: 'instant', block: 'start' });
          }
        }

        document.documentElement.classList.remove('split-transition-active');
        overlay.classList.remove('is-held-closed');
        overlay.classList.remove('is-closing');
        overlay.classList.add('is-opening');

        setTimeout(() => {
          overlay.classList.remove('is-opening');
        }, 760);
      });
    });
  } else {
    document.documentElement.classList.remove('split-transition-active');
    overlay.classList.remove('is-closing', 'is-opening', 'is-held-closed');
  }

  // Handle browser back/forward cache (pageshow)
  window.addEventListener('pageshow', (e) => {
    if (e.persisted) {
      document.documentElement.classList.remove('split-transition-active');
      overlay.classList.remove('is-closing', 'is-opening', 'is-held-closed');
    }
  });

  // Support Browser Back Button with identical smooth closing transition
  const currentFileName = window.location.pathname.split('/').pop() || 'index.html';
  const isSubpage = ['projects.html'].includes(currentFileName);

  if (isSubpage && window.history && window.history.pushState) {
    try {
      if (!window.history.state || !window.history.state.isTransitionSubpage) {
        window.history.replaceState({ isTransitionSubpage: true, isBase: true }, '', window.location.href);
        window.history.pushState({ isTransitionSubpage: true, isTop: true }, '', window.location.href);
      }
    } catch (e) {}

    let isPoppingBack = false;
    window.addEventListener('popstate', () => {
      if (isPoppingBack) return;
      isPoppingBack = true;

      try {
        sessionStorage.setItem('portfolio_page_transition', '1');
      } catch (err) {}

      overlay.classList.remove('is-opening', 'is-held-closed');
      overlay.classList.add('is-closing');

      let returnSection = '';
      try {
        returnSection = sessionStorage.getItem('portfolio_return_section');
      } catch (e) {}
      if (!returnSection) {
        if (currentFileName === 'projects.html') returnSection = 'projects';
      }

      let destination = 'index.html' + (returnSection ? '#' + returnSection : '');
      try {
        const u = new URL(destination, window.location.href);
        u.searchParams.set('transition', '1');
        if (returnSection) u.hash = '#' + returnSection;
        destination = u.toString();
      } catch (e) {}

      setTimeout(() => {
        window.location.href = destination;
      }, 700);
    });
  }

  // Delegated click handler for navigation and transitions
  document.addEventListener('click', (e) => {
    const anchor = e.target.closest('a');
    if (!anchor) return;

    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || (e.button && e.button !== 0)) {
      return;
    }

    if (anchor.target && anchor.target !== '_self') return;
    if (anchor.hasAttribute('download')) return;

    const rawHref = anchor.getAttribute('href');
    if (!rawHref || rawHref.startsWith('javascript:') || rawHref.startsWith('mailto:') || rawHref.startsWith('tel:')) {
      return;
    }

    // In-page hash jumps on the same page (e.g., #home, #projects, #contact)
    if (rawHref.startsWith('#')) {
      anchor.classList.add('btn-clicked');
      setTimeout(() => anchor.classList.remove('btn-clicked'), 300);
      return;
    }

    // Redirection between different pages within the portfolio
    let targetUrl;
    try {
      targetUrl = new URL(anchor.href, window.location.href);
    } catch (err) {
      return;
    }

    if (targetUrl.origin !== window.location.origin) return;

    // Check if redirecting to a different page
    if (targetUrl.pathname === window.location.pathname && targetUrl.search === window.location.search) {
      return;
    }

    const portfolioPages = [
      '',
      '/',
      'index.html',
      'projects.html',
    ];

    const targetFile = targetUrl.pathname.split('/').pop();
    const isTargetPortfolioPage = portfolioPages.includes(targetFile) || targetUrl.pathname.endsWith('/');

    if (!isTargetPortfolioPage) return;

    // Trigger smooth closing transition and navigate
    e.preventDefault();
    anchor.classList.add('btn-clicked');

    // If navigating away from index.html, remember which section the visitor was on
    const isLeavingIndex = currentFileName === 'index.html' || currentFileName === '';
    if (isLeavingIndex) {
      let originSection = anchor.closest('section[id]')?.id || '';
      if (!originSection) {
        if (targetFile === 'projects.html') originSection = 'projects';
      }
      if (originSection) {
        try {
          sessionStorage.setItem('portfolio_return_section', originSection);
        } catch (err) {}
      }
    }

    try {
      sessionStorage.setItem('portfolio_page_transition', '1');
    } catch (err) {}

    overlay.classList.remove('is-opening', 'is-held-closed');
    overlay.classList.add('is-closing');

    // If navigating back to index.html from a subpage, ensure target section hash is included
    let destinationUrl = anchor.href;
    try {
      const u = new URL(anchor.href, window.location.href);
      const isTargetIndex = u.pathname.endsWith('index.html') || u.pathname.endsWith('/');
      if (isTargetIndex && !u.hash) {
        let returnSection = '';
        try {
          returnSection = sessionStorage.getItem('portfolio_return_section');
        } catch (e) {}
        if (!returnSection) {
          if (currentFileName === 'projects.html') returnSection = 'projects';
        }
        if (returnSection) {
          u.hash = '#' + returnSection;
        }
      }
      u.searchParams.set('transition', '1');
      destinationUrl = u.toString();
    } catch (e) {}

    setTimeout(() => {
      window.location.href = destinationUrl;
    }, 700);

    setTimeout(() => {
      overlay.classList.remove('is-closing');
    }, 3000);
  });
}

/* ==========================================================================
   4. Proper Center-Screen Smooth Navigation Scrolling
      Centers targeted sections (Projects, Achievements, About) directly in the
      middle of the viewport upon clicking navigation buttons.
   ========================================================================== */
function scrollToSectionMiddle(targetEl) {
  if (!targetEl) return;
  const vh = window.innerHeight;
  const header = document.querySelector('.site-header');
  const headerHeight = header ? header.offsetHeight : 72;
  const visualMiddle = headerHeight + (vh - headerHeight) / 2;
  const availableHeight = vh - headerHeight;

  const elTop = getElementDocTop(targetEl);
  const elHeight = targetEl.offsetHeight;

  let targetScrollY;
  if (elHeight <= availableHeight) {
    targetScrollY = Math.round((elTop + elHeight / 2) - visualMiddle);
  } else {
    targetScrollY = Math.round(elTop - headerHeight - 16);
  }

  const maxScroll = Math.max(0, document.documentElement.scrollHeight - vh);
  targetScrollY = Math.max(0, Math.min(maxScroll, targetScrollY));

  window.scrollTo({
    top: targetScrollY,
    behavior: 'smooth'
  });
}

function initCenteredNavScroll() {
  // Capture all navigation and in-page anchor links
  document.querySelectorAll('a[href^="#"], a[href*="index.html#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const rawHref = link.getAttribute('href');
      if (!rawHref) return;

      const hashIndex = rawHref.indexOf('#');
      if (hashIndex === -1) return;
      const hash = rawHref.slice(hashIndex);
      if (!hash || hash === '#' || hash === '#main') return;

      const targetId = hash.slice(1);
      const targetEl = document.getElementById(targetId);
      if (!targetEl) return;

      e.preventDefault();
      if (targetId === 'home') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        scrollToSectionMiddle(targetEl);
      }

      try {
        history.pushState(null, '', hash);
      } catch (err) {}
    });
  });

  // Handle initial page load with a hash (e.g. index.html#contact)
  if (window.location.hash) {
    const hash = window.location.hash;
    const initialTarget = document.getElementById(hash.slice(1));
    if (initialTarget) {
      setTimeout(() => {
        scrollToSectionMiddle(initialTarget);
      }, 150);
    }
  }

  // Smooth scroll to top when clicking brand logo on home page
  const brandLogo = document.querySelector('.brand-logo');
  if (brandLogo) {
    brandLogo.addEventListener('click', (e) => {
      const href = brandLogo.getAttribute('href') || '';
      const isHomePage = window.location.pathname.endsWith('index.html') || window.location.pathname.endsWith('/') || window.location.pathname === '';
      if (isHomePage && (href === 'index.html' || href === '/' || href.startsWith('#'))) {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
        try {
          history.pushState(null, '', window.location.pathname);
        } catch (err) {}
      }
    });
  }
}

/* ==========================================================================
   5. Continuous Middle-Aligned Parallax (Foreground Interfaces Only)
      Kinetic damped lerp for buttery lag-free 60fps/120fps smoothness.
      Sections expand to 1.0 scale and 100% opacity in middle of screen,
      and shrink/fade when moving up or down away from middle.
      All cards and section boxes stay level in the same horizontal line.
      Background canvas (#bg-canvas) and video layer (#video-bg-wrapper)
      remain completely fixed, isolated, and undisturbed.
   ========================================================================== */
function initParallax() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return;
  }

  // Parallax effect is active ONLY on the main home page (index.html).
  // Subpages (e.g. projects.html) use clean, standard native scrolling without parallax.
  // use clean, standard native scrolling without any scaling or fading parallax.
  const isMainPage = Boolean(document.querySelector('.main-home') && document.getElementById('home'));
  if (!isMainPage) {
    return;
  }

  // 1. Hero Section cached elements
  const heroSection = document.getElementById('home');
  const heroName = heroSection ? heroSection.querySelector('.hero-name-center') : null;
  const heroRole = heroSection ? heroSection.querySelector('.hero-role-center') : null;
  const heroBio = heroSection ? heroSection.querySelector('.hero-bio-center') : null;
  const heroSkills = heroSection ? heroSection.querySelector('.quick-skills-strip') : null;

  // 2. Sections cached elements (Projects, Achievements, About)
  // 'system' and 'contact' (Overview) are intentionally left out: scaling/fading their text made it look dim and blurry.
  const sectionIds = ['projects', 'achievements'];
  const sections = sectionIds.map(id => document.getElementById(id)).filter(Boolean);

  const sectionData = sections.map(sec => ({
    sec,
    top: 0,
    height: 0
  }));

  // Pre-measure section coordinates to eliminate layout thrashing during scroll
  function measureLayout() {
    sectionData.forEach(item => {
      item.top = getElementDocTop(item.sec);
      item.height = item.sec.offsetHeight;
    });
  }

  measureLayout();

  // Kinetic damped smoothing loop state
  let currentScrollY = window.scrollY || window.pageYOffset || 0;
  let targetScrollY = currentScrollY;
  let isTicking = false;

  function render(scrollY) {
    const vh = window.innerHeight;
    const header = document.querySelector('.site-header');
    const headerHeight = header ? header.offsetHeight : 72;
    const availableHeight = vh - headerHeight;
    const visualMiddle = headerHeight + availableHeight / 2;
    const viewportCenter = scrollY + visualMiddle;

    // A. Hero Section 3D Recede & Name Shrinking (Vice Versa)
    if (heroSection) {
      if (scrollY <= vh * 1.35) {
        // Starts transition immediately as scrolling begins from top (no delay)
        let p = 0;
        if (scrollY > 25) {
          p = Math.min(1.0, (scrollY - 25) / (vh * 0.55));
        }

        // 1. Name shrinks smoothly into 3D backward depth on scroll
        const nameScale = (1.0 - p * 0.54).toFixed(3);
        const nameY = (p * 40).toFixed(1);
        const nameOpacity = Math.max(0, 1.0 - p * 1.25).toFixed(3);

        if (heroName) {
          heroName.style.setProperty('--name-scale', nameScale);
          heroName.style.setProperty('--name-y', `${nameY}px`);
          heroName.style.setProperty('--name-opacity', nameOpacity);
        }

        // 2. Below text (role, bio, skills) steps forward in sync
        const roleScale = (1.0 + p * 0.02).toFixed(3);
        const roleY = (p * 50).toFixed(1);
        const roleOpacity = Math.max(0, 1.0 - p * 1.15).toFixed(3);

        if (heroRole) {
          heroRole.style.setProperty('--role-scale', roleScale);
          heroRole.style.setProperty('--role-y', `${roleY}px`);
          heroRole.style.setProperty('--role-opacity', roleOpacity);
        }

        if (heroBio) {
          heroBio.style.setProperty('--role-scale', roleScale);
          heroBio.style.setProperty('--role-y', `${roleY}px`);
          heroBio.style.setProperty('--role-opacity', roleOpacity);
        }

        if (heroSkills) {
          heroSkills.style.setProperty('--role-scale', roleScale);
          heroSkills.style.setProperty('--role-y', `${(p * 45).toFixed(1)}px`);
          heroSkills.style.setProperty('--role-opacity', roleOpacity);
        }

        const heroSectionOpacity = Math.max(0, 1.0 - p * 1.15).toFixed(3);
        heroSection.style.setProperty('--section-opacity', heroSectionOpacity);
      } else {
        if (heroSection.style.getPropertyValue('--section-opacity') !== '0') {
          heroSection.style.setProperty('--section-opacity', '0');
        }
      }
    }

    // B. Sections Middle-Aligned Parallax:
    // When centered in middle, section is in 100% original crisp look (scale 1.0, opacity 1.0).
    // The transition begins immediately from that point as you scroll away (no delay).
    // All cards stay strictly level in the same horizontal line without vertical shifts.
    // Light theme: keep sections readable (higher fade floor).
    const isLight = document.documentElement.getAttribute('data-theme') === 'light';
    const fadeFloor = isLight ? 0.6 : 0.20;

    for (let i = 0; i < sectionData.length; i++) {
      const item = sectionData[i];
      let dist = 0;

      if (item.height <= availableHeight) {
        const secCenter = item.top + item.height / 2;
        dist = secCenter - viewportCenter;
      } else {
        const centerTop = item.top + availableHeight / 2;
        const centerBottom = item.top + item.height - availableHeight / 2;
        if (viewportCenter < centerTop) {
          dist = centerTop - viewportCenter;
        } else if (viewportCenter > centerBottom) {
          dist = centerBottom - viewportCenter;
        } else {
          dist = 0;
        }
      }

      // Only calculate if in or near viewport
      if (Math.abs(dist) < vh * 0.95 + item.height / 2) {
        const absDist = Math.abs(dist);
        let secScale = 1.0;
        let secOpacity = 1.0;

        // Transition starts immediately as scrolling begins away from middle (no delay)
        if (absDist > 25) {
          const norm = Math.min(1.0, (absDist - 25) / (availableHeight * 0.58));
          secScale = (1.0 - norm * 0.12).toFixed(3);
          secOpacity = Math.max(fadeFloor, 1.0 - norm * (1 - fadeFloor)).toFixed(3);
        }

        item.sec.style.setProperty('--section-scale', secScale);
        item.sec.style.setProperty('--section-opacity', secOpacity);
      }
    }
  }

  // Liquid kinetic smoothing animation loop
  function loop() {
    const diff = targetScrollY - currentScrollY;

    if (Math.abs(diff) > 0.08) {
      currentScrollY += diff * 0.22;
      render(currentScrollY);
      requestAnimationFrame(loop);
    } else {
      currentScrollY = targetScrollY;
      render(currentScrollY);
      isTicking = false;
    }
  }

  function onScroll() {
    targetScrollY = window.scrollY || window.pageYOffset || document.documentElement.scrollTop || 0;
    if (!isTicking) {
      isTicking = true;
      requestAnimationFrame(loop);
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });

  window.addEventListener('resize', () => {
    measureLayout();
    onScroll();
  }, { passive: true });

  render(currentScrollY);
}








/* ==========================================================================
   10. Fixed hero image: dims as you scroll past the hero
   ========================================================================== */
function initHeroVisual() {
  const visual = document.querySelector('.bg-stack .hero-visual');
  if (!visual) return;
  const root = document.documentElement;
  let ticking = false;

  function update() {
    const vh = window.innerHeight;
    const isLight = root.getAttribute('data-theme') === 'light';
    const min = isLight ? (window.innerWidth <= 860 ? 0.12 : 0.16) : (window.innerWidth <= 860 ? 0.2 : 0.32);
    const p = Math.min(1, Math.max(0, (window.scrollY || 0) / (vh * 0.8)));
    root.style.setProperty('--hv', (1 - (1 - min) * p).toFixed(3));
    ticking = false;
  }
  window.addEventListener('scroll', () => {
    if (!ticking) { ticking = true; requestAnimationFrame(update); }
  }, { passive: true });
  window.addEventListener('resize', update, { passive: true });
  window.addEventListener('themechange', update);
  update();
}

/* ==========================================================================
   12. Projects carousel (Linux workspace-switch feel)
       - 3 projects visible, the 4th waits off-screen
       - while the pointer is over the Projects section the row slides one
         project at a time: leftmost card leaves, the next one slides in
       - dots show which projects are visible; clicking a hidden one brings it in
       - only on hover-capable wide screens without reduced motion; elsewhere
         all projects are simply shown in the grid
   ========================================================================== */
function initProjectsCarousel() {
  const viewport = document.getElementById('projects-viewport');
  const track = document.getElementById('projects-grid');
  const section = document.getElementById('projects');
  const dotsWrap = document.getElementById('projects-dots');
  if (!viewport || !track || !section) return;

  const VISIBLE = 3;
  const STEP_MS = 3600;
  const DURATION = 900;
  const dots = dotsWrap ? Array.from(dotsWrap.querySelectorAll('.projects-dot')) : [];
  const mq = window.matchMedia('(hover: hover) and (min-width: 1041px) and (prefers-reduced-motion: no-preference)');

  let active = false;
  let busy = false;
  let hovered = false;
  let focused = false;
  let timer = null;
  let kick = null;

  const cards = () => Array.from(track.children);

  function refresh() {
    cards().forEach((card, i) => {
      const hidden = active && i >= VISIBLE;
      card.classList.toggle('is-queued', hidden);
      card.inert = hidden;
      if (hidden) card.setAttribute('aria-hidden', 'true'); else card.removeAttribute('aria-hidden');
    });
    const shown = new Set(cards().slice(0, VISIBLE).map(c => c.dataset.project));
    dots.forEach(d => d.classList.toggle('is-on', !active || shown.has(d.dataset.project)));
  }

  function step() {
    if (!active || busy || document.hidden) return;
    const cs = cards();
    if (cs.length <= VISIBLE) return;
    busy = true;
    const dist = cs[1].offsetLeft - cs[0].offsetLeft;
    cs[0].classList.add('is-leaving');
    cs[VISIBLE].classList.remove('is-queued');
    track.style.transition = 'transform ' + DURATION + 'ms cubic-bezier(0.65, 0, 0.35, 1)';
    track.style.transform = 'translateX(' + (-dist) + 'px)';

    setTimeout(() => {
      // Move the card that left to the back of the line and reset without animating
      track.style.transition = 'none';
      track.style.transform = 'none';
      const first = cs[0];
      first.classList.remove('is-leaving');
      first.classList.add('is-queued');
      track.appendChild(first);
      void track.offsetWidth;
      track.style.transition = '';
      busy = false;
      refresh();
    }, DURATION + 40);
  }

  function startCycle() {
    stopCycle();
    if (!active || !hovered || focused) return;
    kick = setTimeout(step, 900);
    timer = setInterval(step, STEP_MS);
  }
  function stopCycle() {
    clearTimeout(kick);
    clearInterval(timer);
    kick = timer = null;
  }

  function setActive(on) {
    active = on;
    viewport.classList.toggle('is-carousel', on);
    if (!on) {
      stopCycle();
      track.style.transition = '';
      track.style.transform = '';
      cards().forEach(c => c.classList.remove('is-leaving', 'is-queued'));
      busy = false;
    }
    refresh();
  }

  section.addEventListener('mouseenter', () => { hovered = true; startCycle(); });
  section.addEventListener('mouseleave', () => { hovered = false; stopCycle(); });
  section.addEventListener('focusin', () => { focused = true; stopCycle(); });
  section.addEventListener('focusout', () => { focused = false; startCycle(); });

  dots.forEach(dot => {
    dot.addEventListener('click', () => {
      if (!active || busy) return;
      const idx = cards().findIndex(c => c.dataset.project === dot.dataset.project);
      if (idx >= VISIBLE) { step(); startCycle(); }
    });
  });

  const onChange = () => setActive(mq.matches);
  if (mq.addEventListener) mq.addEventListener('change', onChange); else if (mq.addListener) mq.addListener(onChange);
  setActive(mq.matches);
}

/* ==========================================================================
   Theme toggle (dark default, light = sunlit scene). Saved in localStorage.
   ========================================================================== */
function initThemeButton() {
  const btn = document.getElementById('theme-toggle');
  const root = document.documentElement;

  function apply(theme, save) {
    root.setAttribute('data-theme', theme);
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute('content', theme === 'light' ? '#f6e4c6' : '#0c0d10');
    if (btn) {
      const next = theme === 'light' ? 'dark' : 'light';
      btn.setAttribute('aria-label', 'Switch to ' + next + ' theme');
      btn.setAttribute('title', 'Switch to ' + next + ' theme');
    }
    if (save) { try { localStorage.setItem('theme', theme); } catch (e) {} }
    window.dispatchEvent(new CustomEvent('themechange', { detail: theme }));
  }

  if (btn) {
    apply(root.getAttribute('data-theme') === 'light' ? 'light' : 'dark', false);
    btn.addEventListener('click', () => {
      apply(root.getAttribute('data-theme') === 'light' ? 'dark' : 'light', true);
    });
  }
}

/* ==========================================================================
   Custom cursor: small dot + trailing ring (mouse / trackpad only)
   - dot sticks to the pointer, ring follows with a smooth lag
   - ring grows over links/buttons and shrinks while pressed
   - colour follows the theme via CSS (light on dark, dark on light)
   ========================================================================== */
function initCustomCursor() {
  if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;

  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const ease = reduce ? 1 : 0.16;

  const dot = document.createElement('div');
  dot.className = 'cursor-dot';
  const ring = document.createElement('div');
  ring.className = 'cursor-ring';
  dot.setAttribute('aria-hidden', 'true');
  ring.setAttribute('aria-hidden', 'true');
  document.body.append(ring, dot);

  let mx = -100, my = -100;   // pointer
  let rx = -100, ry = -100;   // ring (lagging)
  let started = false;
  let raf = null;

  const INTERACTIVE = 'a, button, [role="button"], summary, label, input, select, textarea, .projects-dot, .scroll-dot';

  function frame() {
    rx += (mx - rx) * ease;
    ry += (my - ry) * ease;
    dot.style.transform = 'translate3d(' + mx + 'px,' + my + 'px,0)';
    ring.style.transform = 'translate3d(' + rx + 'px,' + ry + 'px,0)';
    if (Math.abs(mx - rx) > 0.1 || Math.abs(my - ry) > 0.1) {
      raf = requestAnimationFrame(frame);
    } else {
      rx = mx; ry = my;
      ring.style.transform = 'translate3d(' + rx + 'px,' + ry + 'px,0)';
      raf = null;
    }
  }
  function kick() { if (raf === null) raf = requestAnimationFrame(frame); }

  window.addEventListener('mousemove', (e) => {
    mx = e.clientX; my = e.clientY;
    if (!started) {
      started = true;
      rx = mx; ry = my;                 // no fly-in from the corner on first move
      document.documentElement.classList.add('has-custom-cursor');
      dot.classList.add('is-visible');
      ring.classList.add('is-visible');
    }
    kick();
  }, { passive: true });

  document.addEventListener('mouseover', (e) => {
    ring.classList.toggle('is-hover', Boolean(e.target.closest && e.target.closest(INTERACTIVE)));
  });
  document.addEventListener('mousedown', () => ring.classList.add('is-down'));
  document.addEventListener('mouseup', () => ring.classList.remove('is-down'));

  document.documentElement.addEventListener('mouseleave', () => {
    dot.classList.remove('is-visible');
    ring.classList.remove('is-visible');
  });
  document.documentElement.addEventListener('mouseenter', () => {
    if (started) { dot.classList.add('is-visible'); ring.classList.add('is-visible'); }
  });
}

/* ==========================================================================
   Side dots: one minimalist dot per page / section, on the left edge.
   - mirrors the navbar links (same labels and targets)
   - the current page's dot and the hovered dot magnify 30% (dock-style spring)
   - on index.html the current dot follows the scroll position
   ========================================================================== */
function initScrollDots() {
  const links = Array.from(document.querySelectorAll('.nav-desktop .nav-link'));
  if (!links.length) return;

  const onIndex = Boolean(document.getElementById('home'));
  const keyOf = (href) => {
    const h = href.indexOf('#');
    if (h !== -1) return href.slice(h + 1);
    return /projects\.html$/.test(href) ? 'projects-page' : 'home';
  };

  const nav = document.createElement('nav');
  nav.className = 'scroll-dots';
  nav.setAttribute('aria-label', 'Page sections');

  const dots = links.map((link) => {
    const raw = link.getAttribute('href') || '#home';
    const key = keyOf(raw);
    const a = document.createElement('a');
    a.className = 'scroll-dot';
    a.dataset.key = key;
    a.dataset.label = link.textContent.trim();
    a.setAttribute('aria-label', 'Go to ' + a.dataset.label);
    // Home on a sub page must land at the top of index.html
    a.href = (!onIndex && key === 'home') ? 'index.html#home' : raw;
    if (link.classList.contains('active')) a.classList.add('is-active');
    nav.appendChild(a);
    return a;
  });
  document.body.appendChild(nav);

  function setCurrent(key) {
    dots.forEach((d) => {
      const on = d.dataset.key === key;
      d.classList.toggle('is-active', on);
      if (on) d.setAttribute('aria-current', 'true'); else d.removeAttribute('aria-current');
    });
  }
  const initial = links.find((l) => l.classList.contains('active'));
  setCurrent(initial ? keyOf(initial.getAttribute('href') || '#home') : 'home');
  window.addEventListener('spychange', (e) => setCurrent(e.detail));

  // Same-page jumps (index.html): centre the section like the navbar does
  nav.addEventListener('click', (e) => {
    const a = e.target.closest('.scroll-dot');
    if (!a) return;
    const href = a.getAttribute('href') || '';
    if (!href.startsWith('#')) return; // cross-page links are handled by the page transition
    e.preventDefault();
    const id = href.slice(1);
    const target = document.getElementById(id);
    if (!target) return;
    if (id === 'home') window.scrollTo({ top: 0, behavior: 'smooth' });
    else scrollToSectionMiddle(target);
    try { history.pushState(null, '', href); } catch (err) {}
  });
}

/* ==========================================================================
   Hero role line: typewriter effect (typewriter-effect library, home page only)
   - full text stays in aria-label for screen readers
   - skipped when the library is missing or the visitor prefers reduced motion
   ========================================================================== */
function initRoleTypewriter() {
  const host = document.querySelector('#hero-role .role-typed');
  if (!host || typeof window.Typewriter !== 'function') return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const html = host.innerHTML;
  const line = host.parentElement;
  // Keep the line's height while it is being typed so nothing below jumps
  line.style.minHeight = line.offsetHeight + 'px';
  host.innerHTML = '';

  new window.Typewriter(host, {
    delay: 55,
    cursor: '\u258D',
    loop: false,
    autoStart: false
  })
    .pauseFor(500)
    .typeString(html)
    .start();
}
