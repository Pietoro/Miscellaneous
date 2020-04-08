let cartContent = [
  {
    count: 0,
    product: { 
      id: 298,
      name: 'Alten',
      brand: 'Botsford'
    }
  },
  {
    count: 0,
    product: { 
      id: 180,
      name: 'Ankan',
      brand: 'Tremb'
    }
  },
  {
    count: 0,
    product: { 
      id: 248,
      name: 'Casper',
      brand: 'Balthazar'
    }
  }
];

export default function cartIndex(root) {

  root.innerHTML = '';

  const article = document.createElement('article');
  article.setAttribute('id', 'view-cart-index');

  root.appendChild(article);

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
    <table class="cart-table">
      <thead>
        <tr>
          <th>Product</th>
          <th>Amount</th>
          <th>Price</th>
        </tr>
      </thead>
      <tbody></tbody>
    </table>
    <button>Clear cart</button>
    <button>Continue shopping</button>
    <button>Buy</button>
  `;
}
