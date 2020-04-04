const API = 'https://recruitment.hal.skygate.io/companies';

export default async function shopIndex(root) {

  root.innerHTML = '';

  const article = document.createElement('article');
  article.setAttribute('id','view-shop-index');
  article.innerHTML = 
    `<h3>This is a shop</h3>
      <table id="products-table">
      <thead>
        <tr>
          <th>Product</th>
          <th>Brand</th>
        </tr>
      </thead>
      <tbody></tbody>
    </table>`;

    root.appendChild(article);

    const response = await fetch(API);
    const data = await response.json();
    fillTable(data);
}

function fillTable(data) {
  document.getElementById('products-table').querySelector('tbody').innerHTML = data
    .map((product) => `<tr id="product-${product.id}" onclick="link('shop','details','${product.id}')"><td>${product.city}</td><td>${product.name}</td></tr>`)
    .reduce((total, el) => total.concat(el),'');
}