import { BoxProps, useBox } from "@react-three/cannon";
import { RoundedBox } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { FC, useCallback, useState } from "react";
import { Vector3 } from "three";
import { MENU_BOX_PUSHER_NAME } from "../../assets/constants";

interface Props {
  boxProps?: BoxProps;
  position: Vector3;
  side: "left" | "right";
}

const MENU_BOX_NAME = "MENU_BOX_NAME";

const MenuBoxPusher: FC<Props> = (props) => {
  const [launching, setLaunch] = useState(false);

  const launch = useCallback(() => {
    if (!launching) {
      setLaunch(true);
      setTimeout(() => {
        setLaunch(false);
      }, 100);
    }
  }, [launching]);

  const [ref, api] = useBox(() => ({
    mass: 1,
    type: "Kinematic",
    position: [props.position.x, props.position.y, props.position.z],
    rotation: [0, 0, props.side === "left" ? -Math.PI / 4 : Math.PI / 4],
    args: [4, 1, 4],
    onCollide: (e) => {
      if (e.body.name === MENU_BOX_NAME) {
        launch();
      }
    },
    ...(props.boxProps || {}),
  }));
  useFrame(() => {
    if (launching && ref.current) {
      const targetVector =
        props.side === "left"
          ? new Vector3(
              props.position.x + 1,
              props.position.y + 1,
              props.position.z
            )
          : new Vector3(
              props.position.x - 1,
              props.position.y + 1,
              props.position.z
            );

      const vec = ref.current.position.lerp(targetVector, 0.15);
      api.position.set(vec.x, vec.y, vec.z);
    } else if (ref.current) {
      const vec = ref.current.position.lerp(props.position, 0.15);
      api.position.set(vec.x, vec.y, vec.z);
    }
  });

  return (
    <RoundedBox
      name={MENU_BOX_PUSHER_NAME}
      args={[4, 1, 4]}
      radius={0.05}
      smoothness={4}
      castShadow
      receiveShadow
      ref={ref as any}
      onClick={launch}
    >
      <meshStandardMaterial color={"#FFFF"} />
    </RoundedBox>
  );
};

export default MenuBoxPusher;
