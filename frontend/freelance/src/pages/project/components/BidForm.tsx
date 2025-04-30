import React from "react";
import { Form, Input, InputNumber,  Button, Card } from "antd";

import { useNavigate, useParams } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { createBid } from "../../../api/bid.api";

const { TextArea } = Input;
export enum BidStatus {
  open = "open",
  negotiate = "negotiate",
  accepted = "accepted",
  rejected = "rejected",
}
export interface ICreateBidFormValues {
  freelancerId: number;
  projectId: number;
  initialAmount: number;
  initialDurationDays: number;
  initialMessage: string;
  status: BidStatus;
}

const BidForm: React.FC = () => {
  const nav = useNavigate();
  const [form] = Form.useForm<ICreateBidFormValues>();

  const id = sessionStorage.getItem("userId");
  const projectId = useParams().projectId;

  const mutation = useMutation({
    mutationKey: ["bid"],
    mutationFn: createBid,
    onSuccess: (data) => {
      console.log("fata,", data);
      nav(-1);
    },
    onError: (err) => {
      console.log("eroor", err);
    },
  });
  const onFinish = (values: ICreateBidFormValues) => {
    console.log("Submitted values:", values);
    const data: ICreateBidFormValues = {
      ...values,
      freelancerId: +id!,
      status: BidStatus.negotiate,
      projectId: +projectId!,
    };
    console.log("projctdata: ", data);
    mutation.mutate(data);
  };

  return (
    <Card
      title="Submit Your Bid"
      className="max-w-xl mx-auto mt-10 shadow-md rounded-2xl"
      style={{ borderRadius: "1rem" }}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        className="space-y-4"
      >
        <Form.Item
          label=" Amount (₹)"
          name="initialAmount"
          rules={[{ required: true, message: "Initial amount is required" }]}
        >
          <InputNumber
            className="w-full"
            min={1}
            placeholder="Propose your bid amount"
          />
        </Form.Item>

        <Form.Item
          label=" Duration (Days)"
          name="initialDurationDays"
          rules={[{ required: true, message: "Duration is required" }]}
        >
          <InputNumber
            className="w-full"
            min={1}
            placeholder="How long will it take?"
          />
        </Form.Item>

        <Form.Item
          label=" Message"
          name="initialMessage"
          rules={[{ required: true, message: "Please enter a message" }]}
        >
          <TextArea rows={4} placeholder="Your message to the client..." />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="w-full rounded-xl"
          >
            Submit Bid
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default BidForm;
