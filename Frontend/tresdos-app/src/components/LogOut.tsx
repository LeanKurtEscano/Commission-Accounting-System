import React from 'react';
import { useMyContext } from '../context/MyContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { logOut } from '../services/axios';

const LogOut:React.FC = () => {
    const navigate = useNavigate();
    const { setToggleLog, setIsAuthenticated } = useMyContext();
    const apiUrl = import.meta.env.VITE_API_URL;

    const handleLogOut = async () => {
        try {
            const response = await logOut(apiUrl);

            if (response.data.success) {
                setIsAuthenticated(false);
                setToggleLog(false);
                localStorage.removeItem("access_token");
                localStorage.removeItem("refresh_token");
                navigate('/');
            }
        } catch {
            alert("Failed to logout");
        }
    };

    const cancelToggle = () => {
        setToggleLog(false);
    };

    return (
        <div className='fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center z-50'>
            <div className='bg-darkbg p-6 rounded-lg border border-cyan-600 max-w-sm w-full'>
                <h2 className='text-red-600 mb-4 text-lg md:text-xl'>Are you sure?</h2>
                <p className='text-slate-200 mb-4'>Do you really want to Logout?</p>
                <div className='flex justify-end'>
                    <button
                        className='bg-gray-700 text-slate-200 px-4 py-2 rounded-md hover:bg-gray-800 transition duration-300'
                        onClick={cancelToggle}
                    >
                        Cancel
                    </button>
                    <button
                        className='bg-red-600 ml-2 text-slate-200 px-4 py-2 rounded-md hover:bg-red-700 transition duration-300'
                        onClick={handleLogOut}
                    >
                        Logout
                    </button>
                </div>
            </div>
        </div>
    );
};

export default LogOut;
