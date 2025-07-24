import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
import  renderCheckoutHeader  from "./checkout/checkoutHeader.js";
import { loadProductsFetch } from "../data/products.js";
// import '../data/backend-practice.js'

async function loadPage() {
    
    await loadProductsFetch()

    renderCheckoutHeader()
    renderOrderSummary()
    renderPaymentSummary()
}

loadPage()