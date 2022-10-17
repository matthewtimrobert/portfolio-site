import { Button, Typography } from "@mui/material";
import { Canvas } from "@react-three/fiber";
import { FC } from "react";
import { useDispatch } from "react-redux";
import CanvasContent from "./components/CanvasContent";
import { setNavType } from "./redux/action";
import { useAppSelector } from "./redux/configureStore";
import { getNavType, showMenuTip } from "./redux/selector";
import { NavType } from "./redux/state";
const App: FC = () => {
  const dispatch = useDispatch();
  const showResume = useAppSelector(getNavType) === NavType.RESUME;
  const showTip = useAppSelector(showMenuTip);

  return (
    <div className="main">
      {showResume && (
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
      {!showResume && showTip && (
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
