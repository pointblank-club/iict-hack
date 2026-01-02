"use client";
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

const Login = () => {
  const [teamName, setTeamName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();


  const handleLogin = async () => {
    if (!teamName || !password) {
      setError('Please enter your team name and password.');
      setTimeout(() => setError(''), 4000);
      return;
    }

    try {
      setIsLoading(true);
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        body: JSON.stringify({ username: teamName, password: password }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();
      if (response.ok && data.status) {
        localStorage.setItem('token', data.token);
        // Persist team name for navbar account menu
        localStorage.setItem('team_name', teamName);
        window.dispatchEvent(new Event('auth-updated'));
        router.push('/dashboard');
      } else {
        setError(data.message || 'Login failed. Please try again.');
        setTimeout(() => setError(''), 5000);
      }
    } catch (error) {
      setError(`Something went wrong. Please try again: ${error}`);
      setTimeout(() => setError(''), 5000);
    } finally {
      setIsLoading(false);
    }
    }



  return (
    <div className='min-h-screen w-full bg-gradient-to-b from-[#0B0B0F] to-[#11111A] flex items-center justify-center px-4'>
      <div className='w-full max-w-md bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl p-6 md:p-8'>
        <div className='mb-6 text-center'>
          <h1 className='text-2xl font-semibold tracking-tight text-white'>Welcome</h1>
          <p className='text-sm text-gray-300 mt-1'>Sign in to continue to your dashboard</p>
        </div>

        {error && (
          <div className='mb-4 rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700 dark:border-red-900/50 dark:bg-red-950/60 dark:text-red-300'>
            {error}
          </div>
        )}

        <form
          className='grid gap-4'
          onSubmit={(e) => {
            e.preventDefault();
            if (!isLoading) handleLogin();
          }}
        >
          <div className='grid gap-2'>
            <Label htmlFor='teamName' className='text-slate-200'>Team name</Label>
            <Input
              id='teamName'
              type='text'
              placeholder='Enter your team name'
              value={teamName}
              onChange={(e) => setTeamName(e.target.value)}
              autoComplete='username'
            />
          </div>

          <div className='grid gap-2'>
            <Label htmlFor='password' className='text-slate-200'>Password</Label>
            <div className='relative'>
              <Input
                id='password'
                type={showPassword ? 'text' : 'password'}
                placeholder='Enter your password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete='current-password'
                className='pr-12'
              />
              <button
                type='button'
                aria-label={showPassword ? 'Hide password' : 'Show password'}
                className='absolute inset-y-0 right-2 my-auto h-8 rounded px-2 text-xs text-slate-200 hover:bg-white/10 active:bg-white/15'
                onClick={() => setShowPassword((s) => !s)}
              >
                {showPassword ? 'Hide' : 'Show'}
              </button>
            </div>
          </div>

          <Button type='submit' className='w-full mt-2' disabled={isLoading}>
            {isLoading ? 'Signing in...' : 'Sign in'}
          </Button>
        </form>

        <p className='mt-6 text-center text-xs text-gray-400'>
          Please check your email inbox for the password.
        </p>
      </div>
    </div>
  )
}

export default Login