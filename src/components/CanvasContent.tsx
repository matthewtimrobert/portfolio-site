import { FC } from "react";
import Menucontent from "./menu/MenuContent";
import ResumeContent from "./resume/ResumeContent";

const CanvasContent: FC = () => {
  return (
    <>
      <color attach="background" args={["lightblue"]} />
      <Menucontent />
      <ResumeContent />
    </>
  );
};

export default CanvasContent;
