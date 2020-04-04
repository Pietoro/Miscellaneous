export default function privacyFrodo(root) {

  root.innerHTML = '';

  const article = document.createElement('article');
  article.setAttribute('id','view-privacy-frodo');
  article.innerHTML = 'FRODO'

  root.appendChild(article);
}