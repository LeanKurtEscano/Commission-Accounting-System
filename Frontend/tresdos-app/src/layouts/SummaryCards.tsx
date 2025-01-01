import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoneyBillWave, faCalendarAlt, faHandshake, faAward } from "@fortawesome/free-solid-svg-icons";
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
  const [totalYearly, setTotalYearly] = useState<TotalSummary>({total: 0})

  const url1 = "total";
  const url2 = "share";
  const url3 = "current";
  const url4 = "yearly"

  const handleSummary = async (
    endPoint: string,
    setData: React.Dispatch<React.SetStateAction<T>>
  ) => {
    try {
      const response = await getTotalSum(endPoint);
      if (response.status === 200) {
        setData(response.data);
      }
    } catch (error) {
      console.error("Error fetching summary:", error);
    }
  };

  console.log(totalYearly)

  useEffect(() => {
    handleSummary(url1, setTotalSales);
    handleSummary(url2, setTotalShare);
    handleSummary(url3, setTotalMonthly);
    handleSummary(url4, setTotalYearly);
  }, []);

  return (
    <div className="flex flex-wrap items-center justify-center gap-4 p-4">
      <div className="bg-cardbg hover:scale-105 transform transition duration-300 ease-in-out w-[225px] h-[90px] rounded-md p-2 flex flex-col justify-center items-center shadow-md hover:shadow-lg">
        <div className="flex flex-row items-center">
          <div className="p-1.5 px-3 rounded-full text-white bg-gradient-to-r from-indigo-600 to-purple-500">
            <FontAwesomeIcon icon={faMoneyBillWave} className="text-[14px]" />
          </div>
          <div className="ml-2">
            <h4 className="text-xs text-gray-400 font-semibold">Total Sales</h4>
          </div>
        </div>
        <div className="flex items-center justify-center mt-1">
          <p className="text-sm font-bold text-white">
            ₱{formatNumberWithCommas(totalSales.total)}
          </p>
        </div>
      </div>

      <div className="bg-cardbg hover:scale-105 transform transition duration-300 ease-in-out w-[225px] h-[90px] rounded-md p-2 flex flex-col justify-center items-center shadow-md hover:shadow-lg">
        <div className="flex flex-row items-center">
          <div className="p-1.5 px-3 rounded-full text-white bg-gradient-to-r from-indigo-600 to-purple-500">
            <FontAwesomeIcon icon={faCalendarAlt} className="text-[14px]" />
          </div>
          <div className="ml-2">
            <h4 className="text-xs text-gray-400 font-semibold">Monthly Earnings</h4>
          </div>
        </div>
        <div className="flex items-center justify-center mt-1">
          <p className="text-sm font-bold text-white">
            ₱{formatNumberWithCommas(totalMonthly.total_amount_sum * 0.6)}
          </p>
        </div>
      </div>

      <div className="bg-cardbg hover:scale-105 transform transition duration-300 ease-in-out w-[225px] h-[90px] rounded-md p-2 flex flex-col justify-center items-center shadow-md hover:shadow-lg">
        <div className="flex flex-row items-center">
          <div className="p-1.5 px-2 rounded-full text-white bg-gradient-to-r from-indigo-600 to-purple-500">
            <FontAwesomeIcon icon={faHandshake} className="text-[14px]" />
          </div>
          <div className="ml-2">
            <h4 className="text-xs text-gray-400 font-semibold">Profit Share</h4>
          </div>
        </div>
        <div className="flex items-center justify-center mt-1">
          <p className="text-sm font-bold text-white">
            ₱{formatNumberWithCommas(totalShare.total)}
          </p>
        </div>
      </div>
      <div className="bg-cardbg hover:scale-105 transform transition duration-300 ease-in-out w-[225px] h-[90px] rounded-md p-2 flex flex-col justify-center items-center shadow-md hover:shadow-lg">
        <div className="flex flex-row items-center">
          <div className="p-1.5 px-3 rounded-full text-white bg-gradient-to-r from-indigo-600 to-purple-500">
            <FontAwesomeIcon icon={faAward} className="text-[14px]" />
          </div>
          <div className="ml-2">
            <h4 className="text-xs text-gray-400 font-semibold">Yearly Sales</h4>
          </div>
        </div>
        <div className="flex items-center justify-center mt-1">
          <p className="text-sm font-bold text-white">
            ₱{formatNumberWithCommas(totalYearly.total)}
          </p>
        </div>
      </div>
    </div>


  );
};

export default SummaryCards;
