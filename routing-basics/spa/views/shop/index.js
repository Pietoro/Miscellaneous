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
          <th id="products-header">Product<span style="float:right"><span id="sort-desc" style="display: none">˄</span><span id="sort-asc">˅</span></span></th>
          <th>Brand</th>
        </tr>
      </thead>
      <tbody></tbody>
    </table>`;

    root.appendChild(article);
    
    let filterInput = '';
    let sortAsc = true;

    const response = await fetch(API);
    const data = await response.json();


    fillTable(data, filterInput, sortAsc);

    document.getElementById('txt-filter').oninput = (ev) => {
      filterInput = ev.target.value;
      fillTable(data,filterInput, sortAsc);
    };

    document.getElementById('btn-clear-filter').onclick = () => {
      document.getElementById('txt-filter').value = '';
      filterInput = '';
      fillTable(data,filterInput, sortAsc);
    }

    document.getElementById('products-header').onclick = () => {
      sortAsc = !sortAsc;
      fillTable(data, filterInput, sortAsc);
      document.getElementById('sort-desc').style.display = !sortAsc ? "inline" : "none";
      document.getElementById('sort-asc').style.display = sortAsc ? "inline" : "none";
    }
}

function fillTable(data, filterInput, sortAsc) {
  document.getElementById('products-table').querySelector('tbody').innerHTML = data
    .filter((product) => product.city.toLowerCase().includes(filterInput.toLowerCase()))
    .sort((product1,product2) => compareStrings(product1.city, product2.city, sortAsc))
    .map((product) => `<tr id="product-${product.id}" onclick="link('shop','details','${product.id}')"><td>${product.city}</td><td>${product.name}</td></tr>`)
    .reduce((total, el) => total.concat(el),'');
}

function compareStrings(string1, string2, ascending) {
  const s1 = string1.toLowerCase();
  const s2 = string2.toLowerCase();
  const m = ascending ? 1 : -1;
  if(s1 < s2) return -m;
  if(s1 > s2) return m;
  return 0;
}
