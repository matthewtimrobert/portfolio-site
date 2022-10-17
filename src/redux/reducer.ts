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

    default: {
      return { ...state };
    }
  }
};

export default reducer;
