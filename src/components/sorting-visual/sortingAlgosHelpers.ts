export type VisualArray = {
  value: number;
  color: string;
  selected: boolean;
  checking: boolean;
  id?: number;
}[];

type CompareTwo = (
  i: number,
  j: number,
  compareFunc: (num1: number, num2: number) => boolean
) => Promise<boolean>;

type Swap = (i: number, j: number) => Promise<void>;

const insertionSort = async (
  arr: VisualArray,
  compareTwo: CompareTwo,
  swap: Swap
) => {
  for (let i = 1; i < arr.length; i++) {
    let j = i;

    while (j > 0 && (await compareTwo(j, j - 1, (num1, num2) => num1 < num2))) {
      await swap(j - 1, j);
      j--;
    }
  }
};

const bubbleSort = async (
  arr: VisualArray,
  compareTwo: CompareTwo,
  swap: Swap
) => {
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length; j++) {
      if (await compareTwo(j, j + 1, (num1, num2) => num1 > num2)) {
        await swap(j, j + 1);
      }
    }
  }
};

const selectionSort = async (
  arr: VisualArray,
  compareTwo: CompareTwo,
  swap: Swap
) => {
  for (let i = 0; i < arr.length - 1; i++) {
    let minIndex = i;
    for (let j = i + 1; j < arr.length; j++) {
      if (await compareTwo(j, minIndex, (num1, num2) => num1 < num2)) {
        minIndex = j;
      }
    }
    if (i !== minIndex) {
      await swap(i, minIndex);
    }
  }
};

const cocktailSort = async (
  arr: VisualArray,
  compareTwo: CompareTwo,
  swap: Swap
) => {
  let start = 0,
    end = arr.length,
    swapped = true;

  while (swapped) {
    swapped = false;
    for (let i = start; i < end - 1; i++) {
      if (await compareTwo(i, i + 1, (num1, num2) => num1 > num2)) {
        await swap(i, i + 1);
        swapped = true;
      }
    }

    end--;
    if (!swapped) break;

    swapped = false;
    for (let i = end - 1; i > start; i--) {
      if (await compareTwo(i - 1, i, (num1, num2) => num1 > num2)) {
        await swap(i, i - 1);

        swapped = true;
      }
    }

    start++;
  }
};

const gnomeSort = async (
  arr: VisualArray,
  compareTwo: CompareTwo,
  swap: Swap
) => {
  for (let i = 1; i < arr.length; i++) {
    if (await compareTwo(i - 1, i, (num1, num2) => num1 > num2)) {
      for (
        ;
        i > 0 && (await compareTwo(i, i - 1, (num1, num2) => num1 < num2));
        i--
      ) {
        await swap(i, i - 1);
      }
    }
  }
};

const wrapSort =
  (
    sortingFunc: (arr: VisualArray, compareTwo: CompareTwo, swap: Swap) => void
  ) =>
  (
    arr: VisualArray,
    setAnimationArrayAsync: (arr: VisualArray) => Promise<unknown>
  ) => {
    const compareTwo = async (
      i: number,
      j: number,
      compareFunc: (num1: number, num2: number) => boolean
    ) => {
      const newArr = [...arr].map((value, _i) => ({
        ...value,
        selected: _i === i,
        checking: _i === j,
      }));
      await setAnimationArrayAsync(newArr);
      return compareFunc(arr[i]?.value, arr[j]?.value);
    };

    const swap = async (i: number, j: number): Promise<void> => {
      const temp = arr[i];
      arr[i] = arr[j];
      arr[j] = temp;
      const newArr = [...arr].map((value, _i) => ({
        ...value,
        selected: _i === i,
        checking: _i === j,
      }));
      await setAnimationArrayAsync(newArr);
    };

    sortingFunc([...arr], compareTwo, swap);
  };

export enum SortingAlgos {
  SELECTION_SORT = "SELECTION_SORT",
  BUBBLE_SORT = "BUBBLE_SORT",
  INSERTION_SORT = "INSERTION_SORT",
  COCKTAIL_SORT = "COCKTAIL_SORT",
  GNMORE_SORT = "GNMORE_SORT",
}

export const getAlgoLabel = (sortingAlgo: SortingAlgos) =>
  ({
    [SortingAlgos.SELECTION_SORT]: "Selection Sort",
    [SortingAlgos.BUBBLE_SORT]: "Bubble Sort",
    [SortingAlgos.INSERTION_SORT]: "Insertion Sort",
    [SortingAlgos.COCKTAIL_SORT]: "Cocktail Sort",
    [SortingAlgos.GNMORE_SORT]: "Gnome Sort",
  }[sortingAlgo]);

export const getAlgo = (sortingAlgo: SortingAlgos) =>
  ({
    [SortingAlgos.SELECTION_SORT]: wrapSort(selectionSort),
    [SortingAlgos.BUBBLE_SORT]: wrapSort(bubbleSort),
    [SortingAlgos.INSERTION_SORT]: wrapSort(insertionSort),
    [SortingAlgos.COCKTAIL_SORT]: wrapSort(cocktailSort),
    [SortingAlgos.GNMORE_SORT]: wrapSort(gnomeSort),
  }[sortingAlgo]);

export const getAlgoMap = () => [
  SortingAlgos.COCKTAIL_SORT,
  SortingAlgos.SELECTION_SORT,
  SortingAlgos.BUBBLE_SORT,
  SortingAlgos.INSERTION_SORT,
  SortingAlgos.GNMORE_SORT,
];

export enum SortingVisualType {
  VISUAL_LINE = "VISUAL_LINE",
  VISUAL_CIRCLE = "VISUAL_CIRCLE",
  VISUAL_SPIRAL = "VISUAL_SPIRAL",
  VISUAL_STAR = "VISUAL_STAR",
  VISUAL_CROSS = "VISUAL_CROSS",
}

export const getVisualLabel = (sortingVisualType: SortingVisualType) =>
  ({
    [SortingVisualType.VISUAL_LINE]: "Line",
    [SortingVisualType.VISUAL_CIRCLE]: "Circle",
    [SortingVisualType.VISUAL_SPIRAL]: "Spiral",
    [SortingVisualType.VISUAL_STAR]: "Star",
    [SortingVisualType.VISUAL_CROSS]: "Cross",
  }[sortingVisualType]);

export const getVisualMap = () => [
  SortingVisualType.VISUAL_LINE,
  SortingVisualType.VISUAL_CIRCLE,
  SortingVisualType.VISUAL_SPIRAL,
  SortingVisualType.VISUAL_STAR,
  SortingVisualType.VISUAL_CROSS,
];
