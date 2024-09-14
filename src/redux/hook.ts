//import { useDispatch, useSelector } from "react-redux";
//import { AppDispatch, RootState } from "./store";

//export const useAppDispatch = useDispatch.withTypes<AppDispatch>;
//export const useAppSelector = useSelector.withTypes<RootState>;

import { useDispatch, useSelector } from "react-redux";
import type { TypedUseSelectorHook } from "react-redux";
import type { RootState, AppDispatch } from "./store";

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
