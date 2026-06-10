// ── NAVIGATION ──────────────────────────────────────────────
const header = document.getElementById('header');
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
});

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});

// Close nav on link click
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => navLinks.classList.remove('open'));
});

// ── MULTI-STEP FORM ──────────────────────────────────────────
function nextStep(current) {
  const currentStep = document.getElementById('step' + current);
  const nextStepEl = document.getElementById('step' + (current + 1));

  // Validation
  if (current === 1) {
    const selected = document.querySelector('input[name="service"]:checked');
    if (!selected) {
      alert('Please select a service to continue.');
      return;
    }
  }
  if (current === 2) {
    const address = document.getElementById('address').value.trim();
    const propType = document.getElementById('propertyType').value;
    if (!address) { alert('Please enter your property address.'); return; }
    if (!propType) { alert('Please select your property type.'); return; }
  }

  currentStep.classList.remove('active');
  nextStepEl.classList.add('active');
  window.scrollTo({ top: document.getElementById('contact').offsetTop - 80, behavior: 'smooth' });
}

function prevStep(current) {
  document.getElementById('step' + current).classList.remove('active');
  document.getElementById('step' + (current - 1)).classList.add('active');
}

// Form submission
document.getElementById('estimateForm').addEventListener('submit', function(e) {
  e.preventDefault();

  const name = document.getElementById('name').value.trim();
  const phone = document.getElementById('phone').value.trim();
  const service = document.querySelector('input[name="service"]:checked')?.value || '';
  const address = document.getElementById('address').value.trim();
  const description = document.getElementById('description').value.trim();
  const contactPref = document.getElementById('contactPref').value;

  if (!name) { alert('Please enter your name.'); return; }
  if (!phone) { alert('Please enter your phone number.'); return; }

  // Send to WhatsApp (Carlos's number)
  const msg = encodeURIComponent(
    `🏠 NEW ESTIMATE REQUEST — stroofingnyc.com\n\n` +
    `👤 Name: ${name}\n` +
    `📞 Phone: ${phone}\n` +
    `🔧 Service: ${service}\n` +
    `📍 Address: ${address}\n` +
    `💬 Description: ${description || 'N/A'}\n` +
    `📲 Preferred contact: ${contactPref}`
  );

  const submitBtn = document.getElementById('submitBtn');
  submitBtn.textContent = '⏳ Sending...';
  submitBtn.disabled = true;

  // Open WhatsApp with the lead info
  window.open(`https://wa.me/16463995293?text=${msg}`, '_blank');

  // Show success
  setTimeout(() => {
    document.getElementById('step3').classList.remove('active');
    document.getElementById('stepSuccess').classList.add('active');
    window.scrollTo({ top: document.getElementById('contact').offsetTop - 80, behavior: 'smooth' });
  }, 800);
});

// ── SMOOTH SCROLL for anchor links ──────────────────────────
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const offset = 80;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

// ── SERVICE OPTION HIGHLIGHT ────────────────────────────────
document.querySelectorAll('.service-option input[type="radio"]').forEach(radio => {
  radio.addEventListener('change', () => {
    document.querySelectorAll('.service-option').forEach(opt => opt.style.borderColor = '');
    radio.closest('.service-option').style.borderColor = '#c0392b';
    radio.closest('.service-option').style.background = '#fff5f5';
  });
});
