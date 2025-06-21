import React from 'react'
import { Navigate, Route, Routes } from 'react-router'
import HomePage from './pages/HomePage'
import SignUpPage from './pages/SignUpPage'
import LoginPage from './pages/LoginPage'
import OnboardingPage from './pages/onboardingPage'
import NotificationPage from './pages/NotificationPage'
import CallPage from './pages/CallPage'
import ChatPage from './pages/ChatPage'
import { Toaster } from 'react-hot-toast'
import Layout from './components/Layout.jsx'
import PageLoader from './components/PageLoader.jsx'
import useAuthUser from './hooks/useAuthUser.js'
import { useThemeStore } from './store/useThemeStore.jsx'
const App = () => {
  const { theme, setTheme } = useThemeStore()
  const { isLoading, authUser } = useAuthUser()
  const isAuthenticated = Boolean(authUser)
  const isOnBoarded = authUser?.isOnBoarded
  if (isLoading) return <PageLoader />
  return (
    <div className='h-screen' data-theme={theme}>
      <Routes>
        <Route path='/' element={isAuthenticated && isOnBoarded ? (<Layout showSideBar={true}><HomePage /></Layout>) : (<Navigate to={!isAuthenticated ? '/login' : 'onboarding'} />)} />
        <Route path='/signup' element={!isAuthenticated ? <SignUpPage /> : <Navigate to={isOnBoarded ? "/" : "/onboarding"} />} />
        <Route path='/login' element={!isAuthenticated ? <LoginPage /> : <Navigate to={isOnBoarded ? "/" : "/onboarding"} />} />
        <Route
          path="/onboarding"
          element={
            isAuthenticated ? (
              !isOnBoarded ? (
                <OnboardingPage />
              ) : (
                <Navigate to="/" />
              )
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        <Route path='/notifications' element={isAuthenticated && isOnBoarded ? (<Layout showSideBar={true}><NotificationPage /></Layout>) : (<Navigate to={!isAuthenticated ? "/login" : "onboarding"} />)} />
        <Route path='/call/:id' element={isAuthenticated && isOnBoarded ? (<CallPage />):(<Navigate to={!isAuthenticated ? "/login":"/onboarding"} />)} />
        <Route path='/chat/:id' element={isAuthenticated && isOnBoarded ? (
          <Layout showSideBar={false}><ChatPage /></Layout>
        ) : (<Navigate to={!isAuthenticated ? "/login" : '/onboarding'} />)} />

      </Routes>
      <Toaster />
    </div>
  )
}

export default App