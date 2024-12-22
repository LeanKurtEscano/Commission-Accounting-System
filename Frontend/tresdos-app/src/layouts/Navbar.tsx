import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { navItems } from '../constants';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import { useMyContext } from '../context/MyContext';
const Navbar = () => {

    const [toggle, setToggle] = useState(false);
    const { isAuthenticated, toggleLog, setToggleLog } = useMyContext();
    const navigate = useNavigate();

    const toggleNav = () => {
        setToggle(!toggle);
    };

    const toggleLogOut = () => {

        setToggleLog(!toggleLog);

    }

    const handleLogin = () => {
        setToggle(false);
        navigate('/');
    };


    return (
        <header className='bg-navcolor'>
            <nav className="flex items-center justify-end bg-darkbg transition-all duration-700 w-full shadow-xl pt-4 pb-4 pr-36">
                <div className='mr-8 absolute left-24'>
                    <Link to='/'>
                        <h1 className="text-slate-200 text-xl font-bold">
                           Tresdos
                        </h1>

                    </Link>
                </div>
                <div className={`nav-links duration-500 md:static p-4 absolute bg-darkbg md:min-h-fit min-h-[60vh] left-0 top-[-100%] md:w-auto w-full flex items-center px-5 ${toggle ? 'top-0' : ''}`}>
                    <ul className="flex md:flex-row md:items-center md:gap-[4vw] gap-8">
                        {navItems.map((item) => (
                            <li className='relative group font-normal' key={item.text}>
                                <Link to={item.link} className="text-white font-bold mb-1" onClick={() => setToggle(false)}>
                                    {item.text}
                                    <span className="absolute left-1/2 -translate-x-1/2 bottom-0 w-0 h-[2px] mt-2 bg-cyan-500 transition-all duration-300 group-hover:w-full"></span>
                                </Link>
                            </li>
                        ))}



                        {isAuthenticated ? (
                            <li className='relative group font-normal' onClick={toggleLogOut}>
                                <Link to='#' className="text-white font-bold">
                                    Logout
                                    <span className="absolute left-1/2 -translate-x-1/2 bottom-0 w-0 h-[2px] bg-cyan-500 transition-all duration-300 group-hover:w-full"></span>
                                </Link>
                            </li>
                        ) : (
                            <li className='relative group font-normal'>
                                <div className="text-white font-bold cursor-pointer" onClick={handleLogin}>
                                    Login
                                    <span className="absolute left-1/2 -translate-x-1/2 bottom-0 w-0 h-[2px] bg-cyan-500 transition-all duration-300 group-hover:w-full"></span>
                                </div>
                            </li>
                        )}
                    </ul>
                </div>
                <div className='md:hidden text-cyan-400 cursor-pointer' onClick={toggleNav}>
                    <FontAwesomeIcon icon={toggle ? faTimes : faBars} className='text-lg pt-4 pb-4' />
                </div>
                {toggle && (
                    <div className={`absolute mt-14 bg-loginbg rounded-lg border-cyan-600 shadow-lg border-2 transition-all w-[300px] z-50 right-1 ${toggle ? "top-12 translate-y-0" : "top-9 translate-y-full"} duration-300 ease-in-out`}>
                        <ul className="flex flex-col items-center p-4">
                            {navItems.map((item) => (
                                <li className='relative group font-normal my-2' key={item.text}>
                                    <Link to={item.link} className="text-white font-bold mb-1" onClick={() => setToggle(false)}>
                                        {item.text}
                                        <span className="absolute left-1/2 -translate-x-1/2 bottom-0 w-0 h-[2px] bg-cyan-500 transition-all duration-300 group-hover:w-full"></span>
                                    </Link>
                                </li>
                            ))}




                            {isAuthenticated ? (
                                <li className='relative group font-normal my-2' onClick={toggleLogOut}>
                                    <Link to='#' className="text-white font-bold mb-1">
                                        Logout
                                        <span className="absolute left-1/2 -translate-x-1/2 bottom-0 w-0 h-[2px] bg-cyan-500 transition-all duration-300 group-hover:w-full"></span>
                                    </Link>
                                </li>
                            ) : (
                                <li className='relative group font-normal my-2' onClick={handleLogin}>
                                    <Link to='/login' className="text-white font-bold mb-1">
                                        Login
                                        <span className="absolute left-1/2 -translate-x-1/2 bottom-0 w-0 h-[2px] bg-cyan-500 transition-all duration-300 group-hover:w-full"></span>
                                    </Link>
                                </li>
                            )}
                        </ul>
                    </div>
                )}
            </nav>
        </header>
    );
};

export default Navbar;
