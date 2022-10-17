import { NavType } from "./state";

export enum ActionTypes {
  UPDATE_CURREN_NAV = "UPDATE_CURREN_NAV",
  UPDATE_SHOW_MENU_TIP = "UPDATE_SHOW_MENU_TIP",
}

export type Action =
  | ReturnType<typeof setNavType>
  | ReturnType<typeof setShowMenuTip>;

export const setNavType = (currentNav: NavType) =>
  ({
    type: ActionTypes.UPDATE_CURREN_NAV,
    payload: currentNav,
  } as const);

export const setShowMenuTip = (showMenuTip: boolean) =>
  ({
    type: ActionTypes.UPDATE_SHOW_MENU_TIP,
    payload: showMenuTip,
  } as const);
