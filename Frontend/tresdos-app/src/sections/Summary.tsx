import React, { useState, useRef } from "react";

import { useEffect } from "react";
import { getAgentsJson,AgentData } from "../services/agents";


const Summary = () => {

  const [agentsData,setAgentsData] = useState<AgentData[]>([])
  const [formData, setFormData] = useState<
    {
      id: number;
      name: string;
      type: string;
      commission: number;
      parentId: number | null;
    }[]
  >([]);

  const handleAgentsData = async() => {
    try {
      const response = await getAgentsJson();

      if(response.status === 200) {
        setAgentsData(response.data);
        console.log(response.data);
      }
    } catch(error) {
      alert("Under Maintenance. Please Wait.")
    }
  }

  useEffect(() => {
    handleAgentsData();

  },[])

 

  const inputRefs = useRef<{ [key: string]: HTMLInputElement | null }>({});


  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    agentType: string,
    agentId: number,
    parentId: number | null
  ) => {
    const value = parseFloat(e.target.value);
    setFormData((prevData) => {
      const existingIndex = prevData.findIndex((item) => item.id === agentId);
      if (existingIndex > -1) {
        const updatedData = [...prevData];
        updatedData[existingIndex].commission = value;
        return updatedData;
      } else {
        return [
          ...prevData,
          {
            id: agentId,
            name: e.target.placeholder.split(" ")[2], // Extract name from placeholder
            type: agentType,
            commission: value,
            parentId,
          },
        ];
      }
    });
  };

  // Handle keydown to navigate inputs
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
        e.key === "ArrowDown"
          ? currentIndex + 1
          : Math.max(currentIndex - 1, 0);

      if (inputs[newIndex]) {
        inputs[newIndex].focus();
      }
    }
  };


  return (
    <section className="bg-darkbg w-full min-h-screen h-auto  p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        <h1 className="text-2xl font-bold text-slate-100">Agent Hierarchy</h1>
        {agentsData.map((head) => (
          <div
            key={head.id}
            className="bg-layer1 p-4 rounded-lg shadow-lg text-slate-100"
          >
            <div className="flex items-center space-x-4 mb-4">
              <h2 className="text-xl font-semibold mr-4">
                Head Agent: {head.name}
              </h2>
              <input
                type="number"
                placeholder={`Input for ${head.name}`}
                onChange={(e) =>
                  handleChange(e, "headAgent", head.id, null)
                }
                onKeyDown={(e) =>
                  handleKeyDown(
                    e,
                    "headAgent",
                    head.id,
                    "middleAgent",
                    head.middleAgents?.[0]?.id || null
                  )
                }
                ref={(el) => (inputRefs.current[`headAgent${head.id}`] = el)}
                className="p-2 rounded-md bg-darkbg text-slate-100 border border-textHeading focus:outline-none focus:ring focus:ring-textHeading"
              />
            </div>
            {head.middleAgents?.map((middle) => (
              <div key={middle.id} className="ml-4 bg-layer2 p-3 rounded-lg">
                <div className="flex items-center space-x-4">
                  <h3 className="text-lg font-semibold">
                    Middle Agent: {middle.name}
                  </h3>
                  <input
                    type="number"
                    placeholder={`Input for ${middle.name}`}
                    onChange={(e) =>
                      handleChange(e, "middleAgent", middle.id, head.id)
                    }
                    onKeyDown={(e) =>
                      handleKeyDown(
                        e,
                        "middleAgent",
                        middle.id,
                        "baseAgent",
                        middle.baseAgents?.[0]?.id || null
                      )
                    }
                    ref={(el) =>
                      (inputRefs.current[`middleAgent${middle.id}`] = el)
                    }
                    className="p-2 rounded-md bg-darkbg text-slate-100 border border-textHeading focus:outline-none focus:ring focus:ring-textHeading"
                  />
                </div>
                {middle.baseAgents?.map((base) => (
                  <div key={base.id} className="ml-8 bg-layer3 p-2 rounded-md">
                    <p className="font-semibold">Base Agent: {base.name}</p>
      
                    <input
                      type="number"
                      placeholder={`Input for ${base.name}`}
                      onChange={(e) =>
                        handleChange(e, "baseAgent", base.id, middle.id)
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
                        (inputRefs.current[`baseAgent${base.id}`] = el)
                      }
                      className="p-2 rounded-md bg-darkbg text-slate-100 border border-textHeading focus:outline-none focus:ring focus:ring-textHeading"
                    />
                  </div>
                ))}
              </div>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
};

export default Summary;
