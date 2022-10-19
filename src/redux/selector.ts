import { RootState } from "./configureStore";
import { NavType } from "./state";

export const enableOrbitControls = (state: RootState) =>
  state.currentNav === NavType.MENU;
export const getNavType = (state: RootState) => state.currentNav;

export const getShowMenuTip = (state: RootState) => state.showMenuTip;

export const getSortingAnimations = (state: RootState) =>
  state.sortingAnimations;

export const getSortingAlgo = (state: RootState) => state.sortingAlgo;

export const getSortingSpeed = (state: RootState) => state.sortingSpeed;

export const getRefreshAlgo = (state: RootState) => state.refreshAlgo;

export const getSortAmount = (state: RootState) => state.sortAmount;
