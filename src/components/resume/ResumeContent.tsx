import { Scroll, ScrollControls } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import { FC, useEffect } from "react";
import { Vector3 } from "three";
import { education, expierences, projects } from "../../assets/constants";
import { useAppSelector } from "../../redux/configureStore";
import { getNavType } from "../../redux/selector";
import { NavType } from "../../redux/state";
import SpotlightTrack from "../SpotlightTrack";
import ResumeItem from "./ResumeItem";
import ResumeTitle from "./ResumeTitle";

const color = "grey";
const ResumeContent: FC = () => {
  const showResume = useAppSelector(getNavType) === NavType.RESUME;
  const { camera } = useThree();

  // init camera when nav change
  useEffect(() => {
    if (showResume) {
      camera.position.x = 0;
      camera.position.y = 0;
      camera.position.z = 5;
      camera.lookAt(0, 0, 0);
    }
  }, [showResume, camera]);

  // we keep the component mounted but very far away so we don't have to rerender the meshes
  return (
    <group position={showResume ? [0, 0, 0] : [100, 1000, 100]}>
      <mesh receiveShadow>
        <planeGeometry args={[50, 50]} />
        <meshPhongMaterial color="lightblue" />
      </mesh>
      {showResume ? (
        <>
          <directionalLight position={[5, 0, 5]} castShadow intensity={0.2} />
          <SpotlightTrack position={new Vector3(4, 3, 3)} />
          <SpotlightTrack position={new Vector3(-4, 3, 3)} />{" "}
        </>
      ) : null}

      <ScrollControls
        pages={2}
        distance={1}
        damping={5}
        horizontal={false}
        infinite={false}
      >
        <Scroll>
          <ResumeTitle
            titleText="Education"
            startingHeight={2}
            backgroundColor={color}
          />
          {education.map((education, i) => (
            <ResumeItem
              key={i}
              name={`${i}`}
              startingHeight={-i * 2}
              {...education}
              backgroundColor={color}
            />
          ))}
          <ResumeTitle
            titleText="Experience"
            startingHeight={-2}
            backgroundColor={color}
          />
          {expierences.map((expierence, i) => (
            <ResumeItem
              key={i}
              name={`${i}`}
              startingHeight={-4 - i * 2}
              {...expierence}
              backgroundColor={color}
            />
          ))}
          <ResumeTitle
            titleText="Experience"
            startingHeight={-10}
            backgroundColor={color}
          />
          {projects.map((project, i) => (
            <ResumeItem
              key={i}
              name={`${i}`}
              startingHeight={-12 - i * 2}
              {...project}
              backgroundColor={color}
            />
          ))}
        </Scroll>
      </ScrollControls>
    </group>
  );
};

export default ResumeContent;
