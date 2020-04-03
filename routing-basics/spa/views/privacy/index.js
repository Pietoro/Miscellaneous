export default function privacyIndex(root) {

  root.innerHTML = '';

  const section = document.createElement('section');
  section.setAttribute('id','route-privacy');
  const article = document.createElement('article');
  article.setAttribute('id','view-privacy-index');
  article.innerHTML = 
    `<h3>We value your privacy. Read more:</h3><br/>
    <button class="link" onclick="link('privacy','rodo')">RODO</button>
    <button class="link" onclick="link('privacy','frodo')">FRODO</button>`;

  section.appendChild(article);

  root.appendChild(section);


}
