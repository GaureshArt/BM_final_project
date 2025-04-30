import { ICreateBidFormValues } from "../pages/project/components/BidForm"
import { IBid } from "../pages/project/MyProjects";
import { freelance } from "./skills.api"

export const createBid = async (data:ICreateBidFormValues)=>{
    const res = await freelance.post('/bids',data);
    return res.data;
}
export const getProjectsBidById = async(id:number)=>{
    const res = await freelance.get(`/bids/userId/${id}`);
    return res.data;
}

export const updateBid = async (data:Partial<IBid>)=>{
    const res  = await freelance.patch(`/bids/${data.id}`,data)
    console.log(res);
    return res.data;
}