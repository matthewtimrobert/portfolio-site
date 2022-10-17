import { useThree } from "@react-three/fiber";
import { FC, useEffect } from "react";
import { useAppSelector } from "../../redux/configureStore";
import { getNavType } from "../../redux/selector";
import { NavType } from "../../redux/state";

const SortingVisualContent: FC = () => {
  const showVisual = useAppSelector(getNavType) === NavType.SORTING_VISUAL;
  const { camera } = useThree();

  useEffect(() => {
    if (showVisual) {
      camera.position.x = 0;
      camera.position.y = 0;
      camera.position.z = 5;
      camera.lookAt(0, 0, 0);
    }
  }, [showVisual, camera]);

  return showVisual ? <div></div> : null;
};

export default SortingVisualContent;
