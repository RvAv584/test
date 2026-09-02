/**
 * Roshan Vishwakarma — Portfolio Interactive Application Logic
 * Features: Dynamic Particle Background, Typewriter, IoT Simulator,
 * Skills Filter, Mobile Navigation, Contact Handler, Copy Utility.
 */

document.addEventListener('DOMContentLoaded', () => {
  initCanvasBackground();
  initTypewriter();
  initMobileDrawer();
  initScrollSpy();
  initSkillsFilter();
  initIoTFireSimulator();
});

/* ==========================================================================
   1. DYNAMIC CANVAS PARTICLE BACKGROUND
   ========================================================================== */
function initCanvasBackground() {
  const canvas = document.getElementById('bg-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  const particles = [];
  const particleCount = Math.min(Math.floor(window.innerWidth / 18), 75);

  class Particle {
    constructor() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.vx = (Math.random() - 0.5) * 0.45;
      this.vy = (Math.random() - 0.5) * 0.45;
      this.radius = Math.random() * 1.8 + 0.8;
      this.alpha = Math.random() * 0.5 + 0.2;
      this.color = Math.random() > 0.5 ? '#06b6d4' : '#8b5cf6';
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;

      if (this.x < 0) this.x = width;
      if (this.x > width) this.x = 0;
      if (this.y < 0) this.y = height;
      if (this.y > height) this.y = 0;
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = this.color;
      ctx.globalAlpha = this.alpha;
      ctx.fill();
    }
  }

  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
  }

  // Mouse interaction
  let mouse = { x: null, y: null, maxDist: 110 };
  window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });
  window.addEventListener('mouseleave', () => {
    mouse.x = null;
    mouse.y = null;
  });

  function animate() {
    ctx.clearRect(0, 0, width, height);

    // Draw and connect particles
    for (let i = 0; i < particles.length; i++) {
      particles[i].update();
      particles[i].draw();

      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 120) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = '#06b6d4';
          ctx.globalAlpha = (1 - dist / 120) * 0.15;
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
      }

      // Connect with mouse
      if (mouse.x !== null && mouse.y !== null) {
        const dx = particles[i].x - mouse.x;
        const dy = particles[i].y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < mouse.maxDist) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.strokeStyle = '#8b5cf6';
          ctx.globalAlpha = (1 - dist / mouse.maxDist) * 0.35;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }
    }

    requestAnimationFrame(animate);
  }

  animate();
}

/* ==========================================================================
   2. HERO TYPEWRITER EFFECT
   ========================================================================== */
function initTypewriter() {
  const target = document.getElementById('typewriter-target');
  if (!target) return;

  const roles = [
    'AI & IoT Smart Systems',
    'Robust Python Applications',
    'Interactive React Web Apps',
    'Scalable C/C++ Embedded Code',
    'Algorithmic Solutions & DSA'
  ];

  let roleIdx = 0;
  let charIdx = 0;
  let isDeleting = false;
  let typeSpeed = 90;

  function type() {
    const currentRole = roles[roleIdx];

    if (isDeleting) {
      target.textContent = currentRole.substring(0, charIdx - 1);
      charIdx--;
      typeSpeed = 45;
    } else {
      target.textContent = currentRole.substring(0, charIdx + 1);
      charIdx++;
      typeSpeed = 90;
    }

    if (!isDeleting && charIdx === currentRole.length) {
      isDeleting = true;
      typeSpeed = 1800; // Pause at end of sentence
    } else if (isDeleting && charIdx === 0) {
      isDeleting = false;
      roleIdx = (roleIdx + 1) % roles.length;
      typeSpeed = 400; // Pause before typing new word
    }

    setTimeout(type, typeSpeed);
  }

  type();
}

/* ==========================================================================
   3. MOBILE NAVIGATION DRAWER
   ========================================================================== */
function initMobileDrawer() {
  const navToggle = document.getElementById('nav-toggle');
  const drawerClose = document.getElementById('drawer-close');
  const mobileDrawer = document.getElementById('mobile-drawer');

  if (navToggle && mobileDrawer) {
    navToggle.addEventListener('click', () => {
      mobileDrawer.classList.add('open');
    });
  }

  if (drawerClose && mobileDrawer) {
    drawerClose.addEventListener('click', () => {
      mobileDrawer.classList.remove('open');
    });
  }

  // Close when clicking outside drawer
  document.addEventListener('click', (e) => {
    if (
      mobileDrawer &&
      mobileDrawer.classList.contains('open') &&
      !mobileDrawer.contains(e.target) &&
      !navToggle.contains(e.target)
    ) {
      mobileDrawer.classList.remove('open');
    }
  });
}

function closeDrawer() {
  const mobileDrawer = document.getElementById('mobile-drawer');
  if (mobileDrawer) mobileDrawer.classList.remove('open');
}

/* ==========================================================================
   4. SCROLLSPY & NAVBAR BACKGROUND
   ========================================================================== */
function initScrollSpy() {
  const navbar = document.getElementById('navbar');
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;

    // Navbar Scrolled Glass effect
    if (navbar) {
      if (scrollY > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    }

    // Active Nav link highlight
    sections.forEach((section) => {
      const sectionHeight = section.offsetHeight;
      const sectionTop = section.offsetTop - 120;
      const sectionId = section.getAttribute('id');

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        navLinks.forEach((link) => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  });
}

/* ==========================================================================
   5. SKILLS MATRIX FILTER
   ========================================================================== */
function initSkillsFilter() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const skillCards = document.querySelectorAll('.skill-card');

  filterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      filterBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      skillCards.forEach((card) => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          card.classList.remove('hidden');
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });
}

/* ==========================================================================
   6. INTERACTIVE IOT FIRE & SMOKE DETECTION SIMULATOR
   ========================================================================== */
function initIoTFireSimulator() {
  // Initial simulation calculation
  updateSimulation();
}

function openSimulatorModal() {
  const modal = document.getElementById('sim-modal-backdrop');
  if (modal) modal.classList.add('open');
}

function closeSimulatorModal(event) {
  if (event && event.target && event.target.id !== 'sim-modal-backdrop') {
    return;
  }
  const modal = document.getElementById('sim-modal-backdrop');
  if (modal) modal.classList.remove('open');
}

function applyPreset(presetName) {
  const sliderSmoke = document.getElementById('slider-smoke');
  const sliderFlame = document.getElementById('slider-flame');
  const sliderTemp = document.getElementById('slider-temp');
  const presetPills = document.querySelectorAll('.preset-pill');

  presetPills.forEach((p) => p.classList.remove('active'));

  if (presetName === 'safe') {
    if (sliderSmoke) sliderSmoke.value = 120;
    if (sliderFlame) sliderFlame.value = 0;
    if (sliderTemp) sliderTemp.value = 24;
    presetPills[0]?.classList.add('active');
  } else if (presetName === 'cooking') {
    if (sliderSmoke) sliderSmoke.value = 580;
    if (sliderFlame) sliderFlame.value = 5;
    if (sliderTemp) sliderTemp.value = 32;
    presetPills[1]?.classList.add('active');
  } else if (presetName === 'fire') {
    if (sliderSmoke) sliderSmoke.value = 850;
    if (sliderFlame) sliderFlame.value = 85;
    if (sliderTemp) sliderTemp.value = 78;
    presetPills[2]?.classList.add('active');
  }

  updateSimulation();
}

function updateSimulation() {
  const sliderSmoke = document.getElementById('slider-smoke');
  const sliderFlame = document.getElementById('slider-flame');
  const sliderTemp = document.getElementById('slider-temp');

  if (!sliderSmoke || !sliderFlame || !sliderTemp) return;

  const smokePPM = parseInt(sliderSmoke.value, 10);
  const flameIntensity = parseInt(sliderFlame.value, 10);
  const tempVal = parseInt(sliderTemp.value, 10);

  // Update Value Badges
  const valSmoke = document.getElementById('val-smoke');
  const valFlame = document.getElementById('val-flame');
  const valTemp = document.getElementById('val-temp');

  if (valSmoke) valSmoke.textContent = `${smokePPM} PPM`;
  if (valFlame) valFlame.textContent = `${flameIntensity} %`;
  if (valTemp) valTemp.textContent = `${tempVal} °C`;

  // Virtual Display Elements
  const lcdLine1 = document.getElementById('lcd-line-1');
  const lcdLine2 = document.getElementById('lcd-line-2');
  const bulbGreen = document.getElementById('bulb-green');
  const bulbYellow = document.getElementById('bulb-yellow');
  const bulbRed = document.getElementById('bulb-red');
  const buzzerBox = document.getElementById('buzzer-indicator');
  const buzzerLabel = document.getElementById('buzzer-label');
  const aiConfVal = document.getElementById('ai-conf-val');
  const aiAnalysisOutput = document.getElementById('ai-analysis-output');

  // Reset Bulbs & Buzzer
  if (bulbGreen) bulbGreen.classList.remove('active');
  if (bulbYellow) bulbYellow.classList.remove('active');
  if (bulbRed) bulbRed.classList.remove('active');
  if (buzzerBox) buzzerBox.classList.remove('active');

  // AI Classification Logic (Roshan's Innovation)
  const isActualFire = (smokePPM > 350 && flameIntensity >= 30) || (flameIntensity >= 60) || (tempVal >= 60 && smokePPM > 400);
  const isFalseAlarmCooking = (smokePPM > 320 && flameIntensity < 20 && tempVal < 45);

  if (isActualFire) {
    // CRITICAL FIRE HAZARD
    if (lcdLine1) lcdLine1.textContent = `SMOKE: ${padString(smokePPM + ' PPM', 9)} FLAME: ${flameIntensity}%`;
    if (lcdLine2) lcdLine2.textContent = `STATUS: CRITICAL FIRE!`;
    if (bulbRed) bulbRed.classList.add('active');
    if (buzzerBox) buzzerBox.classList.add('active');
    if (buzzerLabel) buzzerLabel.textContent = 'BUZZER: SIREN 110dB';
    if (aiConfVal) aiConfVal.textContent = 'Confidence: 98.8% [FIRE]';
    if (aiAnalysisOutput) {
      aiAnalysisOutput.innerHTML = `⚠️ <strong>CRITICAL FIRE DETECTED:</strong> Multi-sensor correlation triggered. Thermal gradient (${tempVal}°C) and flame phototransistor (${flameIntensity}%) confirm hazardous ignition. High buzzer alarm engaged.`;
    }
  } else if (isFalseAlarmCooking) {
    // AI FILTERED FALSE ALARM (STEAM / COOKING)
    if (lcdLine1) lcdLine1.textContent = `SMOKE: ${padString(smokePPM + ' PPM', 9)} FLAME: ${flameIntensity}%`;
    if (lcdLine2) lcdLine2.textContent = `AI: STEAM/FALSE ALM`;
    if (bulbYellow) bulbYellow.classList.add('active');
    if (buzzerLabel) buzzerLabel.textContent = 'BUZZER: MUTED (AI)';
    if (aiConfVal) aiConfVal.textContent = 'Confidence: 95.4% [SAFE STEAM]';
    if (aiAnalysisOutput) {
      aiAnalysisOutput.innerHTML = `🛡️ <strong>AI FALSE-ALARM FILTER ACTIVE:</strong> High particulate concentration (${smokePPM} PPM) observed without flame sensor IR activity or elevated thermal heat. System suppressed false siren alert.`;
    }
  } else {
    // SAFE ROOM
    if (lcdLine1) lcdLine1.textContent = `SMOKE: ${padString(smokePPM + ' PPM', 9)} TEMP: ${tempVal}C`;
    if (lcdLine2) lcdLine2.textContent = `STATUS: SAFE [OK]`;
    if (bulbGreen) bulbGreen.classList.add('active');
    if (buzzerLabel) buzzerLabel.textContent = 'BUZZER: OFF';
    if (aiConfVal) aiConfVal.textContent = 'Confidence: 99.6% [NORMAL]';
    if (aiAnalysisOutput) {
      aiAnalysisOutput.innerHTML = `✅ <strong>ENVIRONMENT SECURE:</strong> All telemetry channels (MQ-2, Flame IR, Temp) operating within normal safety envelopes. No threat detected.`;
    }
  }
}

function padString(str, len) {
  str = String(str);
  while (str.length < len) str += ' ';
  return str;
}

/* ==========================================================================
   7. RESUME CARD MODAL
   ========================================================================== */
function generateResumeModal() {
  const modal = document.getElementById('resume-modal-backdrop');
  if (modal) modal.classList.add('open');
}

function closeResumeModal(event) {
  if (event && event.target && event.target.id !== 'resume-modal-backdrop') {
    return;
  }
  const modal = document.getElementById('resume-modal-backdrop');
  if (modal) modal.classList.remove('open');
}

/* ==========================================================================
   8. CONTACT FORM HANDLER & TOAST NOTIFICATIONS
   ========================================================================== */
function handleContactSubmit(e) {
  e.preventDefault();
  const name = document.getElementById('form-name')?.value;
  const email = document.getElementById('form-email')?.value;
  const subject = document.getElementById('form-subject')?.value;
  const message = document.getElementById('form-message')?.value;

  if (!name || !email || !message) {
    showToast('Please fill in all required fields.', 'info');
    return;
  }

  showToast(`Thank you, ${name}! Your message has been prepared. Opening your mail client...`, 'success');

  // Trigger mailto intent with prefilled details
  setTimeout(() => {
    const mailtoUrl = `mailto:roshansharma3978@gmail.com?subject=${encodeURIComponent(subject || 'Portfolio Inquiry')}&body=${encodeURIComponent(`Hi Roshan,\n\nMy name is ${name} (${email}).\n\n${message}`)}`;
    window.location.href = mailtoUrl;
    document.getElementById('contact-form')?.reset();
  }, 1200);
}

/* ==========================================================================
   9. COPY TO CLIPBOARD UTILITY
   ========================================================================== */
function copyText(text, element) {
  navigator.clipboard.writeText(text).then(
    () => {
      showToast(`Copied to clipboard: ${text}`, 'success');
      if (element) {
        const originalHTML = element.innerHTML;
        element.style.color = '#34d399';
        setTimeout(() => {
          element.style.color = '';
        }, 1500);
      }
    },
    () => {
      showToast('Failed to copy. Please select and copy manually.', 'info');
    }
  );
}

function showToast(message, type = 'info') {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  const icon = type === 'success' ? 'fa-circle-check' : 'fa-circle-info';
  toast.innerHTML = `<i class="fa-solid ${icon}"></i> <span>${message}</span>`;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 3500);
}
