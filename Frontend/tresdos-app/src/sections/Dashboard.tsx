import React from 'react'
import { Outlet } from 'react-router-dom';
import SideBar from '../layouts/SideBar';

const Dashboard: React.FC = () => {
  return (
    <div className='h-screen'>
    <div className=''>
    <SideBar />
    </div>
    <div>
      <Outlet/>
    </div>
  </div>
  )
}

export default Dashboard