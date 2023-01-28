import { type NextPage } from 'next';
import { SignIn, SignUp } from '../../features';
import { useState } from 'react';

const AuthPage: NextPage = () => {
  const [isSignedIn, setIsSignedIn] = useState(false);

  return (
    <>
      <main className='flex justify-center items-center min-h-screen bg-slate-900'>
        {isSignedIn ? <SignIn isSignIn={isSignedIn} setIsSignIn={setIsSignedIn} />
          :
          <SignUp isSignIn={isSignedIn} setIsSignIn={setIsSignedIn} />
        }
      </main>
    </>
  );
}

export default AuthPage;