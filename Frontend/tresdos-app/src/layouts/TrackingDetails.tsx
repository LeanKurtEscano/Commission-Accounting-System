import React from 'react'
import { useEffect, useState } from 'react';
import { getReportDetails } from '../services/report';
import { useParams } from 'react-router-dom';
import { sortAgentsByIncome } from '../utils/sortAgents';
import ReportTable from './ReportTable';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

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
  const navigate = useNavigate()

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
    <section className='w-full sm:overflow-y-auto flex flex-col min-h-screen pb-20 pt-20 md:pl-36 pl-20 bg-darkbg relative'>
      <div className="w-full sm:w-[800px]  md:pl-11 flex flex-wrap sm:flex-row flex-col justify-start md:justify-start md:items-center mb-4 space-x-0 sm:space-x-4 sm:space-y-0 space-y-4">
        {/* Go Back Button with Left Arrow */}
        <button
          className="flex items-center space-x-2 bg-textHeading text-white px-4 py-2 rounded-md shadow-md hover:bg-textHeading hover:scale-105 transition-transform duration-300 w-fit"
          onClick={() => navigate('/dashboard/tracking')}
        >
          <FontAwesomeIcon icon={faArrowLeft} />
          <span>Go Back</span>
        </button>
      </div>


      <div className="flex overflow-x-auto items-center flex-col">
        <ReportTable data={reportDetails} />
      </div>
    </section>
  )
};


export default TrackingDetails