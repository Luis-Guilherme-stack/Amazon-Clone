import { formatCurrency } from "../js/utils/money.js";

export function getProduct(productId){
  return products.find(product => product.id === productId)
}

class Product {
  id;
  image;
  name;
  rating;
  priceCents;

  constructor(productDetails){
    this.id = productDetails.id
    this.image = productDetails.image
    this.name = productDetails.name
    this.rating = productDetails.rating
    this.priceCents = productDetails.priceCents
  }

  getStarsUrl() {
    return `images/ratings/rating-${this.rating.stars * 10}.png`
  }

  getPrice(){
    return `$${formatCurrency(this.priceCents)}`
  }

  extraInfoHTML(){
    return ''
  }

  applianceHTML(){
    return ''
  }
}

class Clothing extends Product{
  sizeChartLink

  constructor(productDetails){
    super(productDetails)
    this.sizeChartLink = productDetails.sizeChartLink
  }

  // super.extraInfoHTML()

  extraInfoHTML(){
    return `<a class="size-chart" href="${this.sizeChartLink}" target="_blank">Size Chart</a>`;
  }
  
  applianceHTML(){
    return ''
  }
}

class Appliance extends Product{
  instruction
  warranty

  constructor(productDetails){
    super(productDetails)
    this.instruction = '../images/instruction.png'
    this.warranty = '../images/warranty.png'
  }
  applianceHTML(){
    return `<div class="container-link">
            <a class="instructions" href="${this.instruction}" target="_blank">Instructions</a>
            <a class="warranty" href="${this.warranty}" target="_blank">Warranty</a>
    </div>`
  }
}
export let products = []

export function loadProductsFetch(){
  const promise = fetch(
    'https://supersimplebackend.dev/products/')
    .then(response => {
    return response.json();
  }).then(data => {
    products = data.map(productDetails => {
      if(productDetails.type){
        return new Clothing(productDetails)
      }else if(productDetails.keywords.find(value => value === 'appliances')){
        return new Appliance(productDetails)
      }else{   
        return new Product(productDetails)
  }
})
  }).catch(error => {
    
    console.log(`error: ${error}`)
  })
  return promise
}
