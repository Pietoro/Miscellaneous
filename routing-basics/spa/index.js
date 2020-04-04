import privacyIndex from "./views/privacy/index.js";
import privacyRodo from "./views/privacy/rodo.js";
import privacyFrodo from "./views/privacy/frodo.js";

window.link = link;
console.log('hello')

const DOMAIN = 'awesome.io';
const ROUTES = ['home','shop','privacy','notfound'];
const VIEWS = {
  'notfound': ['index'],
  'home': ['index'],
  'shop': ['index', 'details'],
  'privacy': ['index','rodo','frodo']
};
const API = 'https://recruitment.hal.skygate.io/companies';

let path = {
  route: 'home',
  view: 'index',
  id: ''
};

let prevPath = {
  route: 'home',
  view: 'index',
  id: ''
};



function link(newRoute = 'home', newView = 'index', newId = '') {
  
  if(newRoute === path.route && newView === path.view && newId === path.id) return;
  if(!ROUTES.includes(newRoute) || !VIEWS[newRoute].includes(newView)) {
    notFound();
    return;
  }

  const root = document.querySelector('main');

  switch(newRoute) {
    case 'shop':
      switch(newView) {
        case 'index':
          initShop();
          break;
        case 'details':
          initDetails(newId);
          break;
      }
      break;
    case 'privacy':
      switch(newView) {
        case 'index':
          privacyIndex(root);
          break;
        case 'rodo':
          privacyRodo(root);
          break;
        case 'frodo':
          privacyFrodo(root);
          break;
      }
      break;
  }

  prevPath = path;
  path = {
    route: newRoute,
    view: newView,
    id: newId
  }

  document.getElementById(`view-${prevPath.route}-${prevPath.view}`).style.display = 'none';
  document.getElementById(`route-${prevPath.route}`).style.display = 'none';
  document.getElementById(`route-${newRoute}`).style.display = 'block';
  document.getElementById(`view-${newRoute}-${newView}`).style.display = 'block';

  displayUrl();
  
}

function notFound(redirect = path) {
  link('notfound');
  document.getElementById('link-goback').onclick = () => link(prevPath.route, prevPath.view, prevPath.id);
}

function displayUrl() {
  const urlRoute = (path.route === 'home' && path.view === 'index') ? `` : `${path.route}`;
  const urlView = path.view  === 'index' ? `` : `/${path.view}`;
  const urlId = path.id === '' ? `` : `?id=${path.id}`;
  document.querySelector('.url').innerHTML = `${DOMAIN}/${urlRoute}${urlView}${urlId}`;
}

async function initShop() {
  const response = await fetch(API);
  const data = await response.json();
  fillTable(data);
  console.log(data);
}

function fillTable(data) {
  document.getElementById('products-table').querySelector('tbody').innerHTML = data
    .map((product) => `<tr id="product-${product.id}" onclick="link('shop','details','${product.id}')"><td>${product.city}</td><td>${product.name}</td></tr>`)
    .reduce((total, el) => total.concat(el),'');
}

async function initDetails(id) {
  const response = await fetch(API);
  const data = await response.json();
  console.log(data);
  const product = data.find((pr) => `${pr.id}` === id);

  const response2 = await fetch(`https://recruitment.hal.skygate.io/incomes/${id}`)
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
