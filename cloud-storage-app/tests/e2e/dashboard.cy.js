describe("Dashboard", () => {
    it("should load the dashboard and display user content", () => {
      cy.visit("/dashboard");
      cy.contains("User Profile");
      cy.contains("Photos");
      cy.contains("Notes");
    });
  });
  