document.addEventListener('DOMContentLoaded', function () {
  const mainContent = document.getElementById('main-content');
  const articles = mainContent.querySelectorAll('article');

  let currentArticle = 0;

  mainContent.addEventListener('wheel', function (e) {
    e.preventDefault();
    if (e.deltaY > 0 && currentArticle < articles.length - 1) {
      currentArticle++;
    } else if (e.deltaY < 0 && currentArticle > 0) {
      currentArticle--;
    }
    scrollToArticle();
  });

  function scrollToArticle() {
    mainContent.scrollTo({
      top: currentArticle * window.innerHeight, // Use window.innerHeight
      behavior: 'smooth'
    });
  }
});