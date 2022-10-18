import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useSelector } from "react-redux";
import logger from "redux-logger";
import reducer from "./reducer";

export const ConfigureStore = () =>
  configureStore({
    reducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
  });

export type RootState = ReturnType<typeof reducer>;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
