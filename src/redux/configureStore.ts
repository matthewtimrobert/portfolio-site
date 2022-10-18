import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useSelector } from "react-redux";
import logger from "redux-logger";
import reducer from "./reducer";

const devEnv = !process.env.NODE_ENV || process.env.NODE_ENV === "development";

export const ConfigureStore = () =>
  configureStore({
    reducer,
    middleware: (getDefaultMiddleware) =>
      devEnv ? getDefaultMiddleware().concat(logger) : getDefaultMiddleware(),
  });

export type RootState = ReturnType<typeof reducer>;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
