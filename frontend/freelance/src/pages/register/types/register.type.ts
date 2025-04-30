export interface RegistrationFormValues {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
    role: 'client' | 'freelancer';
    skills?: string[];          
    bio?: string;               
    profileImage?: File;   
  }

  export interface ISkillData {
    id:number;
    name:string;
  }
  