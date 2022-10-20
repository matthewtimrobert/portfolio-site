import { useBox } from "@react-three/cannon";
import { RoundedBox, Text } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { FC, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { Mesh, Vector3 } from "three";
import {
  BG_COLOR,
  BOLD_FONT,
  MENU_BUTTON_NAME,
  TXT_COLOR,
} from "../../assets/constants";
import { setShowMenuTip } from "../../redux/action";

interface Props {
  size: Vector3;
  position: Vector3;
  text: string;
  hoverText?: string;
  onClick: () => void;
}

const Menubutton: FC<Props> = (props) => {
  const dispatch = useDispatch();
  const hoverSize = new Vector3(7, 1, 0.5);
  const [hovering, setHovering] = useState(false);
  const hoverRef = useRef<Mesh>(null);

  const [ref, api] = useBox<Mesh>(() => ({
    mass: 100,
    type: "Kinematic",
    args: [props.size.x, props.size.y, props.size.z],
    rotation: [-Math.PI / 2, 0, 0],
    position: [props.position.x, props.position.y, props.position.z],
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
      ref.current.scale.lerp(new Vector3(1, 1, 0.75), 0.1);
    } else if (ref.current) {
      const vec = ref.current.position.lerp(props.position, 0.1);
      api.position.set(vec.x, vec.y, vec.z);
      ref.current.scale.lerp(new Vector3(1, 1, 1), 0.1);
    }
  });

  useFrame(() => {
    if (hovering && hoverRef.current) {
      hoverRef.current.scale.lerp(new Vector3(1, 1, 0.75), 0.1);
    } else if (hoverRef.current) {
      hoverRef.current.scale.lerp(new Vector3(0, 0, 0), 0.1);
    }
  });

  return (
    <>
      <RoundedBox
        name={MENU_BUTTON_NAME}
        args={[props.size.x, props.size.y, props.size.z]}
        radius={0.05}
        smoothness={4}
        castShadow
        receiveShadow
        ref={ref}
        onClick={() => {
          props.onClick();
          dispatch(setShowMenuTip(false));
        }}
        onPointerOver={() => setHovering(true)}
        onPointerLeave={() => setHovering(false)}
      >
        <meshStandardMaterial color={hovering ? "lightgrey" : BG_COLOR} />
        <Text
          position={[0, 0, props.size.z / 2 + 0.05]}
          font={BOLD_FONT}
          fontSize={0.4}
          lineHeight={2}
          textAlign="center"
          anchorX="center"
          anchorY="middle"
          color={TXT_COLOR}
        >
          {props.text}
        </Text>
      </RoundedBox>

      {props.hoverText ? (
        <RoundedBox
          args={[hoverSize.x, hoverSize.y, hoverSize.z]}
          scale={0}
          rotation={[-Math.PI / 2, 0, 0]}
          radius={0.05}
          position={[props.position.x, 0.25, props.position.z + 2]}
          smoothness={4}
          castShadow
          receiveShadow
          ref={hoverRef}
        >
          <meshStandardMaterial color={hovering ? "lightgrey" : BG_COLOR} />
          <Text
            position={[0, 0, hoverSize.z / 2 + 0.05]}
            font={BOLD_FONT}
            fontSize={0.4}
            lineHeight={2}
            textAlign="center"
            anchorX="center"
            anchorY="middle"
            color={TXT_COLOR}
          >
            {props.hoverText}
          </Text>
        </RoundedBox>
      ) : null}
    </>
  );
};

export default Menubutton;
