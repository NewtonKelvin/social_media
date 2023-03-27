describe("template spec", () => {
  Cypress.on("uncaught:exception", () => {
    return false;
  });

  beforeEach(() => {
    cy.visit("/login");
    cy.url().should("match", /login/);
  });

  it("System login fail", () => {
    cy.get("#username")
      .type("kelvin.newton")
      .should("have.value", "kelvin.newton");

    cy.get("#password").type("1234566").should("have.value", "1234566");

    cy.get("form").submit();

    cy.contains("Senhas não batem").should("be.visible");

    cy.get("#username").clear();
    cy.get("#password").clear();
    cy.url().should("eq", `${Cypress.config().baseUrl}/login`);
  });

  it("System login successfull", () => {
    cy.get("#username")
      .type("kelvin.newton")
      .should("have.value", "kelvin.newton");

    cy.get("#password").type("123456").should("have.value", "123456");

    cy.get("form").submit();

    cy.contains("Logado com sucesso!").should("be.visible");
    cy.url().should("eq", `${Cypress.config().baseUrl}/feed`);
  });
});
