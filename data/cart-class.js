class Cart {
    cartItems = JSON.parse(localStorage.getItem(this.key)) || []

    constructor(localStorageKey) {
        this.key = localStorageKey
    }
    
    addtoCart(productId, quantity) {
          const matchingItem = this.cartItems.find((cartItem) => productId === cartItem.productId);
        
          if (matchingItem) {
            matchingItem.quantity += quantity;
          } else {
            this.cartItems.push({
              productId,
              quantity,
              deliveryOptionId: '1'
            });
          }
          this.#saveToStorage()
        }
        
        #saveToStorage(){
          localStorage.setItem(this.key, JSON.stringify(this.cartItems))
        }

        removeFromCart(productId){
            const index = this.cartItems.findIndex(product => productId === product.productId)
            if(index !== -1){
              this.cartItems.splice(index, 1)
              console.log(this.cartItems)
            }
            this.#saveToStorage()
        
            let cartQuantity = 0
            this.cartItems.forEach(product => {
              cartQuantity += product.quantity
            });
        
            document.querySelector('.js-return-to-home')
            .innerHTML = `${cartQuantity} items`
        }

        updateQuantity(productId, newQuantity){
          const quantity = document.querySelector(`.js-quantity-label-${productId}`)
          const quantityLink = document.querySelector('.js-return-to-home')
          const product = this.cartItems.find(value => productId === value.productId)
          product.quantity = newQuantity
          let cartQuantity = 0
          this.cartItems.forEach(value => cartQuantity += value.quantity)
          console.log(this.cartItems)
          this.#saveToStorage()
          quantity.innerHTML = newQuantity
          quantityLink.innerHTML = `${cartQuantity} items`
        }

        updateDeliveryOption(productId, deliveryOptionId){
          const matchingItem = this.cartItems.find(cartItem => productId === cartItem.productId)
          matchingItem.deliveryOptionId = deliveryOptionId
          this.#saveToStorage()
          console.log(this.cartItems)
        }
}

const normalCart = new Cart('cart-oop')
const bussinessCart = new Cart('cart-business')

console.log(normalCart)
console.log(bussinessCart)
console.log(normalCart instanceof Cart)
