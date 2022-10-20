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

    case ActionTypes.SET_SORTING_ALGO: {
      return {
        ...state,
        sortingAlgo: action.payload,
      };
    }

    case ActionTypes.SET_SORTING_SPEED: {
      return {
        ...state,
        sortingSpeed: action.payload,
      };
    }

    case ActionTypes.SET_REFRESH_ALGO: {
      return {
        ...state,
        refreshAlgo: action.payload,
      };
    }

    case ActionTypes.SET_SORT_AMOUNT: {
      return {
        ...state,
        sortAmount: action.payload,
      };
    }

    default: {
      return { ...state };
    }
  }
};

export default reducer;
