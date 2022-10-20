import { Physics } from "@react-three/cannon";
import { Bounds, OrbitControls } from "@react-three/drei";
import { FC } from "react";
import { Vector3 } from "three";
import { getRandomInt } from "../../assets/utils";
import { useAppSelector } from "../../redux/configureStore";
import { getNavType } from "../../redux/selector";
import { NavType } from "../../redux/state";
import MenuBox from "./MenuBox";
import MenuContent from "./MenuContent";
import MenuGround from "./MenuGround";

const MenuScene: FC = () => {
  const showMenu = useAppSelector(getNavType) === NavType.MENU;

  // we keep the component mounted but very far away so we don't have to rerender the meshes
  return showMenu ? (
    <group>
      <ambientLight intensity={0.5} />
      <directionalLight
        position={[5, 10, 5]}
        castShadow
        intensity={0.5}
        shadow-camera-left={-10}
        shadow-camera-right={10}
        shadow-camera-top={10}
        shadow-camera-bottom={-10}
      />
      <OrbitControls makeDefault enablePan={false} />
      <Physics>
        <MenuGround />
        {Array(2)
          .fill(1)
          .map((_v, i) => (
            <MenuBox
              key={i}
              size={new Vector3(1, 1, 1)}
              position={
                new Vector3(
                  10,
                  i * getRandomInt(10, 20) + 10,
                  getRandomInt(-1, 1)
                )
              }
            />
          ))}

        {Array(2)
          .fill(1)
          .map((_v, i) => (
            <MenuBox
              key={i}
              size={new Vector3(1, 1, 1)}
              position={
                new Vector3(
                  -10,
                  i * getRandomInt(5, 10) + 10,
                  getRandomInt(-1, 1)
                )
              }
            />
          ))}
        <Bounds fit clip observe margin={0.5}>
          <MenuContent />
        </Bounds>
      </Physics>
    </group>
  ) : null;
};

export default MenuScene;
