import {
  SortingAlgos,
  SortingVisualType,
} from "../components/sorting-visual/sortingAlgosHelpers";
import { NavType, VisualArray } from "./state";

export enum ActionTypes {
  UPDATE_CURREN_NAV = "UPDATE_CURREN_NAV",
  UPDATE_SHOW_MENU_TIP = "UPDATE_SHOW_MENU_TIP",
  SET_SORTING_ANIMATIONS = "SET_SORTING_ANIMATIONS",
  REMOVE_FIRST_ANIMATION = "REMOVE_FIRST_ANIMATION",
  ADD_ANIMATION = "ADD_ANIMATION",
  SET_SORTING_ALGO = "SET_SORTING_ALGO",
  SET_SORTING_SPEED = "SET_SORTING_SPEED",
  SET_REFRESH_ALGO = "SET_REFRESH_ALGO",
  SET_SORT_AMOUNT = "SET_SORT_AMOUNT",
  SET_SORTING_VISUAL_TYPE = "SET_SORTING_VISUAL_TYPE",
}

export type Action =
  | ReturnType<typeof setNavType>
  | ReturnType<typeof setShowMenuTip>
  | ReturnType<typeof setSortingAnimations>
  | ReturnType<typeof addAnimation>
  | ReturnType<typeof setSortingAlgo>
  | ReturnType<typeof setSortingSpeed>
  | ReturnType<typeof setRefreshAlgo>
  | ReturnType<typeof setSortAmount>
  | ReturnType<typeof setSortingVisualType>
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

export const setSortingAlgo = (sortingAlgo: SortingAlgos) =>
  ({
    type: ActionTypes.SET_SORTING_ALGO,
    payload: sortingAlgo,
  } as const);

export const setSortingSpeed = (sortingSpeed: number) =>
  ({
    type: ActionTypes.SET_SORTING_SPEED,
    payload: sortingSpeed,
  } as const);

export const setRefreshAlgo = (refreshAlgo: boolean) =>
  ({
    type: ActionTypes.SET_REFRESH_ALGO,
    payload: refreshAlgo,
  } as const);

export const setSortAmount = (sortAmount: number) =>
  ({
    type: ActionTypes.SET_SORT_AMOUNT,
    payload: sortAmount,
  } as const);
export const setSortingVisualType = (sortingVisualType: SortingVisualType) =>
  ({
    type: ActionTypes.SET_SORTING_VISUAL_TYPE,
    payload: sortingVisualType,
  } as const);
