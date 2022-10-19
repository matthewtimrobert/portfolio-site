import { useBounds } from "@react-three/drei";
import { FC, useEffect, useMemo } from "react";
import { useDispatch } from "react-redux";
import { Vector3 } from "three";
import { removeFirstAnimation, setSortingAnimations } from "../../redux/action";
import { useAppSelector } from "../../redux/configureStore";
import {
  getNavType,
  getRefreshAlgo,
  getSortAmount,
  getSortingAlgo,
  getSortingAnimations,
  getSortingSpeed,
} from "../../redux/selector";
import { NavType, VisualArray } from "../../redux/state";
import { getAlgo } from "./sortingAlgosHelpers";
import SortingVisualBox from "./SortingVisualBox";

const SortingVisulization: FC = () => {
  const showVisual = useAppSelector(getNavType) === NavType.SORTING_VISUAL;
  const sortingAnimations = useAppSelector(getSortingAnimations);
  const sortingSpeed = useAppSelector(getSortingSpeed);
  const sortingAlgo = useAppSelector(getSortingAlgo);
  const refreshAlgo = useAppSelector(getRefreshAlgo);
  const sortAmount = useAppSelector(getSortAmount);

  const bounds = useBounds();
  const startingArray: VisualArray = useMemo(
    () =>
      Array(sortAmount || 1)
        .fill(1)
        .map(() => ({
          value: Math.floor(Math.random() * 100 + 1),
          color: Math.floor(Math.random() * 16777215).toString(16),
        })),
    [sortAmount]
  );

  const algoFunc = useMemo(() => getAlgo(sortingAlgo), [sortingAlgo]);
  const dispatch = useDispatch();
  useEffect(() => {
    if (showVisual) {
      dispatch(
        setSortingAnimations([startingArray, ...algoFunc([...startingArray])])
      );
    }
  }, [showVisual, startingArray, dispatch, bounds, algoFunc, refreshAlgo]);

  useEffect(() => {
    const timer = setInterval(() => {
      if (showVisual) {
        dispatch(removeFirstAnimation());
      }
    }, sortingSpeed || 50);
    return () => {
      clearTimeout(timer);
    };
  }, [sortingSpeed, showVisual, dispatch]);

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
