export default function privacyRodo(root) {

  root.innnerHTML = '';

  const article = document.createElement('article');
  article.setAttribute('id','view-privacy-rodo');
  article.innerHTML = 'RODO'

  root.appendChild(article);
}
