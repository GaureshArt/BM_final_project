
import axios from "axios";
import { ISkillData } from "../pages/register/types/register.type";
export const freelance = axios.create({
    baseURL:'http://localhost:3000',
    withCredentials:true
});
export const getSkills = async()=>{
    const res = await freelance.get<ISkillData[]>('/skill');
    return res.data;
}