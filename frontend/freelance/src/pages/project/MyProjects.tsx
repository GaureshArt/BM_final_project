import React, { useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Card, Tag, Progress, List, Skeleton, Button, Modal } from "antd";

import { CheckCircleOutlined, ClockCircleOutlined } from "@ant-design/icons";

import {
  assignFreelancer,
  getProjectByClientId,
  getProjectByFreelanceId,
  IAssignFreelancer,
} from "../../api/project.api";
import { updateBid } from "../../api/bid.api";
import MilestoneForm from "./components/Milestone";
import {
  completeMilestone,
  ICompleteMilestone,
} from "../../api/milestones.api";

interface ICategory {
  id: number;
  name: string;
}

interface IClient {
  id: number;
  name: string;
  email: string;
  password: string;
  role: "client";
}

interface IFreelancer {
  id: number;
  name: string;
  email: string;
  bio: string;
  profileImageUrl: string;
  isActive: boolean;
  role: "freelancer";
  createdAt: string;
  updatedAt: string;
}

export interface IBid {
  id: number;
  initialAmount: string;
  initialDurationDays: number;
  initialMessage: string;
  status: "negotiate" | "accepted" | "rejected";
  freelancer: IFreelancer;
  finalAmount: string | null;
  finalDurationDays: number | null;
}

interface IMilestone {
  id: number;
  title: string;
  description?: string;
  dueDate?: string;
  isCompleted?: boolean;
}

export interface IProject {
  id: number;
  title: string;
  description: string;
  budget: string;
  deadline: string;
  category: ICategory[];
  client: IClient;
  assignedFreelancer: IFreelancer | null;
  bids: IBid[];
  milestones: IMilestone[];
}

export const MyProjects: React.FC = () => {
  const role = sessionStorage.getItem("userRole")!;
  const userId = sessionStorage.getItem("userId")!;
  const [selectedProject, setSelectedProject] = useState<IProject | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  console.log("role", role);
  const milestoneCompleteMutation = useMutation({
    mutationKey: ["milestoneCompelte"],
    mutationFn: completeMilestone,
    onSuccess: (data) => {
      console.log(data);
    },
  });
  const { data, isLoading } = useQuery({
    queryKey: ["my-projects", role],
    queryFn: () =>
      role === "client"
        ? getProjectByClientId(+userId)
        : getProjectByFreelanceId(+userId),
    enabled: !!role,
  });
  const BidMutation = useMutation({
    mutationKey: ["bidUpdate"],
    mutationFn: updateBid,
    onSuccess: (data) => {
      console.log("data", data);
    },
    onError: (err) => {
      console.log("error", err);
    },
  });

  const projectMutation = useMutation({
    mutationKey: ["projectUpdateAssignFreelancer"],
    mutationFn: assignFreelancer,
    onSuccess: (data) => {
      console.log(data);
    },
    onError: (err) => {
      console.log("error", err);
    },
  });
  const renderCategories = (categories: ICategory[]) =>
    categories.map((cat) => (
      <Tag key={cat.id} color="blue">
        {cat.name}
      </Tag>
    ));

  const renderClientView = (projects: IProject[]) => {
    const handleAcceptBid = (
      bidId: number,
      proId: number,
      freelancerId: number
    ) => {
      const data: Partial<IBid> = {
        status: "accepted",
        id: bidId,
      };
      const projData: IAssignFreelancer = {
        projectId: proId,
        assignedFreelancerId: freelancerId,
      };
      BidMutation.mutate(data);
      projectMutation.mutate(projData);
    };

    const handleRejectBid = (bidId: number) => {
      const data: Partial<IBid> = {
        status: "rejected",
        id: bidId,
      };
      BidMutation.mutate(data);
    };

    const showModal = () => {
      setIsModalOpen(true);
    };

    const handleCancel = () => {
      setIsModalOpen(false);
    };
    const handleNegotiateBid = (bidId: number) => {};

    const handleAddMilestone = (project: IProject) => {
      setSelectedProject(project);
      showModal();
    };

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projects.map((project) => (
          <Card
            key={project.id}
            title={<span className="text-lg font-bold">{project.title}</span>}
            className="rounded-2xl shadow-md hover:shadow-xl transition-shadow"
          >
            <p className="mb-3 text-gray-700">{project.description}</p>

            <div className="mb-2 text-sm text-gray-600">
              <span className="font-semibold">Budget:</span> ₹{project.budget}
            </div>
            <div className="mb-2 text-sm text-gray-600">
              <span className="font-semibold">Deadline:</span>{" "}
              {project.deadline}
            </div>
            <div className="mb-4">{renderCategories(project.category)}</div>

            <div className="mb-4 border-dashed">
              <h4 className="font-semibold mb-2  text-gray-800">Milestones:</h4>
              <List
                dataSource={project.milestones}
                bordered
                locale={{ emptyText: "No milestones added yet." }}
                renderItem={(milestone) => (
                  <List.Item>
                    <div>
                      <div className="font-medium">{milestone.title}</div>
                      <div className="text-sm text-gray-600">
                        {milestone.description}
                        <Modal
                          title="Add Milestone"
                          open={isModalOpen}
                          footer={null}
                          onCancel={handleCancel}
                        >
                          {selectedProject && (
                            <MilestoneForm
                              projectId={selectedProject.id}
                              handleCancel={handleCancel}
                            />
                          )}
                        </Modal>
                      </div>
                    </div>
                  </List.Item>
                )}
              />

              <div className="text-right mt-2">
                <Button onClick={() => handleAddMilestone(project)}>
                  Add Milestone
                </Button>
              </div>
            </div>

        
            <div className="mt-4">
              <h4 className="font-semibold mb-2 text-gray-800">Bids:</h4>
              <List
                dataSource={project.bids}
                bordered
                locale={{ emptyText: "No bids yet." }}
                renderItem={(bid) => (
                  <List.Item>
                    <div className="w-full">
                      <div className="mb-1">
                        <strong>Freelancer:</strong> {bid.freelancer?.name} (
                        {bid.freelancer?.email})
                      </div>
                      <div className="mb-1">
                        <strong>Message:</strong> {bid.initialMessage}
                      </div>
                      <div className="mb-1">
                        <strong>Initial Amount:</strong> ₹{bid.initialAmount}
                      </div>
                      <div className="mb-1">
                        <strong>Duration:</strong> {bid.initialDurationDays}{" "}
                        days
                      </div>
                      <div className="mb-2">
                        <strong>Status:</strong>{" "}
                        <Tag
                          color={
                            bid.status === "negotiate"
                              ? "orange"
                              : bid.status === "accepted"
                              ? "green"
                              : "volcano"
                          }
                        >
                          {bid.status.toUpperCase()}
                        </Tag>
                      </div>
                      {bid.status === "negotiate" && (
                        <div className="flex gap-2 justify-end">
                          <Button
                            type="primary"
                            size="small"
                            onClick={() =>
                              handleAcceptBid(
                                bid.id,
                                project.id,
                                bid.freelancer.id
                              )
                            }
                          >
                            Accept
                          </Button>
                          <Button
                            danger
                            size="small"
                            onClick={() => handleRejectBid(bid.id)}
                          >
                            Reject
                          </Button>
                          <Button
                            type="dashed"
                            size="small"
                            onClick={() => handleNegotiateBid(bid.id)}
                          >
                            Negotiate
                          </Button>
                        </div>
                      )}
                    </div>
                  </List.Item>
                )}
              />
            </div>
          </Card>
        ))}
      </div>
    );
  };

  const renderFreelancerView = (projects: IProject[]) => {
    const handleCompleteMilestone = async (
      milestoneId: number,
      projectId: number
    ) => {
      const data: ICompleteMilestone = {
        id: milestoneId,
        isCompleted: true,
      };
      milestoneCompleteMutation.mutate(data);
      console.log(
        "Marking milestone complete:",
        milestoneId,
        "for project:",
        projectId
      );
    };

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {projects.map((project) => {
          const total = project.milestones?.length || 0;
          const completed =
            project.milestones?.filter((m) => m.isCompleted).length || 0;
          const progressPercent = total
            ? Math.round((completed / total) * 100)
            : 0;

          return (
            <Card
              key={project.id}
              title={project.title}
              bordered
              className="rounded-2xl shadow-md"
              extra={<Tag color="green">{progressPercent}% Complete</Tag>}
            >
              <p className="mb-2 text-gray-600">{project.description}</p>
              <div className="mb-2">
                <span className="font-semibold">Budget:</span> ₹{project.budget}
              </div>
              <div className="mb-2">
                <span className="font-semibold">Deadline:</span>{" "}
                {project.deadline}
              </div>
              <div className="mb-2">{renderCategories(project.category)}</div>

              <div className="mt-4">
                <h4 className="font-semibold mb-2">Milestones</h4>
                <List
                  dataSource={project.milestones}
                  bordered
                  renderItem={(ms) => (
                    <List.Item
                      actions={[
                        ms.isCompleted ? (
                          <Tag color="green">Completed</Tag>
                        ) : (
                          <Button
                            type="primary"
                            size="small"
                            onClick={() =>
                              handleCompleteMilestone(ms.id, project.id)
                            }
                          >
                            Mark as Complete
                          </Button>
                        ),
                      ]}
                    >
                      <span className="flex items-center gap-2">
                        {ms.isCompleted ? (
                          <CheckCircleOutlined className="text-green-500" />
                        ) : (
                          <ClockCircleOutlined className="text-gray-400" />
                        )}
                        {ms.title}
                      </span>
                    </List.Item>
                  )}
                />
                <Progress percent={progressPercent} className="mt-3" />
              </div>
            </Card>
          );
        })}
      </div>
    );
  };

  if (isLoading) return <Skeleton active className="mt-8" />;

  if (!data || data.length === 0)
    return (
      <div className="text-center text-gray-500 mt-10">No projects found.</div>
    );

  return (
    <div className="p-4 md:p-6 lg:p-10">
      <h1 className="text-2xl font-bold mb-6">My Projects</h1>
      {role === "client" ? renderClientView(data) : renderFreelancerView(data)}
    </div>
  );
};

export default MyProjects;
