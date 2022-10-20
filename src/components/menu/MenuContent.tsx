import { Physics } from "@react-three/cannon";
import { OrbitControls } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import { FC, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Vector3 } from "three";
import { getRandomInt } from "../../assets/utils";
import { setNavType } from "../../redux/action";
import { useAppSelector } from "../../redux/configureStore";
import { getNavType } from "../../redux/selector";
import { NavType } from "../../redux/state";
import MenuBox from "./MenuBox";
import MenuBoxPusher from "./MenuBoxPusher";
import MenuButton from "./MenuButton";
import MenuGround from "./MenuGround";

const Menucontent: FC = () => {
  const showMenu = useAppSelector(getNavType) === NavType.MENU;
  const dispatch = useDispatch();

  const { camera } = useThree();

  // init camera when nav change
  useEffect(() => {
    if (showMenu) {
      camera.position.x = 0;
      camera.position.y = 10;
      camera.position.z = 10;
      camera.lookAt(0, 0, 0);
    }
  }, [showMenu, camera]);

  // we keep the component mounted but very far away so we don't have to rerender the meshes
  return (
    <group position={showMenu ? [0, 0, 0] : [100, 1000, 100]}>
      {showMenu ? (
        <>
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
        </>
      ) : null}

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

        <MenuBoxPusher position={new Vector3(10, 2, 0)} side="right" />
        <MenuBoxPusher position={new Vector3(-10, 2, 0)} side="left" />

        <MenuButton
          size={new Vector3(5, 4, 1)}
          position={new Vector3(4, 0.5, -1)}
          boxProps={{ rotation: [-Math.PI / 2, 0, 0] }}
          text={`Resume`}
          onClick={() => dispatch(setNavType(NavType.RESUME))}
        />
        <MenuButton
          size={new Vector3(5, 4, 1)}
          position={new Vector3(-4, 0.5, -1)}
          boxProps={{ rotation: [-Math.PI / 2, 0, 0] }}
          text={`Sorting Visualization`}
          onClick={() => dispatch(setNavType(NavType.SORTING_VISUAL))}
        />
        <MenuButton
          size={new Vector3(2, 2, 0.5)}
          position={new Vector3(-3, 0.25, 3)}
          boxProps={{ rotation: [-Math.PI / 2, 0, 0] }}
          text={`Email`}
          onClick={() => window.open("mailto:matthewtimroberts@gmail.com")}
        />
        <MenuButton
          size={new Vector3(2, 2, 0.5)}
          position={new Vector3(0, 0.25, 3)}
          boxProps={{ rotation: [-Math.PI / 2, 0, 0] }}
          text={`Linkedin`}
          onClick={() =>
            window.open("https://www.linkedin.com/in/matthewtimroberts/")
          }
        />
        <MenuButton
          size={new Vector3(2, 2, 0.5)}
          position={new Vector3(3, 0.25, 3)}
          boxProps={{ rotation: [-Math.PI / 2, 0, 0] }}
          text={`Github`}
          onClick={() => window.open("https://github.com/matthewtimrobert")}
        />
      </Physics>
    </group>
  );
};

export default Menucontent;
