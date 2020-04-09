import showNotification from './popups/notifications.js'

export function addToCart(product) {

  let cartContent = JSON.parse(localStorage.getItem('cartContent'));
  cartContent = [...cartContent, {count: 1, product}];
  localStorage.setItem('cartContent', JSON.stringify(cartContent));

  showNotification('Udało się',product.city);
}

export function clearCart() {

  localStorage.setItem('cartContent', '[]');
}

export function getCartContent() {
  return JSON.parse(localStorage.getItem('cartContent'));
}