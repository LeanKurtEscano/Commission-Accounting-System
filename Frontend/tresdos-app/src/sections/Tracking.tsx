import React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileCirclePlus } from '@fortawesome/free-solid-svg-icons';
import Table from '../layouts/Table';
import Notification from '../components/Notification';
import { getReports } from '../services/report';
import { formatDates } from '../utils/formatDate';
import axios from 'axios';

interface ReportData {
    id: number;
    start_date :string;
    end_date:string;
    
}

const Tracking:React.FC = () => {
    const [emptyActivity, setEmptyActivity] = useState("");
    const [reportData, setReportData] = useState<ReportData[]>([]);
    const [toggleDelete, setToggleDelete] = useState(false);
    const navigate = useNavigate();
    const apiUrl = import.meta.env.VITE_API_URL2;
    const message = "The report was successfully deleted."
    

    useEffect(() => {
        if (toggleDelete) {
            const timer = setTimeout(() => {
                setToggleDelete(false);
            }, 7000);
            return () => clearTimeout(timer);
        }
    }, [toggleDelete]);
    
    const deleteReport = async (reportId: number) => {
        const access_token = localStorage.getItem("access_token");
        try {
            const response = await axios.delete(`${apiUrl}/delete/${reportId}/`, {
               headers: {
                'Authorization': `Bearer ${access_token}`
               }
            });

            if (response.status === 200) {
                handleReports();
                setToggleDelete(!toggleDelete);
            }
        } catch (error) {
            console.log(error);
            alert("Failed to Delete Data");
        }
    };
    const handleReports = async() => {
      try {
        const response = await getReports();
        if(response.status===200) {
          console.log(response.data);
          const formattedDate = formatDates(response.data);
          setReportData(formattedDate);
        }

      } catch(error) {
        alert("Something Went Wrong. Please try again later")
      }   

    }
    useEffect(() => {
      handleReports();
       
    }, []);

    return (
        <section className="w-full sm:overflow-y-auto flex flex-col min-h-screen pb-20 pt-20 md:pl-36 pl-20 bg-darkbg relative">
           
            <div className=" w-[800px]  pr-48 flex justify-center items-center mb-4 ">
                <button
                    className="flex items-center space-x-2 bg-textHeading text-white px-4 py-2 rounded-md shadow-md hover:bg-textHeading hover:scale-105 transition-transform duration-300"
                    onClick={() => navigate('/dashboard/entry')}
                >
                    <FontAwesomeIcon icon={faFileCirclePlus} />
                    <span>Create Report</span>
                </button>
            </div>

            {emptyActivity ? (
                <h1 className="text-slate-200 md:text-4xl text-md pr-14 font-bold">{emptyActivity}</h1>
            ) : (
                <div className="flex overflow-x-auto items-center flex-col">
                    <Table data={reportData || []} deleteReport={deleteReport} setToggleDelete= {setToggleDelete} />
                </div>
            )}


            {toggleDelete && (
                <div className={`absolute right-5 top-7 ${toggleDelete ? 'notification-enter' : 'notification-exit'}`}>
                    <Notification setToggle={setToggleDelete} message={message} heading= "Deleted!" />
                </div>
            )}
        </section>
    );
};

export default Tracking;
