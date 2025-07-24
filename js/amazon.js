import { cart, addtoCart } from "./cart.js";
import { products, loadProductsFetch } from "../data/products.js";

async function loadPage() {
  await loadProductsFetch();

  renderProductsGrid();
}

loadPage()

function renderProductsGrid(){
  let productsHTML = "";
  products.forEach((product) => {
    productsHTML += `<div class="product-container" data-product-id="${product.id}">
            <div class="product-image-container">
              <image class="product-image"
                src="${product.image}">
            </div>
  
            <div class="product-name limit-text-to-2-lines">
              ${product.name}
            </div>
  
            <div class="product-rating-container">
              <image class="product-rating-stars"
                src="${product.getStarsUrl()}">
              <div class="product-rating-count link-primary">
                ${product.rating.count}
              </div>
            </div>
  
            <div class="product-price">
              ${product.getPrice()}
            </div>
  
            <div class="product-quantity-container">
              <select class="js-quantity-selector-${product.id}">
                <option selected value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
              </select>
              ${product.extraInfoHTML()}
              ${product.applianceHTML()}
            </div>
  
            <div class="product-spacer"></div>
  
            <div class="added-to-cart js-added-to-cart-${product.id}">
              <image src="images/icons/checkmark.png">
              Added
            </div>
  
            <button class="add-to-cart-button button-primary js-add-to-cart" data-product-id="${
              product.id
            }">
              Add to Cart
            </button>
          </div>`;
  });
  
  let addedMessageId = {};
  
  
  
  document.querySelector(".js-products-grid").innerHTML = productsHTML;
  
  function updateCartQuantity(){
        let cartQuantity = 0
        cart.forEach(product => {
        cartQuantity += product.quantity
      });
  
      document.querySelector('.js-cart-quantity')
      .innerHTML = `${cartQuantity}`
  }
  
  updateCartQuantity()
  
  function updateCart(cartQuantityPage) {
  
      let cartQuantity = 0;
      cart.forEach((item) => {cartQuantity += item.quantity;});
      cartQuantityPage.innerHTML = cartQuantity;
  }
  
  function addedtoCart(productId, checkMark) {
      if (addedMessageId[productId]) {
        clearTimeout(addedMessageId[productId]);
      }
  
      checkMark.classList.add("added-to-cart-opacity");
      const timeOutId = setTimeout(() => {
        checkMark.classList.remove("added-to-cart-opacity");
      }, 2000);
  
      addedMessageId[productId] = timeOutId;
  }
  document.querySelectorAll(".js-add-to-cart").forEach((button) => {
    button.addEventListener("click", () => {
      const { productId } = button.dataset;
      const quantitySelector = document.querySelector(`.js-quantity-selector-${productId}`);
      const cartQuantityPage = document.querySelector(".js-cart-quantity");
      const checkMark = document.querySelector(`.js-added-to-cart-${productId}`);
      const quantity = Number(quantitySelector.value);
  
      addtoCart(productId, quantity);
      addedtoCart(productId, checkMark)
      updateCart(cartQuantityPage)
  
    });
  });

}