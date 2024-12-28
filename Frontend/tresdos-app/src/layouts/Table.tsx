import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEye } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import ConfirmModal from '../components/ConfirmModal';

interface ReportData {
    id: number;
    start_date: string;
    end_date: string;
}

interface UserDataArray {
    data: ReportData[];
    deleteReport: (userId: number) => void;
    setToggleDelete: React.Dispatch<React.SetStateAction<boolean>>;
}

const Table: React.FC<UserDataArray> = ({ data, deleteReport }) => {
    const navigate = useNavigate();
    const [deleteReportId, setDeleteReportId] = useState<number | null>(null);

    const showToggleModal = (id: number) => {
        setDeleteReportId(id);
    };

    const handleViewReport = (id: number) => {
        navigate(`/dashboard/tracking/${id}`); // Replace `/report/${id}` with the correct path for viewing reports
    };

    return (
        <div className="md:relative w-5/6 overflow-x-auto mb-5 mx-auto">
            <table className="min-w-[70%] text-xs text-center rtl:text-right text-darktext3 dark:text-darktext3 mx-auto">
                <thead className="text-xs text-gray-700 uppercase bg-cardbg dark:bg-loginbg dark:text-gray-400">
                    <tr>
                        <th className="px-2 py-1 md:px-3 md:py-2">Start Date</th>
                        <th className="px-2 py-1 md:px-3 md:py-2">End Date</th>
                        <th className="px-2 py-1 md:px-3 md:py-2">Operations</th>
                    </tr>
                </thead>
                <tbody>
                    {data.length > 0 ? (
                        data.map((item, index) => (
                            <tr
                                key={index}
                                className="bg-layer3 border-b dark:bg-loginbg text-white dark:border-gray-800"
                            >
                                <td className="px-2 py-1 md:px-3 md:py-2">{item.start_date}</td>
                                <td className="px-2 py-1 md:px-3 md:py-2">{item.end_date || 'N/A'}</td>
                                <td className="px-2 py-1 md:px-3 md:py-2">
                                    <div className="flex justify-center items-center space-x-2">
                                        <button
                                            onClick={() => handleViewReport(item.id)}
                                            className="flex items-center px-3 py-1 text-sm font-medium text-textHeading bg-transparent border border-textHeading rounded-md hover:bg-textHeading hover:text-white"
                                        >
                                            <FontAwesomeIcon icon={faEye} className="mr-2" />
                                            View Report
                                        </button>
                                        <button
                                            onClick={() => showToggleModal(item.id)}
                                            className="flex items-center px-3 py-1 text-sm font-medium text-red-500 bg-transparent border border-red-500 rounded-md hover:bg-red-500 hover:text-white"
                                        >
                                            <FontAwesomeIcon icon={faTrash} className="mr-2" />
                                            Delete
                                        </button>
                                    </div>
                                </td>

                                {deleteReportId !== null && (
                                    <ConfirmModal setShow={() => setDeleteReportId(null)} deleteReport={deleteReport} id={deleteReportId} />
                                )}
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={3} className="px-2 py-4 text-white text-center">
                                No data available
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default Table;
