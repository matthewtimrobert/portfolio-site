import { SpotLight } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { FC, useRef } from "react";
import { SpotLight as SpotLightType, Vector3 } from "three";
import { BG_COLOR } from "../assets/constants";

interface Props {
  position: Vector3;
}

const SpotlightTrack: FC<Props> = (props: Props) => {
  const ref = useRef<SpotLightType>(null);
  const { viewport } = useThree();

  useFrame((state) => {
    ref.current?.target.position.lerp(
      new Vector3().set(
        (state.mouse.x * viewport.getCurrentViewport().width) / 2,
        (state.mouse.y * viewport.getCurrentViewport().height) / 2,
        ref.current.target.position.z
      ),
      0.1
    );
    ref.current?.target.updateMatrixWorld();
  });
  return (
    <SpotLight
      castShadow
      ref={ref}
      penumbra={1}
      distance={9}
      angle={0.35}
      attenuation={5}
      anglePower={10}
      intensity={0.5}
      position={props.position}
      color={BG_COLOR}
    />
  );
};

export default SpotlightTrack;
