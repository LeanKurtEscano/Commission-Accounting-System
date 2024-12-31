import React, { useState,useEffect } from 'react';
import { getTotalSum } from '../services/dashboard';
import { Interaction } from 'chart.js';

interface TrackingData {
  report_date__start_date : string;
  report_date__end_date: string;
  revenue:number;
  total_sum:number;
 
}
const LatestReports:React.FC = () => {
  // Mock data (to be replaced with server data in the future)
  const [reportsData, setReportsData] = useState<TrackingData[]>([]);
  const apiUrl = "latest"
   const handleSummary = async (
      endPoint: string,
     
    ) => {
      try {
        const response = await getTotalSum(endPoint); 
        if (response.status === 200) {
          console.log(response.data);
          setReportsData(response.data); // Update state with the API response data
        }
      } catch (error) {
        console.error("Error fetching summary:", error);
      }
    };

  useEffect(() => {
     handleSummary(apiUrl);
  },[])
 
  return (
    <div className='w-full max-w-[950px] mx-auto h-auto bg-cardbg rounded-md flex flex-col p-4'>
      <h1 className='text-white mb-4 text-xl font-bold'>Latest Reports</h1>
      
      {/* Conditional rendering for no data */}
      {reportsData?.length === 0 ? (
        <p className="text-gray-500 text-center">No data available</p>
      ) : (
        <div className="overflow-x-auto"> {/* Makes the table scrollable on small screens */}
          <table className="w-full table-auto">
            <thead>
              <tr>
                <th className="text-gray-200 px-4 py-2 text-center border-b-2" style={{ borderColor: 'rgba(169, 169, 169, 0.2)' }}>Start Date</th>
                <th className="text-gray-200 px-4 py-2 text-center border-b-2" style={{ borderColor: 'rgba(169, 169, 169, 0.2)' }}>End Date</th>
                <th className="text-gray-200 px-4 py-2 text-center border-b-2" style={{ borderColor: 'rgba(169, 169, 169, 0.2)' }}>Total Sales</th>
                <th className="text-gray-200 px-4 py-2 text-center border-b-2" style={{ borderColor: 'rgba(169, 169, 169, 0.2)' }}>Revenue (Agents)</th>
              </tr>
            </thead>
            <tbody>
              {reportsData.map((report, index) => (
                <tr key={index} className="hover:bg-gray-700">
                  <td className="text-white px-4 py-2 text-center border-b-2" style={{ borderColor: 'rgba(169, 169, 169, 0.2)' }}>{report.report_date__start_date}</td>
                  <td className="text-white px-4 py-2 text-center border-b-2" style={{ borderColor: 'rgba(169, 169, 169, 0.2)' }}>{report.report_date__end_date}</td>
                  <td className="text-green-400 px-4 py-2 text-center border-b-2" style={{ borderColor: 'rgba(169, 169, 169, 0.2)' }}>₱{report.total_sum}</td>
                  <td className="text-white px-4 py-2 text-center border-b-2" style={{ borderColor: 'rgba(169, 169, 169, 0.2)' }}>₱{report.revenue}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default LatestReports;
