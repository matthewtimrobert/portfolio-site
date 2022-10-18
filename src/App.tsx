import { Button, Typography } from "@mui/material";
import { Canvas } from "@react-three/fiber";
import { FC } from "react";
import { useDispatch } from "react-redux";
import CanvasContent from "./components/CanvasContent";
import { setNavType } from "./redux/action";
import { useAppSelector } from "./redux/configureStore";
import { getNavType, getShowMenuTip } from "./redux/selector";
import { NavType } from "./redux/state";
const App: FC = () => {
  const dispatch = useDispatch();
  const currentNav = useAppSelector(getNavType);
  const showMenuTip = useAppSelector(getShowMenuTip);

  return (
    <div className="main">
      {[NavType.RESUME, NavType.SORTING_VISUAL].includes(currentNav) && (
        <Button
          className="main-back-button anchor"
          variant="contained"
          onClick={() => {
            dispatch(setNavType(NavType.MENU));
          }}
        >
          Click to go back to menu
        </Button>
      )}
      {currentNav === NavType.MENU && showMenuTip && (
        <Typography className="main-menu-tip anchor">
          Click the cubes to navigate
        </Typography>
      )}

      <Canvas shadows dpr={[1, 2]} camera={{ fov: 75 }}>
        <CanvasContent />
      </Canvas>
    </div>
  );
};

export default App;
