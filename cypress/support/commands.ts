import {
  SELECTOR_INGREDIENT_ITEM,
  SELECTOR_CONSTRUCTOR_DROP_ZONE,
} from "../constants";

Cypress.Commands.add(
  "dragIngredientToConstructor",
  (ingredientName: string) => {
    cy.get(SELECTOR_INGREDIENT_ITEM)
      .contains(ingredientName)
      .then(($el) => {
        cy.wrap($el).trigger("dragstart", { force: true });
        cy.get(SELECTOR_CONSTRUCTOR_DROP_ZONE)
          .trigger("dragover", { force: true })
          .trigger("drop", { force: true })
          .then(() => {
            cy.log(`Ingredient ${ingredientName} dropped`);
          });
        cy.wrap($el).trigger("dragend", { force: true });
      });
  }
);
