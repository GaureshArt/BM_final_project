import { LoginFormInputs } from "../pages/login/Login";
import { RegistrationFormValues } from "../pages/register/types/register.type";
import { freelance } from "./skills.api"
import { objectToFormData } from "./util";

export const registerUser = async(userData:RegistrationFormValues)=>{
    const data = objectToFormData(userData);
    const res = await freelance.post('/auth/register',data)
    console.log(res);
    return res;
}

export const loginUser = async(userData:LoginFormInputs)=>{
    const res = await freelance.post('/auth/login',userData);
    console.log(res);
    return res;
}

