const API = 'https://recruitment.hal.skygate.io/companies';
const API_DETAILS = 'https://recruitment.hal.skygate.io/incomes/';

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
    <div class="shop-pagination-container">
      <span>Display</span>
      <input type="radio" id="pagination-10" name="pagination" value="10"/>
      <label for="pagination-10">10</label>
      <input type="radio" id="pagination-25" name="pagination" value="25" checked/>
      <label for="pagination-25">25</label>
      <input type="radio" id="pagination-50" name="pagination" value="50"/>
      <label for="pagination-50">50</label>
      <span> elements on a page</span>
    </div>
    <div class="pages-container">
      <button class="link page-nav" id="prev-page">&#706;</button>
      <span id="current-page">1</span>
        of 
      <span id="pages-count">2</span>
      <button class="link page-nav" id="next-page">&#707;</button>
    </div>
    <table id="products-table" class="products-table">
      <thead>
        <tr>
          <th id="products-header">Product<span style="float:right"><span id="sort-desc" style="display: none">˄</span><span id="sort-asc">˅</span></span></th>
          <th>Brand</th>
          <th>Price</th>
        </tr>
      </thead>
      <tbody></tbody>
    </table>`;

    root.appendChild(article);
    
    let filterInput = '';
    let sortAsc = true;
    let productsOnPage = document.querySelector('input[name="pagination"]:checked').value;
    let currentPage = 0;

    const response = await fetch(API);
    let data = await response.json();
    
    let pagesCount = calculatePagesCount(data, filterInput, productsOnPage);
    document.getElementById('pages-count').innerHTML = pagesCount;
    document.getElementById('current-page').innerHTML = currentPage + 1;

    fillTable(data, filterInput, sortAsc, productsOnPage, currentPage);

    document.getElementById('txt-filter').oninput = (ev) => {
      filterInput = ev.target.value;
      pagesCount = calculatePagesCount(data, filterInput, productsOnPage);
      document.getElementById('pages-count').innerHTML = pagesCount;
      currentPage = 0;
      document.getElementById('current-page').innerHTML = currentPage + 1;
      fillTable(data,filterInput, sortAsc, productsOnPage, currentPage);
    };
    
    document.getElementById('btn-clear-filter').onclick = () => {
      document.getElementById('txt-filter').value = '';
      filterInput = '';
      fillTable(data,filterInput, sortAsc, productsOnPage, currentPage);
    }
    
    document.getElementById('products-header').onclick = () => {
      sortAsc = !sortAsc;
      fillTable(data, filterInput, sortAsc, productsOnPage, currentPage);
      document.getElementById('sort-desc').style.display = !sortAsc ? "inline" : "none";
      document.getElementById('sort-asc').style.display = sortAsc ? "inline" : "none";
    }
    
    [...document.querySelectorAll('input[name="pagination"]')].forEach((el) => {
      el.onchange = () => {
        productsOnPage = document.querySelector('input[name="pagination"]:checked').value;
        currentPage = 0;
        pagesCount = calculatePagesCount(data, filterInput, productsOnPage);
        document.getElementById('pages-count').innerHTML = pagesCount;
        document.getElementById('current-page').innerHTML = currentPage + 1;
        fillTable(data, filterInput, sortAsc, productsOnPage, currentPage);
      };
    });

    document.getElementById('next-page').onclick = () => {
      if(currentPage < pagesCount - 1) {
        currentPage++;
        document.getElementById('current-page').innerHTML = currentPage + 1;
        fillTable(data, filterInput, sortAsc, productsOnPage, currentPage);
      }
    }

    document.getElementById('prev-page').onclick = () => {
      if(currentPage >= 1) {
        currentPage--;
        document.getElementById('current-page').innerHTML = currentPage + 1;
        fillTable(data, filterInput, sortAsc, productsOnPage, currentPage);
      }
    }
    
    data = await Promise.all(data.map(async (product) => ({...product, price: await getPrices(product.id)})));
    fillTable(data, filterInput, sortAsc, productsOnPage, currentPage);

}

function fillTable(data, filterInput, sortAsc, productsOnPage, currentPage) {
  const productsTable = document.getElementById('products-table');
  if(productsTable) {
    productsTable.querySelector('tbody').innerHTML = data
      .filter((product) => product.city.toLowerCase().includes(filterInput.toLowerCase()))
      .sort((product1,product2) => compareStrings(product1.city, product2.city, sortAsc))
      .slice(productsOnPage * currentPage, productsOnPage * currentPage + productsOnPage)
      .map((product) => 
        `<tr id="product-${product.id}" 
        onclick="link('shop','details','${product.id}')">
        <td>${product.city}</td>
        <td>${product.name}</td>
        <td>${product.price === undefined ? '' : product.price}</td>
        </tr>`)
      .reduce((total, el) => total.concat(el),'');
  }
}

function compareStrings(string1, string2, ascending) {
  const s1 = string1.toLowerCase();
  const s2 = string2.toLowerCase();
  const m = ascending ? 1 : -1;
  if(s1 < s2) return -m;
  if(s1 > s2) return m;
  return 0;
}

export async function getPrices(id) {
  const response2 = await fetch(API_DETAILS + id);
  try {
    const priceData = await response2.json();
    const price = priceData.incomes
    .map((el) => el.value)
    .map((v) => parseFloat(v))
    .reduce((total, el) => total + el);

    const priceTrunc = price.toFixed(2);
    return priceTrunc;
  } catch(e) {
    return undefined;
  }
}

function calculatePagesCount(data, filterInput, productsOnPage) {
  const filteredData = data.filter((product) => product.city.toLowerCase().includes(filterInput.toLowerCase()));
  return Math.ceil(filteredData.length / productsOnPage);
}
