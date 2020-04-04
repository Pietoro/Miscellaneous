const API = 'https://recruitment.hal.skygate.io/companies';
const API_DETAILS = 'https://recruitment.hal.skygate.io/incomes/';

export default async function shopDetails(root, id) {

root.innerHTML = '';
const article = document.createElement('article');
article.setAttribute('id','view-shop-details');
article.innerHTML = `
  <div class="details-container">
    <div class="product-details">
      <div id="product-name"></div>
      <div id="product-brand"></div>
      <div id="product-price"></div>
    </div>
    <div class="btn-shop-container">
      <button class="link btn-shop">Buy</button>
      <button class="link btn-shop btn-add">Add to cart</button>
    </div>
  </div>`;

  root.appendChild(article);
  
  const response = await fetch(API);
  const data = await response.json();
  const product = data.find((pr) => `${pr.id}` === id);

  const response2 = await fetch(API_DETAILS + id);
  const priceData = await response2.json();
  const price = priceData.incomes
    .map((el) => el.value)
    .map((v) => parseFloat(v))
    .reduce((total, el) => total + el);

  const priceTrunc = price.toFixed(2);

  document.getElementById('product-name').innerHTML = product.city;
  document.getElementById('product-brand').innerHTML = product.name;
  document.getElementById('product-price').innerHTML = `${priceTrunc} $`;
}
