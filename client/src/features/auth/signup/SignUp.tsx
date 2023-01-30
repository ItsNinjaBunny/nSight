import { useState } from 'react';
import { Input } from '../components';
import { request } from '../functions';

type Props = {
  isSignIn: boolean;
  setIsSignIn: CallableFunction;
}

export const SignUp = ({ isSignIn, setIsSignIn }: Props) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async () => {
    const data = await request<unknown>(`${process.env.host}/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user: {
          firstName: firstName,
          lastName: lastName,
          email: email.toLowerCase(),
          phoneNumber: phoneNumber,
          password: password
        }
      }),
    });

    console.log(data);

  }


  return (
    <div className='flex flex-col relative items-center justify-center 
    space-y-4 rounded mx-8 sm:mx-16 px-8 py-4 w-full bg-slate-200/80 
    shadow-slate-500 shadow-xl'>
      <h1 className='text-5xl py-2 relative'>Pipeline</h1 >
      <div className='w-full flex flex-col space-y-2'>
        <div className='flex-col space-y-2 sm:flex sm:flex-row sm:w-full sm:gap-4
          sm:space-y-0'>
          <Input type='text'
            onChange={setFirstName} value={firstName}
            label='First Name'
            className='outline-none bg-transparent text-gray-700 font-medium
              px-1 border-b-2 pb-0.5 border-slate-900'
          />
          <Input type='text'
            onChange={setLastName} value={lastName}
            label='Last Name'
            className='outline-none bg-transparent text-gray-700 font-medium
              px-1 border-b-2 pb-0.5 border-slate-900'
          />
        </div>
        <div className='flex-col space-y-2 sm:flex sm:flex-row sm:w-full sm:gap-4
          sm:space-y-0'>
          <Input type='email'
            onChange={setEmail} value={email}
            label='Email'
            className='outline-none bg-transparent text-gray-700 font-medium
              px-1 border-b-2 pb-0.5 border-slate-900 sm:flex-1'
          />
          <Input type='tel'
            onChange={setPhoneNumber} value={phoneNumber}
            label='Phone Number'
            className='outline-none bg-transparent text-gray-700 font-medium
              px-1 border-b-2 pb-0.5 border-slate-900'
          />
        </div>
        <Input type='password'
          onChange={setPassword} value={password}
          label='Password'
          className='outline-none bg-transparent text-gray-700 font-medium
          px-1 border-b-2 pb-0.5 border-slate-900'
        />
      </div>
      <button onClick={handleRegister}
        className='w-full py-2 bg-slate-900 font-medium 
          tracking-wide text-white/90 rounded'>
        Sign Up
      </button>
      <div className='flex flex-col space-y-2 justify-center items-center'>
        <p onClick={() => setIsSignIn((prev: boolean) => !prev)}
          className='flex items-center gap-2 text-sm cursor-pointer'>
          Already have an account?
          <span className='text-blue-700/90 font-medium py-0.5'>
            Sign In!
          </span>
        </p>
        {/* <p className='relative text-sm text-gray-600 cursor-pointer'>Forgot Password?</p> */}
      </div>
    </div>
  );
}