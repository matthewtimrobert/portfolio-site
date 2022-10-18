import { VisualArray } from "../../../redux/state";

export function swap(arr: VisualArray, index1: number, index2: number) {
  const temp = arr[index1];
  arr[index1] = arr[index2];
  arr[index2] = temp;
}

export function sort(arr: VisualArray) {
  const copy = [...arr];
  const steps = [];
  for (let i = 1; i < copy.length; i++) {
    for (let j = i - 1; j >= 0; j--) {
      if (copy[j + 1].value < copy[j].value) {
        swap(copy, j, j + 1);
        steps.push([...copy]);
      } else break;
    }
  }
  return steps;
}
