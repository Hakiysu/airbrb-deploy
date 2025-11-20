import Register from './Register'
import {AuthProvider} from "../../api/AuthContext.jsx";
import {AlertProvider} from "../../api/AlertContext.jsx";
import {BrowserRouter} from "react-router";

describe('<Register />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount( <AuthProvider>
      <AlertProvider>
        <BrowserRouter>
          <Register />
        </BrowserRouter>
      </AlertProvider>
    </AuthProvider>)
    cy.get('input[name="email"]').type("CYPRESS@cy.press");
    cy.get('input[name="name"]').type("CypressUser");
    cy.get('input[name="password"]').type("Cypress001");
    cy.get('input[name="confirmPassword"]').type("Cypress001");
    cy.get('button[type="submit"]').click();
    cy.contains("Request failed with status code").should("exist");// offline test, of course fails, but also true
  })
})