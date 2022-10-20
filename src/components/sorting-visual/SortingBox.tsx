import { RoundedBox, Text } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { FC, useRef } from "react";
import { Mesh, Vector3 } from "three";
import { BOLD_FONT, TXT_COLOR } from "../../assets/constants";

interface Props {
  size: Vector3;
  position: Vector3;
  color: string;
  value: number;
  selected: boolean;
  checking: boolean;
}

const SortingBox: FC<Props> = (props) => {
  const ref = useRef<Mesh>(null);

  useFrame(() => {
    if (ref.current?.position !== props.position)
      ref.current?.position.lerp(
        new Vector3(
          props.position.x,
          props.position.y + props.size.y / 2,
          props.position.z
        ),
        0.1
      );
  });
  return (
    <RoundedBox
      ref={ref}
      args={[props.size.x, props.size.y, props.size.z]}
      position={[0, 0, 0]}
      radius={0.05}
      smoothness={4}
      castShadow
      receiveShadow
    >
      {props.selected ? (
        <meshStandardMaterial color={`green`} />
      ) : props.checking ? (
        <meshStandardMaterial color={`red`} />
      ) : (
        <meshStandardMaterial color={`${props.color}`} />
      )}
      <Text
        position={[0, -props.size.y / 2 + 0.4, props.size.z / 2 + 0.05]}
        font={BOLD_FONT}
        color={TXT_COLOR}
        fontSize={0.4}
        lineHeight={2}
        textAlign="center"
        anchorX="center"
        anchorY="middle"
      >
        {props.value}
      </Text>
    </RoundedBox>
  );
};

export default SortingBox;
