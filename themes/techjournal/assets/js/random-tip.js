// Random Article Widget
(function() {
  const widget = document.getElementById('random-article-widget');
  if (!widget) return;

  const titleEl = widget.querySelector('.tj-random-article__title');
  const summaryEl = widget.querySelector('.tj-random-article__summary');
  const linkEl = widget.querySelector('.tj-random-article__link');
  const iconEl = widget.querySelector('.tj-random-article__icon');
  const refreshBtn = widget.querySelector('.tj-random-article__refresh');

  const icons = {
    powershell: '/icons/powershell-black.png',
    blog: '/icons/article.svg',
    retro: '/icons/cpu-2.svg'
  };

  let articles = [];

  async function loadArticles() {
    try {
      const response = await fetch('/tips/index.json');
      articles = await response.json();
      showRandomArticle();
    } catch (error) {
      console.error('Failed to load articles:', error);
      widget.style.display = 'none';
    }
  }

  function showRandomArticle() {
    if (articles.length === 0) return;

    const randomIndex = Math.floor(Math.random() * articles.length);
    const article = articles[randomIndex];

    if (titleEl) titleEl.textContent = article.title;
    if (summaryEl) summaryEl.textContent = article.summary;
    if (linkEl) linkEl.href = article.url;
    if (iconEl && article.section) {
      iconEl.src = icons[article.section] || icons.blog;
    }
  }

  if (refreshBtn) {
    refreshBtn.addEventListener('click', function(e) {
      e.preventDefault();
      showRandomArticle();
    });
  }

  loadArticles();
})();
