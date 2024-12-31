import React from 'react';

const LatestReports = () => {
  // Mock data (to be replaced with server data in the future)
  const reportsData = [
    {
      startDate: '2024-01-01',
      endDate: '2024-01-15',
      totalSales: 120,
      revenueAgents: 5000,
    },
    {
      startDate: '2024-01-16',
      endDate: '2024-01-31',
      totalSales: 150,
      revenueAgents: 7000,
    },
    {
      startDate: '2024-02-01',
      endDate: '2024-02-15',
      totalSales: 100,
      revenueAgents: 4000,
    },
    {
      startDate: '2024-02-16',
      endDate: '2024-02-28',
      totalSales: 130,
      revenueAgents: 6500,
    },
  ];

  return (
    <div className='w-full max-w-[950px] mx-auto h-auto bg-cardbg rounded-md flex flex-col p-4'>
      <h1 className='text-white mb-4 text-xl font-bold'>Latest Reports</h1>
      
      {/* Conditional rendering for no data */}
      {reportsData.length === 0 ? (
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
                  <td className="text-white px-4 py-2 text-center border-b-2" style={{ borderColor: 'rgba(169, 169, 169, 0.2)' }}>{report.startDate}</td>
                  <td className="text-white px-4 py-2 text-center border-b-2" style={{ borderColor: 'rgba(169, 169, 169, 0.2)' }}>{report.endDate}</td>
                  <td className="text-green-400 px-4 py-2 text-center border-b-2" style={{ borderColor: 'rgba(169, 169, 169, 0.2)' }}>₱{report.totalSales}</td>
                  <td className="text-white px-4 py-2 text-center border-b-2" style={{ borderColor: 'rgba(169, 169, 169, 0.2)' }}>₱{report.revenueAgents}</td>
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
