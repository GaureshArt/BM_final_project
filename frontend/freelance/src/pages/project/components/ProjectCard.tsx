import React from 'react';
import { Card, Tag, Button, Typography } from 'antd';
import { useNavigate } from 'react-router-dom';
import { IProject } from '../MyProjects';

const { Title, Text, Paragraph } = Typography;

export interface ICategory {
  id: number;
  name: string;
}

export interface IClient {
  id: number;
  name: string;
  email: string;
  role: string;
}



interface Props {
  project: IProject;
  userRole: 'client' | 'freelancer' |null;
  onBid?: (projectId:number) => void;
  bidProj:IProject[]
}

const ProjectCard: React.FC<Props> = ({ project, userRole, onBid ,bidProj}) => {

  const nav = useNavigate();
  const handleProjectDetailRoute = ()=>{
    nav(`/project/details/${project.id}`)
  }
  return (
    <Card
      title={<Title level={4}>{project.title} - @{project.client.name}</Title>}
      extra={<Text type="secondary">Deadline: {project.deadline}</Text>}
      style={{ marginBottom: 24 }}
    >
      <Paragraph>{project.description}</Paragraph>

      <Text strong>Budget:</Text> ${project.budget} <br />

      <Text strong>Categories:</Text>
      <div style={{ margin: '8px 0' }}>
        {project.category.map((cat) => (
          <Tag key={cat.id} color="blue">{cat.name}</Tag>
        ))}
      </div>

      {userRole === 'freelancer' && (
        bidProj.find((pro)=>pro.id === project.id) ? <Button variant='text' color='volcano'>
            Already Bid
        </Button>:
        project.assignedFreelancer ?<Button variant='solid' color='purple'>Closed Assigned</Button>:
        <Button variant='solid' color='default' onClick={()=>onBid?.(project.id)}>
          Bid on Project
        </Button>
      )}
      <div className='inline-flex pl-10'>

      <Button variant='filled' color='green'  onClick={handleProjectDetailRoute}>
          View 
        </Button>
      </div>
    </Card>
  );
};

export default ProjectCard;
