import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoneyBillWave, faCalendarAlt, faHandshake } from '@fortawesome/free-solid-svg-icons';

const SummaryCards = () => {
  return (
    <div className="flex flex-col sm:flex-row w-full items-center justify-center gap-6 p-6">
      {/* Total Sales Card */}
      <div className="bg-cardbg hover:scale-105 transform transition duration-300 ease-in-out w-[400px] h-[150px] rounded-lg p-4 flex flex-col justify-center items-center shadow-xl hover:shadow-2xl">
        <div className="flex flex-row items-center">
          <div className="p-2 rounded-full text-white bg-gradient-to-r from-indigo-600 to-purple-500">
            <FontAwesomeIcon icon={faMoneyBillWave} className="text-[25px]" />
          </div>
          <div className="ml-4">
            <h4 className="text-lg text-gray-400 font-semibold">Total Sales</h4>
          </div>
        </div>
        <div className="flex items-center justify-center mt-2">
          <p className="text-xl font-bold text-white">₱1,503,212</p>
        </div>
      </div>

      {/* Monthly Earnings Card (Same design as Total Sales Card) */}
      <div className="bg-cardbg hover:scale-105 transform transition duration-300 ease-in-out w-[250px] h-[150px] rounded-lg p-4 flex flex-col justify-center items-center shadow-xl hover:shadow-2xl">
        <div className="flex flex-row items-center">
          <div className="p-2 px-3 rounded-full text-white bg-gradient-to-r from-indigo-600 to-purple-500">
            <FontAwesomeIcon icon={faCalendarAlt} className="text-[25px]" />
          </div>
          <div className="ml-4">
            <h4 className="text-lg text-gray-400 font-semibold">Monthly Earnings</h4>
          </div>
        </div>
        <div className="flex items-center justify-center mt-2">
          <p className="text-xl font-bold text-white">₱50,000</p>
        </div>
      </div>

      {/* Profit Share Card (Same design as Total Sales Card) */}
      <div className="bg-cardbg hover:scale-105 transform transition duration-300 ease-in-out w-[250px] h-[150px] rounded-lg p-4 flex flex-col justify-center items-center shadow-xl hover:shadow-2xl">
        <div className="flex flex-row items-center">
          <div className="p-2 rounded-full text-white bg-gradient-to-r from-indigo-600 to-purple-500">
            <FontAwesomeIcon icon={faHandshake} className="text-[25px]" />
          </div>
          <div className="ml-4">
            <h4 className="text-lg text-gray-400 font-semibold">Profit Share</h4>
          </div>
        </div>
        <div className="flex items-center justify-center mt-2">
          <p className="text-xl font-bold text-white">₱50,000</p>
        </div>
      </div>
    </div>
  );
};

export default SummaryCards;
