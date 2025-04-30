import React from 'react';
import { Form, Input, Button, DatePicker } from 'antd';
import { Rule } from 'antd/es/form';
import { useMutation } from '@tanstack/react-query';
import { createMilestone } from '../../../api/milestones.api';
import { useNavigate, useParams } from 'react-router-dom';


const rules: Record<string, Rule[]> = {

  title: [{ required: true, message: 'Title is required' }],
  dueDate: [{ required: true, message: 'Due date is required' }],
  amount: [
    { required: true, message: 'Amount is required' },
    {
      pattern: /^\d+(\.\d{1,2})?$/,
      message: 'Enter a valid decimal amount (e.g., 100.00)'
    }
  ]
};
interface IProp{
    projectId:number;
    handleCancel:()=>void;
}
const MilestoneForm: React.FC<IProp> = ({projectId,handleCancel}) => {
  const nav = useNavigate()
  const userId = useParams().userId;
  const [form] = Form.useForm();
    const milestoneMutation  = useMutation({
        mutationKey:['milestoneAdd'],
        mutationFn:createMilestone,
        onSuccess:(data)=>{
            console.log(data)
            handleCancel();
            nav(`/myprojects/${+userId!}`)
        },
        onError:(err)=>{
            console.log(err)
        }
    })
  const handleSubmit = (values: any) => {
    const data = {
      ...values,
      dueDate: values.dueDate.format('YYYY-MM-DD'),
      projectId:projectId
    };
    console.log('Submitted values:', data);
    milestoneMutation.mutate(data)
  };

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={handleSubmit}
      initialValues={{
        projectId: undefined,
        amount: undefined
      }}
    >


      <Form.Item label="Title" name="title" rules={rules.title}>
        <Input placeholder="Enter milestone title" />
      </Form.Item>

      <Form.Item label="Due Date" name="dueDate" rules={rules.dueDate}>
        <DatePicker style={{ width: '100%' }} />
      </Form.Item>

      <Form.Item label="Amount" name="amount" rules={rules.amount}>
        <Input placeholder="Enter amount (e.g., 150.00)" />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Create Milestone
        </Button>
      </Form.Item>
    </Form>
  );
};

export default MilestoneForm;
