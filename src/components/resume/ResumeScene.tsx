import { Bounds, OrbitControls, Plane } from "@react-three/drei";
import { FC } from "react";
import { useAppSelector } from "../../redux/configureStore";
import { getNavType } from "../../redux/selector";
import { NavType } from "../../redux/state";
import ResumeContent from "./ResumeContent";

const ResumeScene: FC = () => {
  const showResume = useAppSelector(getNavType) === NavType.RESUME;

  // we keep the component mounted but very far away so we don't have to rerender the meshes
  return showResume ? (
    <group>
      <OrbitControls makeDefault enablePan={false} />
      <ambientLight intensity={0.5} />
      <directionalLight
        position={[5, 10, 5]}
        castShadow
        intensity={0.5}
        shadow-camera-left={-10}
        shadow-camera-right={10}
        shadow-camera-top={10}
        shadow-camera-bottom={-10}
      />
      <Plane
        args={[200, 200]}
        receiveShadow
        castShadow
        rotation={[-Math.PI / 2, 0, 0]}
      >
        <shadowMaterial opacity={0.5} />
      </Plane>
      <Bounds fit clip observe margin={0.5}>
        <ResumeContent />
      </Bounds>
    </group>
  ) : null;
};

export default ResumeScene;
