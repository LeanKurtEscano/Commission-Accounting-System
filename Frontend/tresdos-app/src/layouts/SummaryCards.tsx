import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoneyBillWave, faCalendarAlt, faHandshake } from "@fortawesome/free-solid-svg-icons";
import { getTotalSum } from "../services/dashboard";
import { formatNumberWithCommas } from "../utils/formatNumbers";

interface TotalSummary {
  total: number;
}

interface TotalMonth {
  total_amount_sum: number;
}

const SummaryCards = () => {
  const [totalSales, setTotalSales] = useState<TotalSummary>({ total: 0 });
  const [totalMonthly, setTotalMonthly] = useState<TotalMonth>({ total_amount_sum: 0 });
  const [totalShare, setTotalShare] = useState<TotalSummary>({ total: 0 });

  const url1 = "total";
  const url2 = "share";
  const url3 = "current";

  const handleSummary = async (
    endPoint: string,
    setData: React.Dispatch<React.SetStateAction<T>>
  ) => {
    try {
      const response = await getTotalSum(endPoint);
      if (response.status === 200) {
        console.log(response.data);
        setData(response.data); // Update state with the API response data
      }
    } catch (error) {
      console.error("Error fetching summary:", error);
    }
  };

  useEffect(() => {
    handleSummary(url1, setTotalSales);
    handleSummary(url2, setTotalShare);
    handleSummary(url3, setTotalMonthly);
  }, []);

  return (
    <div className="flex flex-wrap items-center justify-center gap-6 p-6">
      {/* Total Sales Card */}
      <div className="bg-cardbg hover:scale-105 transform transition duration-300 ease-in-out w-[300px] h-[150px] rounded-lg p-4 flex flex-col justify-center items-center shadow-xl hover:shadow-2xl">
        <div className="flex flex-row items-center">
          <div className="p-2 rounded-full text-white bg-gradient-to-r from-indigo-600 to-purple-500">
            <FontAwesomeIcon icon={faMoneyBillWave} className="text-[25px]" />
          </div>
          <div className="ml-4">
            <h4 className="text-lg text-gray-400 font-semibold">Total Sales</h4>
          </div>
        </div>
        <div className="flex items-center justify-center mt-2">
          <p className="text-xl font-bold text-white">
            ₱{formatNumberWithCommas(totalSales.total)}
          </p>
        </div>
      </div>

      {/* Monthly Earnings Card */}
      <div className="bg-cardbg hover:scale-105 transform transition duration-300 ease-in-out w-[300px] h-[150px] rounded-lg p-4 flex flex-col justify-center items-center shadow-xl hover:shadow-2xl">
        <div className="flex flex-row items-center">
          <div className="p-2 rounded-full text-white bg-gradient-to-r from-indigo-600 to-purple-500">
            <FontAwesomeIcon icon={faCalendarAlt} className="text-[25px]" />
          </div>
          <div className="ml-4">
            <h4 className="text-lg text-gray-400 font-semibold">Monthly Earnings</h4>
          </div>
        </div>
        <div className="flex items-center justify-center mt-2">
          <p className="text-xl font-bold text-white">
            ₱{formatNumberWithCommas(totalMonthly.total_amount_sum)}
          </p>
        </div>
      </div>

      {/* Profit Share Card */}
      <div className="bg-cardbg hover:scale-105 transform transition duration-300 ease-in-out w-[300px] h-[150px] rounded-lg p-4 flex flex-col justify-center items-center shadow-xl hover:shadow-2xl">
        <div className="flex flex-row items-center">
          <div className="p-2 rounded-full text-white bg-gradient-to-r from-indigo-600 to-purple-500">
            <FontAwesomeIcon icon={faHandshake} className="text-[25px]" />
          </div>
          <div className="ml-4">
            <h4 className="text-lg text-gray-400 font-semibold">Profit Share</h4>
          </div>
        </div>
        <div className="flex items-center justify-center mt-2">
          <p className="text-xl font-bold text-white">₱{formatNumberWithCommas(totalShare.total)}</p>
        </div>
      </div>
    </div>
  );
};

export default SummaryCards;
