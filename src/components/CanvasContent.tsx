import { FC } from "react";
import { BG1_COLOR } from "../assets/constants";
import MenuScene from "./menu/MenuScene";
import ResumeScene from "./resume/ResumeScene";
import SortingScene from "./sorting-visual/SortingScene";

const CanvasContent: FC = () => {
  return (
    <>
      <color attach="background" args={[BG1_COLOR]} />
      <MenuScene />
      <ResumeScene />
      <SortingScene />
    </>
  );
};

export default CanvasContent;
