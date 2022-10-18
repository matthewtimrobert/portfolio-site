import { NavType, VisualArray } from "./state";

export enum ActionTypes {
  UPDATE_CURREN_NAV = "UPDATE_CURREN_NAV",
  UPDATE_SHOW_MENU_TIP = "UPDATE_SHOW_MENU_TIP",
  SET_SORTING_ANIMATIONS = "SET_SORTING_ANIMATIONS",
  REMOVE_FIRST_ANIMATION = "REMOVE_FIRST_ANIMATION",
  ADD_ANIMATION = "ADD_ANIMATION",
}

export type Action =
  | ReturnType<typeof setNavType>
  | ReturnType<typeof setShowMenuTip>
  | ReturnType<typeof setSortingAnimations>
  | ReturnType<typeof addAnimation>
  | ReturnType<typeof removeFirstAnimation>;

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

export const setSortingAnimations = (sortingAnimations: VisualArray[]) =>
  ({
    type: ActionTypes.SET_SORTING_ANIMATIONS,
    payload: sortingAnimations,
  } as const);

export const removeFirstAnimation = () =>
  ({
    type: ActionTypes.REMOVE_FIRST_ANIMATION,
  } as const);

export const addAnimation = (sortingAnimation: VisualArray) =>
  ({
    type: ActionTypes.ADD_ANIMATION,
    payload: sortingAnimation,
  } as const);
