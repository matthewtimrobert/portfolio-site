import { FC } from "react";
import MenuScene from "./menu/MenuScene";
import ResumeScene from "./resume/ResumeScene";
import SortingScene from "./sorting-visual/SortingScene";

const CanvasContent: FC = () => {
  return (
    <>
      <color attach="background" args={["lightblue"]} />
      <MenuScene />
      <ResumeScene />
      <SortingScene />
    </>
  );
};

export default CanvasContent;
