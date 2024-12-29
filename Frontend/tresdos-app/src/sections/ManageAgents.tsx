import React, { useState, useEffect, useRef } from "react";
import { sortAgentsByName } from "../utils/sortAgents";
import { getAgentsJson, AgentData } from "../services/agents";
import { makeUpdate } from "../services/agents";
import Notification from '../components/Notification'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faTimes, faTrashAlt } from '@fortawesome/free-solid-svg-icons';

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
  const [toggleCreate, setToggleCreate] = useState(false);
  const [formData, setFormData] = useState<UpdateData[]>([]);
  const [edit, setEdit] = useState<editData>({
    id: null,
    agentType: "",
  }); // Track which agent is being edited

  const inputRefs = useRef<{ [key: string]: HTMLInputElement | null }>({});

  useEffect(() => {
    const handleAgentsData = async () => {
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
      parent: existingAgent?.parent ?? 0, // Keep current parent value unless changed
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
      commission: existingAgent?.commission ?? 0,
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


  const handleEditHead = (agentId: number, agentType: string) => {
    setEdit({
      id: agentId,
      agentType: agentType
    }
    ); // Enable editing for the clicked agent
  };

  const handleEditMid = (agentId: number, agentType: string) => {
    setEdit({
      id: agentId,
      agentType: agentType
    }
    );
  };

  const handleEditBase = (agentId: number, agentType: string) => {
    setEdit({
      id: agentId,
      agentType: agentType
    }
    );
  };


  const handleCancelEdit = () => {
    setEdit({
      id: null,
      agentType: "",
    }); // Cancel editing
  };

  const handleDelete = (agentId: number, agentType: string) => {
    // Handle delete logic here
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await makeUpdate();
    if (response.status === 201) {
      setToggleCreate(true);
    } else {
      alert("Something Went Wrong");
    }
  };

  return (
    <section className="bg-darkbg w-full min-h-screen pt-10 pb-10 h-auto">
      <form onSubmit={handleSubmit}>
        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl font-bold text-slate-100 mb-6">Manage Agents</h1>
        </div>

        <div className="max-w-4xl mt-4 mx-auto space-y-6">
          {agentsData.map((head) => (
            <div key={head.id} className="bg-layer1 p-4 rounded-lg shadow-lg text-slate-100">
              <div className="flex items-center space-x-4 mb-4">
                <div className="flex flex-row border-2 w-[500px]">
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
                        formData.find((item) => item.id === head.id && item.type === "headAgent")?.commission}
                      onChange={(e) => handleInputChange(e, "headAgent", head.name, head.id, null, null)}
                      className="w-14 p-2 rounded-md bg-darkbg text-slate-100 border border-textHeading focus:outline-none focus:ring focus:ring-textHeading"
                    />
                  ) : (
                    <span> {formData.find((item) => item.id === head.id)?.commission ?? head.percentage}%</span>
                  )}
                </div>
                <div className="flex border-2 flex-row items-end">
                  {/* Edit Icon */}
                  {edit.id === head.id && edit.agentType === "headAgent" ? (
                    <button
                      onClick={handleCancelEdit}
                      className="text-red-500 hover:text-red-700 text-xl p-2"
                    >
                      <FontAwesomeIcon icon={faTimes} />
                    </button>
                  ) : (
                    <button
                      onClick={() => handleEditHead(head.id, "headAgent")}
                      className="text-textHeading hover:text-purple-700 text-xl p-2"
                    >
                      <FontAwesomeIcon icon={faEdit} />
                    </button>
                  )}

                  {/* Delete Icon */}
                  <button
                    onClick={() => handleDelete(head.id, "headAgent")}
                    className="text-red-500 hover:text-red-700 text-xl p-2"
                  >
                    <FontAwesomeIcon icon={faTrashAlt} />
                  </button>
                </div>
              </div>

              <div className="mt-4 space-y-4">
                {head.middleAgents && head.middleAgents.length > 0 ? (
                  head.middleAgents.map((middle) => (
                    <div key={middle.id} className="bg-layer2 p-3 rounded-lg shadow">
                      <div className="flex items-center space-x-4 mb-2">
                        <div className="flex flex-row border-2 w-[460px]">
                          <div>
                            <h3 className="text-lg font-semibold mr-4">Middle Agent: {middle.name}</h3>
                          </div>

                        </div>

                        <div className="pt-1 flex items-center  border-2 mr-2 flex-row w-[300px]">
                          <p className="text-slate-300 mr-2">Commission: </p>
                          {edit.id === middle.id && edit.agentType === "midAgent" ? (
                            <input
                              type="number"
                              name="commission"
                              value={formData.find((item) => item.id === middle.id && item.type === "midAgent")?.commission}
                              onChange={(e) => handleInputChange(e, "midAgent", middle.name, middle.id, null, middle.head_agent)}
                              className="w-14 p-2 rounded-md bg-darkbg mr-2 text-slate-100 border border-textHeading focus:outline-none focus:ring focus:ring-textHeading"
                            />
                          ) : (
                            <span className="mr-2"> {formData.find((item) => item.id === middle.id)?.commission ?? middle.percentage}%</span>
                          )}

                          <p className="text-slate-300 mr-2">Parent: </p>

                          {edit.id === middle.id && edit.agentType === "midAgent" ? (
                            <input
                              name="parent"
                              type="number"
                              value={formData.find((item) => item.id === middle.id && item.type === "midAgent")?.parent ?? middle.parent_percentage}
                              onChange={(e) => handleParentChange(e, "midAgent", middle.name, middle.id, middle.head_agent)}
                              className="w-14 p-2 rounded-md bg-darkbg text-slate-100 border border-textHeading focus:outline-none focus:ring focus:ring-textHeading"
                            />
                          ) : (
                            <span className="mr-2">
                              {formData.find((item) => item.id === middle.id)?.parent ?? middle.parent_percentage}%
                            </span>
                          )}


                        </div>



                        <div className="flex border-2 space-x-2">
                          {edit.id === middle.id && edit.agentType === "midAgent" ? (
                            <button
                              onClick={handleCancelEdit}
                              className="text-red-500 hover:text-red-700"
                            >
                              <FontAwesomeIcon icon={faTimes} />
                            </button>
                          ) : (
                            <button
                              onClick={() => handleEditMid(middle.id, "midAgent")}
                              className="text-textHeading hover:text-purple-700 "
                            >
                              <FontAwesomeIcon icon={faEdit} />
                            </button>
                          )}
                          <FontAwesomeIcon
                            icon={faTrash}
                            className="text-red-500 pt-1 cursor-pointer"
                            onClick={() => handleEditMid(middle.id, "middle")}
                          />
                        </div>
                      </div>
                      <ul className="mt-2 space-y-2">
                        {middle.baseAgents && middle.baseAgents.length ? (
                          middle.baseAgents.map((base) => (
                            <li key={base.id} className="flex items-center space-x-4 bg-layer2 p-2 rounded-md shadow text-sm">
                              <div className="flex flex-row w-[800px]">
                                <div>
                                  <p className="font-semibold mr-4">Base Agent: {base.name}</p>
                                </div>
                                <div>
                                  <p className="text-slate-300">
                                    (Commission: {base.percentage}%, Parent: {base.parent_percentage}%)
                                  </p>
                                </div>
                              </div>
                              <div className="flex space-x-2">
                                <FontAwesomeIcon
                                  icon={faEdit}
                                  className="text-textHeading cursor-pointer"
                                  onClick={() => handleEditBase(base.id, "baseAgent")}
                                />
                                <FontAwesomeIcon
                                  icon={faTrash}
                                  className="text-red-500 cursor-pointer"
                                  onClick={() => handleDelete(base.id, "base")}
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
              className="mt-4 px-4 py-2 bg-textHeading text-white rounded w-full transform transition duration-300 ease-in-out hover:scale-105 focus:ring-2 focus:ring-textHeading"
              type="submit"
            >
              Create
            </button>
          </div>
        </div>
      </form>

      {toggleCreate && (
        <div className={`absolute right-5 top-28 ${toggleCreate ? 'notification-enter' : 'notification-exit'}`}>
          <Notification setToggle={setToggleCreate} message="Report is created." heading="Success!" />
        </div>
      )}
    </section>
  );
};

export default ManageAgents;
