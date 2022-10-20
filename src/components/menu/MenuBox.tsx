import { BoxProps, useBox } from "@react-three/cannon";
import { RoundedBox } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { FC, useState } from "react";
import { Mesh, Vector3 } from "three";
import {
  MENU_BOX_NAME,
  MENU_BOX_PUSHER_NAME,
  MENU_BOX_SHRINKING_NAME,
} from "../../assets/constants";

interface Props {
  boxProps?: BoxProps;
  size: Vector3;
  position: Vector3;
}

const MenuBox: FC<Props> = (props) => {
  const [shrink, setShrink] = useState(false);
  const [bounce, setBounce] = useState(false);

  const [ref, api] = useBox<Mesh>(() => ({
    mass: 1,
    position: [props.position.x, props.position.y, props.position.z],
    args: [props.size.x, props.size.y, props.size.z],
    onCollide: (e) => {
      if (
        e.body.name !== MENU_BOX_NAME &&
        e.body.name !== MENU_BOX_PUSHER_NAME &&
        e.target.name !== MENU_BOX_SHRINKING_NAME
      ) {
        e.target.name = MENU_BOX_SHRINKING_NAME;
        setTimeout(() => {
          setShrink(true);
          setTimeout(() => {
            api.velocity.set(0, 0, 0);
            setShrink(false);
            api.position.set(
              props.position.x,
              props.position.y,
              props.position.z
            );
            ref.current?.scale.set(1, 1, 1);
            e.target.name = MENU_BOX_NAME;
          }, 3000);
        }, 1500);
      } else if (!bounce && e.contact.impactVelocity > 3) {
        setBounce(true);
        setTimeout(() => {
          setBounce(false);
        }, 100);
      }
    },
    ...(props.boxProps || {}),
  }));
  useFrame(() => {
    if (shrink && ref.current) {
      ref.current.scale.lerp(new Vector3(0, 0, 0), 0.05);
    } else if (bounce && ref.current) {
      ref.current.scale.lerp(new Vector3(0.5, 0.5, 0.5), 0.05);
    } else if (ref.current) {
      ref.current.scale.lerp(new Vector3(1, 1, 1), 0.05);
    }
  });

  return (
    <RoundedBox
      name={MENU_BOX_NAME}
      args={[props.size.x, props.size.y, props.size.z]}
      radius={0.05}
      smoothness={4}
      castShadow
      receiveShadow
      ref={ref}
    >
      <meshNormalMaterial attach="material" />
    </RoundedBox>
  );
};

export default MenuBox;
