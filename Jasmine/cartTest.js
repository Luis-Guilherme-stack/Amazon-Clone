import { addtoCart, cart } from "../js/cart.js";

describe('Test suite: addtoCart', () => {
    
    it('Adds an existing product to the cart', () => {
        addtoCart('63142454-bdfa-483c-b013-cf1539ac9537')
        expect(cart.length).toEqual(1)
    })
    it('Adds a new product to the cart', () => {
        
    })
})