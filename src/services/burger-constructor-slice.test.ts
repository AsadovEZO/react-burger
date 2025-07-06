import {
  firstBunIngredient,
  mainIngredient,
  sauseIngredient,
  secondBunIngredient,
} from "../tests/mocks";
import { createTestStore } from "../tests/test-utils";
import { Ingredient } from "../utils/types";
import reducer, {
  handleAdd,
  handleMove,
  handleRemove,
} from "./burger-constructor-slice";

const uidMatcher = (ingredient: Ingredient) => {
  return expect.stringMatching(new RegExp(`^${ingredient._id}-\\d+$`));
};

describe("burgerConstructor reducer", () => {
  it("should return the initial state", () => {
    const store = createTestStore(reducer);
    expect(store.getState().testReducer).toEqual([]);
  });

  it("should handle adding a non-bun ingredient", () => {
    const initialState: Ingredient[] = [];
    const action = handleAdd(sauseIngredient);
    const nextState = reducer(initialState, action);

    expect(nextState).toEqual([
      {
        ...sauseIngredient,
        uniqueId: uidMatcher(sauseIngredient),
      },
    ]);
  });

  it("should handle adding a bun when no bun exists", () => {
    const initialState: Ingredient[] = [];
    const action = handleAdd(firstBunIngredient);
    const nextState = reducer(initialState, action);

    expect(nextState).toEqual([
      {
        ...firstBunIngredient,
        uniqueId: uidMatcher(firstBunIngredient),
      },
    ]);
  });

  it("should replace existing bun with a new bun", () => {
    const initialState = [firstBunIngredient, sauseIngredient];
    const action = handleAdd(secondBunIngredient);
    const nextState = reducer(initialState, action);

    expect(nextState).toEqual([
      {
        ...secondBunIngredient,
        uniqueId: uidMatcher(secondBunIngredient),
      },
      sauseIngredient,
    ]);
  });

  it("should ignore adding the same bun", () => {
    const initialState = [firstBunIngredient];
    const action = handleAdd(firstBunIngredient);
    const nextState = reducer(initialState, action);

    expect(nextState).toEqual(initialState);
  });

  it("should handle moving an ingredient within fillings", () => {
    const initialState = [firstBunIngredient, sauseIngredient, mainIngredient];
    const action = handleMove({
      ingredient: sauseIngredient,
      toIndex: 1,
    });
    const nextState = reducer(initialState, action);

    expect(nextState).toEqual([
      firstBunIngredient,
      mainIngredient,
      sauseIngredient,
    ]);
  });

  it("should do nothing if same index", () => {
    const initialState = [firstBunIngredient, sauseIngredient];
    const sameIndexAction = handleMove({
      ingredient: sauseIngredient,
      toIndex: 0,
    });
    const sameIndexState = reducer(initialState, sameIndexAction);
    expect(sameIndexState).toEqual(initialState);
  });

  it("should handle removing an ingredient", () => {
    const initialState = [firstBunIngredient, sauseIngredient];
    const action = handleRemove({ uniqueId: sauseIngredient.uniqueId! });
    const nextState = reducer(initialState, action);

    expect(nextState).toEqual([firstBunIngredient]);
  });

  it("should do nothing if ingredient not found", () => {
    const initialState = [firstBunIngredient];
    const action = handleRemove({ uniqueId: "1" });
    const nextState = reducer(initialState, action);

    expect(nextState).toEqual(initialState);
  });
});
