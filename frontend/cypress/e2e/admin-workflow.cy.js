describe("Admin actions", () => {
  it("Creates a new listing successfully (label-based selectors)", () => {
    cy.visit("https://z5542567-honeyish-fe-deploy.vercel.app");
    cy.contains("Register").click();
    cy.get('input[name="email"]').type("CYPRESS@cy.press");
    cy.get('input[name="name"]').type("CypressUser");
    cy.get('input[name="password"]').type("Cypress001");
    cy.get('input[name="confirmPassword"]').type("Cypress001");
    cy.get('button[type="submit"]').click();

    cy.contains("Listings").click();
    cy.contains("Add New Listing").click();

    // Title / Price
    cy.contains('label', 'Title').parent().find('input').clear().type("My Test Apartment");
    cy.contains('label', 'Price').parent().find('input').clear().type("150");

    // Address fields (Street, City, State, ZIP, Country)
    cy.contains('label', 'Street').parent().find('input').clear().type("123 Main St");
    cy.contains('label', 'City').parent().find('input').clear().type("Sample City");
    cy.contains('label', 'State').parent().find('input').clear().type("CA");
    cy.contains('label', 'ZIP').parent().find('input').clear().type("90001");
    cy.contains('label', 'Country').parent().find('input').clear().type("USA");

    // Bathrooms
    cy.contains('label', 'Bathrooms').parent().find('input').clear().type("2");

    // Bedrooms
    cy.contains("Add Bedroom").click();
    cy.contains('label', 'Bedroom Name').parent().find('input').clear().type("Master Bedroom");

    // Amenities
    cy.contains('label', 'Amenities').parent().find('input').clear().type("WiFi, TV, AC");

    // Thumbnail file
    const fileName = './cypress/fixtures/test-thumbnail.jpg';
    cy.contains('label', 'Thumbnail').parent().find('input[type="file"]').writeFile(fileName, 'cypress/fixtures/test-thumbnail.jpg');

    // Submit
    cy.contains("Create Listing").click();

    // Logout
    cy.contains("Logout").click();

    // Login again
    cy.visit("https://z5542567-honeyish-fe-deploy.vercel.app");
    cy.contains("Login").click();
    cy.get('input[name="email"]').type("admin@test.com");
    cy.get('input[name="password"]').type("123456");
    cy.get('button[type="submit"]').click();
    cy.contains("Listings").click();
    cy.contains("No listings found.").should("exist");
  });
});