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
  getSortingVisualType,
} from "../../redux/selector";
import { NavType, VisualArray } from "../../redux/state";
import { getAlgo, SortingVisualType } from "./sortingAlgosHelpers";
import SortingVisualBox from "./SortingVisualBox";

const SortingVisulization: FC = () => {
  const showVisual = useAppSelector(getNavType) === NavType.SORTING_VISUAL;
  const sortingAnimations = useAppSelector(getSortingAnimations);
  const sortingSpeed = useAppSelector(getSortingSpeed);
  const sortingAlgo = useAppSelector(getSortingAlgo);
  const refreshAlgo = useAppSelector(getRefreshAlgo);
  const sortAmount = useAppSelector(getSortAmount);
  const sortingVisualType = useAppSelector(getSortingVisualType);

  const bounds = useBounds();

  // generate step 1 array
  const startingArray: VisualArray = useMemo(
    () =>
      Array(sortAmount || 1)
        .fill(1)
        .map((_, i) => ({
          value: i,
          color: "FFFFFF",
          selected: false,
          checking: false,
          id: Math.random(), // should use UID
        }))
        // shuffle
        .map((value) => ({ value, sort: Math.random() }))
        .sort((a, b) => a.sort - b.sort)
        .map(({ value }) => value),
    [sortAmount]
  );

  const algoFunc = useMemo(() => getAlgo(sortingAlgo), [sortingAlgo]);
  const dispatch = useDispatch();

  // update sorting animations
  useEffect(() => {
    if (showVisual) {
      dispatch(
        setSortingAnimations([startingArray, ...algoFunc([...startingArray])])
      );
    }
  }, [showVisual, startingArray, dispatch, bounds, algoFunc, refreshAlgo]);

  // update camera
  useEffect(() => {
    if (showVisual) {
      // we wait 200ms so the cubes can lerp to position
      setTimeout(() => bounds.refresh().fit(), 200);
    }
  }, [
    showVisual,
    bounds,
    refreshAlgo,
    algoFunc,
    sortingVisualType,
    startingArray,
  ]);

  // play animations
  useEffect(() => {
    const timer = setInterval(() => {
      if (showVisual) {
        dispatch(removeFirstAnimation());
      }
    }, 100 * (10 / sortingSpeed) || 50);
    return () => {
      clearTimeout(timer);
    };
  }, [sortingSpeed, showVisual, dispatch]);

  switch (sortingVisualType) {
    case SortingVisualType.VISUAL_LINE:
      return (
        <group>
          {sortingAnimations[0]?.map((value, i) => (
            <SortingVisualBox
              key={value.value}
              position={
                new Vector3(-sortingAnimations[0].length / 2 + i * 1.2, 0, 0)
              }
              size={new Vector3(1, value.value / 5, 1)}
              {...{ ...value }}
            />
          ))}
        </group>
      );
    case SortingVisualType.VISUAL_CIRCLE:
      return (
        <group>
          {sortingAnimations[0]?.map((value, i) => {
            const angle = ((Math.PI * 2) / sortingAnimations[0].length) * i;
            const R = sortingAnimations[0].length / 4;
            return (
              <SortingVisualBox
                key={value.id}
                position={
                  new Vector3(R * Math.cos(angle), 0, R * Math.sin(angle))
                }
                size={new Vector3(1, value.value / 5, 1)}
                {...{ ...value }}
              />
            );
          })}
        </group>
      );
    case SortingVisualType.VISUAL_SPIRAL:
      return (
        <>
          {sortingAnimations[0]?.map((value, i) => {
            const angle = ((Math.PI * 2) / sortingAnimations[0].length) * 3 * i;
            const R = sortingAnimations[0].length / 32 + i / 2;
            return (
              <SortingVisualBox
                key={value.id}
                position={
                  new Vector3(R * Math.cos(angle), 0, R * Math.sin(angle))
                }
                size={new Vector3(1, value.value / 5, 1)}
                {...{ ...value }}
              />
            );
          })}
        </>
      );
    case SortingVisualType.VISUAL_STAR:
      return (
        <group>
          {sortingAnimations[0]?.map((value, i) => {
            const angle = (Math.PI / 4) * i;
            const R = sortingAnimations[0].length / 32 + i / 2;
            return (
              <SortingVisualBox
                key={value.id}
                position={
                  new Vector3(R * Math.cos(angle), 0, R * Math.sin(angle))
                }
                size={new Vector3(1, value.value / 5, 1)}
                {...{ ...value }}
              />
            );
          })}
        </group>
      );
    case SortingVisualType.VISUAL_CROSS:
      return (
        <group>
          {sortingAnimations[0]?.map((value, i) => {
            const angle = (Math.PI / 2) * i;
            const R = i;
            return (
              <SortingVisualBox
                key={value.id}
                position={
                  new Vector3(R * Math.cos(angle), 0, R * Math.sin(angle))
                }
                size={new Vector3(1, value.value / 5, 1)}
                {...{ ...value }}
              />
            );
          })}
        </group>
      );
    default:
      return <></>;
  }
};

export default SortingVisulization;
