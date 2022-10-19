import { SortingAlgos } from "../components/sorting-visual/sortingAlgosHelpers";

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
  sortingAlgo: SortingAlgos;
  sortingSpeed: number;
  refreshAlgo: boolean;
  sortAmount: number;
}

export const createDefaultState = (): AppState => ({
  currentNav: NavType.MENU,
  showMenuTip: true,
  sortingAnimations: [],
  sortingAlgo: SortingAlgos.INSERTION_SORT,
  sortingSpeed: 100,
  refreshAlgo: false,
  sortAmount: 50,
});
