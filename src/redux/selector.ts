import { RootState } from "./configureStore";
import { NavType } from "./state";

export const enableOrbitControls = (state: RootState) =>
  state.currentNav === NavType.MENU;
export const getNavType = (state: RootState) => state.currentNav;

export const showMenuTip = (state: RootState) => state.showMenuTip;
