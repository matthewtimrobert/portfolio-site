import { Bounds, OrbitControls, Plane } from "@react-three/drei";
import { FC } from "react";
import { useAppSelector } from "../../redux/configureStore";
import { getNavType } from "../../redux/selector";
import { NavType } from "../../redux/state";
import SortingVisulization from "./SortingVisualization";

const SortingVisualContent: FC = () => {
  const showVisual = useAppSelector(getNavType) === NavType.SORTING_VISUAL;

  return showVisual ? (
    <group>
      <OrbitControls makeDefault />
      <ambientLight intensity={0.5} />
      <directionalLight
        position={[5, 10, 5]}
        castShadow
        intensity={0.5}
        shadow-camera-left={-20}
        shadow-camera-right={20}
        shadow-camera-top={20}
        shadow-camera-bottom={-20}
      />
      <Plane
        args={[200, 200]}
        receiveShadow
        castShadow
        rotation={[-Math.PI / 2, 0, 0]}
      >
        <shadowMaterial opacity={0.5} />
      </Plane>
      <Bounds fit clip observe damping={6} margin={1.2}>
        <SortingVisulization />
      </Bounds>
    </group>
  ) : null;
};

export default SortingVisualContent;
