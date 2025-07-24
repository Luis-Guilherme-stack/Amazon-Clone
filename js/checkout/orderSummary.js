import { getProduct } from "../../data/products.js";
import { cart, removeFromCart, updateQuantity, updateDeliveryOption } from ".././cart.js";
import { formatCurrency } from "../utils/money.js";
import { deliveryOptions, getDeliveryOption } from "../../data/deliveryOptions.js"
import { renderPaymentSummary } from "./paymentSummary.js";
import renderCheckoutHeader from "./checkoutHeader.js";
import { getDate } from "../../data/deliveryOptions.js";

export function renderOrderSummary(){

    function saveUpdate(link){
        const productId = link.dataset.productId
        const inputQuantityValue = Number(document.querySelector(`.js-quantity-input-${productId}`).value)
        if(inputQuantityValue){
          
          if(inputQuantityValue >= 1 && inputQuantityValue <= 100){
            const itemContainer = document.querySelector(`.js-cart-container-${productId}`)
            itemContainer.classList.remove('is-editing-quantity')
            updateQuantity(productId, inputQuantityValue)
          }else {
            alert('You must insert a number between 1 and 100')
          }
        } else {
          const itemContainer = document.querySelector(`.js-cart-container-${productId}`)
          itemContainer.classList.remove('is-editing-quantity')
        }
    }

    function deliveryOptionsHTML(product ,deliveryOptionId){
        let deliveryHTML = ''
        deliveryOptions.forEach(deliveryOption => {
          const dateString = getDate(deliveryOption.deliveryDays)
          const priceString = deliveryOption.priceCents === 0 ? 'FREE' : formatCurrency(deliveryOption.priceCents)
          const isChecked = deliveryOption.id === deliveryOptionId ? 'checked' : ''
          deliveryHTML += `
                      <div class="delivery-option js-delivery-option" data-delivery-id="${deliveryOption.id}" data-product-id="${product.id}">
                        <input type="radio" ${isChecked}
                          class="delivery-option-input"
                          name="delivery-option-${product.id}">
                        <div>
                          <div class="delivery-option-date">
                            ${dateString}
                          </div>
                          <div class="delivery-option-price">
                            ${priceString} - Shipping
                          </div>
                        </div>
                      </div>
          `
          
        })
        return deliveryHTML
      }


    let productsHTML = ''
    let totalCartItems = 0
    
    cart.forEach(product => {
        const {productId, deliveryOptionId} = product
        const matchingProduct = getProduct(productId)
        const deliveryOption = getDeliveryOption(deliveryOptionId)
        const dateString = getDate(deliveryOption.deliveryDays)
        totalCartItems += product.quantity
        productsHTML += `<div class="cart-item-container js-cart-container-${matchingProduct.id}">
                <div class="delivery-date">
                  Delivery date: ${dateString}
                </div>

                <div class="cart-item-details-grid">
                  <img class="product-image"
                    src="${matchingProduct.image}">

                  <div class="cart-item-details">
                    <div class="product-name">
                    ${matchingProduct.name}
                  </div>
                    <div class="product-price">
                      ${matchingProduct.getPrice()}
                    </div>
                    <div class="product-quantity">
                      <span>
                        Quantity: <span class="quantity-label js-quantity-label-${matchingProduct.id}">${product.quantity}</span>
                      </span>
                      <span data-product-id="${matchingProduct.id}" class="update-quantity-link link-primary js-update-quantity">
                        Update
                      </span>
                      <input class="quantity-input js-quantity-input-${matchingProduct.id}">
                      <span data-product-id="${matchingProduct.id}" class="save-quantity-link link-primary js-save-link">Save</span>
                      <span data-product-id="${matchingProduct.id}" class="delete-quantity-link link-primary js-delete-link">
                        Delete
                      </span>
                      </div>
                    </div>
                    <div class="delivery-options">
                    <div class="delivery-options-title">
                      Choose a delivery option:
                    </div>
                    ${deliveryOptionsHTML(matchingProduct, deliveryOptionId)}
                  </div>
                </div>
              </div>`
    })

    console.log(cart)

    document.querySelector('.js-order-summary')
    .innerHTML = productsHTML

    document.querySelectorAll('.js-delete-link').forEach( link => {
      link.addEventListener('click', () => {
        const deleteLinkId = link.dataset.productId
        removeFromCart(deleteLinkId)
        renderCheckoutHeader()
        renderPaymentSummary()
        renderOrderSummary()
      })
    })

    document.querySelectorAll('.js-update-quantity').forEach(link => {
        link.addEventListener('click', () => {
          const productId = link.dataset.productId
          const itemContainer = document.querySelector(`.js-cart-container-${productId}`)
          itemContainer.classList.add('is-editing-quantity')
        })
    })

    document.querySelectorAll('.js-save-link').forEach(link => {
        link.addEventListener('click', () => {
          saveUpdate(link)
          renderCheckoutHeader()
          renderPaymentSummary()
        })
    })

    document.querySelectorAll('.js-delivery-option').forEach(element => {
      element.addEventListener('click', () => {
        const {productId, deliveryId} = element.dataset
        updateDeliveryOption(productId, deliveryId)
        renderOrderSummary()
        renderPaymentSummary()
      })
    })
}