'use strict';

{
  const toggle = document.getElementById('languageToggle');
  const soictSlides = [...document.querySelectorAll('#deck .slide')];
  const translations = [...document.querySelectorAll('[data-vi]')].map(node => ({
    node, en: node.textContent, vi: node.dataset.vi
  }));
  const labels = [...document.querySelectorAll('[data-vi-label]')].map(node => ({
    node, en: node.getAttribute('aria-label'), vi: node.dataset.viLabel
  }));

  function languageUrl(language) {
    const url = new URL(location.href);
    url.searchParams.set('lang', language);
    return url;
  }

  function updateSlideLabels() {
    const slide = soictSlides.find(item => item.classList.contains('active'));
    if (!slide) return;
    document.getElementById('sectionLabel').textContent = slide.dataset.title;
    document.getElementById('noteText').textContent = slide.querySelector('.speaker-notes').textContent;
    const timeLabel = document.documentElement.lang === 'vi' ? 'Thời lượng gợi ý' : 'Suggested time';
    document.getElementById('slideTime').textContent = `${timeLabel} ${slide.dataset.time}`;
  }

  function setLanguage(language) {
    const isVietnamese = language === 'vi';
    document.documentElement.lang = language;
    for (const entry of translations) entry.node.textContent = entry[language];
    for (const entry of labels) entry.node.setAttribute('aria-label', entry[language]);
    const overviewButtons = document.querySelectorAll('#overviewGrid button');
    soictSlides.forEach((slide, index) => {
      const title = slide.querySelector('h2')?.textContent ?? slide.dataset.title;
      slide.dataset.title = title;
      overviewButtons[index].lastChild.textContent = title;
      slide.querySelector('.slide-page-number')?.setAttribute('aria-label', `${isVietnamese ? 'Trang' : 'Slide'} ${index + 1}`);
    });
    updateSlideLabels();
    const target = isVietnamese ? 'en' : 'vi';
    toggle.lang = target;
    toggle.hreflang = target;
    toggle.textContent = target.toUpperCase();
    toggle.title = isVietnamese ? 'Switch to English' : 'Chuyển sang tiếng Việt';
    toggle.setAttribute('aria-label', toggle.title);
    toggle.href = languageUrl(target);
  }

  function syncLanguageLink() {
    updateSlideLabels();
    toggle.href = languageUrl(toggle.hreflang);
  }

  document.addEventListener('slidechange', syncLanguageLink);
  toggle.addEventListener('click', event => {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    const target = toggle.hreflang;
    history.replaceState(history.state, '', languageUrl(target));
    setLanguage(target);
  });
  setLanguage(new URLSearchParams(location.search).get('lang') === 'vi' ? 'vi' : 'en');
}
