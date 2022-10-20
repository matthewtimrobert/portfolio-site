import { RoundedBox, Text } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { FC, useMemo, useRef, useState } from "react";
import { Mesh, Vector3 } from "three";
import { BG_COLOR, BOLD_FONT, TXT_COLOR } from "../../assets/constants";

interface Props {
  x: number;
  z: number;
  titleText: string;
  dateText: string;
  bullets: string[];
}

const PARENT_PADDING = 0.2;

const PortfolioItem: FC<Props> = (props: Props) => {
  const [hovering, setHovering] = useState(false);
  const ref = useRef<Mesh>(null);

  const TITLE_TEXT_SIZE = 0.15;
  const BULLET_TEXT_SIZE = 0.1;
  const { bullets } = props;
  const { length } = bullets;
  const parentSize = useMemo(
    () =>
      new Vector3(5, TITLE_TEXT_SIZE + (4 + length) * BULLET_TEXT_SIZE, 0.25),
    [length, TITLE_TEXT_SIZE, BULLET_TEXT_SIZE]
  );

  useFrame((state, _delta, _xrFrame) => {
    if (hovering) {
      ref.current?.scale.lerp(new Vector3(1 + 0.1, 1.1, 1.1), 0.1);
    } else {
      ref.current?.scale.lerp(new Vector3(1, 1, 1), 0.1);
    }
  });

  return (
    <mesh
      ref={ref}
      position={[props.x, parentSize.z / 2, props.z]}
      rotation={[-Math.PI / 2, 0, 0]}
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
        <meshStandardMaterial color={BG_COLOR} />
      </RoundedBox>
      <Text
        position={[
          -parentSize.x / 2,
          parentSize.y / 2,
          parentSize.z / 2 + 0.01,
        ]}
        maxWidth={parentSize.x}
        font={BOLD_FONT}
        fontSize={TITLE_TEXT_SIZE}
        textAlign="left"
        anchorX="left"
        anchorY="top"
        color={TXT_COLOR}
      >
        {props.titleText}
      </Text>

      <Text
        position={[parentSize.x / 2, parentSize.y / 2, parentSize.z / 2 + 0.01]}
        maxWidth={parentSize.x}
        font={BOLD_FONT}
        fontSize={TITLE_TEXT_SIZE}
        textAlign="right"
        anchorX="right"
        anchorY="top"
        color={TXT_COLOR}
      >
        {props.dateText}
      </Text>

      <Text
        position={[
          -parentSize.x / 2,
          parentSize.y / 2 - BULLET_TEXT_SIZE,
          parentSize.z / 2 + 0.01,
        ]}
        maxWidth={parentSize.x}
        font={BOLD_FONT}
        fontSize={BULLET_TEXT_SIZE}
        textAlign="left"
        anchorX="left"
        anchorY="top"
        color={TXT_COLOR}
      >
        {props.bullets.reduce((prev, curr) => `${prev} \n- ${curr}`, "")}
      </Text>
    </mesh>
  );
};

export default PortfolioItem;
