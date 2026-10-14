'use strict';
document.addEventListener('DOMContentLoaded', () => {
  const menus = [...document.querySelectorAll('.pro-nav details, .studio-menu')];
  menus.forEach(menu => menu.addEventListener('toggle', () => {
    if (menu.open) menus.forEach(other => { if (other !== menu) other.open = false; });
  }));
  document.addEventListener('click', event => {
    menus.forEach(menu => { if (!menu.contains(event.target)) menu.open = false; });
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape') menus.forEach(menu => {
      if (menu.open) { menu.open = false; menu.querySelector('summary').focus(); }
    });
  });
  // Hover menus only for mouse-like pointers; native touch and keyboard remain available.
  const hoverPointer = window.matchMedia('(hover: hover) and (pointer: fine)');
  document.querySelectorAll('.pro-nav details').forEach(menu => {
    let closeTimer;
    const cancelClose = () => clearTimeout(closeTimer);
    const enter = event => {
      if (!hoverPointer.matches || event.pointerType === 'touch') return;
      cancelClose();
      menus.forEach(other => { if (other !== menu) other.open = false; });
      menu.open = true;
    };
    const leave = event => {
      if (!hoverPointer.matches || event.pointerType === 'touch') return;
      cancelClose();
      closeTimer = setTimeout(() => {
        if (!menu.matches(':hover') && !menu.contains(document.activeElement)) menu.open = false;
      }, 220);
    };
    menu.addEventListener('pointerenter', enter);
    menu.addEventListener('pointerleave', leave);
    const panel = menu.querySelector('.pro-dropdown');
    if (panel) {
      panel.addEventListener('pointerenter', enter);
      panel.addEventListener('pointerleave', leave);
    }
    menu.addEventListener('focusin', cancelClose);
    menu.addEventListener('focusout', () => {
      cancelClose();
      closeTimer = setTimeout(() => {
        if (!menu.matches(':hover') && !menu.contains(document.activeElement)) menu.open = false;
      }, 220);
    });
  });
  const filters = [...document.querySelectorAll('[data-filter]')];
  filters.forEach(button => button.addEventListener('click', () => {
    const category = button.dataset.filter;
    let count = 0;
    document.querySelectorAll('[data-category]').forEach(card => {
      card.hidden = category !== 'all' && card.dataset.category !== category;
      if (!card.hidden) count++;
    });
    filters.forEach(item => item.setAttribute('aria-pressed', String(item === button)));
    const status = document.getElementById('project-count');
    if (status) status.textContent = `${count} project collection${count === 1 ? '' : 's'}`;
  }));
  const area = new URLSearchParams(window.location.search).get('area');
  const address = document.querySelector('#contactForm input[name="address"]');
  if (address && area && !address.value) address.value = area.slice(0, 120);
  const service = new URLSearchParams(window.location.search).get('service');
  const select = document.querySelector('#contactForm select[name="service"]');
  if (select && service && [...select.options].some(option => option.value === service)) select.value = service;
});
// Progressive reveal: all content stays visible if animation support is unavailable.
document.addEventListener('DOMContentLoaded', () => {
  if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches && 'IntersectionObserver' in window) {
    const items = document.querySelectorAll('.pro-service,.pro-project,.pro-area-grid>a,.pro-process .pro-scope-grid>a');
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, {threshold: 0.08});
    document.documentElement.classList.add('motion-ready');
    items.forEach(item => { item.classList.add('reveal-item'); observer.observe(item); });
    document.addEventListener('focusin', event => {
      const card = event.target.closest('.reveal-item');
      if (card) card.classList.add('is-visible');
    });
  }
});
