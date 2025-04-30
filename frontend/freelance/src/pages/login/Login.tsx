
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button, message } from 'antd';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { loginUser } from '../../api/auth.api';

import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/AuthStore.store';
import { AxiosError } from 'axios';


const loginSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters' }),
});

export type LoginFormInputs = z.infer<typeof loginSchema>;

export const  Login = ()=> {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>({
    resolver: zodResolver(loginSchema),
  });
  const [messageApi, contextHolder] = message.useMessage();
  const key = 'updatable';
  const setRole = useAuthStore((state) => state.setRole);
  const setUserId = useAuthStore((state) => state.setUserId);
  const navigate = useNavigate();
  const mutation = useMutation({
    mutationKey:['login'],
    mutationFn:loginUser,
    onSuccess:(data)=>{
        console.log("role",data.data)
        setRole(data.data.role);
        setUserId(+data.data.id)
        sessionStorage.setItem('userRole',data.data.role);
        sessionStorage.setItem('userId',data.data.id);
        navigate(`/dashboard/id/${data.data.id}`)
    },
    onError:(err:AxiosError)=>{
      console.log(err.response!.statusText)
      messageApi.open({
        key,
        type:"error",
        content:`${err.response!.statusText}  SignUp`
      })
    }
  })
  const onSubmit = (data: LoginFormInputs) => {
    console.log('Login Data:', data);
    mutation.mutate(data);
  };
const  handleRegisterRoute = ()=>{
    navigate('/register')
}
  return (
    <div className="min-h-screen flex items-center justify-center font-serif tracking-wider">
      {contextHolder}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-8 rounded  border shadow-2xs w-full max-w-sm"
      >
        <h2 className="text-2xl font-semibold mb-6 text-center">Login</h2>

        <div className="mb-4">
          <label className="block text-gray-700 mb-1">Email</label>
          <input
            {...register('email')}
            className="w-full h-8 border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            type="email"
            placeholder="Enter your email"
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 mb-1">Password</label>
          <input
            {...register('password')}
            className="w-full h-8 border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            type="password"
            placeholder="Enter your password"
          />
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
          )}
        <div><span className='text-[.8rem] text-blue-500 cursor-pointer' onClick={handleRegisterRoute}>new? Register</span></div>
        </div>

        <div className='flex justify-center'>
            <Button htmlType='submit' variant="solid" color="default"><span className='font-serif tracking-wider'>Login</span></Button>
        </div>
      </form>
    </div>
  );
}
