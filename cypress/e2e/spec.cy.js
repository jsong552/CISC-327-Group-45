describe('tests for pharma237 site', () => {
    it('Searches for a medicine', () => {
        cy.visit('https://pharma-cisc327-group-45.netlify.app/');

        cy.contains("Inventory").click();
        cy.url().should('include', '/inventory');

        cy.get('[data-testid="search-input"]').type('Popeyes');

        cy.contains("Popeyes").click();
    });

    it('adds a medicine', () => {
        cy.visit('https://pharma-cisc327-group-45.netlify.app/');

        cy.contains("Add Medicine").click();
        cy.url().should('include', '/addmedicine');

        cy.get('[data-testid="add-medicine-name"]').type('Ahmed Rizwan');
        cy.get('[data-testid="add-medicine-quantity"]').type('2');
        cy.get('[data-testid="add-medicine-id"]').type('AMDRZWAN2456');

        cy.get('[data-testid="add-medicine-button"]').click();
        cy.get('[data-testid="sidebar-inventory-link"]').click();

        cy.url().should('include', '/inventory');
        cy.contains("Ahmed Rizwan");
    });

    
    it('makes a sale', () =>{
        cy.visit('https://pharma-cisc327-group-45.netlify.app/');
        

        cy.contains('Make Order').click();

        cy.url().should('include', '/order');

        cy.get('[data-testid="order-name"]').type("Adwait");
        cy.get('[data-testid="order-quantity"]').type("1");
        cy.get('[data-testid="order-id"]').type("ADWAI360");
        cy.get('[data-testid="order-price"]').type("1000");

        cy.get('[data-testid="order-button"]').click();
        cy.get('[data-testid="sidebar-sales-link"]').click();

        cy.url().should('include', '/sales');
        cy.contains("Advil");





    })
    


})