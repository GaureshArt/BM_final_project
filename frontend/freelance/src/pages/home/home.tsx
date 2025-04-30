import { Button } from "antd";
import heroImg from "../../assets/success.svg";
import { useNavigate, } from "react-router-dom";

import { useQuery } from "@tanstack/react-query";
import { getAllProjects } from "../../api/project.api";
import ProjectCard  from "../project/components/ProjectCard";
import { getProjectsBidById } from "../../api/bid.api";
import MenuCom from "../../components/Menu";
import { IProject } from "../project/MyProjects";

export type Role = "client" | "freelancer" | null;

export const Home = () => {
  const nav = useNavigate();

  const role = sessionStorage.getItem("userRole")! as Role;
  const userId = +sessionStorage.getItem("userId")!;
  const { data: projectData } = useQuery<IProject[]>({
    queryKey: ["projectData"],
    queryFn: getAllProjects,
  });
  const { data: bidProj } = useQuery({
    queryKey: ["BidProject"],
    queryFn: () => getProjectsBidById(userId),
  });
  const handleRegisterRoute = () => {
    nav("/register");
  };
  const handleLoginRoute = () => {
    nav("/login");
  };
  const handleProjBid = (projectId: number) => {
    nav(`/project/bid/${projectId}`);
  };
  return (
    <>
      <div className="w-screen h-screen">
        {role && (
          <div className="absolute">
            <MenuCom tab={"1"} />
          </div>
        )}
        <div className=" flex w-screen justify-center items-center gap-24">
          <h1 className="text-8xl font-mono w-1/3">
            Bring{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500">
              Ideas
            </span>{" "}
            to life
          </h1>
          <img
            className="w-1/3 transform scale-x-[-1]"
            src={heroImg}
            alt="heroImage"
          />
        </div>
        {!role ? (
          <div className=" w-screen h-auto flex items-center justify-center gap-10 font-serif">
            <Button size="large" variant="solid" color="default">
              {" "}
              <span
                className="font-mono flex items-center justify-center"
                onClick={handleLoginRoute}
              >
                {" "}
                Login
              </span>{" "}
            </Button>
            <Button size="large" variant="solid">
              {" "}
              <span
                className="font-mono flex items-center justify-center"
                onClick={handleRegisterRoute}
              >
                {" "}
                Register
              </span>
            </Button>
          </div>
        ) : (
          <>
            <div className="w-screen h-auto">
              <h1 className="text-2xl">
                Feature Projects 
              </h1>
              {projectData &&
                projectData.map((proj: IProject) => {
                  return (
                    <ProjectCard
                      project={proj}
                      userRole={role}
                      onBid={handleProjBid}
                      bidProj={bidProj}
                    />
                  );
                })}
            </div>
          </>
        )}
      </div>
    </>
  );
};
