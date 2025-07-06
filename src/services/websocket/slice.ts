import { createSlice, createAction, PayloadAction } from "@reduxjs/toolkit";
import { WsState, WsResponse } from "../../utils/types";

export const wsFeedInit = createAction("WS_FEED_INIT");
export const wsFeedOpen = createAction("WS_FEED_OPEN");
export const wsFeedClose = createAction("WS_FEED_CLOSE");
export const wsFeedError = createAction<string>("WS_FEED_ERROR");
export const wsFeedMessage = createAction<WsResponse>("WS_FEED_MESSAGE");

export const wsProfileInit = createAction("WS_PROFILE_INIT");
export const wsProfileOpen = createAction("WS_PROFILE_OPEN");
export const wsProfileClose = createAction("WS_PROFILE_CLOSE");
export const wsProfileError = createAction<string>("WS_PROFILE_ERROR");
export const wsProfileMessage = createAction<WsResponse>("WS_PROFILE_MESSAGE");

const initialState: { feed: WsState; profile: WsState } = {
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
};

const wsSlice = createSlice({
  name: "wsOrders",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(wsFeedInit, (state) => {
        // console.log("wsFeedInit triggered");
      })
      .addCase(wsFeedOpen, (state) => {
        state.feed.wsConnected = true;
        state.feed.error = null;
        // console.log("wsFeedOpen triggered");
      })
      .addCase(wsFeedClose, (state) => {
        state.feed.wsConnected = false;
        state.feed.orders = [];
        state.feed.total = 0;
        state.feed.totalToday = 0;
        // console.log("wsFeedClose triggered");
      })
      .addCase(wsFeedError, (state, action: PayloadAction<string>) => {
        state.feed.error = action.payload;
        state.feed.wsConnected = false;
        // console.log("wsFeedError triggered:", action.payload);
      })
      .addCase(wsFeedMessage, (state, action: PayloadAction<WsResponse>) => {
        // console.log("wsFeedMessage triggered with payload:", action.payload);
        const { orders, total, totalToday } = action.payload;
        state.feed.orders = orders || [];
        state.feed.total = total || 0;
        state.feed.totalToday = totalToday || 0;
      })
      .addCase(wsProfileInit, (state) => {
        // console.log("wsProfileInit triggered");
      })
      .addCase(wsProfileOpen, (state) => {
        // console.log("wsProfileOpen triggered");
        state.profile.wsConnected = true;
        state.profile.error = null;
      })
      .addCase(wsProfileClose, (state) => {
        // console.log("wsProfileClose triggered");
        state.profile.wsConnected = false;
        state.profile.orders = [];
        state.profile.total = 0;
        state.profile.totalToday = 0;
      })
      .addCase(wsProfileError, (state, action: PayloadAction<string>) => {
        // console.log("wsProfileError triggered:", action.payload);
        state.profile.error = action.payload;
        state.profile.wsConnected = false;
      })
      .addCase(wsProfileMessage, (state, action: PayloadAction<WsResponse>) => {
        // console.log("wsProfileMessage triggered with payload:", action.payload);
        const { orders, total, totalToday } = action.payload;
        state.profile.orders = orders || [];
        state.profile.total = total || 0;
        state.profile.totalToday = totalToday || 0;
      });
  },
});

export default wsSlice.reducer;
