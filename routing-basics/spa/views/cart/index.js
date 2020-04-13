import {getPrices} from '../shop/index.js';
import { clearCart, getCartContent, removeFromCart, decreaseCountInCart, increaseCountInCart } from '../../cart.js';
import {showConfirm} from '../../popups/alerts.js';
import showNotification from '../../popups/notifications.js'

let cartContent = [
  // {
  //   count: 2,
  //   product: { 
  //     id: 298,
  //     name: 'Alten',
  //     brand: 'Botsford'
  //   }
  // },
  // {
  //   count: 1,
  //   product: { 
  //     id: 180,
  //     name: 'Ankan',
  //     brand: 'Tremb'
  //   }
  // },
  // {
  //   count: 1,
  //   product: { 
  //     id: 248,
  //     name: 'Casper',
  //     brand: 'Balthazar'
  //   }
  // }
];

export default function cartIndex(root) {

  root.innerHTML = '';

  const article = document.createElement('article');
  article.setAttribute('id', 'view-cart-index');

  root.appendChild(article);

  cartContent = getCartContent();

  if(cartContent.length === 0) {
    emptyCart(article);
  } else {
    fullCart(article);
  }

}

function emptyCart(article) {
  article.innerHTML = '<h3>Your cart is empty</h3>';
}

function fullCart(article) {

  article.innerHTML = 
    `<h3>Products in your cart:</h3>
    <table class="cart-table" id="cart-table">
      <thead>
        <tr>
          <th></th>
          <th class="head-product">Product</th>
          <th class="head-amount">Amount</th>
          <th class="head-price">Price</th>
          <th class="head-total">Total price</th>
        </tr>
      </thead>
      <tbody>
      
      </tbody>
    </table>
    <button class="btn-cart" id="btn-clear-cart">Clear cart</button>
    <button class="btn-cart" id="btn-continue-shopping" onclick="link('shop','index')">Continue shopping</button>
    <button class="btn-cart" id="btn-cart-buy">Buy</button>
  `;

  fillCartTable();
  document.getElementById('btn-clear-cart').onclick = () => {
    clearCart();
    emptyCart(article);
  };
  
  document.getElementById('btn-cart-buy').onclick = () => {
    showConfirm(
      'Product purchase',
      'Are you sure you want buy this product?', 
      () => {
        showNotification('Product purchase',`Thank you for buying our products`)
        clearCart();
        emptyCart(article);
      }
    );
  };
}

async function fillCartTable() {
  
  const cartTableData = await Promise.all(cartContent
    .map(async (content) => (
      {
        ...content, 
        product: ({
          ...content.product, 
          price: await getPrices(content.product.id)
        })
      }
    )));

  document.getElementById('cart-table').querySelector('tbody').innerHTML = cartTableData
    .map((content, index) => `
      <tr>
        <td><button class="link btn-cart-rmv" id="btn-remove-${index}">x</button></td>
        <td><b>${content.product.city}</b> by ${content.product.name}</td>
        <td>${content.count}<button class="link btn-cart-change" id="btn-decr-${index}">-</button><button class="link btn-cart-change" id="btn-incr-${index}">+</button></td>
        <td>${content.product.price}$</td>
        <td>${(content.product.price * content.count).toFixed(2)}$</td>
      </tr>
    `)
    .reduce((total, el) => total.concat(el), '');

  document.getElementById('cart-table').querySelector('tbody').innerHTML += 
    `<tr>
    <td></td><td></td><td></td><td></td>
    <td><b>
    ${cartTableData
      .map((content) => parseFloat(content.product.price) * content.count)
      .reduce((total, el) => total + el, 0)
      .toFixed(2)
      }$
    </b></td>
   </tr>`

   cartTableData.forEach((content, index) => {
    console.log(content);
    console.log(index);
    document.getElementById(`btn-remove-${index}`).onclick = () => {
      removeFromCart(content.product);
      cartContent = getCartContent();
      fillCartTable();

      if(cartContent.length === 0) {
        emptyCart(document.getElementById('view-cart-index'));
      } 
    };
    document.getElementById(`btn-decr-${index}`).onclick = () => {
      decreaseCountInCart(content.product);
      cartContent = getCartContent();
      fillCartTable();

      if(cartContent.length === 0) {
        emptyCart(document.getElementById('view-cart-index'));
      } 
    };
    document.getElementById(`btn-incr-${index}`).onclick = () => {
      increaseCountInCart(content.product);
      cartContent = getCartContent();
      fillCartTable();

      if(cartContent.length === 0) {
        emptyCart(document.getElementById('view-cart-index'));
      } 
    };
  });
}


