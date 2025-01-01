import React from 'react'
import { useEffect, useState } from 'react';
import SummaryTable from '../layouts/SummaryTable';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { getTotalSum } from '../services/dashboard';
import { sortAgentsByIncomeSummary } from '../utils/sortAgents';

export interface AgentSummary {
  name:string;
  role:string;
  totalAmount: number;
  totalIncome:number
}




const AgentsSummary: React.FC = () => {

  const [agentSummary, setAgentSummary] = useState<AgentSummary[]>([]);
  const navigate = useNavigate()
  const apiUrl = "summary"
  const handleReportDetails = async () => {
    try{
        const response = await getTotalSum(apiUrl);
        
        if(response.status === 200) {
            const sortedData = sortAgentsByIncomeSummary(response.data);
            setAgentSummary(sortedData);

        }

    } catch (error) {
        alert("Network Error. Please try again later.")
    }
   


  }

  console.log(agentSummary);

  useEffect(() => {
    handleReportDetails();

  }, [])

  return (
    <section className='w-full sm:overflow-y-auto flex flex-col min-h-screen pb-20 pt-20 md:pl-36 pl-20 bg-darkbg relative'>
      <div className="w-full sm:w-[800px]  md:pl-11 flex flex-wrap sm:flex-row flex-col justify-start md:justify-start md:items-center mb-4 space-x-0 sm:space-x-4 sm:space-y-0 space-y-4">
        {/* Go Back Button with Left Arrow */}
        <button
          className="flex items-center space-x-2 bg-textHeading text-white px-4 py-2 rounded-md shadow-md hover:bg-textHeading hover:scale-105 transition-transform duration-300 w-fit"
          onClick={() => navigate('/dashboard/analytics')}
        >
          <FontAwesomeIcon icon={faArrowLeft} />
          <span>Go Back</span>
        </button>
      </div>


      <div className="flex overflow-x-auto items-center flex-col">
        <SummaryTable data={agentSummary} />
      </div>
    </section>
  )
};


export default AgentsSummary