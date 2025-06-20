import React from 'react'
import { Navigate, Route, Routes } from 'react-router'
import HomePage from './pages/HomePage'
import SignUpPage from './pages/SignUpPage'
import LoginPage from './pages/LoginPage'
import OnboardingPage from './pages/onboardingPage'
import NotificationPage from './pages/NotificationPage'
import CallPage from './pages/CallPage'
import ChatPage from './pages/ChatPage'
import { useQuery } from '@tanstack/react-query'
import { Toaster } from 'react-hot-toast'
import axios from 'axios'
import { axiosInstance } from "./lib/axios.js"
import PageLoader from './components/PageLoader.jsx'
import useAuthUser from './hooks/useAuthUser.js'

const App = () => {
  
  const {isLoading , authUser} = useAuthUser()
  const isAuthenticated = Boolean(authUser)
  const isOnboarded = authUser?.isOnboarded
  if(isLoading) return <PageLoader />
  return (
    <div className='' >
      <Routes>
        <Route path='/' element={isAuthenticated && isOnboarded ? (<HomePage />) : (<Navigate to={!isAuthenticated ? '/login': 'onboarding'} />)} />
        <Route path='/signup' element={!isAuthenticated? <SignUpPage /> : <Navigate to={isOnboarded ? "/":"/onboarding"} />} />
        <Route path='/login' element={!isAuthenticated? <LoginPage /> : <Navigate to={isOnboarded ? "/":"/onboarding"} />} />
        <Route path='/onboarding' element={isAuthenticated? (!isOnboarded ? (<OnboardingPage />): (<Navigate to="/" />)) : (<Navigate to="/login" />)} />
        <Route path='/notifications' element={isAuthenticated? <NotificationPage /> : <Navigate to="/login" />} />
        <Route path='/call' element={isAuthenticated? <CallPage /> : <Navigate to="/login" />} />
        <Route path='/chat' element={isAuthenticated? <ChatPage /> : <Navigate to="/login" />} />

      </Routes>
      <Toaster />
    </div>
  )
}

export default App