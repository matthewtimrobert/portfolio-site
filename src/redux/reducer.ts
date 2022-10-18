import { Reducer } from "redux";
import { Action, ActionTypes } from "./action";
import { AppState, createDefaultState } from "./state";

const reducer: Reducer<AppState, Action> = (
  state = createDefaultState(),
  action
) => {
  switch (action.type) {
    case ActionTypes.UPDATE_CURREN_NAV: {
      return {
        ...state,
        currentNav: action.payload,
      };
    }

    case ActionTypes.UPDATE_SHOW_MENU_TIP: {
      return {
        ...state,
        showMenuTip: action.payload,
      };
    }

    case ActionTypes.SET_SORTING_ANIMATIONS: {
      return {
        ...state,
        sortingAnimations: action.payload,
      };
    }

    // only remove first animation if there's more animations
    case ActionTypes.REMOVE_FIRST_ANIMATION: {
      return {
        ...state,
        sortingAnimations:
          state.sortingAnimations.length > 1
            ? [...(state.sortingAnimations.slice(1) || [])]
            : state.sortingAnimations,
      };
    }

    case ActionTypes.ADD_ANIMATION: {
      return {
        ...state,
        sortingAnimations: [...state.sortingAnimations, action.payload],
      };
    }

    default: {
      return { ...state };
    }
  }
};

export default reducer;
