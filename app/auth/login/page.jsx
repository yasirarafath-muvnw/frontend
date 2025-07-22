'use client';

import { endpoints } from '@/api/endpoints';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import axios from 'axios';

const schema = z.object({
  email: z.string().email('Invalid email'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
});

export default function Page() {
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data) => {

    const loginPayload = {
      email: data.email,
      password: data.password
    }

    try {
      setLoading(true);
      setError('');
      const response = await axios.post(endpoints.login, loginPayload);

      if (response.status === 200) {
        console.log('Full response:', response);
        console.log('Response data:', response.data);


        setTimeout(() => {
          router.replace('/dashboard');
        }, 1000);
      } else {
        console.log('sdfghjkl;')
      }
    } catch (err) {
      console.error('Signup error:', err);
      setError(err.response?.data?.message || 'Signup failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handle = () => {

    console.log('navigation login ')

    router.push('/login')

  }
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="flex w-full max-w-5xl bg-white rounded-xl shadow-md overflow-hidden">
        <div className="hidden md:block md:w-1/2">
          <img
            src="https://picsum.photos/200/200"
            alt="Signup Visual"
            className="h-full w-full object-cover"
          />
        </div>

        <div className="w-full md:w-1/2 p-8">
          <h1 className="text-3xl font-semibold mb-6 text-center text-gray-800">
            Login
          </h1>

          <button
            onClick={() => router.push('/')}
            className="mt-4 w-full bg-green-600 text-white rounded-md py-2 font-medium hover:bg-green-700 transition-colors"
          >
            Test Navigation to Dashboard
          </button>

          <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                {...register('email')}
                className="w-full border text-gray-800 border-gray-300 focus:border-blue-500 focus:ring-blue-500 rounded-md px-3 py-2 mt-1"
                placeholder="you@example.com"
              />
              {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Password</label>
              <input
                type="password"
                {...register('password')}
                className="w-full border text-gray-800 border-gray-300 focus:border-blue-500 focus:ring-blue-500 rounded-md px-3 py-2 mt-1"
                placeholder="••••••••"
              />
              {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white rounded-md py-2 font-medium hover:bg-blue-700 transition-colors"
            >
              {loading ? 'Logging In...' : 'Login'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}