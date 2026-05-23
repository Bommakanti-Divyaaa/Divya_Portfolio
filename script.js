// =========================================
// NAV SCROLL EFFECT
// =========================================
const nav = document.getElementById('nav');

window.addEventListener('scroll', () => {
  if (window.scrollY > 40) {
    nav.classList.add('scrolled');
  } else {
    nav.classList.remove('scrolled');
  }
}, { passive: true });


// =========================================
// HAMBURGER MOBILE MENU
// =========================================
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

hamburger.addEventListener('click', () => {
  mobileMenu.classList.toggle('open');
});

// Close menu on link click
document.querySelectorAll('.mob-link').forEach(link => {
  link.addEventListener('click', () => {
    mobileMenu.classList.remove('open');
  });
});


// =========================================
// REVEAL ON SCROLL (IntersectionObserver)
// =========================================
const revealEls = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.12,
  rootMargin: '0px 0px -40px 0px'
});

revealEls.forEach(el => revealObserver.observe(el));

// Trigger hero elements immediately
document.querySelectorAll('.hero .reveal').forEach(el => {
  setTimeout(() => el.classList.add('visible'), 80);
});


// =========================================
// SKILL BAR ANIMATION
// =========================================
const skillFills = document.querySelectorAll('.skill-fill');

const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animate');
      skillObserver.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.3
});

skillFills.forEach(el => skillObserver.observe(el));


// =========================================
// SMOOTH ACTIVE NAV LINK HIGHLIGHTING
// =========================================
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a:not(.nav-cta)');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(link => {
        link.style.color = '';
        if (link.getAttribute('href') === '#' + entry.target.id) {
          link.style.color = 'var(--cream)';
        }
      });
    }
  });
}, {
  threshold: 0.4
});

sections.forEach(section => sectionObserver.observe(section));


// =========================================
// SUBTLE CURSOR TRAIL (desktop only)
// =========================================
if (window.matchMedia('(pointer: fine)').matches) {
  const canvas = document.createElement('canvas');
  canvas.style.cssText = `
    position: fixed;
    top: 0; left: 0;
    pointer-events: none;
    z-index: 9999;
    opacity: 0.35;
  `;
  document.body.appendChild(canvas);

  const ctx = canvas.getContext('2d');
  let w, h;

  function resize() {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize, { passive: true });

  const points = [];
  const MAX = 18;
  let mouse = { x: -200, y: -200 };

  window.addEventListener('mousemove', e => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
    points.push({ x: e.clientX, y: e.clientY, age: 0 });
    if (points.length > MAX) points.shift();
  }, { passive: true });

  function draw() {
    ctx.clearRect(0, 0, w, h);
    for (let i = 1; i < points.length; i++) {
      const p = points[i];
      p.age++;
      const progress = i / points.length;
      const alpha = progress * 0.5;
      const radius = progress * 3;
      ctx.beginPath();
      ctx.arc(p.x, p.y, radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(56, 189, 248, ${alpha})`;
      ctx.fill();
    }
    requestAnimationFrame(draw);
  }
  draw();
}


// =========================================
// PARALLAX ORBS (subtle)
// =========================================
const orbs = document.querySelectorAll('.orb');

window.addEventListener('mousemove', e => {
  const xFrac = (e.clientX / window.innerWidth - 0.5);
  const yFrac = (e.clientY / window.innerHeight - 0.5);

  orbs.forEach((orb, i) => {
    const depth = (i + 1) * 6;
    orb.style.transform = `translate(${xFrac * depth}px, ${yFrac * depth}px)`;
  });
}, { passive: true });


// =========================================
// PROJECT CARDS — subtle hover tilt
// =========================================
document.querySelectorAll('.project-card').forEach(card => {
  card.addEventListener('mousemove', e => {
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    card.style.transform = `perspective(600px) rotateY(${x * 5}deg) rotateX(${-y * 5}deg) translateY(-6px)`;
  });

  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
    card.style.transition = 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
    setTimeout(() => card.style.transition = '', 500);
  });
});


// =========================================
// INTEREST CARDS — glow on hover
// =========================================
document.querySelectorAll('.interest-card').forEach(card => {
  card.addEventListener('mouseenter', () => {
    card.style.transition = 'transform 0.35s ease, border-color 0.35s ease, box-shadow 0.35s ease';
  });
});
