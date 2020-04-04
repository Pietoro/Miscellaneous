export default function homeIndex(root) {

  root.innerHTML = '';
  const article = document.createElement('article');
  article.setAttribute('id','view-home-index');
  article.innerHTML = `<h3>This is home page</h3>`;

  root.appendChild(article);
}
