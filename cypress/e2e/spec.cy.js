describe('Application user', () => {

  it('cannot see servers page if not logged in', () => {
    cy.visit('/servers');

    // should be redirected to the root page
    cy.location('pathname').should('eq', '/');
  });

  it('can log in, see server list and log out', () => {

    cy.visit('/');

    // attempt a log in with invalid credentials
    cy.get('input[name=username]').type("badusername");
    cy.get('input[name=password]').type("badpass");
    cy.get('button[type=submit]').click();

    // check if the error message is displayed
    cy.get('div').should('contain', 'Invalid credentials');

    // reset the inputs
    cy.get('input[name=username]').clear();
    cy.get('input[name=password]').clear();

    // attempt with correct credentials
    cy.get('input[name=username]').type("tesonet");
    cy.get('input[name=password]').type("partyanimal");
    cy.get('button[type=submit]').click();

    // should be redirected to the servers page
    cy.url().should('include', '/servers');

    // should see the server list in a table with at least one entry
    cy.get('table').should('exist');
    cy.get('tr').should('have.length.greaterThan', 0);

    // should see a log out button
    cy.get('button').should('contain', 'Log out');

    // should be able to log out
    cy.get('button').click();
    
    // should be redirected to the root page
    cy.location('pathname').should('eq', '/');

    // should see the log in form again
    cy.get('form').should('exist');

    // should not see the server list
    cy.get('table').should('not.exist');

  });

  it('can sort the server list', () => {

    const servers = [
      {name: "Lithuania", distance: 123},
      {name: "Germany", distance: 1050},
      {name: "Austria", distance: 500}
    ];

    cy.intercept(
      {
        method: 'GET', 
        url: 'https://playground.tesonet.lt/v1/servers',
      },
      servers
    ).as('getServers');

    cy.intercept(
      {
        method: 'POST', 
        url: 'https://playground.tesonet.lt/v1/tokens',
      },
      { token: "mockUserToken" }
    ).as('getToken')

    cy.visit('/');

    cy.get('input[name=username]').type("user");
    cy.get('input[name=password]').type("pass");
    cy.get('button[type=submit]').click();

    // by clicking the th with content "Server Name"
    cy.get('th').contains('Server Name').click();

    // Austria should be the first entry & Lithuania last
    cy.get('tr').eq(1).should('contain', 'Austria');
    cy.get('tr').eq(3).should('contain', 'Lithuania');

    // we can also sort by name descending
    cy.get('th').contains('Server Name').click();

    // Lithuania should be the first entry & Austria last
    cy.get('tr').eq(1).should('contain', 'Lithuania');
    cy.get('tr').eq(3).should('contain', 'Austria');

    // by clicking the th with content "Distance"
    cy.get('th').contains('Distance').click();

    // Germany should be the first entry & Lithuania last
    cy.get('tr').eq(1).should('contain', 'Germany');
    cy.get('tr').eq(3).should('contain', 'Lithuania');

    // we can also sort by distance ascending
    cy.get('th').contains('Distance').click();

    // Lithuania should be the first entry & Germany last
    cy.get('tr').eq(1).should('contain', 'Lithuania');
    cy.get('tr').eq(3).should('contain', 'Germany');
  });

  it("can see error message if API does not return a token", () => {
      
    cy.intercept(
      {
        method: 'POST', 
        url: 'https://playground.tesonet.lt/v1/tokens',
      },
      { token: null } // empty response on purpose
    ).as('getToken')

    cy.visit('/');

    cy.get('input[name=username]').type("user");
    cy.get('input[name=password]').type("pass");
    cy.get('button[type=submit]').click();

    // should see an error message
    cy.get('div').should('contain', 'Response missing important data');
  });

  it("can see an error if the API does not return a server list", () => {
        
      cy.intercept(
        {
          method: 'GET', 
          url: 'https://playground.tesonet.lt/v1/servers',
        },
        { } // empty response on purpose
      ).as('getServers');
  
      cy.intercept(
        {
          method: 'POST', 
          url: 'https://playground.tesonet.lt/v1/tokens',
        },
        { token: "mockUserToken" }
      ).as('getToken')
  
      cy.visit('/');
  
      cy.get('input[name=username]').type("user");
      cy.get('input[name=password]').type("pass");
      cy.get('button[type=submit]').click();
  
      // should see an error message
      // i need to increase the timeout because the error message is not displayed immediately, useQuery retries 3 times
      cy.get('div', { timeout: 10000 }).should('contain', 'Something went wrong');

  });
})