import {getPrices} from '../shop/index.js';
import { clearCart, getCartContent } from '../../cart.js';

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
          <th>Product</th>
          <th>Amount</th>
          <th>Price</th>
          <th>Total price</th>
        </tr>
      </thead>
      <tbody>
      
      </tbody>
    </table>
    <button class="btn-cart clear-cart" id="clear-cart">Clear cart</button>
    <button class="btn-cart continue-cart">Continue shopping</button>
    <button class="btn-cart buy-cart">Buy</button>
  `;

  fillCartTable();
  document.getElementById('clear-cart').onclick = () => {
    clearCart();
    emptyCart(article);
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
    .map((content) => `
      <tr>
        <td><b>${content.product.city}</b> by ${content.product.name}</td>
        <td>${content.count}</td>
        <td>${content.product.price}$</td>
        <td>${content.product.price * content.count}$</td>
      </tr>
    `)
    .reduce((total, el) => total.concat(el));

  document.getElementById('cart-table').querySelector('tbody').innerHTML += 
    `<tr>
    <td></td><td></td><td></td>
    <td><b>
    ${cartTableData
      .map((content) => parseFloat(content.product.price) * content.count)
      .reduce((total, el) => total + el, 0)
      }$
    </b></td>
   </tr>`
}


