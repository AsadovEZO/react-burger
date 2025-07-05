import reducer, { fetchIngredients } from "./burger-ingredients-slice";
import { mockIngredients, mockApiResponse, mockError } from "../tests/mocks";
import { createTestStore } from "../tests/test-utils";

describe("burgerIngredients reducer", () => {
  it("should return the initial state", () => {
    const store = createTestStore(reducer);
    expect(store.getState().testReducer).toEqual({
      isLoading: false,
      data: [],
      hasError: false,
    });
  });

  it("should handle fetchIngredients pending", () => {
    const store = createTestStore(reducer);
    store.dispatch({ type: fetchIngredients.pending.type });
    expect(store.getState().testReducer).toEqual({
      isLoading: true,
      data: [],
      hasError: false,
    });
  });

  it("should handle fetchIngredients fulfilled", () => {
    const store = createTestStore(reducer);
    store.dispatch({
      type: fetchIngredients.fulfilled.type,
      payload: mockIngredients,
    });
    expect(store.getState().testReducer).toEqual({
      isLoading: false,
      data: mockIngredients,
      hasError: false,
    });
  });

  it("should handle fetchIngredients rejected", () => {
    const store = createTestStore(reducer);
    store.dispatch({
      type: fetchIngredients.rejected.type,
      payload: mockError,
    });
    expect(store.getState().testReducer).toEqual({
      isLoading: false,
      data: [],
      hasError: true,
    });
  });

  it("should dispatch fetchIngredients and update state", async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        status: 200,
        json: () => Promise.resolve(mockApiResponse),
      } as Response)
    ) as jest.Mock;

    const store = createTestStore(reducer);
    await store.dispatch(fetchIngredients());

    expect(store.getState().testReducer).toEqual({
      isLoading: false,
      data: mockIngredients,
      hasError: false,
    });

    (global.fetch as jest.Mock).mockRestore();
  });
});
