import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';


ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);
import { months } from '../constants';
import { getWeekly } from '../services/dashboard';
interface ChartData {
  week1?: number;
  week2?: number;
  week3?: number;
  week4?: number;
}

const LineChart: React.FC = () => {
  // State to hold the data from the server
  const [data, setData] = useState<ChartData>({
    week1: 0,
    week2: 0,
    week3: 0,
    week4: 0,
  });

  // State for the selected month
  const currentMonth = new Date().toLocaleString('default', { month: 'long' });

  // Set the default value of selectedMonth to the current month
  const [selectedMonth, setSelectedMonth] = useState<string>(currentMonth);

  // State for the dropdown visibility
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  

  const handleWeekly = async() => {
    const response = await getWeekly(selectedMonth);

    if(response.status === 200) {
      setData(response.data);
     
    }
  }
  useEffect(() => {
   
    handleWeekly();
  
  }, [selectedMonth]);

  
  const chartData = {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'], 
    datasets: [
      {
        label: 'Total Earnings', // Line label
        data: [
          data.week1 ?? 0,
          data.week2 ?? 0,
          data.week3 ?? 0,
          data.week4 ?? 0,
        ], 
        borderColor: 'rgba(138, 110, 214, 1)', 
        backgroundColor: 'rgba(138, 110, 214, 0.2)', 
        fill: false, 
        tension: 0.4, 
      },
    ],
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleMonthSelect = (month: string) => {
    setSelectedMonth(month);
    setIsDropdownOpen(false); 
  };

  return (
    <div className="w-[630px] mr-4 bg-cardbg p-4 shadow-lg rounded-lg">
      <div className="mb-4 flex justify-between items-center relative">
        <h2 className="text-xl text-slate-200 font-semibold">Total Earnings per Week</h2>

        {/* Custom Dropdown Button /p-2 hover:bg-gray-700 cursor-pointer */}
        <div className="relative">
          <button
            onClick={toggleDropdown}
            className="bg-layer1 text-white p-2 rounded-lg w-32 text-left flex justify-between items-center"
          >
            {selectedMonth} <span>&#9660;</span>
          </button>
          
          {/* Dropdown Menu */}
          {isDropdownOpen && (
           <div className="absolute bg-[#282828] text-white mt-2 w-[350px] rounded-lg shadow-xl 
           shadow-[#121212] inset  z-10">
              <div className="grid grid-cols-3 gap-4 p-2">
              {months.map((item, index) => (
              <div
                key={index}
                className="px-4 py-2 cursor-pointer hover:bg-gray-700"
                onClick={() => {
                  handleMonthSelect(item.month);
                  setIsDropdownOpen(false); 
                }}
              >
                {item.month}
              </div>
            ))}
              
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="relative h-64">
        <Line data={chartData} options={{ responsive: true, maintainAspectRatio: false }} />
      </div>
    </div>
  );
};

export default LineChart;
