export enum NavType {
  RESUME = "RESUME",
  MENU = "MENU",
  SORTING_VISUAL = "SORTING_VISUAL",
}
export type VisualArray = { value: number; color: string }[];

export interface AppState {
  currentNav: NavType;
  showMenuTip: boolean;
  sortingAnimations: VisualArray[];
}

export const createDefaultState = (): AppState => ({
  currentNav: NavType.MENU,
  showMenuTip: true,
  sortingAnimations: [],
});
