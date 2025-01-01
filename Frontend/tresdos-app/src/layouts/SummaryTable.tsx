import React from "react";
import { formatNumberWithCommas } from "../utils/formatNumbers";

export interface AgentSummary {
    name:string;
    role:string;
    totalAmount: number;
    totalIncome:number;
  }
interface UserDataArray {
  data: AgentSummary[];
}

const SummaryTable: React.FC<UserDataArray> = ({ data }) => {


  return (
    <div className="md:relative w-11/12 overflow-x-auto mb-5">
      <table className="min-w-full text-xs text-center rtl:text-right text-darktext3 dark:text-darktext3">
        <thead className="text-xs text-gray-700 uppercase bg-cardbg  dark:text-gray-400">
          <tr>
            <th className="px-1 py-1 md:px-3 md:py-2">Agent Name</th>
            <th className="px-1 py-1 md:px-3 md:py-2">Agent Role</th>
            <th className="px-1 py-1 md:px-3 md:py-2">Generated(Total)</th>
            <th className="px-1 py-1 md:px-3 md:py-2">Total Income</th>
            
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
            data.map((item, index) => (
              <tr
                key={index}
                className="bg-layer3 text-slate-300 border-b dark:bg-loginbg dark:border-gray-800"
              >
                <td className="px-1 py-1 md:px-3 md:py-2">{item.name}</td>
                <td className="px-1 py-1 md:px-3 md:py-2">{item.role} </td>
                <td className="px-1 py-1 md:px-3 md:py-2"> ₱{formatNumberWithCommas(item.totalAmount)}</td>
                <td className="px-1 py-1 md:px-3 md:py-2"> ₱{formatNumberWithCommas(item.totalIncome)}</td>
                
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={6} className="px-1 text-white py-4 text-center">
                No data available
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default SummaryTable;
