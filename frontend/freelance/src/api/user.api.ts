import { IProfileProps } from "../pages/dashboard/type/Profile.type";
import { freelance } from "./skills.api"

export const getuserById = async(id:number):Promise<IProfileProps>=>{
    const res = await freelance.get<IProfileProps>(`/user/${id}`);
    console.log(res.data);
    return res.data;
}