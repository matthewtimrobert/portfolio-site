import { VisualArray } from "../../redux/state";

const swap = (
  arr: VisualArray,
  index1: number,
  index2: number,
  steps: VisualArray[]
) => {
  const temp = arr[index1];
  arr[index1] = arr[index2];
  arr[index2] = temp;
  const newArr = [...arr].map((value, i) => ({
    ...value,
    selected: i === index1,
    checking: i === index2,
  }));
  steps.push(newArr);
};

const compareTwo = (
  index: number,
  targetIndex: number,
  compareFunc: (num1: number, num2: number) => boolean,
  arr: VisualArray,
  steps: VisualArray[]
) => {
  const newArr = [...arr].map((value, i) => ({
    ...value,
    selected: i === index,
    checking: i === targetIndex,
  }));
  steps.push(newArr);
  return compareFunc(arr[index]?.value, arr[targetIndex]?.value);
};

const insertionSort = (arr: VisualArray, steps: VisualArray[]) => {
  for (let i = 1; i < arr.length; i++) {
    let j = i;

    while (
      j > 0 &&
      compareTwo(j, j - 1, (num1, num2) => num1 < num2, arr, steps)
    ) {
      swap(arr, j - 1, j, steps);
      j--;
    }
  }
};

const bubbleSort = (arr: VisualArray, steps: VisualArray[]) => {
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length; j++) {
      if (compareTwo(j, j + 1, (num1, num2) => num1 > num2, arr, steps)) {
        swap(arr, j, j + 1, steps);
      }
    }
  }
};

const selectionSort = (arr: VisualArray, steps: VisualArray[]) => {
  for (let i = 0; i < arr.length - 1; i++) {
    let minIndex = i;
    for (let j = i + 1; j < arr.length; j++) {
      if (compareTwo(j, minIndex, (num1, num2) => num1 < num2, arr, steps)) {
        minIndex = j;
      }
    }
    if (i !== minIndex) {
      swap(arr, i, minIndex, steps);
    }
  }
};

const cocktailSort = (arr: VisualArray, steps: VisualArray[]) => {
  let start = 0,
    end = arr.length,
    swapped = true;

  while (swapped) {
    swapped = false;
    for (let i = start; i < end - 1; i++) {
      if (compareTwo(i, i + 1, (num1, num2) => num1 > num2, arr, steps)) {
        swap(arr, i, i + 1, steps);
        swapped = true;
      }
    }

    end--;
    if (!swapped) break;

    swapped = false;
    for (let i = end - 1; i > start; i--) {
      if (compareTwo(i - 1, i, (num1, num2) => num1 > num2, arr, steps)) {
        swap(arr, i, i - 1, steps);

        swapped = true;
      }
    }

    start++;
  }
};

const gnomeSort = (arr: VisualArray, steps: VisualArray[]) => {
  for (let i = 1; i < arr.length; i++) {
    if (compareTwo(i - 1, i, (num1, num2) => num1 > num2, arr, steps)) {
      for (
        ;
        i > 0 && compareTwo(i, i - 1, (num1, num2) => num1 < num2, arr, steps);
        i--
      ) {
        swap(arr, i, i - 1, steps);
      }
    }
  }
};

const wrapSort = (
  sortingFunc: (arr: VisualArray, steps: VisualArray[]) => void
) => {
  return (arr: VisualArray) => {
    const steps: VisualArray[] = [];
    sortingFunc([...arr], steps);
    return [...steps];
  };
};

export enum SortingAlgos {
  SELECTION_SORT = "SELECTION_SORT",
  BUBBLE_SORT = "BUBBLE_SORT",
  INSERTION_SORT = "INSERTION_SORT",
  COCKTAIL_SORT = "COCKTAIL_SORT",
  GNMORE_SORT = "GNMORE_SORT",
}

export const getLabel = (sortingAlgo: SortingAlgos) =>
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

export const getMap = () => [
  SortingAlgos.COCKTAIL_SORT,
  SortingAlgos.SELECTION_SORT,
  SortingAlgos.BUBBLE_SORT,
  SortingAlgos.INSERTION_SORT,
  SortingAlgos.GNMORE_SORT,
];
