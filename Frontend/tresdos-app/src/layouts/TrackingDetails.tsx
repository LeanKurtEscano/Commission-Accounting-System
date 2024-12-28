import React from 'react'
import { useEffect, useState } from 'react';
import { getReportDetails } from '../services/report';
import { useParams } from 'react-router-dom';
import { sortAgentsByIncome } from '../utils/sortAgents';
export interface ReportDetails {
  id: number;
  agent_name: string;
  agent_role: string;
  total_amount: number;
  percentage: number;
  parent_percentage: number;
  income: number;
  report_date_id: number;
}

interface ReportId {
  reportId: string;
}



const TrackingDetails: React.FC = () => {
  const { reportId } = useParams();
  const [reportDetails, setReportDetails] = useState<ReportDetails[]>([]);

  const handleReportDetails = async () => {

    try {
      const response = await getReportDetails(reportId);

      if (response.status === 200) {
        const sortedData = sortAgentsByIncome(response.data);
        setReportDetails(sortedData);
      }

    } catch (error) {
      alert("something went wrong");

    }
  }

  console.log(reportDetails);

  useEffect(() => {
    handleReportDetails();

  }, [])

  return (
    <section className='w-full min-h-screen bg-darkbg'>
      <div className='flex items-center justify-center text-slate-200'>
        {reportDetails.map((item, index) => (
          <p key={index}>Income: {item.income}</p>
        ))}
      </div>

    </section>


  )
};


export default TrackingDetails