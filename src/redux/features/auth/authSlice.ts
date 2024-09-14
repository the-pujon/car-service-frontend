////import { RootState } from "@/redux/store";
//import { createSlice, PayloadAction } from "@reduxjs/toolkit";

////type TUser = {
////  role: string;
////  email: string;
////  iat: number;
////  exp: number;
////};

//type TAuthState = {
//  user: null | object;
//  token: null | string;
//};

//const initialState: TAuthState = {
//  user: null,
//  token: null,
//};

//const authSlice = createSlice({
//  name: "auth",
//  initialState,
//  reducers: {
//    setUser: (
//      state,
//      action: PayloadAction<{ user: object; token: string }>
//    ) => {
//      console.log("here");
//      state.user = action.payload.user;
//      state.token = action.payload.token;
//    },
//    logout: (state) => {
//      state.user = null;
//      state.token = null;
//    },
//  },
//});

//export const { setUser, logout } = authSlice.actions;

//export default authSlice.reducer;

////export const currentUser = (state: RootState) => state.auth

//import { createSlice } from "@reduxjs/toolkit";
//import { RootState } from "../../store";

//export type TUser = {
//  userId: string;
//  role: string;
//  iat: number;
//  exp: number;
//};

//type TAuthState = {
//  user: null | TUser;
//  token: null | string;
//};

//const initialState: TAuthState = {
//  user: null,
//  token: null,
//};

//const authSlice = createSlice({
//  name: "auth",
//  initialState,
//  reducers: {
//    setUser: (state, action) => {
//      const { user, token } = action.payload;
//      state.user = user;
//      state.token = token;
//    },
//    logout: (state) => {
//      state.user = null;
//      state.token = null;
//    },
//  },
//});

//export const { setUser, logout } = authSlice.actions;

//export default authSlice.reducer;

//export const useCurrentToken = (state: RootState) => state.auth.token;
//export const selectCurrentUser = (state: RootState) => state.auth.user;

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store";

export type TUser = {
  email: string;
  role: string;
  iat: number;
  exp: number;
};

type TAuthState = {
  user: null | TUser;
  token: null | string;
};

const initialState: TAuthState = {
  user: null,
  token: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<{ user: TUser; token: string }>) => {
      const { user, token } = action.payload;
      state.user = user;
      state.token = token;
    },
    logout: (state) => {
      console.log("first");

      state.user = null;
      state.token = null;
    },
  },
});

export const { setUser, logout } = authSlice.actions;

export default authSlice.reducer;

export const useCurrentToken = (state: RootState) => state.auth.token;
export const selectCurrentUser = (state: RootState) => state.auth.user;
