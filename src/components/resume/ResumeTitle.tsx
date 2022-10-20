import { RoundedBox, Text } from "@react-three/drei";
import { FC, useRef } from "react";
import * as THREE from "three";
import { BOLD_FONT } from "../../assets/constants";

interface Props {
  x: number;
  z: number;
  titleText: string;
}

const PARENT_PADDING = 0.2;
const TITLE_TEXT_SIZE = 0.15;

const TitleBox: FC<Props> = (props: Props) => {
  const ref = useRef<THREE.Mesh>(null);
  const parentSize = new THREE.Vector3(2, 0.5, 0.5);

  return (
    <mesh
      ref={ref}
      position={[props.x, parentSize.z / 2, props.z]}
      rotation={[-Math.PI / 2, 0, 0]}
    >
      <RoundedBox
        args={[
          parentSize.x + PARENT_PADDING,
          parentSize.y + PARENT_PADDING,
          parentSize.z,
        ]}
        radius={0.05}
        smoothness={4}
        castShadow
        receiveShadow
      >
        <meshStandardMaterial color={"white"} />
      </RoundedBox>
      <Text
        position={[0, 0, parentSize.z / 2 + 0.01]}
        font={BOLD_FONT}
        fontSize={TITLE_TEXT_SIZE}
        textAlign="center"
        anchorX="center"
        anchorY="middle"
        color={"black"}
      >
        {props.titleText}
      </Text>
    </mesh>
  );
};

export default TitleBox;
