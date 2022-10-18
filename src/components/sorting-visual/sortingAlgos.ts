import { VisualArray } from "../../redux/state";

export function swap(arr: VisualArray, index1: number, index2: number) {
  const temp = arr[index1];
  arr[index1] = arr[index2];
  arr[index2] = temp;
}

export const insertionSort = (arr: VisualArray) => {
  const steps = [];

  for (let i = 1; i < arr.length; i++) {
    let j = i;
    while (j > 0 && arr[j].value < arr[j - 1].value) {
      swap(arr, j - 1, j);
      steps.push([...arr]);
      j--;
    }
  }
  return steps;
};

export const bubbleSort = (arr: VisualArray) => {
  const steps = [];
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length; j++) {
      if (arr[j]?.value > arr[j + 1]?.value) {
        swap(arr, j, j + 1);
        steps.push([...arr]);
      }
    }
  }
  return steps;
};

export const selectionSort = (arr: VisualArray) => {
  const steps = [];
  for (let i = 0; i < arr.length - 1; i++) {
    let minIndex = i;
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[j].value < arr[minIndex].value) {
        minIndex = j;
      }
    }
    if (i !== minIndex) {
      swap(arr, i, minIndex);
      steps.push([...arr]);
    }
  }
  return steps;
};
