import { useState } from 'react';
import { Input } from '../components';
import { request, isBlank } from '../functions';
import { LoginCredentials } from '../types';
import { useRouter } from 'next/router';

type Props = {
  isSignIn: boolean;
  setIsSignIn: CallableFunction;
}


export const SignIn = ({ isSignIn, setIsSignIn }: Props) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const router = useRouter();

  const test = async () => {
    const data = await request(`${process.env.host}/auth/test`, {
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
        'credentials': 'include',
        'Access-Control-Allow-Credentials': true
      },
    });

    console.log(data);
  }

  const handleLogin = async () => {
    if(!isBlank(username, password)) {
      setError('Please fill out all fields');
      return;
    }

    const data = await request<LoginCredentials>(`${process.env.host}/auth/login`, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: username.toLowerCase(),
        password: password,
      }),
    });

    console.log(data);

    if((!data.success) && (data.error && data.status)) {
      setError(data.error);
      console.error(data);
    }

    if((data.success) && (data.accessToken)) {
      localStorage.setItem('accessToken', data.accessToken);
      return router.push('/');
    }
  }

  return (
    <div className='flex flex-col relative items-center justify-center 
      space-y-4 rounded mx-8 sm:mx-24 px-8 py-4 w-full bg-slate-200/80 
      shadow-slate-500 shadow-xl'>
      <h1 className='text-4xl py-2'>Pipeline</h1 >
      <Input type='text'
        onChange={setUsername} value={username}
        label='Username'
        className='outline-none bg-transparent
          px-1 border-b-2 border-slate-900'
      />
      <Input type='password'
        onChange={setPassword} value={password}
        label='Password'
        className='outline-none bg-transparent
          px-1 border-b-2 border-slate-900'
      />
      <button onClick={handleLogin}
        className='w-full py-2 bg-slate-900 font-medium 
        tracking-wide text-white/90 rounded'>
        Sign In
      </button>

      <div className='flex flex-col space-y-2 justify-center items-center'>
        <p onClick={() => setIsSignIn((prev: boolean) => !prev)}
          className='flex items-center gap-2 cursor-pointer'>
          Don't have an account?
          <span className='text-blue-700/90 font-medium py-0.5'>
            Sign Up!
          </span>
        </p>
        <p className='relative text-sm text-gray-600 cursor-pointer'>Forgot Password?</p>
      </div>
    </div>
  );
}