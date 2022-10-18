import { useBounds } from "@react-three/drei";
import { FC, useEffect, useMemo } from "react";
import { useDispatch } from "react-redux";
import { Vector3 } from "three";
import { removeFirstAnimation, setSortingAnimations } from "../../redux/action";
import { useAppSelector } from "../../redux/configureStore";
import { getNavType, getSortingAnimations } from "../../redux/selector";
import { NavType, VisualArray } from "../../redux/state";
import { sort } from "./algos/InsertionSort";
import SortingVisualBox from "./SortingVisualBox";

const SortingVisulization: FC = () => {
  const showVisual = useAppSelector(getNavType) === NavType.SORTING_VISUAL;
  const sortingAnimations = useAppSelector(getSortingAnimations);
  const bounds = useBounds();
  const startingArray: VisualArray = useMemo(
    () =>
      Array(20)
        .fill(1)
        .map(() => ({
          value: Math.floor(Math.random() * 100 + 1),
          color: Math.floor(Math.random() * 16777215).toString(16),
        })),
    []
  );

  const dispatch = useDispatch();
  useEffect(() => {
    if (showVisual) {
      bounds.fit().refresh();
      dispatch(setSortingAnimations([startingArray, ...sort(startingArray)]));
    }
  }, [showVisual, startingArray, dispatch, bounds]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (showVisual) {
        bounds.fit().refresh();
        dispatch(removeFirstAnimation());
      }
    }, 100);
    return () => {
      clearTimeout(timer);
    };
  });

  return (
    <>
      {sortingAnimations[0]?.map((value, i) => (
        <SortingVisualBox
          key={value.color}
          position={new Vector3(i * 1.2, 0, 0)}
          size={new Vector3(1, value.value / 5, 1)}
          color={value.color}
          value={value.value}
        />
      ))}
    </>
  );
};

export default SortingVisulization;
