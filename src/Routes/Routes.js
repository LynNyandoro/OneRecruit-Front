import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
//import Login from '../Recruiter/Auth/Login';
import Dashboard from '../Recruiter/Dashboard/Dashboard';
import Interviews from '../Recruiter/Interviews/Interviews';
import Applications from '../Recruiter/Applications/Applications';
import Schedule from '../Recruiter/Applications/Schedule';
import Post from '../Recruiter/Jobs/Post';
import Jobs from '../Recruiter/Jobs/Manage';
import Signin from '../Candidate/Auth/SignIn';
import Signup from '../Candidate/Auth/SignUp'
import AvailableJobs from '../Candidate/Dashboard/Main';
import DashboardCandidate from '../Candidate/Dashboard/Dashboard';
import Status from '../Candidate/Jobs/ApplicationStatus';
import Login from '../Auth/Login';
import MainScreen from './Home';


const router = createBrowserRouter([
  {
    path: '/',
    element: <MainScreen />,
  },
  {
    path: '/recruitlogin',
    element: <Login />,
  },
  {
    path: '/signin',
    element: <Signin/>,
  },
  {
    path: '/signup',
    element: <Signup/>,
  },

   {
    path: '/recruiter',
    element: <Dashboard />,
    children: [
      {
        path: 'home', 
        element: <Post />,
      },

      {
        path: 'applications', 
        element: <Applications/>,
      },

      {
        path: 'interviews', 
        element: <Interviews/>,
      },

      {
        path: 'jobs', 
        element: <Jobs />,
      },

      {
        path: 'schedule', 
        element: <Schedule />,
      },
    ],
  },

  {
    path: '/candidate',
    element: <DashboardCandidate/>,
    children: [
      {
        path: 'home',
        element: <AvailableJobs/>
      },
      {
        path: 'status',
        element: <Status/>
      },
    ]
  },
 ]);



function Router() {
  return <RouterProvider router={router} />;
}

export default Router;
