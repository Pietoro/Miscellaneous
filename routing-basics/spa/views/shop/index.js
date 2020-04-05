const API = 'https://recruitment.hal.skygate.io/companies';

export default async function shopIndex(root) {

  root.innerHTML = '';

  const article = document.createElement('article');
  article.setAttribute('id','view-shop-index');
  article.innerHTML = 
    `<h3>This is a shop</h3>
    <button class="link" onclick="link('shop','details','777')">Non existing product</button>
    <div class="shop-filter-container">
      <input type="text" id="txt-filter" placeholder="Search..." value=""/>
      <button id="btn-clear-filter">Clear</button>
    </div>
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

    let filterInput = '';

    fillTable(data, filterInput);

    document.getElementById('txt-filter').oninput = (ev) => {
      filterInput = ev.target.value;
      fillTable(data,filterInput);
    };

    document.getElementById('btn-clear-filter').onclick = () => {
      document.getElementById('txt-filter').value = '';
      filterInput = '';
      fillTable(data,filterInput);
    }
}

function fillTable(data, filterInput) {
  document.getElementById('products-table').querySelector('tbody').innerHTML = data
    .filter((product) => product.city.toLowerCase().includes(filterInput.toLowerCase()))
    .map((product) => `<tr id="product-${product.id}" onclick="link('shop','details','${product.id}')"><td>${product.city}</td><td>${product.name}</td></tr>`)
    .reduce((total, el) => total.concat(el),'');
}
