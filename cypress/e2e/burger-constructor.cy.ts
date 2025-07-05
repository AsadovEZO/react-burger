/// <reference types="cypress" />

import { mockIngredients, mockOrderData } from "../../src/tests/mocks";

describe("Burger Constructor Functionality", () => {
  beforeEach(() => {
    // Моки
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
    cy.wait(["@getIngredients", "@getUser"]);
  });

  it("should allow building a burger, managing ingredients, and verify ingredient actions", () => {
    // 1. Проверка отображения ингредиентов
    cy.get(
      "[data-test-id=constructor-ingredients] > [data-test-id=ingredient-element]"
    ).should("have.length", 0);
    cy.get("[data-test-id=ingredients-list]").should("be.visible");

    // 2. Перетаскивание булки
    const $bun = cy
      .get("[data-test-id=ingredient-item]")
      .contains("Флюоресцентная булка R2-D3");
    $bun.trigger("dragstart", { force: true });

    cy.get("[data-test-id=constructor-drop-zone]")
      .trigger("dragover", { force: true })
      .trigger("drop", { force: true })
      .then(() => {
        cy.log("Bun drop completed, checking bun");
      });

    $bun.trigger("dragend", { force: true });

    cy.get("[data-test-id=constructor-bun]", { timeout: 10000 }).should(
      "be.visible"
    );

    // 3. Перетаскивание первой начинки
    const $firstIngredient = cy
      .get("[data-test-id=ingredient-item]")
      .contains("Биокотлета из марсианской Магнолии");
    $firstIngredient.trigger("dragstart", { force: true });

    cy.get("[data-test-id=constructor-drop-zone]")
      .trigger("dragover", { force: true })
      .trigger("drop", { force: true })
      .then(() => {
        cy.log("First ingredient drop completed, checking ingredients");
      });

    $firstIngredient.trigger("dragend", { force: true });

    // 4. Перетаскивание второй начинки
    const $secondIngredient = cy
      .get("[data-test-id=ingredient-item]")
      .contains("Соус фирменный Space Sauce");
    $secondIngredient.trigger("dragstart", { force: true });

    cy.get("[data-test-id=constructor-drop-zone]")
      .trigger("dragover", { force: true })
      .trigger("drop", { force: true })
      .then(() => {
        cy.log("Second ingredient drop completed, checking ingredients");
      });

    $secondIngredient.trigger("dragend", { force: true });

    // 5. Проверка наличия двух ингредиентов
    cy.get(
      "[data-test-id=constructor-ingredients] > [data-test-id=ingredient-element]",
      {
        timeout: 10000,
      }
    ).should("have.length", 2);

    // 6. Перемещение второго ингредиента на первое место
    cy.get(
      "[data-test-id=constructor-ingredients] > [data-test-id=ingredient-element]"
    )
      .eq(1)
      .invoke("text")
      .then((secondText) => {
        cy.log("Second ingredient text:", secondText);

        cy.get(
          "[data-test-id=constructor-ingredients] > [data-test-id=ingredient-element]"
        )
          .eq(1)
          .trigger("dragstart", { force: true })
          .then(($secondElement) => {
            cy.get(
              "[data-test-id=constructor-ingredients] > [data-test-id=ingredient-element]"
            )
              .eq(0)
              .trigger("dragover", { force: true })
              .trigger("drop", { force: true })
              .then(() => {
                cy.wrap($secondElement).trigger("dragend", { force: true });
              });
          });

        cy.get(
          "[data-test-id=constructor-ingredients] > [data-test-id=ingredient-element]"
        )
          .eq(0)
          .should("contain", secondText);
      });

    // 7. Удаление ингредиента
    cy.get(
      "[data-test-id=constructor-ingredients] > [data-test-id=ingredient-element]"
    )
      .first()
      .find(".constructor-element__action")
      .should("be.visible")
      .click()
      .then(() => {
        cy.wait(500);
        cy.log("Ingredient removal completed, checking length");
      });

    // 8. Проверка, что остался один ингредиент
    cy.get(
      "[data-test-id=constructor-ingredients] > [data-test-id=ingredient-element]",
      { timeout: 10000 }
    ).should("have.length", 1);

    // 9. Открытие и закрытие модального окна с описанием ингредиента
    cy.get("[data-test-id=ingredient-item]")
      .contains("Биокотлета из марсианской Магнолии")
      .click();
    cy.get("[data-test-id=modal]", { timeout: 10000 }).should("be.visible");
    cy.get("[data-test-id=modal]").within(() => {
      cy.contains("Биокотлета из марсианской Магнолии").should("be.visible");
    });
    cy.get("[data-test-id=modal-close]").click();
    cy.get("[data-test-id=modal]").should("not.exist");

    // 10. Создание заказа
    cy.get("[data-test-id=order-button]").click();
    cy.wait("@postOrder").then(() => {
      cy.get("[data-test-id=modal]").should("be.visible");
      cy.get("[data-test-id=order-number]").should(
        "contain",
        mockOrderData.order.number
      );
    });

    // 11. Закрытие модального окна заказа
    cy.get("[data-test-id=modal-close]").click();
    cy.get("[data-test-id=modal]").should("not.exist");
  });
});
