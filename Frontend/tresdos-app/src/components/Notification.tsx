import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
interface Toggle {
    message:string;
    heading:string;
    setToggle: React.Dispatch<React.SetStateAction<boolean>>;
}
const Notification:React.FC<Toggle> = ({message,heading, setToggle }) => {
 
    const removeNotif = () => {
        setToggle(false);
    }
    return (
        <div className="flex flex-col p-8 md:w-full w-[200px]  bg-cardbg shadow-md hover:shadow-lg rounded-2xl">
            <div className="flex items-center justify-between">
                <div className="flex items-center">
                    <div className="flex flex-col ml-3">
                        <div className="font-medium leading-none text-gray-100 mb-1">{heading}</div>
                        <p className="text-sm text-gray-500 leading-none mt-1">
                            {message}
                        </p>
                    </div>
                    <div className='pb-5 cursor-pointer' onClick={removeNotif}>
                        <FontAwesomeIcon icon={faTimes} className='text-textHeading' />
                    </div>
                </div>

            </div>
        </div>
  )
}

export default Notification