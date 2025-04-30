import React from "react";
import { Form, Input, InputNumber, DatePicker, Button, Select } from "antd";
import moment from "moment";

const { TextArea } = Input;
const { Option } = Select;

export interface IProjectFormValues {
  title: string;
  categoryIds: number[];
  description: string;
  budget: number;
  deadline: string;
  clientId?: number;
}

type Props = {
  onSubmit: (values: IProjectFormValues) => void;
  categories: { id: number; name: string }[];
  userId: number;
};

const ProjectForm: React.FC<Props> = ({ onSubmit, categories, userId }) => {
  const [form] = Form.useForm();

  const handleFinish = (values: any) => {
    const formattedValues: IProjectFormValues = {
      ...values,
      deadline: new Date(values.deadline)
        .toISOString()
        .slice(0, 19)
        .replace("T", " "),
      clientId: userId,
    };
    onSubmit(formattedValues);
  };

  return (
    <div className="border rounded-lg p-4 w-[36rem] ">
      <Form
        form={form}
        layout="vertical"
        onFinish={handleFinish}
        autoComplete="off"
      >
        <Form.Item
          label="Title"
          name="title"
          rules={[
            { required: true, message: "Please enter the project title" },
            { type: "string", min: 1, message: "Title cannot be empty" },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Categories"
          name="categoryIds"
          rules={[
            { required: true, message: "Please select at least one category" },
            {
              validator: (_, value) =>
                Array.isArray(value) && value.every(Number.isInteger)
                  ? Promise.resolve()
                  : Promise.reject("Each category must be an integer"),
            },
          ]}
        >
          <Select mode="multiple" placeholder="Select categories" allowClear>
            {categories.map((cat) => (
              <Option key={cat.id} value={cat.id}>
                {cat.name}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          label="Description"
          name="description"
          rules={[
            { required: true, message: "Please enter the description" },
            { min: 1, message: "Description cannot be empty" },
          ]}
        >
          <TextArea rows={4} />
        </Form.Item>

        <Form.Item
          label="Budget (INR)"
          name="budget"
          rules={[
            { required: true, message: "Please enter the budget" },
            {
              type: "number",
              min: 0,
              message: "Budget must be a positive number",
            },
          ]}
        >
          <InputNumber<number>
            style={{ width: "100%" }}
            min={0}
            formatter={(value) =>
              `₹ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
            }
            parser={(value) =>
              value ? parseFloat(value.replace(/₹\s?|,/g, "")) : 0
            }
          />
        </Form.Item>

        <Form.Item
          label="Deadline"
          name="deadline"
          rules={[{ required: true, message: "Please select a deadline" }]}
        >
          <DatePicker
            style={{ width: "100%" }}
            showTime
            disabledDate={(current) =>
              current && current < moment().startOf("day")
            }
          />
        </Form.Item>

        <Form.Item className="flex justify-center ">
          <Button variant="solid" color="default" htmlType="submit" block>
            Submit Project
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default ProjectForm;
