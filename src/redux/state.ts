import {
  SortingAlgos,
  SortingVisualType,
} from "../components/sorting-visual/sortingAlgosHelpers";

export enum NavType {
  RESUME = "RESUME",
  MENU = "MENU",
  SORTING_VISUAL = "SORTING_VISUAL",
}
export type VisualArray = {
  value: number;
  color: string;
  selected: boolean;
  checking: boolean;
  id?: number;
}[];

export interface AppState {
  currentNav: NavType;
  showMenuTip: boolean;
  sortingAnimations: VisualArray[];
  sortingAlgo: SortingAlgos;
  sortingSpeed: number;
  refreshAlgo: boolean;
  sortAmount: number;
  sortingVisualType: SortingVisualType;
}

export const createDefaultState = (): AppState => ({
  currentNav: NavType.MENU,
  showMenuTip: true,
  sortingAnimations: [],
  sortingAlgo: SortingAlgos.INSERTION_SORT,
  sortingVisualType: SortingVisualType.VISUAL_LINE,
  sortingSpeed: 50,
  refreshAlgo: false,
  sortAmount: 50,
});
