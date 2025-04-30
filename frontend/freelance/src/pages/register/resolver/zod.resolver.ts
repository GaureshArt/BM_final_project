import { z } from 'zod';

export const registrationSchema = z.object({
  name: z.string().min(1, { message: "Name issdgsg required" }),
  email: z
    .string()
    .email({ message: "Please enter a valid email" })
    .min(1, { message: "Email is required" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" })
    .min(1, { message: "Password is required" }),
  confirmPassword: z
    .string()
    .min(1, { message: "Please confirm your password" }),
    
  role: z.enum(["client", "freelancer"], { message: "Role is required" }),
  skills: z
    .array(z.string())
    .min(1, { message: "Please select at least one skill" })
    .optional(),
  bio: z.string().optional(),
  profileImage: z.instanceof(File).optional(),
}).superRefine(({ confirmPassword, password,role ,skills}, ctx) => {
    if (confirmPassword !== password) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "The passwords did not match",
        path: ['confirmPassword']
      });
    }
    if(role === 'freelancer' && skills?.length===0){
      ctx.addIssue({
        code:z.ZodIssueCode.custom,
        message:"Please select at least one skill",
        path: ['skills']
      })
    }
  });

export type RegistrationFormValues = z.infer<typeof registrationSchema>;
