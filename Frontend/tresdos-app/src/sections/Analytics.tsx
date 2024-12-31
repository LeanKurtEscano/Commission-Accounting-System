import React from 'react'
import SummaryCards from '../layouts/SummaryCards'
import LineChart from '../layouts/LineChart'
import BarChart from '../layouts/BarChart'
import LatestReports from '../layouts/LatestReports'
import { formatDates } from '../utils/formatDate'
const Analytics: React.FC = () => {
  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'long', 
    year: 'numeric', 
    month: 'long',
    day: 'numeric',
  });
 
  return (
    <section className='bg-gradient-to-br bg-darkbg flex flex-col pb-4  w-full min-h-screen'>
      <div className='w-full pt-4 pl-5'>
      <div className='text-slate-200  w-[400px] flex flex-col items-center justify-center'>
        <h1 className='text-4xl font-bold'>Overview</h1>
        <p className='text-lg pl-16 text-gray-400 mt-2'>{today}</p> 
      </div>
      </div>
      
      <SummaryCards />
      <div className='w-full mb-3  flex flex-row items-center justify-center'>
      <LineChart/>
      <BarChart />
      </div>
      <div className='w-full flex items-center justify-center'>
      <LatestReports/>

      </div>
      
      

    </section>
  )
}

export default Analytics