describe('Application happy path', () => {

  it('passes', () => {

    cy.intercept(
      {
        method: 'POST', // Route all GET requests
        url: 'https://playground.tesonet.lt/v1/tokens', // that have a URL that matches '/users/*'
      },
      { token: "world" } // and force the response to be: []
    ).as('getToken') // and assign an alias

    cy.intercept(
      {
        method: 'GET', // Route all GET requests
        url: 'https://playground.tesonet.lt/v1/servers', // that have a URL that matches '/users/*'
      },
      [{name: "Lithuania", distance: "123"}, {name: "Germany", distance: "1050"}, {name: "Austria", distance: "500"}] // and force the response to be: []
    ).as('getServers') // and assign an alias

    cy.visit('/');

    cy.get('input[name=username]').type("tes");
    cy.get('input[name=password]').type("par");

    cy.get('button[type=submit]').click();

    // should displau "invalid credentials"
    cy.get('div').should('contain', 'Invalid credentials');

    cy.get('input[name=username]').type("tesonet");
    cy.get('input[name=password]').type("partyanimal");

    

  })
})