import { useNavigate, useParams } from "react-router-dom";
import ProjectForm, { IProjectFormValues } from "./components/ProjectForm";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getAllCategories } from "../../api/category.api";
import { createProject } from "../../api/project.api";
import { message } from "antd";

export const AddProject = () => {
  const userId = useParams().userId;
  const nav = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();
  const key = "updatable";
  const { data: categoryOptions } = useQuery({
    queryKey: ["categoryOption"],
    queryFn: getAllCategories,
  });

  const mutation = useMutation({
    mutationKey: ["createProject"],
    mutationFn: createProject,
    onSuccess: () => {
      messageApi.open({
        key,
        type: "success",
        content: "Project create successfully",
      });
      nav(-1);
    },
  });
  const handleSubmit = (values: IProjectFormValues) => {
    console.log("Form Submitted:", values);
    mutation.mutate(values);
  };
  return (
    <>
      {contextHolder}
      <div style={{ maxWidth: 600, margin: "auto", padding: "2rem" }}>
        <h2>Create a New Project</h2>
        {categoryOptions && (
          <ProjectForm
            categories={categoryOptions}
            onSubmit={handleSubmit}
            userId={+userId!}
          />
        )}
      </div>
    </>
  );
};
