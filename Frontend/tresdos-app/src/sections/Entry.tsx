import React, { useState, useEffect, useRef } from "react";
import { getAgentsJson, AgentData } from "../services/agents";


interface CommissionData {
  id: number;
  name:string;
  type: string;
  commission: number;
  parentId: number | null

}

const Entry = () => {
  const [agentsData, setAgentsData] = useState<AgentData[]>([]);
  const [formData, setFormData] = useState<CommissionData[]>([]);


  const inputRefs = useRef<{ [key: string]: HTMLInputElement | null }>({});

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    agentType: string,
    agentName: string,
    agentId: number,
    parentId: number | null
  ) => {
    const { name, value } = e.target;
 
    const updatedData = {
      id: agentId,
      name: agentName,
      type: agentType,
      commission: parseFloat(value),
      parentId: parentId,
    };
  
    setFormData((prevData) => {
      // Find the index using both `id` and `type` to uniquely identify the agent
      const existingIndex = prevData.findIndex(
        (item) => item.id === agentId && item.type === agentType
      );
  
      if (existingIndex !== -1) { // for updating the existing values

        const updatedFormData = [...prevData];
        updatedFormData[existingIndex] = updatedData;
        return updatedFormData;
      } else {
        // If the agent does not exist, append the new agent data
        return [...prevData, updatedData];
      }
    });
  };
  


  const handleAgentsData = async () => {
    try {
      const response = await getAgentsJson();

      if (response.status === 200) {
        setAgentsData(response.data);
      }
    } catch (error) {
      alert("Under Maintenance. Please Wait.");
    }
  };

  useEffect(() => {
    handleAgentsData();
  }, []);

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    agentType: string,
    currentId: number,
    nextType: string,
    nextId: number | null
  ) => {
    if (e.key === "ArrowDown" || e.key === "ArrowUp") {
      e.preventDefault();
      const inputs = Array.from(
        document.querySelectorAll('input[type="number"]')
      ) as HTMLInputElement[];
      const currentIndex = inputs.findIndex((input) => input === e.target);

      const newIndex =
        e.key === "ArrowDown" ? currentIndex + 1 : Math.max(currentIndex - 1, 0);

      if (inputs[newIndex]) {
        inputs[newIndex].focus();
      }
    }
  };

  useEffect(() => {
    console.log("Form Data Updated:", formData);
  }, [formData]);

  return (
    <section className="bg-darkbg w-full min-h-screen h-auto">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold text-slate-100 mb-6">Create Report</h1>
        <form className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="start-date"
                className="block text-sm mb-2 font-medium text-slate-100"
              >
                Start Date
              </label>
              <input
                type="date"
                id="start-date"
                className="w-full p-2 rounded-md bg-darkbg text-slate-100 border border-textHeading focus:outline-none focus:ring focus:ring-textHeading"
              />
            </div>
            <div>
              <label
                htmlFor="end-date"
                className="block text-sm font-medium mb-2 text-slate-100"
              >
                End Date
              </label>
              <input
                type="date"
                id="end-date"
                className="w-full p-2 rounded-md bg-darkbg text-slate-100 border focus:outline-none border-textHeading focus:ring focus:ring-textHeading"
              />
            </div>
          </div>
        </form>
      </div>

      <div className="max-w-4xl mt-4 mx-auto space-y-6">
        {agentsData.map((head) => (
          <div
            key={head.id}
            className="bg-layer1 p-4 rounded-lg shadow-lg text-slate-100"
          >
            <div className="flex items-center space-x-4 mb-4">
              <div className="flex flex-row w-[640px]">
                <div>
                  <h2 className="text-xl font-semibold mr-4">
                    Head Agent: {head.name}
                  </h2>
                </div>
                <div className="pt-1">
                  <p className="text-slate-300">(Commission: {head.percentage}%)</p>
                </div>
              </div>
              <div className="flex flex-col items-end">
                <input
                  type="number"
                  onChange={(e) =>
                    handleInputChange(e, "headAgent",head.name, head.id, null)
                  }
                  placeholder={`Input for ${head.name}`}
                  onKeyDown={(e) =>
                    handleKeyDown(
                      e,
                      "headAgent",
                      head.id,
                      "middleAgent",
                      head.middleAgents?.[0]?.id || head.id
                    )
                  }
                  ref={(el) => (inputRefs.current["headAgent" + head.id] = el)}
                  className="p-2 rounded-md bg-darkbg text-slate-100 border border-textHeading focus:outline-none focus:ring focus:ring-textHeading"
                />
              </div>
            </div>
            <div className="mt-4 space-y-4">
              {head.middleAgents && head.middleAgents.length > 0 ? (
                head.middleAgents.map((middle) => (
                  <div key={middle.id} className="bg-layer2 p-3 rounded-lg shadow">
                    <div className="flex items-center space-x-4 mb-2">
                      <div className="flex flex-row w-[800px]">
                        <div>
                          <h3 className="text-lg font-semibold mr-4">
                            Middle Agent: {middle.name}
                          </h3>
                        </div>
                        <div className="pt-1">
                          <p className="text-slate-300">
                            (Commission: {middle.percentage}%, Parent:{" "}
                            {middle.parent_percentage
                              ? middle.parent_percentage + "%"
                              : "N/A"})
                          </p>
                        </div>
                      </div>
                      <div className="flex flex-col items-end">
                        <input
                          type="number"
                          onChange={(e) =>
                            handleInputChange(e, "middleAgent",middle.name, middle.id, head.id)
                          }
                          onKeyDown={(e) =>
                            handleKeyDown(
                              e,
                              "middleAgent",
                              middle.id,
                              "baseAgent",
                              middle.baseAgents?.[0]?.id || middle.id
                            )
                          }
                          ref={(el) =>
                            (inputRefs.current["middleAgent" + middle.id] = el)
                          }
                          placeholder={`Input for ${middle.name}`}
                          className="p-2 rounded-md bg-darkbg text-slate-100 border border-textHeading focus:outline-none focus:ring focus:ring-textHeading"
                        />
                      </div>
                    </div>
                    <ul className="mt-2 space-y-2">
                      {middle.baseAgents && middle.baseAgents.length ? (
                        middle.baseAgents.map((base) => (
                          <li
                            key={base.id}
                            className="flex items-center space-x-4 bg-layer2 p-2 rounded-md shadow text-sm"
                          >
                            <div className="flex flex-row w-[800px]">
                              <div>
                                <p className="font-semibold mr-4">
                                  Base Agent: {base.name}
                                </p>
                              </div>
                              <div className="pt-1">
                                <p className="text-slate-300">
                                  (Commission: {base.percentage}%, Parent:{" "}
                                  {base.parent_percentage}%)
                                </p>
                              </div>
                            </div>

                            <div className="flex flex-col items-end">
                              <input
                                type="number"
                                onChange={(e) =>
                                  handleInputChange(e, "baseAgent",base.name, base.id, middle.id)
                                }
                                onKeyDown={(e) =>
                                  handleKeyDown(
                                    e,
                                    "baseAgent",
                                    base.id,
                                    "middleAgent",
                                    middle.id
                                  )
                                }
                                ref={(el) =>
                                  (inputRefs.current["baseAgent" + base.id] = el)
                                }
                                placeholder={`Input for ${base.name}`}
                                className="p-2 rounded-md bg-darkbg text-slate-100 border border-textHeading focus:outline-none focus:ring focus:ring-textHeading"
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
    </section>
  );
};

export default Entry;
