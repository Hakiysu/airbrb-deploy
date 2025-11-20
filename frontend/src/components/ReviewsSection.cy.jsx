import ReviewsSection from './ReviewsSection'
import {AuthProvider} from "../api/AuthContext.jsx";
import {AlertProvider} from "../api/AlertContext.jsx";
import {BrowserRouter} from "react-router";

describe('<ReviewsSection />', () => {
  it('renders', () => {
    cy.mount( 
      <AuthProvider>
        <AlertProvider>
          <BrowserRouter>
            <ReviewsSection />
          </BrowserRouter>
        </AlertProvider>
      </AuthProvider>
    )
    cy.get('div').contains("Reviews").should("exist");
    //score input
    cy.get('input[name="score"]').should("exist");
    //submit button
    cy.get('button').contains("Submit Review").click();
    //alert message
    cy.get('div[role="alert"]').contains("Please provide both a score and a comment for your review.").should("exist");
  })
})