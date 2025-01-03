import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { menuItems } from '../constants';
import { Link } from 'react-router-dom';
import { faBars, faChartLine, faTimes } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { useMyContext } from '../context/MyContext';

const SideBar: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [toggle, setToggle] = useState<boolean>(true);
  const [toggleDboard, setToggleDboard] = useState(false);

  const toggleDash: React.MouseEventHandler<HTMLDivElement> = () => {
    setToggleDboard((prevState) => !prevState);
  };

  const navigate = useNavigate();
  const { setToggleLog } = useMyContext();

  const toUserProfile = () => {
    navigate('/dashboard/analytics');
    setActiveIndex(10);
  };

  const handleMenuClick = (index: number) => {
    if (index === 5) {
      const savedPath = localStorage.getItem('currentPath');
      if (savedPath) {
        navigate(savedPath);
        setToggleLog(true);
      }
    } else {
      setActiveIndex(index);
    }
  };

  const showSideBar = () => {
    setToggle(!toggle);
  };

  return (
    <aside
    className={`fixed top-0 left-0 h-full transition-all duration-700 z-10 bg-cardbg shadow-sm
    ${toggle ? 'w-16' : 'w-64'}`}
  >
  
    <div className='flex justify-center align-center absolute pl-3 pt-4'>
      <button onClick={showSideBar} className='w-4'>
        <FontAwesomeIcon icon={toggle ? faBars : faTimes} className='text-textHeading' />
      </button>
    </div>
  
    <div
      className={`flex items-center justify-center transition-all duration-300 cursor-pointer ${toggle ? 'opacity-0' : 'opacity-100'}`}
      onClick={toUserProfile}
      style={{ height: '80px', visibility: toggle ? 'hidden' : 'visible' }}
    >
      <div className='flex p-2 rounded-lg flex-col items-center'>
        <div className='w-full flex flex-row'>
          <p className='text-slate-200 text-xs'>Tresdos</p>
        </div>
        <div className='overflow-hidden'>
          <p className='flex text-gray-400 text-xs whitespace-nowrap'>
            Commission Allocation System
          </p>
        </div>
      </div>
    </div>
  
    <nav className='h-auto flex flex-col justify-center p-4 items-center pb-20'>
  
      {/* Insight Section */}
      <div className='pl-3 w-full'>
        <p className={`text-gray-400 text-[14px] mb-1 ${toggle ? 'opacity-0' : 'opacity-100'}`}> Insight</p>
      </div>
  
      <div
        onClick={() => handleMenuClick(10)}
        className={`flex flex-row items-center w-full h-11 p-4 mb-3 transition-all duration-500 rounded-md
          ${activeIndex === 10 ? 'bg-textHeading text-white' : 'hover:bg-textHeading hover:text-white group'}
          ${toggle ? 'w-full h-11 pr-8' : ''}`}
      >
        <div className='mr-0'> {/* Adjust margin on icon */}
          <Link to={'/dashboard/analytics'}>
            <FontAwesomeIcon
              icon={faChartLine}
              className={`transition-colors duration-300
                ${activeIndex === 10 ? 'text-white' : 'text-textHeading group-hover:text-white'}`}
            />
          </Link>
        </div>
  
        <div
          className={`flex justify-center items-center w-full pr-5 overflow-hidden  
            ${toggle ? 'max-w-0 opacity-0' : 'max-w-full opacity-100'}`}
        >
          <p
            className={`pl-2 duration-500 whitespace-nowrap transition-opacity  // Reduced padding-left
              ${activeIndex === 10 ? 'text-white' : 'text-textHeading group-hover:text-white'}`}
          >
            <Link to={'/dashboard/analytics'}>Dashboard</Link>
          </p>
        </div>
      </div>
  
      {/* Operations Section */}
      <div className='pl-3 w-full'>
        <p className={`text-gray-400 text-[14px] mb-1 ${toggle ? 'opacity-0' : 'opacity-100'}`}> Operations</p>
      </div>
  
      {/* Menu Items */}
      {menuItems.map((item, index) => (
        <div
          key={index}
          onClick={() => handleMenuClick(index)}
          className={`flex flex-row items-center  w-full h-11 p-4 mb-3 transition-all duration-500 rounded-md
            ${activeIndex === index ? 'bg-textHeading text-white' : 'hover:bg-textHeading hover:text-white group'}
            ${toggle ? 'w-full h-11 pr-8' : ''}`}
        >
          <div className='mr-0'> {/* Adjust margin on icon */}
            <Link to={item.url ?? "/"}> 
              <FontAwesomeIcon
                icon={item.icon}
                className={`transition-colors duration-300 
                  ${activeIndex === index ? 'text-white' : 'text-textHeading group-hover:text-white'}`}
              />
            </Link>
          </div>
  
          <div
            className={`flex justify-center items-center w-full pr-5 overflow-hidden  
              ${toggle ? 'max-w-0 opacity-0' : 'max-w-full opacity-100'}`}
          >
            <p
              className={`pl-2 duration-500 whitespace-nowrap transition-opacity  // Reduced padding-left
                ${activeIndex === index ? 'text-white' : 'text-textHeading group-hover:text-white'}`}
            >
              <Link to={item.url ?? "/"}>{item.text}</Link>
            </p>
          </div>
        </div>
      ))}
    </nav>
  </aside>
  
  );
};

export default SideBar;
