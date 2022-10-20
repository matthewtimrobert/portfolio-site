import { useBounds } from "@react-three/drei";
import { FC, useEffect, useState } from "react";
import { Object3D } from "three";
import { education, expierences, projects } from "../../assets/constants";
import { useAppSelector } from "../../redux/configureStore";
import { getNavType } from "../../redux/selector";
import { NavType } from "../../redux/state";
import ResumeItem from "./ResumeItem";
import ResumeTitle from "./ResumeTitle";

const ResumeItems: FC = () => {
  const [currObject, setCurrObject] = useState<Object3D | null>(null);

  const showResume = useAppSelector(getNavType) === NavType.RESUME;
  const bounds = useBounds();
  useEffect(() => {
    if (showResume) {
      bounds.refresh().fit();
    }
  }, [showResume, bounds]);

  return (
    <group
      onClick={(e) => {
        e.stopPropagation();
        if (e.delta < 2 && currObject !== e.object) {
          bounds.refresh(e.object).fit();
          setCurrObject(e.object);
        } else {
          bounds.refresh().fit();
          setCurrObject(null);
        }
      }}
    >
      <ResumeTitle titleText="Education" x={0} z={-2} />
      {education.map((item, i) => (
        <ResumeItem key={i} x={0} z={-i * 2} {...item} />
      ))}
      <ResumeTitle titleText="Experience" x={6} z={-2} />
      {expierences.map((item, i) => (
        <ResumeItem key={i} x={6} z={i * 2} {...item} />
      ))}
      <ResumeTitle titleText="Projects" x={12} z={-2} />
      {projects.map((item, i) => (
        <ResumeItem key={i} x={12} z={i * 2} {...item} />
      ))}
    </group>
  );
};

export default ResumeItems;
