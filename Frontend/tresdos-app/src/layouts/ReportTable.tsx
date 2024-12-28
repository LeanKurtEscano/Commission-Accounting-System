import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

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

interface UserDataArray {
  data: ReportDetails[];
}

const ReportTable: React.FC<UserDataArray> = ({ data }) => {
  const navigate = useNavigate();
  const [deleteUserId, setDeleteUserId] = useState<number | null>(null);

  const showToggleModal = (id: number) => {
    setDeleteUserId(id);
  };

  return (
    <div className="md:relative w-11/12 overflow-x-auto mb-5">
      <table className="min-w-full text-xs text-center rtl:text-right text-darktext3 dark:text-darktext3">
        <thead className="text-xs text-gray-700 uppercase bg-cardbg  dark:text-gray-400">
          <tr>
            <th className="px-1 py-1 md:px-3 md:py-2">Agent Name</th>
            <th className="px-1 py-1 md:px-3 md:py-2">Agent Role</th>
            <th className="px-1 py-1 md:px-3 md:py-2">Total Amount</th>
            <th className="px-1 py-1 md:px-3 md:py-2">Percentage</th>
            <th className="px-1 py-1 md:px-3 md:py-2">Parent Percentage</th>
            <th className="px-1 py-1 md:px-3 md:py-2">Income</th>
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
            data.map((item, index) => (
              <tr
                key={index}
                className="bg-layer3 text-slate-300 border-b dark:bg-loginbg dark:border-gray-800"
              >
                <td className="px-1 py-1 md:px-3 md:py-2">{item.agent_name}</td>
                <td className="px-1 py-1 md:px-3 md:py-2">{item.agent_role} </td>
                <td className="px-1 py-1 md:px-3 md:py-2">
                  {item.total_amount}
                </td>
                <td className="px-1 py-1 md:px-3 md:py-2">{item.percentage}%</td>
                <td className="px-1 py-1 md:px-3 md:py-2">
                  {item.parent_percentage}%
                </td>
                <td className="px-1 py-1 md:px-3 md:py-2">{item.income}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={6} className="px-1 py-4 text-center">
                No data available
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ReportTable;
