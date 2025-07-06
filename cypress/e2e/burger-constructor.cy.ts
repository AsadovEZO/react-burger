/// <reference types="cypress" />

import { mockIngredients, mockOrderData } from "../../src/tests/mocks";

import {
  SELECTOR_INGREDIENT_ITEM,
  SELECTOR_CONSTRUCTOR_INGREDIENTS,
  SELECTOR_CONSTRUCTOR_BUN,
  SELECTOR_MODAL,
  SELECTOR_MODAL_CLOSE,
  SELECTOR_ORDER_BUTTON,
  SELECTOR_ORDER_NUMBER,
  SELECTOR_INGREDIENTS_LIST,
  SELECTOR_DELETE_ACTION,
  INGREDIENT_BUN,
  INGREDIENT_FIRST,
  INGREDIENT_SECOND,
  DRAG_DROP_OPTIONS,
  DEFAULT_TIMEOUT,
} from "../constants";

describe("Burger Constructor Functionality", () => {
  beforeEach(() => {
    cy.intercept("GET", "*/ingredients", {
      statusCode: 200,
      body: {
        success: true,
        data: mockIngredients,
      },
    }).as("getIngredients");

    cy.intercept("POST", "*/orders", {
      statusCode: 200,
      body: mockOrderData,
    }).as("postOrder");

    cy.intercept("GET", "*/auth/user", {
      statusCode: 200,
      body: {
        success: true,
        user: { email: "test@example.com", name: "Test User" },
      },
    }).as("getUser");

    cy.intercept("POST", "*/auth/token", {
      statusCode: 200,
      body: {
        success: true,
        accessToken: "mock-access-token",
        refreshToken: "mock-refresh-token",
      },
    }).as("refreshToken");

    cy.setCookie("accessToken", "mock-access-token");
    cy.setCookie("refreshToken", "mock-refresh-token");

    cy.visit("/");
    cy.get(SELECTOR_INGREDIENTS_LIST).should("be.visible");
    cy.wait(["@getIngredients", "@getUser"]);
  });

  beforeEach(() => {
    cy.get(SELECTOR_CONSTRUCTOR_INGREDIENTS).should("have.length", 0);
  });

  it("should load ingredients list correctly", () => {
    cy.get(SELECTOR_CONSTRUCTOR_INGREDIENTS).should("have.length", 0);
    cy.get(SELECTOR_INGREDIENTS_LIST).should("be.visible");
  });

  it("should open and close ingredient modal", () => {
    cy.get(SELECTOR_INGREDIENT_ITEM).contains(INGREDIENT_FIRST).click();
    cy.get(SELECTOR_MODAL, DEFAULT_TIMEOUT).should("be.visible");
    cy.get(SELECTOR_MODAL).within(() => {
      cy.contains(INGREDIENT_FIRST).should("be.visible");
    });
    cy.get(SELECTOR_MODAL_CLOSE).click();
    cy.get(SELECTOR_MODAL).should("not.exist");
  });

  it("should allow dragging ingredients into constructor", () => {
    cy.dragIngredientToConstructor(INGREDIENT_BUN);
    cy.get(SELECTOR_CONSTRUCTOR_BUN, DEFAULT_TIMEOUT).should("be.visible");

    cy.dragIngredientToConstructor(INGREDIENT_FIRST);
    cy.dragIngredientToConstructor(INGREDIENT_SECOND);
    cy.get(SELECTOR_CONSTRUCTOR_INGREDIENTS, DEFAULT_TIMEOUT).should(
      "have.length",
      2
    );
  });

  it("should allow reordering ingredients", () => {
    cy.dragIngredientToConstructor(INGREDIENT_BUN);
    cy.dragIngredientToConstructor(INGREDIENT_FIRST);
    cy.dragIngredientToConstructor(INGREDIENT_SECOND);

    cy.get(SELECTOR_CONSTRUCTOR_INGREDIENTS)
      .eq(1)
      .invoke("text")
      .then((secondText) => {
        cy.log("Second ingredient text:", secondText);

        cy.get(SELECTOR_CONSTRUCTOR_INGREDIENTS)
          .eq(1)
          .trigger("dragstart", DRAG_DROP_OPTIONS)
          .then(($secondElement) => {
            cy.get(SELECTOR_CONSTRUCTOR_INGREDIENTS)
              .eq(0)
              .trigger("dragover", DRAG_DROP_OPTIONS)
              .trigger("drop", DRAG_DROP_OPTIONS)
              .then(() => {
                cy.wrap($secondElement).trigger("dragend", DRAG_DROP_OPTIONS);
              });
          });

        cy.get(SELECTOR_CONSTRUCTOR_INGREDIENTS)
          .eq(0)
          .should("contain", secondText);
      });
  });

  it("should allow removing an ingredient", () => {
    cy.dragIngredientToConstructor(INGREDIENT_BUN);
    cy.dragIngredientToConstructor(INGREDIENT_FIRST);
    cy.dragIngredientToConstructor(INGREDIENT_SECOND);

    cy.get(SELECTOR_CONSTRUCTOR_INGREDIENTS)
      .first()
      .find(SELECTOR_DELETE_ACTION)
      .should("be.visible")
      .click()
      .then(() => {
        cy.get(SELECTOR_CONSTRUCTOR_INGREDIENTS).should("have.length", 1);
        cy.log("Ingredient removal completed, checking length");
      });
  });

  it("should create an order successfully", () => {
    cy.dragIngredientToConstructor(INGREDIENT_BUN);
    cy.dragIngredientToConstructor(INGREDIENT_FIRST);

    cy.get(SELECTOR_ORDER_BUTTON).click();
    cy.wait("@postOrder").then(() => {
      cy.get(SELECTOR_MODAL).should("be.visible");
      cy.get(SELECTOR_ORDER_NUMBER).should(
        "contain",
        mockOrderData.order.number
      );
    });

    cy.get(SELECTOR_MODAL_CLOSE).click();
    cy.get(SELECTOR_MODAL).should("not.exist");
  });
});
