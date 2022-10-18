import { FC } from "react";
import Menucontent from "./menu/MenuContent";
import ResumeContent from "./resume/ResumeContent";
import SortingVisualContent from "./sorting-visual/SortingVisualContent";

const CanvasContent: FC = () => {
  return (
    <>
      <color attach="background" args={["lightblue"]} />
      <Menucontent />
      <ResumeContent />
      <SortingVisualContent />
    </>
  );
};

export default CanvasContent;
