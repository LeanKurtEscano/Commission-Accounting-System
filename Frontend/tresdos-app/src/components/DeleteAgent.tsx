import React from 'react'


interface DeleteProps {
    setShow: React.Dispatch<React.SetStateAction<boolean>>; 
    id : number;
    deleteAgent: (agentId: number, agentType:string) => void;
    agentType: string;
    name: string;
  }
const DeleteAgent:React.FC<DeleteProps> = ({setShow,id ,agentType,name,deleteAgent}) => {

    const cancelToggle = () => {
        setShow(false);
    }

    const handleDelete = () => {
        deleteAgent(id,agentType);
        setShow(false)
    }

 

  return (
    <div className="fixed inset-0 bg-darkbg bg-opacity-75 flex items-center justify-center z-50">
    <div className="bg-cardbg p-6 rounded-lg border-darkbg  max-w-sm w-full">
      <div className=' flex flex-col justify-start items-start'>
      <h2 className="text-red-600 mb-4 text-lg md:text-xl">Are you sure?</h2>
      <p className="text-slate-200 md:text-lg mb-4">Do you really want to delete {name}?</p>
      </div>
      
      <div className="flex justify-end">
        <button
          className="bg-gray-700 text-slate-200 px-4 py-2 text-base rounded-md hover:bg-textHeading transition duration-300"
          onClick={cancelToggle}
        >
          Cancel
        </button>
        <button
          className="bg-red-600 ml-2 text-slate-200 px-4 text-base py-2 rounded-md transition duration-300"
          onClick={handleDelete}
        >
          Delete
        </button>
      </div>
    </div>
  </div>
  )
}

export default DeleteAgent