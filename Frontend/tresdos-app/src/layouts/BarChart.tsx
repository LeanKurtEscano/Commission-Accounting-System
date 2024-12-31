import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

// Register the required Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface AgentCount {
  head: number;
  mid: number;
  base: number;
}

const BarChart: React.FC = () => {
  const [agentData, setAgentData] = useState<AgentCount | null>(null);

  useEffect(() => {
    // Fetch agent data from API (replace with actual API call)
    const fetchAgentData = async () => {
      // Simulate fetching data
      const fetchedData = {
        head: 10,
        mid: 20,
        base: 30,
      };

      setAgentData(fetchedData);
    };

    fetchAgentData();
  }, []);

  // Prepare chart data
  const chartData = {
    labels: ['Head', 'Mid', 'Base'], // Y-axis labels for the categories
    datasets: [
      {
        label: 'Number of Agents',
        data: [
          agentData?.head ?? 0,  // Fallback to 0 if data is not available
          agentData?.mid ?? 0,
          agentData?.base ?? 0,
        ], // X-axis data: Agent counts for each category
        backgroundColor: 'rgba(138, 110, 214, 0.2)', // Transparent bars with #8A6ED6 color
        borderColor: 'rgba(138, 110, 214, 1)', // Border color matching the original #8A6ED6 color
        borderWidth: 1,
      },
    ],
  };

  // Chart options to make it horizontal
  const options = {
    responsive: true,
    indexAxis: 'y', // This changes the chart to horizontal bars
    scales: {
      x: {
        beginAtZero: true,
      },
      y: {
        ticks: {
          autoSkip: true,
        },
      },
    },
  };

  return (
    <div className="w-[300px] py-5 bg-cardbg p-4 shadow-lg rounded-lg">
      <h2 className="text-center text-xl text-slate-200 font-semibold mb-4">Agent Count by Category</h2>

      {agentData ? (
        <div className="relative h-64">
          <Bar data={chartData}  options={{ responsive: true, maintainAspectRatio: false }}/>
        </div>
      ) : (
        <p className="text-center text-slate-300">Loading data...</p>
      )}
    </div>
  );
};

export default BarChart;
