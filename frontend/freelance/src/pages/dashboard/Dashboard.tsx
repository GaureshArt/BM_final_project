import { Button,  Splitter } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import MenuCom from "../../components/Menu";
import { useQuery } from "@tanstack/react-query";
import { getuserById } from "../../api/user.api";
import { ProfileCard } from "./components/ProfileCard";

export const Dashboard = () => {
  const nav = useNavigate();
  const userId = useParams().userId;
  const role = sessionStorage.getItem('userRole');
  const handleGetUserData = async () => {
    const res = await getuserById(+userId!);
    return res;
  };
  const handleLoginRoute = () => {
    nav("/login");
  };
  const { data: userData, error } = useQuery({
    queryKey: ["UserDataForDashboard"],
    queryFn: handleGetUserData,
  });
  const handleAddProject = () => {
    nav(`/project/add/${userId}`);
  };
  if (error) {
    return (
      <>
        <h1>{error.message} log in again</h1>
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
      </>
    );
  }
  return (
    <>
      <div className="w-screen h-screen p-2 ">
    
        <div className="absolute">
          <MenuCom tab="4" />
        </div>
        <Splitter
          style={{ height: "100%", boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)" }}
        >
          <Splitter.Panel defaultSize="50%" min="40%" max="70%">
            <div className="flex items-center gap-0  justify-center ">
              <div className=" mr-10 w-full mt-[10rem]">
                {userData && <ProfileCard data={userData} />}
              </div>
            </div>
          </Splitter.Panel>
          <Splitter.Panel>
            <div className="flex items-center justify-center m-10">
                {
                    role === 'freelancer'?<h1>Project Analysis Coming soon..</h1>:
              <Button
              variant="filled"
              color="purple"
              onClick={handleAddProject}
              >
                Add Project
              </Button>
            }
            </div>
          </Splitter.Panel>
        </Splitter>
      </div>
    </>
  );
};
