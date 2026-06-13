/**
 * ST Roofing & Construction - Main JavaScript
 * Mobile-first functionality with smooth interactions
 */

document.addEventListener('DOMContentLoaded', function() {
  // Initialize all components
  initMobileNav();
  initFAQ();
  initStickyHeader();
  initScrollAnimations();
  initForms();
  initSmoothScroll();
});

/**
 * Mobile Navigation
 */
function initMobileNav() {
  const navToggle = document.querySelector('.nav-toggle');
  const navMobile = document.querySelector('.nav-mobile');
  const navClose = document.querySelector('.nav-close');
  const navOverlay = document.querySelector('.nav-overlay');
  
  if (!navToggle || !navMobile) return;
  
  // Open mobile nav
  navToggle.addEventListener('click', function() {
    navMobile.classList.add('active');
    navOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  });
  
  // Close mobile nav function
  function closeNav() {
    navMobile.classList.remove('active');
    navOverlay.classList.remove('active');
    document.body.style.overflow = '';
  }
  
  // Close button
  if (navClose) {
    navClose.addEventListener('click', closeNav);
  }
  
  // Overlay click
  if (navOverlay) {
    navOverlay.addEventListener('click', closeNav);
  }
  
  // Close on link click
  const navLinks = navMobile.querySelectorAll('a');
  navLinks.forEach(function(link) {
    link.addEventListener('click', closeNav);
  });
  
  // Close on escape key
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && navMobile.classList.contains('active')) {
      closeNav();
    }
  });
}

/**
 * FAQ Accordion
 */
function initFAQ() {
  const faqQuestions = document.querySelectorAll('.faq-question');
  
  faqQuestions.forEach(function(question) {
    question.addEventListener('click', function() {
      const item = this.parentElement;
      const isActive = item.classList.contains('active');
      
      // Close all other FAQs
      const allItems = document.querySelectorAll('.faq-item');
      allItems.forEach(function(otherItem) {
        otherItem.classList.remove('active');
      });
      
      // Toggle current
      if (!isActive) {
        item.classList.add('active');
      }
    });
  });
}

/**
 * Sticky Header
 */
function initStickyHeader() {
  const header = document.querySelector('.header');
  if (!header) return;
  
  let lastScroll = 0;
  
  window.addEventListener('scroll', function() {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
  });
}

/**
 * Scroll Animations (Intersection Observer)
 */
function initScrollAnimations() {
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  };
  
  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-fade-in');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);
  
  // Elements to animate
  const animateElements = document.querySelectorAll(
    '.service-card, .testimonial-card, .why-item, .process-step, .pricing-card, .highlight-card'
  );
  
  animateElements.forEach(function(el) {
    el.style.opacity = '0';
    observer.observe(el);
  });
}

/**
 * Form Handling
 */
function initForms() {
  const forms = document.querySelectorAll('form[data-form]');
  
  forms.forEach(function(form) {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const submitBtn = form.querySelector('button[type="submit"]');
      const originalText = submitBtn.textContent;
      
      // Show loading state
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
      
      // Simulate form submission (replace with actual endpoint)
      setTimeout(function() {
        // Show success message
        const successMsg = document.createElement('div');
        successMsg.className = 'form-success';
        successMsg.innerHTML = '<i class="fas fa-check-circle"></i> Thank you! We\'ll contact you within 24 hours.';
        successMsg.style.cssText = 'background: #d4edda; color: #155724; padding: 15px; border-radius: 8px; margin-top: 20px; text-align: center;';
        
        form.appendChild(successMsg);
        form.reset();
        
        // Reset button
        submitBtn.disabled = false;
        submitBtn.textContent = originalText;
        
        // Remove success message after 5 seconds
        setTimeout(function() {
          successMsg.remove();
        }, 5000);
      }, 1500);
    });
  });
}

/**
 * Smooth Scroll for Anchor Links
 */
function initSmoothScroll() {
  const anchorLinks = document.querySelectorAll('a[href^="#"]');
  
  anchorLinks.forEach(function(link) {
    link.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        e.preventDefault();
        
        const headerHeight = document.querySelector('.header')?.offsetHeight || 0;
        const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
}

/**
 * Phone Click Tracking (Optional)
 */
function trackPhoneClick(phoneNumber, source) {
  // You can add analytics tracking here
  console.log('Phone click:', phoneNumber, 'from:', source);
}

/**
 * Get URL Parameters for Form Pre-fill
 */
function getUrlParams() {
  const params = new URLSearchParams(window.location.search);
  return {
    service: params.get('service'),
    source: params.get('source'),
    utm_source: params.get('utm_source'),
    utm_medium: params.get('utm_medium'),
    utm_campaign: params.get('utm_campaign')
  };
}

/**
 * Pre-fill form fields from URL parameters
 */
function prefillFormFields() {
  const params = getUrlParams();
  
  if (params.service) {
    const serviceSelect = document.querySelector('#service');
    if (serviceSelect) {
      serviceSelect.value = params.service;
    }
  }
  
  if (params.source) {
    const sourceInput = document.querySelector('#source');
    if (sourceInput) {
      sourceInput.value = params.source;
    }
  }
}

// Initialize form prefill
prefillFormFields();

/**
 * Lazy Loading for Images
 */
function initLazyLoading() {
  const lazyImages = document.querySelectorAll('img[data-src]');
  
  const imageObserver = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.removeAttribute('data-src');
        imageObserver.unobserve(img);
      }
    });
  });
  
  lazyImages.forEach(function(img) {
    imageObserver.observe(img);
  });
}

// Initialize lazy loading
initLazyLoading();

/**
 * Lightbox
 */
function initLightbox() {
  // Create lightbox DOM
  const lb = document.createElement('div');
  lb.id = 'lightbox';
  lb.innerHTML = `
    <div class="lb-overlay"></div>
    <div class="lb-container">
      <button class="lb-close" aria-label="Close">&times;</button>
      <button class="lb-prev" aria-label="Previous">&#8249;</button>
      <button class="lb-next" aria-label="Next">&#8250;</button>
      <img class="lb-img" src="" alt="">
      <div class="lb-caption"></div>
    </div>
  `;
  document.body.appendChild(lb);

  let items = [];
  let current = 0;

  function open(list, index) {
    items = list;
    current = index;
    show();
    lb.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function close() {
    lb.classList.remove('active');
    document.body.style.overflow = '';
  }

  function show() {
    const img = lb.querySelector('.lb-img');
    const cap = lb.querySelector('.lb-caption');
    img.src = items[current].src;
    img.alt = items[current].caption || '';
    cap.textContent = items[current].caption || '';
  }

  function prev() { current = (current - 1 + items.length) % items.length; show(); }
  function next() { current = (current + 1) % items.length; show(); }

  lb.querySelector('.lb-overlay').addEventListener('click', close);
  lb.querySelector('.lb-close').addEventListener('click', close);
  lb.querySelector('.lb-prev').addEventListener('click', prev);
  lb.querySelector('.lb-next').addEventListener('click', next);
  document.addEventListener('keydown', function(e) {
    if (!lb.classList.contains('active')) return;
    if (e.key === 'Escape') close();
    if (e.key === 'ArrowLeft') prev();
    if (e.key === 'ArrowRight') next();
  });

  // Attach to all [data-lightbox] images
  function attachAll() {
    const groups = {};
    document.querySelectorAll('[data-lightbox]').forEach(function(el) {
      const group = el.getAttribute('data-lightbox') || 'default';
      if (!groups[group]) groups[group] = [];
      groups[group].push(el);
    });
    Object.keys(groups).forEach(function(group) {
      const els = groups[group];
      const list = els.map(function(el) {
        return { src: el.getAttribute('data-src') || el.src || el.getAttribute('href'), caption: el.getAttribute('data-caption') || el.alt || '' };
      });
      els.forEach(function(el, i) {
        el.style.cursor = 'zoom-in';
        el.addEventListener('click', function(e) { e.preventDefault(); open(list, i); });
      });
    });
  }

  attachAll();
  window._lbAttach = attachAll; // re-attach after dynamic content
}

initLightbox();

/**
 * Lead Capture Popup
 */
function openLeadPopup() {
  document.getElementById('lead-popup').classList.add('active');
  document.body.style.overflow = 'hidden';
}
function closeLeadPopup() {
  document.getElementById('lead-popup').classList.remove('active');
  document.body.style.overflow = '';
}
function submitLeadPopup(e) {
  e.preventDefault();
  const form = document.getElementById('popup-form');
  const name = form.name.value;
  const phone = form.phone.value;
  const service = form.service.value || 'Not specified';
  // Send to WhatsApp
  const msg = encodeURIComponent(`🏠 NEW LEAD from stroofingnyc.com\nName: ${name}\nPhone: ${phone}\nService: ${service}`);
  window.open(`https://wa.me/16463995293?text=${msg}`, '_blank');
  form.innerHTML = '<div style="padding:1.5rem 0;color:var(--primary);font-size:1.1rem;font-weight:700;"><i class="fas fa-check-circle" style="font-size:2rem;display:block;margin-bottom:0.5rem;"></i>Thank you! We\'ll call you within 1 hour.</div>';
  setTimeout(closeLeadPopup, 3000);
}

// Show popup after 25 seconds (only once per session)
if (!sessionStorage.getItem('popupShown')) {
  setTimeout(function() {
    if (!document.getElementById('lead-popup').classList.contains('active')) {
      openLeadPopup();
      sessionStorage.setItem('popupShown', '1');
    }
  }, 25000);
}

// Expose for buttons
window.openLeadPopup = openLeadPopup;
window.closeLeadPopup = closeLeadPopup;
window.submitLeadPopup = submitLeadPopup;
