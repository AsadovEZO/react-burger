import reducer, { showOrder, hideOrder } from "./order-preview-slice";
import { createTestStore } from "../tests/test-utils";
import { mockOrder } from "../tests/mocks";

describe("orderPreview reducer", () => {
  it("should return the initial state", () => {
    const store = createTestStore(reducer);
    expect(store.getState().testReducer).toEqual({
      isShowingModal: false,
      selectedOrder: null,
    });
  });

  it("should handle showOrder", () => {
    const store = createTestStore(reducer);
    store.dispatch(showOrder(mockOrder));
    expect(store.getState().testReducer).toEqual({
      isShowingModal: true,
      selectedOrder: mockOrder,
    });
  });

  it("should handle hideOrder", () => {
    const store = createTestStore(reducer);
    store.dispatch(showOrder(mockOrder));
    store.dispatch(hideOrder());
    expect(store.getState().testReducer).toEqual({
      isShowingModal: false,
      selectedOrder: null,
    });
  });
});
