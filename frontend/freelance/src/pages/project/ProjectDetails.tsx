import {
  Descriptions,
  Divider,
  Empty,
  Skeleton,
  Table,
  Tag,
  Typography,
} from "antd";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getProjectById } from "../../api/project.api";
import { getMilestonesByProjId } from "../../api/milestones.api";

const { Title } = Typography;

const ProjectDetails = () => {
  const { projectId } = useParams();

  const {
    data: project,
    isLoading: projectLoading,
    isError: projectError,
  } = useQuery({
    queryKey: ["project", projectId],
    queryFn: () => getProjectById(+projectId!),
    enabled: !!projectId,
  });

  const {
    data: milestones,
    isLoading: milestonesLoading,
    isError: milestonesError,
  } = useQuery({
    queryKey: ["milestones", projectId],
    queryFn: () => getMilestonesByProjId(+projectId!),
    enabled: !!projectId,
  });

  if (projectLoading || milestonesLoading) return <Skeleton active />;
  if (projectError || milestonesError) return <div>Error loading data</div>;
  if (!project) return <Empty description="Project not found" />;

  return (
    <div>
      <Title level={2}>Project Details</Title>
      <Descriptions bordered column={1}>
        <Descriptions.Item label="Title">{project.title}</Descriptions.Item>
        <Descriptions.Item label="Description">
          {project.description}
        </Descriptions.Item>
        <Descriptions.Item label="Category">
          {project ? (
            project.category.map((cat: any) => (
              <Tag key={cat.id}>{cat.name}</Tag>
            ))
          ) : (
            <>
              <h1>No category assign to project</h1>
            </>
          )}
        </Descriptions.Item>
        <Descriptions.Item label="Budget">{project.budget}</Descriptions.Item>
        <Descriptions.Item label="Duration">
          Deadline: {project.deadline}{" "}
        </Descriptions.Item>

        <Descriptions.Item label="Selected Freelancer">
          {project.assignedFreelancer ? (
            <Tag color="green">{project.assignedFreelancer.name}</Tag>
          ) : (
            <Tag color="red">Not selected</Tag>
          )}
        </Descriptions.Item>
      </Descriptions>

      <Divider />

      <Title level={4} className="mb-4">
        Milestones
      </Title>
      {milestones && milestones.length > 0 ? (
        <Table
          dataSource={milestones}
          rowKey="id"
          pagination={false}
          bordered
          columns={[
            {
              title: "Title",
              dataIndex: "title",
              key: "title",
              render: (title: string) =>
                title || <Tag color="red">No Title</Tag>,
            },
            {
              title: "Amount",
              dataIndex: "amount",
              key: "amount",
              render: (amount: any) => {
                const parsedAmount = parseFloat(amount);
                return !isNaN(parsedAmount) ? (
                  `₹${parsedAmount.toFixed(2)}`
                ) : (
                  <Tag color="red">Invalid</Tag>
                );
              },
            },
            {
              title: "Due Date",
              dataIndex: "dueDate",
              key: "dueDate",
              render: (date: string) =>
                date ? (
                  new Date(date).toLocaleDateString()
                ) : (
                  <Tag color="red">No Date</Tag>
                ),
            },
          ]}
        />
      ) : (
        <Empty description="No milestones available" />
      )}
    </div>
  );
};

export default ProjectDetails;
