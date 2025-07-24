import { formatCurrency } from "../utils/money.js"
import { getProduct } from "../../data/products.js"
import { cart } from "../cart.js"
import { getDeliveryOption } from "../../data/deliveryOptions.js"
import { addOrder } from "../../data/order.js"

export function renderPaymentSummary(){
    let priceProducts = 0
    let priceShipping = 0
    let quantityProducts = 0
    cart.forEach(cartItem => {

        quantityProducts += cartItem.quantity
        const product = getProduct(cartItem.productId)
        priceProducts += product.priceCents * cartItem.quantity

        const deliveryOption = getDeliveryOption(cartItem.deliveryOptionId)
        priceShipping += deliveryOption.priceCents
    })

    const totalBeforeTax = priceProducts + priceShipping
    const taxes = totalBeforeTax * 0.1

    const prices = {
        total: formatCurrency(totalBeforeTax + taxes),
        totalBeforeTaxes: formatCurrency(priceProducts + priceShipping),
        tax: formatCurrency(totalBeforeTax * 0.1),
        priceProducts: formatCurrency(priceProducts),
        priceShipping: formatCurrency(priceShipping),
    }

    const paymentSummaryHTML = `
        <div class="payment-summary-title">
            Order Summary
          </div>

          <div class="payment-summary-row">
            <div>Items (${quantityProducts}):</div>
            <div class="payment-summary-money">$${prices.priceProducts}</div>
          </div>

          <div class="payment-summary-row">
            <div>Shipping &amp; handling:</div>
            <div class="payment-summary-money">$${prices.priceShipping}</div>
          </div>

          <div class="payment-summary-row subtotal-row">
            <div>Total before tax:</div>
            <div class="payment-summary-money">$${prices.totalBeforeTaxes}</div>
          </div>

          <div class="payment-summary-row">
            <div>Estimated tax (10%):</div>
            <div class="payment-summary-money">$${prices.tax}</div>
          </div>

          <div class="payment-summary-row total-row">
            <div>Order total:</div>
            <div class="payment-summary-money">$${prices.total}</div>
          </div>

          <button class="place-order-button button-primary">
            Place your order
          </button>
    `
    document.querySelector('.js-payment-summary')
    .innerHTML = paymentSummaryHTML 
    
    document.querySelector('.place-order-button')
    .addEventListener('click', async () => {
      const response = await fetch('https://supersimplebackend.dev/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify({
          cart: cart
        })
      })
      const order = await response.json()
      addOrder(order)
      localStorage.removeItem('cart')
      window.location.href = 'orders.html'
    })
}