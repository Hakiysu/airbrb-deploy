# Testing Script via Cypress

Component tests include Register module (similar to login) and ReviewSection. 

## Admin workflow

The following steps are executed in the Cypress test:

1. Register
   - Navigate to the registration page.
   - Fill out the registration form with:
     - Email: `CYPRESS@cy.press`
     - Name: `CypressUser`
     - Password/Confirm Password: `Cypress001`
   - Submit the form.
   - The user is redirected to the landing page.

2. Create a New Listing
   - Navigate to "Add New Listing".
   - Fill in the required fields:
     - Title: `My Test Apartment`
     - Price: `150`
     - Address: `123 Main St, Sample City, CA, 90001, USA`
     - Bathrooms: `2`
     - Bedroom: `Master Bedroom`
     - Amenities: `WiFi, TV, AC`
   - Upload a thumbnail image (from fixtures `test-thumbnail.jpg`).
   - Submit the listing.
   - Verify that the listing appears in the listings editor page.

3. Log Out
   - Click the "Logout" button.
   - Verify that the user is redirected after loggout.

4. Log Back In
   - Navigate to the login page.
   - Enter admin credentials:
     - Email: `CYPRESS@cy.press`
     - Password: `Cypress001`
   - Submit login form.
   - Verify that login is successful and the listings page loads.