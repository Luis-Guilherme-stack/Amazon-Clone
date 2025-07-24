import { orders } from "../data/order.js"
import { cart } from "./cart.js";
import { formatCurrency } from "./utils/money.js";
import { products, loadProductsFetch } from "../data/products.js";
import dayjs from "https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js"

function updateCartQuantity(){
    let cartQuantity = 0
    cart.forEach(product => {
    cartQuantity += product.quantity
    });

    document.querySelector('.cart-quantity')
    .innerHTML = `${cartQuantity}`
}

async function loadPage() {
    await loadProductsFetch()

    renderOrders()
}

function renderOrders(){
    let ordersHTML = ''
    const ordersGrid = document.querySelector('.orders-grid')
    
    
    
    orders.forEach(order => {
        let productHTML = ''
        const date = dayjs(order.orderTime).format('MMMM D')
    
        order.products.forEach(product => {
            const matchingProduct = products.find(item => item.id === product.productId)
            const deliveryTime = dayjs(product.estimatedDeliveryTime).format('MMMM D')
            productHTML += `          
                        <div class="product-image-container">
                        <img src="${matchingProduct.image}">
                        </div>

                        <div class="product-details">
                        <div class="product-name">
                            ${matchingProduct.name}
                        </div>
                        <div class="product-delivery-date">
                            Arriving on: ${deliveryTime}
                        </div>
                        <div class="product-quantity">
                            Quantity: ${product.quantity}
                        </div>
                        <button class="buy-again-button button-primary">
                            <img class="buy-again-icon" src="images/icons/buy-again.png">
                            <span class="buy-again-message">Buy it again</span>
                        </button>
                        </div>

                        <div class="product-actions">
                        <a href="tracking.html?orderId=${order.id}&productId=${matchingProduct.id}">
                            <button class="track-package-button button-secondary">
                            Track package
                            </button>
                        </a>
                        </div>`
        })
        
         ordersHTML += `<div class="order-container">
              
              <div class="order-header">
                <div class="order-header-left-section">
                  <div class="order-date">
                    <div class="order-header-label">Order Placed:</div>
                    <div>${date}</div>
                  </div>
                  <div class="order-total">
                    <div class="order-header-label">Total:</div>
                    <div>$${formatCurrency(order.totalCostCents)}</div>
                  </div>
                </div>
    
                <div class="order-header-right-section">
                  <div class="order-header-label">Order ID:</div>
                  <div>${order.id}</div>
                </div>
              </div>
              <div class="order-details-grid">${productHTML}</div></div>`
              console.log(ordersHTML)
    });
    ordersGrid.innerHTML = ordersHTML

}

updateCartQuantity()
loadPage()