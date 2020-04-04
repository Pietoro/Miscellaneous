export default function notfoundIndex(root, redirect) {

  root.innerHTML = '';

  const article = document.createElement('article');
  article.setAttribute('id','view-notfound-index');
  article.innerHTML = 
    `<h3>Page not found</h3><br/>
    <button class="link" id="link-goback" onclick="link('${redirect.route}','${redirect.view}','${redirect.id}')">Go back</button>`;

  root.appendChild(article);
}

