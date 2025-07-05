import reducer from "./slice";
import { login, logout, refreshToken, getUser, updateUser } from "./thunks";
import { createTestStore } from "../../tests/test-utils";
import { mockError, mockUser } from "../../tests/mocks";

describe("user reducer", () => {
  it("should return the initial state", () => {
    const store = createTestStore(reducer);
    expect(store.getState().testReducer).toEqual({
      user: null,
      isLoading: false,
      error: "",
    });
  });

  it("should handle login pending", () => {
    const store = createTestStore(reducer);
    store.dispatch({ type: login.pending.type });
    expect(store.getState().testReducer).toEqual({
      user: null,
      isLoading: true,
      error: "",
    });
  });

  it("should handle login fulfilled", () => {
    const store = createTestStore(reducer);
    store.dispatch({
      type: login.fulfilled.type,
      payload: mockUser,
    });
    expect(store.getState().testReducer).toEqual({
      user: mockUser,
      isLoading: false,
      error: "",
    });
  });

  it("should handle login rejected", () => {
    const store = createTestStore(reducer);
    store.dispatch({
      type: login.rejected.type,
      payload: mockError,
    });
    expect(store.getState().testReducer).toEqual({
      user: null,
      isLoading: false,
      error: mockError,
    });
  });

  it("should handle logout pending", () => {
    const store = createTestStore(reducer);
    store.dispatch({ type: logout.pending.type });
    expect(store.getState().testReducer).toEqual({
      user: null,
      isLoading: true,
      error: "",
    });
  });

  it("should handle logout fulfilled", () => {
    const store = createTestStore(reducer);
    store.dispatch({ type: logout.fulfilled.type });
    expect(store.getState().testReducer).toEqual({
      user: null,
      isLoading: false,
      error: "",
    });
  });

  it("should handle logout rejected", () => {
    const store = createTestStore(reducer);
    store.dispatch({
      type: logout.rejected.type,
      payload: mockError,
    });
    expect(store.getState().testReducer).toEqual({
      user: null,
      isLoading: false,
      error: mockError,
    });
  });

  it("should handle refreshToken pending", () => {
    const store = createTestStore(reducer);
    store.dispatch({ type: refreshToken.pending.type });
    expect(store.getState().testReducer).toEqual({
      user: null,
      isLoading: true,
      error: "",
    });
  });

  it("should handle refreshToken fulfilled", () => {
    const store = createTestStore(reducer);
    store.dispatch({ type: refreshToken.fulfilled.type });
    expect(store.getState().testReducer).toEqual({
      user: null,
      isLoading: false,
      error: "",
    });
  });

  it("should handle refreshToken rejected", () => {
    const store = createTestStore(reducer);
    store.dispatch({
      type: refreshToken.rejected.type,
      payload: mockError,
    });
    expect(store.getState().testReducer).toEqual({
      user: null,
      isLoading: false,
      error: mockError,
    });
  });

  it("should handle getUser pending", () => {
    const store = createTestStore(reducer);
    store.dispatch({ type: getUser.pending.type });
    expect(store.getState().testReducer).toEqual({
      user: null,
      isLoading: true,
      error: "",
    });
  });

  it("should handle getUser fulfilled", () => {
    const store = createTestStore(reducer);
    store.dispatch({
      type: getUser.fulfilled.type,
      payload: mockUser,
    });
    expect(store.getState().testReducer).toEqual({
      user: mockUser,
      isLoading: false,
      error: "",
    });
  });

  it("should handle getUser rejected", () => {
    const store = createTestStore(reducer);
    store.dispatch({
      type: getUser.rejected.type,
      payload: mockError,
    });
    expect(store.getState().testReducer).toEqual({
      user: null,
      isLoading: false,
      error: mockError,
    });
  });

  it("should handle updateUser pending", () => {
    const store = createTestStore(reducer);
    store.dispatch({ type: updateUser.pending.type });
    expect(store.getState().testReducer).toEqual({
      user: null,
      isLoading: true,
      error: "",
    });
  });

  it("should handle updateUser fulfilled", () => {
    const store = createTestStore(reducer);
    store.dispatch({
      type: updateUser.fulfilled.type,
      payload: mockUser,
    });
    expect(store.getState().testReducer).toEqual({
      user: mockUser,
      isLoading: false,
      error: "",
    });
  });

  it("should handle updateUser rejected", () => {
    const store = createTestStore(reducer);
    store.dispatch({
      type: updateUser.rejected.type,
      payload: mockError,
    });
    expect(store.getState().testReducer).toEqual({
      user: null,
      isLoading: false,
      error: mockError,
    });
  });

  it("should dispatch login and update state", async () => {
    const mockResponse = {
      success: true,
      accessToken: "test-access-token",
      refreshToken: "test-refresh-token",
      user: mockUser,
      message: "Успешная авторизация",
    };

    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        status: 200,
        json: () => Promise.resolve(mockResponse),
      } as Response)
    ) as jest.Mock;

    const cookieUtils = require("./cookie-utils");
    jest.spyOn(cookieUtils, "getCookie").mockReturnValue("");
    jest.spyOn(cookieUtils, "setCookie").mockImplementation(() => {});
    jest.spyOn(cookieUtils, "deleteCookie").mockImplementation(() => {});

    const store = createTestStore(reducer);
    await store.dispatch(
      login({ email: "test@example.com", password: "password" })
    );

    expect(store.getState().testReducer).toEqual({
      user: mockUser,
      isLoading: false,
      error: "",
    });

    (global.fetch as jest.Mock).mockRestore();
    jest.restoreAllMocks();
  });
});
