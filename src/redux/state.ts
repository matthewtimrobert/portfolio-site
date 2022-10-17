export interface AppState {
  currentNav: NavType;
  showMenuTip: boolean;
}

export enum NavType {
  RESUME = "RESUME",
  MENU = "MENU",
}

export const createDefaultState = (): AppState => ({
  currentNav: NavType.MENU,
  showMenuTip: true,
});
