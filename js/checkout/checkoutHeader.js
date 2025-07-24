import { cart } from "../cart.js"

const header = document.querySelector('.js-checkout-header')

export default function renderCheckoutHeader(){
    let cartQuantity = 0
    cart.forEach(cartItem => {
        cartQuantity += cartItem.quantity
    });

    header.innerHTML = `
        Checkout (<a class="return-to-home-link js-return-to-home"
            href="amazon.html">${cartQuantity} items</a>)
    `
}