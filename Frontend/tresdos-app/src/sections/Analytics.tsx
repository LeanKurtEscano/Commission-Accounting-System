import React from 'react'
import SummaryCards from '../layouts/SummaryCards'
import LineChart from '../layouts/LineChart'
import BarChart from '../layouts/BarChart'
import LatestReports from '../layouts/LatestReports'

const Analytics: React.FC = () => {
  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'long', 
    year: 'numeric', 
    month: 'long',
    day: 'numeric',
  });
 
  return (
    <section className='bg-gradient-to-br bg-darkbg flex flex-col pb-4 h-auto w-full min-h-screen'>
      <div className="w-full md:pt-4 md:pl-5 pt-4">
    <div className="text-slate-200 w-[400px] md:pl-32 flex flex-col items-center md:items-start md:justify-center">
      <h1 className="text-center md:text-left md:text-4xl text-2xl font-bold">Overview</h1>
      <p className="text-center md:text-left text-[10px] md:text-lg text-gray-400 mt-2">{today}</p>
    </div>
  </div>
      
      <SummaryCards />
      <div className='w-full mb-3  flex md:flex-row flex-col items-center justify-center'>
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