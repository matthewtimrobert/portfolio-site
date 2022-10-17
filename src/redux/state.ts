export interface AppState {
  currentNav: NavType;
  showMenuTip: boolean;
}

export enum NavType {
  RESUME = "RESUME",
  MENU = "MENU",
  SORTING_VISUAL = "SORTING_VISUAL",
}

export const createDefaultState = (): AppState => ({
  currentNav: NavType.MENU,
  showMenuTip: true,
});
