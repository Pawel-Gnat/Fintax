'use client';

import { useState } from 'react';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import LoginForm from './components/login-form';
import RegisterForm from './components/register-form';

const AuthPage = () => {
  const [login, setIsLogin] = useState(true);

  const toggleAuthStatus = () => {
    setIsLogin((prev) => !prev);
  };

  return (
    <div className="container grid min-h-screen items-center px-4 sm:px-8">
      <Card className="mx-auto">
        <CardHeader>
          <CardTitle>
            {login ? 'Log in to your account.' : 'Create your account.'}
          </CardTitle>
          <CardDescription>
            {login
              ? 'Enter your email address and password to log in.'
              : 'Enter your personal and company info, email address and password to create an account.'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {login ? <LoginForm /> : <RegisterForm toggleAuthStatus={toggleAuthStatus} />}
        </CardContent>
        <CardFooter>
          <p>{login ? `Don't have an account?` : 'Already have an account?'}</p>
          <button onClick={toggleAuthStatus} className="ml-1 underline">
            {login ? 'Create new' : 'Login'}
          </button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default AuthPage;
