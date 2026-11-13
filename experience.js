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

// Social links for service pages using the shared footer.
(()=>{const f=document.querySelector('footer');if(f&&!f.querySelector('.st-social-links')){const box=document.createElement('div');box.innerHTML="<nav class=\"st-social-links\" aria-label=\"Follow ST Roofing\" style=\"grid-column:1/-1;display:flex;gap:14px;flex-wrap:wrap;margin:20px 0\"><a href=\"https://www.facebook.com/stroofingConstruction\" target=\"_blank\" rel=\"noopener noreferrer\" aria-label=\"Facebook — ST Roofing (opens in new tab)\" title=\"Facebook\" style=\"display:inline-flex;align-items:center;justify-content:center;width:52px;height:52px;flex:0 0 52px;border-radius:12px;background:#1877F2;color:#fff;border:1px solid rgba(255,255,255,.3);box-sizing:border-box;text-decoration:none\"><svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" width=\"28\" height=\"28\" aria-hidden=\"true\" focusable=\"false\"><path fill=\"currentColor\" d=\"M13.5 22v-9h3l.5-3.5h-3.5V7.3c0-1 .3-1.8 1.8-1.8H17V2.4c-.3 0-1.4-.2-2.7-.2-2.7 0-4.5 1.6-4.5 4.7v2.6H7V13h2.8v9z\"/></svg></a><a href=\"https://www.instagram.com/stroofingconstructionllc/\" target=\"_blank\" rel=\"noopener noreferrer\" aria-label=\"Instagram — ST Roofing (opens in new tab)\" title=\"Instagram\" style=\"display:inline-flex;align-items:center;justify-content:center;width:52px;height:52px;flex:0 0 52px;border-radius:12px;background:linear-gradient(135deg,#833ab4,#c13584,#e1306c,#f77737);color:#fff;border:1px solid rgba(255,255,255,.3);box-sizing:border-box;text-decoration:none\"><svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" width=\"28\" height=\"28\" aria-hidden=\"true\" focusable=\"false\"><rect x=\"3\" y=\"3\" width=\"18\" height=\"18\" rx=\"5\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\"/><circle cx=\"12\" cy=\"12\" r=\"4\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\"/><circle cx=\"17.5\" cy=\"6.5\" r=\"1.3\" fill=\"currentColor\"/></svg></a><a href=\"https://www.tiktok.com/@stroofingcontructionllc\" target=\"_blank\" rel=\"noopener noreferrer\" aria-label=\"TikTok — ST Roofing (opens in new tab)\" title=\"TikTok\" style=\"display:inline-flex;align-items:center;justify-content:center;width:52px;height:52px;flex:0 0 52px;border-radius:12px;background:#080808;color:#fff;border:1px solid rgba(255,255,255,.3);box-sizing:border-box;text-decoration:none\"><svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" width=\"28\" height=\"28\" aria-hidden=\"true\" focusable=\"false\"><path fill=\"currentColor\" d=\"M16.5 2c.4 2.7 1.9 4.3 4.5 4.5V10a9 9 0 0 1-4.5-1.4v7.1a6.3 6.3 0 1 1-5.4-6.2v3.6a2.8 2.8 0 1 0 1.8 2.6V2z\"/></svg></a></nav>";f.prepend(box.firstElementChild);}})();
