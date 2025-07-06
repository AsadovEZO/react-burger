import reducer, {
  showIngredient,
  hideIngredient,
} from "./ingredient-details-slice";
import { firstBunIngredient } from "../tests/mocks";
import { createTestStore } from "../tests/test-utils";

describe("ingredientDetails reducer", () => {
  it("should return the initial state", () => {
    const store = createTestStore(reducer);
    expect(store.getState().testReducer).toEqual({
      isShowingModal: false,
      selectedIngredient: null,
    });
  });

  it("should handle showIngredient", () => {
    const store = createTestStore(reducer);
    store.dispatch(showIngredient(firstBunIngredient));
    expect(store.getState().testReducer).toEqual({
      isShowingModal: true,
      selectedIngredient: firstBunIngredient,
    });
  });

  it("should handle hideIngredient", () => {
    const store = createTestStore(reducer);
    store.dispatch(showIngredient(firstBunIngredient));
    store.dispatch(hideIngredient());
    expect(store.getState().testReducer).toEqual({
      isShowingModal: false,
      selectedIngredient: null,
    });
  });
});
