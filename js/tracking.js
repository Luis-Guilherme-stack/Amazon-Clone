import { orders } from "../data/order.js"
import { cart } from "./cart.js";
import dayjs from "https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js"
import { products, loadProductsFetch } from "../data/products.js";

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
    let product = ''
    let order = ''
    let orderProduct = ''
    const container = document.querySelector('.main')
    const url = new URL(window.location.href)
    const orderId = url.searchParams.get('orderId')
    const productId = url.searchParams.get('productId')

    order = orders.find(order => order.id === orderId)
    orderProduct = order.products.find(product => product.productId === productId)
    product = products.find(product => product.id === productId)

    container.innerHTML = `<div class="order-tracking">
                            <a class="back-to-orders-link link-primary" href="orders.html">
                            View all orders
                            </a>

                            <div class="delivery-date">
                            Arriving on ${dayjs(orderProduct.estimatedDeliverytime).format('dddd, MMMM DD')}
                            </div>

                            <div class="product-info">
                            ${product.name}
                            </div>

                            <div class="product-info">
                            Quantity: ${orderProduct.quantity}
                            </div>

                            <img class="product-image" src="${product.image}">

                            <div class="progress-labels-container">
                            <div class="progress-label">
                                Preparing
                            </div>
                            <div class="progress-label current-status">
                                Shipped
                            </div>
                            <div class="progress-label">
                                Delivered
                            </div>
                            </div>
                            <div class="progress-bar-container">
                            <div class="progress-bar"></div>
                            </div>
                        </div>`
}

updateCartQuantity()
loadPage()


