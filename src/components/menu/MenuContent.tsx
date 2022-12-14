import { useBounds } from "@react-three/drei";
import { FC, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Vector3 } from "three";
import { setNavType } from "../../redux/action";
import { useAppSelector } from "../../redux/configureStore";
import { getNavType } from "../../redux/selector";
import { NavType } from "../../redux/state";
import MenuBoxPusher from "./MenuBoxPusher";
import MenuButton from "./MenuButton";

const MenuContent: FC = () => {
  const showMenu = useAppSelector(getNavType) === NavType.MENU;
  const dispatch = useDispatch();
  const bounds = useBounds();
  useEffect(() => {
    if (showMenu) {
      bounds.fit().refresh();
    }
  }, [showMenu, bounds]);

  return (
    <>
      <MenuBoxPusher position={new Vector3(10, 2, 0)} side="right" />
      <MenuBoxPusher position={new Vector3(-10, 2, 0)} side="left" />
      <MenuButton
        size={new Vector3(5, 4, 1)}
        position={new Vector3(4, 0.5, -1)}
        text="Resume"
        onClick={() => dispatch(setNavType(NavType.RESUME))}
      />
      <MenuButton
        size={new Vector3(5, 4, 1)}
        position={new Vector3(-4, 0.5, -1)}
        text="Sorting Visualization"
        onClick={() => dispatch(setNavType(NavType.SORTING_VISUAL))}
      />
      <MenuButton
        size={new Vector3(2, 2, 0.5)}
        position={new Vector3(-3, 0.25, 3)}
        text="Email"
        hoverText="matthewtimroberts@gmail.com"
        onClick={() => window.open("mailto:matthewtimroberts@gmail.com")}
      />
      <MenuButton
        size={new Vector3(2, 2, 0.5)}
        position={new Vector3(0, 0.25, 3)}
        text="Linkedin"
        hoverText="linkedin.com/in/matthewtimroberts"
        onClick={() =>
          window.open("https://www.linkedin.com/in/matthewtimroberts/")
        }
      />
      <MenuButton
        size={new Vector3(2, 2, 0.5)}
        position={new Vector3(3, 0.25, 3)}
        text="Github"
        hoverText="github.com/matthewtimrobert"
        onClick={() => window.open("https://www.github.com/matthewtimrobert")}
      />
    </>
  );
};

export default MenuContent;
