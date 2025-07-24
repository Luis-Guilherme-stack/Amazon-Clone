export let cart = JSON.parse(localStorage.getItem('cart')) || []

function saveToStorage(){
  localStorage.setItem('cart', JSON.stringify(cart))
}

export function addtoCart(productId, quantity) {
  const matchingItem = cart.find((cartItem) => productId === cartItem.productId);

  if (matchingItem) {
    matchingItem.quantity += quantity;
  } else {
    cart.push({
      productId,
      quantity,
      deliveryOptionId: '1'
    });
  }
  saveToStorage()
}

export function removeFromCart(productId){
    const index = cart.findIndex(product => productId === product.productId)
    if(index !== -1){
      cart.splice(index, 1)
      console.log(cart)
    }
    saveToStorage()

    let cartQuantity = 0
    cart.forEach(product => {
      cartQuantity += product.quantity
    });

    document.querySelector('.js-return-to-home')
    .innerHTML = `${cartQuantity} items`
}

export function updateQuantity(productId, newQuantity){
  const quantity = document.querySelector(`.js-quantity-label-${productId}`)
  const quantityLink = document.querySelector('.js-return-to-home')
  const product = cart.find(value => productId === value.productId)
  product.quantity = newQuantity
  let cartQuantity = 0
  cart.forEach(value => cartQuantity += value.quantity)
  saveToStorage()
  quantity.innerHTML = newQuantity
  quantityLink.innerHTML = `${cartQuantity} items`
}

export function updateDeliveryOption(productId, deliveryOptionId){
  const matchingItem = cart.find(cartItem => productId === cartItem.productId)
  matchingItem.deliveryOptionId = deliveryOptionId
  saveToStorage()
  console.log(cart)
}