import showNotification from './popups/notifications.js'

export function addToCart(product) {

  let cartContent = JSON.parse(localStorage.getItem('cartContent'));
  
  const index = cartContent.findIndex((content) => content.product.id === product.id);
  if(index > -1) {
    cartContent[index].count += 1;
  } else {
    cartContent = [...cartContent, {count: 1, product}];
  }

  localStorage.setItem('cartContent', JSON.stringify(cartContent));

  showNotification('Udało się',product.city);
}

export function clearCart() {

  localStorage.setItem('cartContent', '[]');
}

export function getCartContent() {
  return JSON.parse(localStorage.getItem('cartContent'));
}

export function removeFromCart(product) {

  let cartContent = JSON.parse(localStorage.getItem('cartContent'));
  
  const index = cartContent.findIndex((content) => content.product.id === product.id);
  if(index > -1) {
    cartContent.splice(index, 1);
  } 

  localStorage.setItem('cartContent', JSON.stringify(cartContent));
}

export function decreaseCountInCart(product) {

  let cartContent = JSON.parse(localStorage.getItem('cartContent'));
  
  const index = cartContent.findIndex((content) => content.product.id === product.id);
  if(index > -1) {
    cartContent[index].count -= 1;
    if(cartContent[index].count <= 0) {
      removeFromCart(product);
    } else {
      localStorage.setItem('cartContent', JSON.stringify(cartContent));
    }
  }
}

export function increaseCountInCart(product) {

  let cartContent = JSON.parse(localStorage.getItem('cartContent'));
  
  const index = cartContent.findIndex((content) => content.product.id === product.id);
  if(index > -1) {
    cartContent[index].count += 1;
    if(cartContent[index].count <= 0) {
      removeFromCart(product);
    } else {
      localStorage.setItem('cartContent', JSON.stringify(cartContent));
    }
  }
}
