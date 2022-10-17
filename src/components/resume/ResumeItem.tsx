import { RoundedBox, Text } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { FC, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { Vector3 } from "three";
import { BOLD_FONT } from "../../assets/constants";
import { clamp } from "../../assets/utils";

interface Props {
  name: string;
  startingHeight: number;
  titleText: string;
  dateText: string;
  bullets: string[];
  backgroundColor: string;
}

const PARENT_PADDING = 0.2;

const PortfolioItem: FC<Props> = (props: Props) => {
  const [hovering, setHovering] = useState(false);
  const ref = useRef<THREE.Mesh>(null);

  const { viewport } = useThree();
  const { width } = viewport.getCurrentViewport();

  const TITLE_TEXT_SIZE = useMemo(() => (width < 7 ? 0.1 : 0.15), [width]);
  const BULLET_TEXT_SIZE = useMemo(() => (width < 7 ? 0.08 : 0.12), [width]);

  const { bullets } = props;
  const { length } = bullets;
  const parentSize = useMemo(
    () =>
      new THREE.Vector3(
        clamp(width / 1.3, 0, 10),
        TITLE_TEXT_SIZE + (4 + length) * BULLET_TEXT_SIZE,
        1
      ),
    [length, width, TITLE_TEXT_SIZE, BULLET_TEXT_SIZE]
  );

  useFrame((state, _delta, _xrFrame) => {
    ref.current?.lookAt(state.camera.position);
    if (hovering) {
      ref.current?.scale.lerp(new Vector3(1 + 0.1, 1.1, 1.1), 0.1);
    } else {
      ref.current?.scale.lerp(new Vector3(1, 1, 1), 0.1);
    }
  });

  return (
    <mesh
      ref={ref}
      position={[0, props.startingHeight, 0]}
      name={props.name}
      onPointerOver={() => setHovering(true)}
      onPointerOut={() => setHovering(false)}
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
        <meshStandardMaterial color={props.backgroundColor} />
      </RoundedBox>
      <Text
        position={[
          -parentSize.x / 2,
          parentSize.y / 2,
          parentSize.z / 2 + 0.05,
        ]}
        maxWidth={parentSize.x}
        font={BOLD_FONT}
        fontSize={TITLE_TEXT_SIZE}
        textAlign="left"
        anchorX="left"
        anchorY="top"
      >
        {props.titleText}
      </Text>

      <Text
        position={[parentSize.x / 2, parentSize.y / 2, parentSize.z / 2 + 0.05]}
        maxWidth={parentSize.x}
        font={BOLD_FONT}
        fontSize={TITLE_TEXT_SIZE}
        textAlign="right"
        anchorX="right"
        anchorY="top"
      >
        {props.dateText}
      </Text>

      <Text
        position={[
          -parentSize.x / 2,
          parentSize.y / 2 - BULLET_TEXT_SIZE,
          parentSize.z / 2 + 0.05,
        ]}
        maxWidth={parentSize.x}
        font={BOLD_FONT}
        fontSize={BULLET_TEXT_SIZE}
        textAlign="left"
        anchorX="left"
        anchorY="top"
      >
        {props.bullets.reduce((prev, curr) => `${prev} \n- ${curr}`, "")}
      </Text>
    </mesh>
  );
};

export default PortfolioItem;
