///<reference types="cypress"/>

describe('Saucedemo.com', function() {

    before('visit login page, then login with valid username and password',() => {
        cy.visit('https://saucedemo.com/')
        cy.fixture('saucedemosfixture').then (saucedemosfixture => {
            const username = saucedemosfixture.username
            const password = saucedemosfixture.password
        cy.get('#user-name').type(username)
        cy.get('#password').type(password)
        cy.get('#login-button').click()
        })
    })
    before('Choose a product the add to cart', ()=> {
        cy.get('#item_4_title_link').should('contain.text','Sauce Labs Backpack')
        .click()
        cy.get('*[class^="inventory_details_name large_size"]')
        .should('contain.text','Sauce Labs Backpack')
        cy.fixture('saucedemosfixture'). then (saucedemosfixture =>{
            const harga = saucedemosfixture.harga
        cy.get('*[class^="inventory_details_price"]').contains(harga)
        })
        cy.get('#add-to-cart-sauce-labs-backpack').click()
        cy.get('*[class^="shopping_cart_badge"]').should('have.text','1') 
    })
    before('go to cart then checkout the product', () => {
        cy.get('*[class^="shopping_cart_link"]').click()
        cy.get('*[class^="inventory_item_name"]').should('contain.text','Sauce Labs Backpack')
        cy.fixture('saucedemosfixture'). then (saucedemosfixture =>{
            const harga = saucedemosfixture.harga
        cy.get('*[class^="inventory_item_price"]').contains(harga)
        })
        cy.get('#checkout').click()
    })
    before('fill the informatin then click continue',() =>{
        cy.get('*[class^="title"]').should('contain.text','Checkout: Your Information')
        cy.get('#first-name').type('standard')
        cy.get('#last-name').type('user')
        cy.get('#postal-code').type('12345')
        cy.get('#continue').click()
    })
    before('check data overview then finish checkout',()=>{
        cy.get('*[class^="title"]').should('contain.text','Checkout: Overview')
        cy.get('*[class^="inventory_item_name"]').should('contain.text','Sauce Labs Backpack')
        cy.get('*[class^="inventory_item_price"]').should('contain.text','29.99')
        cy.get('*[class^="summary_subtotal_label"]').should('contain.text','Item total: $','29.99')
        cy.get('*[class^="summary_tax_label"]').should('contain.text','Tax: $','2.40')
        cy.get('*[class^="summary_info_label summary_total_label"]')
        .should('contain.text','Total: $','32.39')
        cy.get('#finish').click()  
    })
    it('finish then logout',()=>{
        cy.get('*[class^="title"]').should('contain.text','Checkout: Complete!')
        cy.get('*[class^="complete-header"]').should('contain.text','Thank you for your order!')
        cy.get('#back-to-products').click()
        cy.get('#react-burger-menu-btn').click()
        cy.get('#logout_sidebar_link').click()
        cy.get('#login_button_container').should('be.visible')
    })
})