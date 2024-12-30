import React, { useState, useEffect} from "react";
import { sortAgentsByName } from "../utils/sortAgents";
import { getAgentsJson, AgentData } from "../services/agents";
import { makeUpdate } from "../services/agents";
import Notification from '../components/Notification'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faTimes, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import DeleteAgent from "../components/DeleteAgent";
import { deleteAgent } from "../services/agents";
interface UpdateData {
  id: number;
  name: string;
  type: string;
  commission: number;
  parent?: number | null;
  parentId?: number | null;
}

interface editData {
  id: number | null;
  agentType: string;
}

const ManageAgents = () => {
  const [agentsData, setAgentsData] = useState<AgentData[]>([]);
  const [toggleDelete, setToggleDelete] = useState(false);
  const [toggleUpdate, setToggleUpdate] = useState(false);
  const [formData, setFormData] = useState<UpdateData[]>([]);
  const [toggle, setToggle] = useState(false);
  const [deleteAgentId, setDeleteAgentId] = useState<number | null>(null);
  const [deleteAgentType, setDeleteAgentType] = useState<string | null>(null);
  const [edit, setEdit] = useState<editData>({
    id: null,
    agentType: "",
  });

 

  const handleAgentsData = async() => {
    try {
      const response = await getAgentsJson();
      if (response.status === 200) {
        const sortedData = sortAgentsByName(response.data);
        setAgentsData(sortedData);
      }
    } catch (error) {
      alert("Under Maintenance. Please Wait.");
    }
  };


  useEffect(() => {
   
      handleAgentsData();

  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    agentType: string,
    agentName: string,
    agentId: number,
    parent: number | null,
    parentId: number | null
  ) => {
    const { name, value } = e.target;

    // Find the current agent data in the formData
    const existingAgent = formData.find(
      (item) => item.id === agentId && item.type === agentType
    );

    // If the agent data is found, copy its values into the updated data
    let updatedData = {
      id: agentId,
      name: agentName,
      type: agentType,
      commission: existingAgent?.commission ?? 0, // Preserve commission value
      parent: existingAgent?.parent ?? parent, // Keep current parent value unless changed
      parentId: parentId,
    };


    if (name === "commission") {
      updatedData.commission = parseInt(value) || 0;
    }

    setFormData((prev) => {
      const existingIndex = prev.findIndex(
        (agent) => agent.id === agentId && agent.type === agentType
      );

      if (existingIndex !== -1) {
        const updatedFormData = [...prev];
        updatedFormData[existingIndex] = updatedData;
        return updatedFormData;
      } else {
        return [...prev, updatedData];
      }
    });
  };


  const handleParentChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    agentType: string,
    agentName: string,
    agentId: number,
    commission: number,
    parentId: number | null
  ) => {
    const { value } = e.target;

    const existingAgent = formData.find(
      (item) => item.id === agentId && item.type === agentType
    );


    const updatedData = {
      id: agentId,
      name: agentName,
      type: agentType,
      commission: existingAgent?.commission ?? commission,
      parent: parseInt(value) || 0,
      parentId: parentId,
    };


    setFormData((prev) => {
      const existingIndex = prev.findIndex(
        (agent) => agent.id === agentId && agent.type === agentType
      );

      if (existingIndex !== -1) {
        const updatedFormData = [...prev];
        updatedFormData[existingIndex] = updatedData;
        return updatedFormData;
      } else {
        return [...prev, updatedData];
      }
    });
  };




  console.log(formData);


  const handleEdit = (agentId: number, agentType: string) => {
    setEdit({
      id: agentId,
      agentType: agentType
    }
    ); // Enable editing for the clicked agent
  };



  const handleCancelEdit = () => {
    setEdit({
      id: null,
      agentType: "",
    }); // Cancel editing
  };

  const handleDeleteAgent = async (id: number, agentType: string) => {
    try {
      const response = await deleteAgent(id, agentType);

      if (response.status === 200) {
        handleAgentsData();
        setToggleDelete(true);
      }

    } catch (error) {
      alert("Something Went Wrong. Please try again.");

    }


  }

  const handleDelete = (agentId: number, agentType: string) => {
    setDeleteAgentId(agentId);
    setToggle(true);
    setDeleteAgentType(agentType);
  };

  const handleSubmit = async(e: React.FormEvent) => {
    e.preventDefault();
    if (formData.length === 0) {
      return; 
    }
   
  
    const response = await makeUpdate(formData);
    if (response.status === 200) {
      setToggleUpdate(true);
      handleAgentsData();
    } else {
      alert("Something Went Wrong");
    }
  };

  useEffect(() => {
    if (toggleDelete) {
      const timer = setTimeout(() => {
        setToggleDelete(false);
      }, 7000);
      return () => clearTimeout(timer);
    }
  }, [toggleDelete]);

  useEffect(() => {
    if (toggleUpdate) {
      const timer = setTimeout(() => {
        setToggleUpdate(false);
      }, 7000);
      return () => clearTimeout(timer);
    }
  }, [toggleUpdate]);


  return (
    <section className="bg-darkbg w-full min-h-screen pt-10 pb-10 h-auto">
      {agentsData.length === 0 ? (
        <div className=" flex justify-center items-center">
          <p className="text-slate-200">No Data Available</p>

        </div>

      ) : (
        <form onSubmit={handleSubmit}>
          <div className="max-w-4xl mx-auto">
            <h1 className="text-2xl font-bold text-slate-100 mb-6">Manage Agents</h1>
          </div>

          <div className="max-w-4xl mt-4 mx-auto space-y-6">


            {agentsData.map((head) => (
              <div key={head.id} className="bg-layer1 p-4 rounded-lg shadow-lg text-slate-100">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="flex flex-row  w-[500px]">
                    <h2 className="text-xl font-semibold mr-4">
                      Head Agent: {head.name}
                    </h2>
                  </div>
                  <div className="pt-1 flex items-center flex-row w-[300px]">
                    <p className="text-slate-300 mr-2">Commission: </p>
                    {edit.id === head.id && edit.agentType === "headAgent" ? (
                      <input
                        name="commission"
                        type="number"
                        value={
                          formData.find((item) => item.id === head.id && item.type === "headAgent")?.commission ?? head.percentage}
                        onChange={(e) => handleInputChange(e, "headAgent", head.name, head.id, null, null)}
                        className="w-14 p-2 rounded-md bg-darkbg text-slate-100 border border-textHeading focus:outline-none focus:ring focus:ring-textHeading"
                      />
                    ) : (
                      <span> {formData.find((item) => item.id === head.id && item.type === "headAgent")?.commission ?? head.percentage}%</span>
                    )}
                  </div>
                  <div className="flex  flex-row items-end">
                    {/* Edit Icon */}
                    {edit.id === head.id && edit.agentType === "headAgent" ? (
                      <button
                      type="button" 
                        onClick={handleCancelEdit}
                        className="text-red-500 hover:text-red-700 text-xl p-2"
                      >
                        <FontAwesomeIcon icon={faTimes} />
                      </button>
                    ) : (
                      <button
                      type="button" 
                        onClick={() => handleEdit(head.id, "headAgent")}
                        className="text-textHeading hover:text-purple-700 text-xl p-2"
                      >
                        <FontAwesomeIcon icon={faEdit} />
                      </button>
                    )}

                    {/* Delete Icon */}
                    <button
                      type="button" 
                      onClick={() => handleDelete(head.id, "headAgent")}
                      className="text-red-500 hover:text-red-700 text-xl p-2"
                    >
                      <FontAwesomeIcon icon={faTrashAlt} />
                    </button>
                  </div>
                </div>

                {toggle && deleteAgentId === head.id && deleteAgentType === "headAgent" && (
                  <DeleteAgent setShow={setToggle} id={head.id} agentType="headAgent" name={head.name} deleteAgent={handleDeleteAgent} />
                )}

                <div className="mt-4 space-y-4">
                  {head.middleAgents && head.middleAgents.length > 0 ? (
                    head.middleAgents.map((middle) => (
                      <div key={middle.id} className="bg-layer2 p-3 rounded-lg shadow">
                        <div className="flex items-center space-x-4 mb-2">
                          <div className="flex flex-row  w-[460px]">
                            <div>
                              <h3 className="text-lg font-semibold mr-4">Middle Agent: {middle.name}</h3>
                            </div>

                          </div>

                          <div className="pt-1 flex items-center   mr-2 flex-row w-[300px]">
                            <p className="text-slate-300 mr-2">Commission: </p>
                            {edit.id === middle.id && edit.agentType === "midAgent" ? (
                              <input
                                type="number"
                                name="commission"
                                value={formData.find((item) => item.id === middle.id && item.type === "midAgent")?.commission ?? middle.percentage}
                                onChange={(e) => handleInputChange(e, "midAgent", middle.name, middle.id, middle.parent_percentage, middle.head_agent)}
                                className="w-14 p-2 rounded-md bg-darkbg mr-2 text-slate-100 border border-textHeading focus:outline-none focus:ring focus:ring-textHeading"
                              />
                            ) : (
                              <span className="mr-2"> {formData.find((item) => item.id === middle.id && item.type === "midAgent")?.commission ?? middle.percentage}%</span>
                            )}

                            <p className="text-slate-300 mr-2">Parent: </p>

                            {edit.id === middle.id && edit.agentType === "midAgent" ? (
                              <input
                                name="parent"
                                type="number"
                                value={formData.find((item) => item.id === middle.id && item.type === "midAgent")?.parent ?? middle.parent_percentage}
                                onChange={(e) => handleParentChange(e, "midAgent", middle.name, middle.id, middle.percentage, middle.head_agent)}
                                className="w-14 p-2 rounded-md bg-darkbg text-slate-100 border border-textHeading focus:outline-none focus:ring focus:ring-textHeading"
                              />
                            ) : (
                              <span className="mr-2">
                                {formData.find((item) => item.id === middle.id && item.type === "midAgent")?.parent ?? middle.parent_percentage}%
                              </span>
                            )}


                          </div>



                          <div className="flex  space-x-2">
                            {edit.id === middle.id && edit.agentType === "midAgent" ? (
                              <button
                              type="button" 
                                onClick={handleCancelEdit}
                                className="text-red-500 hover:text-red-700"
                              >
                                <FontAwesomeIcon icon={faTimes} />
                              </button>
                            ) : (
                              <button
                              type="button" 
                                onClick={() => handleEdit(middle.id, "midAgent")}
                                className="text-textHeading hover:text-purple-700 "
                              >
                                <FontAwesomeIcon icon={faEdit} />
                              </button>
                            )}
                            <FontAwesomeIcon
                              icon={faTrash}
                              className="text-red-500 pt-1 cursor-pointer"
                              onClick={() => handleDelete(middle.id, "midAgent")}
                            />
                          </div>
                        </div>

                        {toggle && deleteAgentId === middle.id && deleteAgentType === "midAgent" && (
                          <DeleteAgent setShow={setToggle} id={middle.id} agentType="midAgent" name={middle.name} deleteAgent={handleDeleteAgent} />
                        )}
                        <ul className="mt-2 space-y-2">
                          {middle.baseAgents && middle.baseAgents.length ? (
                            middle.baseAgents.map((base) => (
                              <li key={base.id} className="flex items-center space-x-4 bg-layer2 p-2 rounded-md shadow text-sm">
                                <div className="flex flex-row w-[452px]">
                                  <div>
                                    <p className="font-semibold mr-4">Base Agent: {base.name}</p>
                                  </div>

                                </div>

                                <div className="pt-1 flex items-center  flex-row w-[292px] text-slate-300">
                                  <p className="mr-2 ">
                                    Commission:
                                  </p>

                                  {edit.id === base.id && edit.agentType === "baseAgent" ? (
                                    <input
                                      type="number"
                                      name="commission"
                                      value={formData.find((item) => item.id === base.id && item.type === "baseAgent")?.commission ?? base.percentage}
                                      onChange={(e) => handleInputChange(e, "baseAgent", base.name, base.id, base.parent_percentage, base.mid_agent)}
                                      className="w-14 p-2 rounded-md bg-darkbg mr-2 text-slate-100 border border-textHeading focus:outline-none focus:ring focus:ring-textHeading"
                                    />
                                  ) : (
                                    <span className="mr-2"> {formData.find((item) => item.id === base.id && item.type === "baseAgent")?.commission ?? base.percentage}%</span>
                                  )}

                                  <p className="text-slate-300 mr-2">Parent: </p>

                                  {edit.id === base.id && edit.agentType === "baseAgent" ? (
                                    <input
                                      name="parent"
                                      type="number"
                                      value={formData.find((item) => item.id === base.id && item.type === "baseAgent")?.parent ?? base.parent_percentage}
                                      onChange={(e) => handleParentChange(e, "baseAgent", base.name, base.id, middle.percentage, base.mid_agent)}
                                      className="w-14 p-2 rounded-md bg-darkbg text-slate-100 border border-textHeading focus:outline-none focus:ring focus:ring-textHeading"
                                    />
                                  ) : (
                                    <span className="mr-2">
                                      {formData.find((item) => item.id === base.id && item.type === "baseAgent")?.parent ?? base.parent_percentage}%
                                    </span>
                                  )}
                                </div>

                                {toggle && deleteAgentId === base.id && deleteAgentType === "baseAgent" && (
                                  <DeleteAgent setShow={setToggle} id={base.id} agentType="baseAgent" name={base.name} deleteAgent={handleDeleteAgent} />
                                )}



                                <div className="flex pl-2  space-x-2">
                                  {edit.id === base.id && edit.agentType === "baseAgent" ? (
                                    <button
                                    type="button" 
                                      onClick={handleCancelEdit}
                                      className="text-red-500 hover:text-red-700"
                                    >
                                      <FontAwesomeIcon icon={faTimes} />
                                    </button>
                                  ) : (
                                    <button
                                    type="button" 
                                      onClick={() => handleEdit(base.id, "baseAgent")}
                                      className="text-textHeading hover:text-purple-700 "
                                    >
                                      <FontAwesomeIcon icon={faEdit} />
                                    </button>
                                  )}
                                  <FontAwesomeIcon
                                    icon={faTrash}
                                    className="text-red-500 pt-1 cursor-pointer"
                                    onClick={() => handleDelete(base.id, "baseAgent")}
                                  />
                                </div>
                              </li>
                            ))
                          ) : (
                            <li className="text-slate-300 text-sm">No Base Agents</li>
                          )}
                        </ul>
                      </div>
                    ))
                  ) : (
                    <p className="text-slate-300 text-sm">No Middle Agents</p>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="w-full flex items-center justify-center">
            <div className="w-[300px] flex items-center justify-center">
              <button 
                disabled={formData.length === 0}
                className={`mt-4 px-4 py-2 rounded w-full transform transition duration-300 ease-in-out ${formData.length === 0
                    ? 'bg-gray-400 text-gray-200 cursor-not-allowed'
                    : 'bg-textHeading text-white hover:scale-105 focus:ring-2 focus:ring-textHeading'
                  }`}
                type="submit"
              >
                Update
              </button>

            </div>
          </div>
        </form>

      )}


      {toggleDelete && (
        <div className={`absolute right-5 top-28 ${toggleDelete ? 'notification-enter' : 'notification-exit'}`}>
          <Notification setToggle={setToggleDelete} message="Agent is Deleted." heading="Deleted!" />
        </div>
      )}

      {toggleUpdate && (
        <div className={`absolute right-5 top-28 ${toggleUpdate ? 'notification-enter' : 'notification-exit'}`}>
          <Notification setToggle={setToggleUpdate} message="Agents is updated." heading="Updated!" />
        </div>
      )}
    </section>
  );
};

export default ManageAgents;
