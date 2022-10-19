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

export const insertionSort = (arr: VisualArray) => {
  const steps: VisualArray[] = [];
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
  return steps;
};

export const bubbleSort = (arr: VisualArray) => {
  const steps: VisualArray[] = [];
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length; j++) {
      if (compareTwo(j, j + 1, (num1, num2) => num1 > num2, arr, steps)) {
        swap(arr, j, j + 1, steps);
      }
    }
  }
  return steps;
};

export const selectionSort = (arr: VisualArray) => {
  const steps: VisualArray[] = [];
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
  return steps;
};

export enum SortingAlgos {
  SELECTION_SORT = "SELECTION_SORT",
  BUBBLE_SORT = "BUBBLE_SORT",
  INSERTION_SORT = "INSERTION_SORT",
}

export const getLabel = (sortingAlgo: SortingAlgos) =>
  ({
    [SortingAlgos.SELECTION_SORT]: "Selection Sort",
    [SortingAlgos.BUBBLE_SORT]: "Bubble Sort",
    [SortingAlgos.INSERTION_SORT]: "Insertion Sort",
  }[sortingAlgo]);

export const getAlgo = (sortingAlgo: SortingAlgos) =>
  ({
    [SortingAlgos.SELECTION_SORT]: selectionSort,
    [SortingAlgos.BUBBLE_SORT]: bubbleSort,
    [SortingAlgos.INSERTION_SORT]: insertionSort,
  }[sortingAlgo]);

export const getMap = () => [
  SortingAlgos.SELECTION_SORT,
  SortingAlgos.BUBBLE_SORT,
  SortingAlgos.INSERTION_SORT,
];
