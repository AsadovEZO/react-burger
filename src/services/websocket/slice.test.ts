import reducer from "./slice";
import { createTestStore } from "../../tests/test-utils";
import {
  wsFeedInit,
  wsFeedOpen,
  wsFeedClose,
  wsFeedError,
  wsFeedMessage,
  wsProfileInit,
  wsProfileOpen,
  wsProfileClose,
  wsProfileError,
  wsProfileMessage,
} from "./slice";
import { mockWsResponse } from "../../tests/mocks";

describe("wsSlice reducer", () => {
  it("should return the initial state", () => {
    const store = createTestStore(reducer);
    expect(store.getState().testReducer).toEqual({
      feed: {
        orders: [],
        total: 0,
        totalToday: 0,
        wsConnected: false,
        error: null,
      },
      profile: {
        orders: [],
        total: 0,
        totalToday: 0,
        wsConnected: false,
        error: null,
      },
    });
  });

  it("should handle wsFeedInit", () => {
    const store = createTestStore(reducer);
    store.dispatch(wsFeedInit());
    expect(store.getState().testReducer.feed).toEqual({
      orders: [],
      total: 0,
      totalToday: 0,
      wsConnected: false,
      error: null,
    });
  });

  it("should handle wsFeedOpen", () => {
    const store = createTestStore(reducer);
    store.dispatch(wsFeedOpen());
    expect(store.getState().testReducer.feed).toEqual({
      orders: [],
      total: 0,
      totalToday: 0,
      wsConnected: true,
      error: null,
    });
  });

  it("should handle wsFeedClose", () => {
    const store = createTestStore(reducer);
    store.dispatch(wsFeedClose());
    expect(store.getState().testReducer.feed).toEqual({
      orders: [],
      total: 0,
      totalToday: 0,
      wsConnected: false,
      error: null,
    });
  });

  it("should handle wsFeedError", () => {
    const store = createTestStore(reducer);
    const errorMessage = "Connection failed";
    store.dispatch(wsFeedError(errorMessage));
    expect(store.getState().testReducer.feed).toEqual({
      orders: [],
      total: 0,
      totalToday: 0,
      wsConnected: false,
      error: errorMessage,
    });
  });

  it("should handle wsFeedMessage", () => {
    const store = createTestStore(reducer);
    store.dispatch(wsFeedMessage(mockWsResponse));
    expect(store.getState().testReducer.feed).toEqual({
      orders: mockWsResponse.orders,
      total: mockWsResponse.total,
      totalToday: mockWsResponse.totalToday,
      wsConnected: false,
      error: null,
    });
  });

  it("should handle wsProfileInit", () => {
    const store = createTestStore(reducer);
    store.dispatch(wsProfileInit());
    expect(store.getState().testReducer.profile).toEqual({
      orders: [],
      total: 0,
      totalToday: 0,
      wsConnected: false,
      error: null,
    });
  });

  it("should handle wsProfileOpen", () => {
    const store = createTestStore(reducer);
    store.dispatch(wsProfileOpen());
    expect(store.getState().testReducer.profile).toEqual({
      orders: [],
      total: 0,
      totalToday: 0,
      wsConnected: true,
      error: null,
    });
  });

  it("should handle wsProfileClose", () => {
    const store = createTestStore(reducer);
    store.dispatch(wsProfileClose());
    expect(store.getState().testReducer.profile).toEqual({
      orders: [],
      total: 0,
      totalToday: 0,
      wsConnected: false,
      error: null,
    });
  });

  it("should handle wsProfileError", () => {
    const store = createTestStore(reducer);
    const errorMessage = "Connection failed";
    store.dispatch(wsProfileError(errorMessage));
    expect(store.getState().testReducer.profile).toEqual({
      orders: [],
      total: 0,
      totalToday: 0,
      wsConnected: false,
      error: errorMessage,
    });
  });

  it("should handle wsProfileMessage", () => {
    const store = createTestStore(reducer);
    store.dispatch(wsProfileMessage(mockWsResponse));
    expect(store.getState().testReducer.profile).toEqual({
      orders: mockWsResponse.orders,
      total: mockWsResponse.total,
      totalToday: mockWsResponse.totalToday,
      wsConnected: false,
      error: null,
    });
  });
});
