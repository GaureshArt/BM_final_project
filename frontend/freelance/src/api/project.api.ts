
import { IProjectFormValues } from "../pages/project/components/ProjectForm"
import { IProject } from "../pages/project/MyProjects";
import { freelance } from "./skills.api"

export const createProject = async(data:IProjectFormValues)=>{
    const res = await freelance.post('/projects',data)
    console.log(res);
    return res;
}

export const getAllProjects = async ()=>{
    const res = await freelance.get('/projects');
    console.log("project all",res.data)
    return res.data;
}

export const getProjectById = async(id:number):Promise<IProject>=>{
    const res = await freelance.get<IProject>(`/projects/${id}`);
    console.log("project",res)
    return res.data;
}

export const getProjectByClientId = async(id:number)=>{
    const res = await freelance.get(`/projects/userId/${id}`)
    console.log("client",res);
    return res.data;
}
export const getProjectByFreelanceId = async(id:number)=>{
    const res = await freelance.get(`/projects/freelance/${id}`)
    console.log("freelance",res);
    return res.data;
}

export interface IAssignFreelancer{
    projectId:number;
    assignedFreelancerId:number;
}
export const assignFreelancer = async (data:IAssignFreelancer)=>{
    const res = await freelance.patch(`/projects/${data.projectId}`,data)
    return res.data;
}