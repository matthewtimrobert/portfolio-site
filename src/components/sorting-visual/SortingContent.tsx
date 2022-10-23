import { useBounds } from "@react-three/drei";
import { FC, useEffect, useMemo, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { Vector3 } from "three";
import { useAppSelector } from "../../redux/configureStore";
import {
  getNavType,
  getRefreshAlgo,
  getSortAmount,
  getSortingAlgo,
  getSortingSpeed,
  getSortingVisualType,
} from "../../redux/selector";
import { NavType } from "../../redux/state";
import { getAlgo, SortingVisualType, VisualArray } from "./sortingAlgosHelpers";
import SortingBox from "./SortingBox";

const SortingContent: FC = () => {
  const showVisual = useAppSelector(getNavType) === NavType.SORTING_VISUAL;
  const sortingSpeed = useAppSelector(getSortingSpeed);
  const sortingAlgo = useAppSelector(getSortingAlgo);
  const refreshAlgo = useAppSelector(getRefreshAlgo);
  const sortAmount = useAppSelector(getSortAmount);
  const sortingVisualType = useAppSelector(getSortingVisualType);
  const algoFunc = useMemo(() => getAlgo(sortingAlgo), [sortingAlgo]);

  const bounds = useBounds();
  const dispatch = useDispatch();

  const sortingSpeedRef = useRef<number>(sortingSpeed);

  useEffect(() => {
    sortingSpeedRef.current = sortingSpeed;
  }, [sortingSpeed]);

  // generate step 1 array
  const startingArray: VisualArray = useMemo(
    () =>
      Array(sortAmount || 1)
        .fill(1)
        .map((_, i) => ({
          value: i + 1,
          selected: false,
          checking: false,
          done: false,
          id: Math.random(), // should use UID
        }))
        // shuffle
        .map((value) => ({ value, sort: Math.random() }))
        .sort((a, b) => a.sort - b.sort)
        .map(({ value }) => value),
    [sortAmount]
  );

  const [animationArray, setAnimationArray] =
    useState<VisualArray>(startingArray);

  // update sorting animations
  useEffect(() => {
    let allowed = true;

    if (showVisual) {
      const setAnimationArrayAsync = async (target: VisualArray) => {
        if (allowed) {
          setAnimationArray(target);
          return new Promise((resolve) =>
            setTimeout(resolve, 100 * (10 / sortingSpeedRef.current) || 50)
          );
        }
      };
      algoFunc([...startingArray], setAnimationArrayAsync);
    }
    return () => {
      allowed = false;
    };
  }, [showVisual, startingArray, dispatch, algoFunc, refreshAlgo]);

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

  switch (sortingVisualType) {
    case SortingVisualType.VISUAL_LINE:
      return (
        <group>
          {animationArray?.map((value, i) => (
            <SortingBox
              key={value.value}
              position={new Vector3(-animationArray.length / 2 + i * 1.2, 0, 0)}
              size={new Vector3(1, value.value / 5, 1)}
              {...{ ...value }}
            />
          ))}
        </group>
      );
    case SortingVisualType.VISUAL_CIRCLE:
      return (
        <group>
          {animationArray?.map((value, i) => {
            const angle = ((Math.PI * 2) / animationArray.length) * i;
            const R = animationArray.length / 4;
            return (
              <SortingBox
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
          {animationArray?.map((value, i) => {
            const angle = ((Math.PI * 2) / animationArray.length) * 3 * i;
            const R = animationArray.length / 32 + i / 2;
            return (
              <SortingBox
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
          {animationArray?.map((value, i) => {
            const angle = (Math.PI / 4) * i;
            const R = animationArray.length / 32 + i / 2;
            return (
              <SortingBox
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
          {animationArray?.map((value, i) => {
            const angle = (Math.PI / 2) * i;
            const R = i;
            return (
              <SortingBox
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

export default SortingContent;
