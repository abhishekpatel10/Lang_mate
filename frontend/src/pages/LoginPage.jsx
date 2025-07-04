import React, { useState } from 'react'
import { useQueryClient, useMutation } from '@tanstack/react-query'
import { login } from '../lib/api'
import { Link } from 'react-router'
import { ShipWheelIcon } from 'lucide-react'
import useLogin from '../hooks/useLogin'
const LoginPage = () => {
  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  })
  const queryClient = useQueryClient()
  // const { mutate: loginMutation, isPending, error } = useMutation({
  //   mutationFn: login,
  //   onSuccess: () =>
  //     queryClient.invalidateQueries({ queryKey: ['authUser'] })
  // })
  const {isPending,error,loginMutation} = useLogin()

  const handleLogin = (e) => {
    e.preventDefault()
    loginMutation(loginData)
  }
  return (
    <div className='h-screen flex items-center justify-center p-4 sm:p-6 md:p-8' data-theme="forest">
      <div className='border border-primary/25 flex flex-col lg:flex-row w-full max-w-5xl mx-auto bg-base-100 rounded-xl shadow-lg overflow-hidden'>
        {/* Login form side */}
        <div className="w-full lg:w-1/2 p-4 sm:p-8 flex flex-col">
          {/* Logo */}
          <div className='mb-4 flex items-center justify-start gap-2'>
            <ShipWheelIcon className='text-primary size-9' />
            <span className='text-3xl font-bold font-mono bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary tracking-wider'>
              Lang Mate
            </span>

          </div>
          {/* Error message if any */}
          {error && (
            <div className='alert alert-error mb-4'>
              <span>{error.response.data.message}</span>
            </div>
          )}
          <div className='w-full'>
            <form onSubmit={handleLogin} className="">
              <div className="space-y-4">
                <div>
                  <h2 className='text-xl font-semibold'>Welcome Back</h2>
                  <p className='text-sm opacity-70'>Log in to continue your language learning journey</p>
                </div>
                <div className='space-y-3'>
                  <div className='form-control w-full'>
                    <label className='label'>
                      <span className='label-text'>Email</span>
                    </label>
                    <input type='email' placeholder='Your Email' className='input input-bordered w-full'
                      value={loginData.email}
                      onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                      required
                    />
                  </div>
                  <div className='form-control w-full'>
                    <label className='label'>
                      <span className='label-text'>Password</span>
                    </label>
                    <input type='password' placeholder='********' className='input input-bordered w-full'
                      value={loginData.password}
                      onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                      required
                    />
                  </div>
                </div>
                {/* Submit button */}
                <button type="submit" disabled={isPending} className={`btn btn-primary w-full ng`}>

                  {isPending ? (
                    <>
                      <span className='loading loading-spinner loading-xs'></span>
                      Signing in...</>
                  ) : ('Log In')}
                </button>
                <div className='text-center text-sm mt-4'>
                  <p className='text-sm'>
                    Don't have an account?{" "}
                    <Link to="/signup" className='text-primary font-semibold hover:underline'>
                    Create One
                    </Link>
                  </p>
                </div>
              </div>
            </form>
          </div>
        </div>
        {/* Image side */}
        <div className="hidden lg:flex w-full lg:w-1/2 bg-primary/10 items-center justify-center">
          <div className="max-w-md p-8">
            {/* Illustration */}
            <div className="relative aspect-square max-w-sm mx-auto">
              <img src="/i.png" alt="Language connection illustration" className="w-full h-full" />
            </div>

            <div className="text-center space-y-3 mt-6">
              <h2 className="text-xl font-semibold">Connect with language partners worldwide</h2>
              <p className="opacity-70">
                Practice conversations, make friends, and improve your language skills together
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

export default LoginPage