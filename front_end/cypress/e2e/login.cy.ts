describe("template spec", () => {
  Cypress.on("uncaught:exception", () => {
    return false;
  });

  beforeEach(() => {
    cy.visit("/login");
    cy.url().should("match", /login/);
    Cypress.Cookies.debug(true); // now Cypress will log when it alters cookies
    cy.setCookie("DataTheme", "ligth");
  });

  it("should fail on login", () => {
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

  it("should login successfully", () => {
    cy.get("#username")
      .type("kelvin.newton")
      .should("have.value", "kelvin.newton");

    cy.get("#password").type("123456").should("have.value", "123456");

    cy.get("form").submit();

    cy.contains("Logado com sucesso!").should("be.visible");
    cy.url().should("eq", `${Cypress.config().baseUrl}/feed`);
  });

  it("should fail on create an account", () => {
    cy.get("a").contains("Dont have a account? Register here").click();
    cy.url().should("eq", `${Cypress.config().baseUrl}/register`);

    cy.get("#name").type("Kelvin Newton").should("have.value", "Kelvin Newton");
    cy.get("#username")
      .type("kelvin.newton")
      .should("have.value", "kelvin.newton");
    cy.get("#email")
      .type("kelvin.newton@gmail.com")
      .should("have.value", "kelvin.newton@gmail.com");
    cy.get("form").submit();

    cy.contains("Já existe um usuário com este username").should("be.visible");

    cy.get("#name").clear();
    cy.get("#username").clear();
    cy.get("#email").clear();
  });
});
