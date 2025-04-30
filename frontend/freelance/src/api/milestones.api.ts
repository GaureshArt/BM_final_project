import { freelance } from "./skills.api"

export const getMilestonesByProjId = async(id:number)=>{
    const res = await freelance.get(`/milestones/project/${id}`);
    console.log("milestone",res)
    return res.data;
}
export interface ICreateMilestone {
    projectId: number;
    title: string;
    dueDate: string; 
    amount: number;
  }
export const createMilestone = async(data:ICreateMilestone)=>{
    const res = await freelance.post('milestones',data)
    return res.data;
}
export interface ICompleteMilestone{
    id:number;
    isCompleted:boolean;
}
export const completeMilestone = async(data:ICompleteMilestone)=>{
    const res = await freelance.patch(`/milestones/${data.id}`,data)
    return res.data;
}