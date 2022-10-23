import { Text } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { FC, useRef } from "react";
import { Color, Mesh, MeshStandardMaterial, Vector3 } from "three";
import { BG_COLOR, BOLD_FONT, TXT_COLOR } from "../../assets/constants";
import { useAppSelector } from "../../redux/configureStore";
import { getSortingSpeed } from "../../redux/selector";

interface Props {
  size: Vector3;
  position: Vector3;
  value: number;
  selected: boolean;
  checking: boolean;
  done: boolean;
}

const SortingBox: FC<Props> = (props) => {
  const ref = useRef<Mesh>(null);
  const materialRef = useRef<MeshStandardMaterial>(null);
  const sortingSpeed = useAppSelector(getSortingSpeed);
  const speed = sortingSpeed / 100;
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
    if (materialRef.current) {
      if (props.selected) {
        materialRef.current.color.lerp(new Color("blue"), speed);
      } else if (props.checking) {
        materialRef.current.color.lerp(new Color("red"), speed);
      } else if (props.done) {
        materialRef.current.color.lerp(
          new Color("green"),
          1 / props.value / 20
        );
      } else {
        materialRef.current.color.lerp(new Color(BG_COLOR), speed);
      }
    }
  });
  return (
    <mesh ref={ref} position={[0, 0, 0]}>
      <boxGeometry args={[props.size.x, props.size.y, props.size.z]} />
      <meshStandardMaterial ref={materialRef} />

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
    </mesh>
  );
};

export default SortingBox;
