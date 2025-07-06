import "./commands";

declare global {
  namespace Cypress {
    interface Chainable {
      dragIngredientToConstructor(ingredientName: string): Chainable<void>;
    }
  }
}
