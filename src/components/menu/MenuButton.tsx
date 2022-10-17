import { BoxProps, useBox } from "@react-three/cannon";
import { RoundedBox, Text } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { FC, useState } from "react";
import { useDispatch } from "react-redux";
import { Vector3 } from "three";
import { BOLD_FONT, MENU_BUTTON_NAME } from "../../assets/constants";
import { setShowMenuTip } from "../../redux/action";

interface Props {
  boxProps?: BoxProps;
  size: Vector3;
  position: Vector3;
  text: string;
  onClick: () => void;
}

const Menubutton: FC<Props> = (props) => {
  const dispatch = useDispatch();
  const [hovering, setHovering] = useState(false);

  const [ref, api] = useBox(() => ({
    mass: 100,
    type: "Kinematic",
    args: [props.size.x, props.size.y, props.size.z],
    position: [props.position.x, props.position.y, props.position.z],
    ...(props.boxProps || {}),
  }));

  useFrame(() => {
    if (hovering && ref.current) {
      const targetVector = new Vector3(
        props.position.x,
        props.position.y - props.size.z / 4,
        props.position.z
      );

      const vec = ref.current.position.lerp(targetVector, 0.1);
      api.position.set(vec.x, vec.y, vec.z);
    } else if (ref.current) {
      const vec = ref.current.position.lerp(props.position, 0.1);
      api.position.set(vec.x, vec.y, vec.z);
    }
  });

  return (
    <RoundedBox
      name={MENU_BUTTON_NAME}
      args={[props.size.x, props.size.y, props.size.z]}
      radius={0.05}
      smoothness={4}
      castShadow
      receiveShadow
      ref={ref as any}
      onClick={() => {
        props.onClick();
        dispatch(setShowMenuTip(false));
      }}
      onPointerOver={() => setHovering(true)}
      onPointerLeave={() => setHovering(false)}
    >
      <meshStandardMaterial color={hovering ? "#e39d8f" : "#e2725b"} />
      <Text
        position={[0, 0, props.size.z / 2 + 0.05]}
        font={BOLD_FONT}
        fontSize={0.4}
        lineHeight={2}
        textAlign="center"
        anchorX="center"
        anchorY="middle"
      >
        {props.text}
      </Text>
    </RoundedBox>
  );
};

export default Menubutton;
