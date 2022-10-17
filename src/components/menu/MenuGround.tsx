import { PlaneProps, usePlane } from "@react-three/cannon";
import { Plane } from "@react-three/drei";
import { FC } from "react";

interface Props {
  planeProps?: PlaneProps;
}

const MenuGround: FC<Props> = (props) => {
  const [ref] = usePlane(() => ({
    rotation: [-Math.PI / 2, 0, 0],
    ...(props.planeProps || {}),
  }));

  return (
    <Plane args={[500, 500]} ref={ref} receiveShadow>
      <meshPhongMaterial color="lightblue" />
    </Plane>
  );
};

export default MenuGround;
