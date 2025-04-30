import { freelance } from "./skills.api"

export const getAllCategories = async()=>{
    const res = await freelance.get('/category');
    return res.data;
}