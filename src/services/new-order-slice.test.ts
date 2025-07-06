import reducer, { postOrder, hideOrderModal } from "./new-order-slice";
import { mockIngredients, mockOrderData } from "../tests/mocks";
import { createTestStore } from "../tests/test-utils";

describe("newOrder reducer", () => {
  it("should return the initial state", () => {
    const store = createTestStore(reducer);
    expect(store.getState().testReducer).toEqual({
      isShowingModal: false,
      data: null,
      isLoading: false,
      hasError: false,
    });
  });

  it("should handle hideOrderModal", () => {
    const store = createTestStore(reducer);
    store.dispatch({
      type: postOrder.fulfilled.type,
      payload: mockOrderData,
    });
    store.dispatch(hideOrderModal());
    expect(store.getState().testReducer).toEqual({
      isShowingModal: false,
      data: mockOrderData,
      isLoading: false,
      hasError: false,
    });
  });

  it("should handle postOrder pending", () => {
    const store = createTestStore(reducer);
    store.dispatch({ type: postOrder.pending.type });
    expect(store.getState().testReducer).toEqual({
      isShowingModal: false,
      data: null,
      isLoading: true,
      hasError: false,
    });
  });

  it("should handle postOrder fulfilled", () => {
    const store = createTestStore(reducer);
    store.dispatch({
      type: postOrder.fulfilled.type,
      payload: mockOrderData,
    });
    expect(store.getState().testReducer).toEqual({
      isShowingModal: true,
      data: mockOrderData,
      isLoading: false,
      hasError: false,
    });
  });

  it("should handle postOrder rejected", () => {
    const store = createTestStore(reducer);
    store.dispatch({
      type: postOrder.rejected.type,
      payload: "Ошибка сети",
    });
    expect(store.getState().testReducer).toEqual({
      isShowingModal: false,
      data: null,
      isLoading: false,
      hasError: true,
    });
  });

  it("should dispatch postOrder and update state", async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        status: 200,
        json: () => Promise.resolve(mockOrderData),
      } as Response)
    ) as jest.Mock;

    const store = createTestStore(reducer);
    await store.dispatch(postOrder(mockIngredients.map((ing) => ing._id)));

    expect(store.getState().testReducer).toEqual({
      isShowingModal: true,
      data: mockOrderData,
      isLoading: false,
      hasError: false,
    });

    (global.fetch as jest.Mock).mockRestore();
  });
});
