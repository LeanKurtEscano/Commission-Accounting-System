import React, { useState, useRef } from "react";
import { data } from "../constants";




interface BaseAgentInput {
  id: number;
  baseAgentInput: string;
}

interface MiddleAgentInput {
  id: number;
  middleAgentInput: string;
  baseAgents: BaseAgentInput[];
}
interface FormData {
  [key: number]: {
    headAgentInput: string;
    middleAgents: MiddleAgentInput[];
  };
}

const Summary = () => {
  
  const [formData, setFormData] = useState<FormData>(() => {
    const initData: FormData = {};
    data.forEach((head) => {
      initData[head.id] = {
        headAgentInput: "",
        middleAgents: head.middleAgents?.map((middle) => ({
          id: middle.id,
          middleAgentInput: "",
          baseAgents: middle.baseAgents?.map((base) => ({
            id: base.id,
            baseAgentInput: "",
          })) || [],
        })) || [],
      };
    });
    return initData;
  });

  // Refs for input elements
  const inputRefs = useRef<{ [key: string]: HTMLInputElement | null }>({});

  // Handle input changes
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    agentType: string,
    agentId: number,
    field: string
  ) => {
    const { value } = e.target;
  };

  // Handle keydown to move focus
  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    groupType: string, // 'headAgent', 'middleAgent', 'baseAgent'
    currentId: number,
    nextGroupType: string, // The next group type to move to
    nextId: number
  ) => {
    // Arrow Down functionality
    if (e.key === "ArrowDown") {
      // Prevent the default action of the arrow down key
      e.preventDefault();
  
      // Find all input elements in the form
      const allInputs = document.querySelectorAll('input[type="number"]');
  
      // Find the current input element
      const currentInputIndex = Array.from(allInputs).findIndex(
        (input) => input === e.target
      );
  
      // If a valid index is found, move to the next input
      if (currentInputIndex !== -1 && currentInputIndex < allInputs.length - 1) {
        const nextInput = allInputs[currentInputIndex + 1] as HTMLInputElement;
        nextInput.focus(); // Focus the next input element
      }
    }
  
    // Arrow Up functionality
    if (e.key === "ArrowUp") {
      // Prevent the default action of the arrow up key
      e.preventDefault();
  
      // Find all input elements in the form
      const allInputs = document.querySelectorAll('input[type="number"]');
  
      // Find the current input element
      const currentInputIndex = Array.from(allInputs).findIndex(
        (input) => input === e.target
      );
  
      // If a valid index is found, move to the previous input
      if (currentInputIndex !== -1 && currentInputIndex > 0) {
        const prevInput = allInputs[currentInputIndex - 1] as HTMLInputElement;
        prevInput.focus(); // Focus the previous input element
      }
    }
  };
  
  
  return (
    <section className="bg-darkbg w-full min-h-screen p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        <h1 className="text-2xl font-bold text-slate-100">Agent Hierarchy</h1>
        {data.map((head) => (
          <div
            key={head.id}
            className="bg-layer1 p-4 rounded-lg shadow-lg text-slate-100"
          >
            <div className="flex items-center space-x-4 mb-4">
              <div className="flex flex-row w-[640px]">
                <div>
                  <h2 className="text-xl font-semibold mr-4">
                    Head Agent: {head.headAgent}
                  </h2>
                </div>
                <div className="pt-1">
                  <p className="text-slate-300">(Commission: {head.commission}%)</p>
                </div>
              </div>
              <div className="flex flex-col items-end">
                <input
                  type="number"
                  value={formData[head.id]?.headAgentInput || ""}
                  onChange={(e) =>
                    handleInputChange(e, "headAgent", head.id, "headAgentInput")
                  }
                  placeholder={`Input for ${head.headAgent}`}
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
              {/* Ensure middleAgents is not undefined before rendering */}
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
                            (Commission: {middle.commission}%, Parent: {middle.parentCommission}%)
                          </p>
                        </div>
                      </div>
                      <div className="flex flex-col items-end">
                        <input
                          type="number"
                          value={
                            formData[head.id]?.middleAgents?.find(
                              (middleAgent) => middleAgent.id === middle.id
                            )?.middleAgentInput || 0
                          }
                          onChange={(e) =>
                            handleInputChange(
                              e,
                              "middleAgent",
                              middle.id,
                              "middleAgentInput"
                            )
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
                      {/* Ensure baseAgents is not undefined before rendering */}
                      {middle.baseAgents && middle.baseAgents.length ? (
                        middle.baseAgents.map((base) => (
                          <li
                            key={base.id}
                            className="flex items-center space-x-4 bg-layer2 p-2 rounded-md shadow text-sm"
                          >
                            <div className="flex flex-row w-[800px]">
                              <div>
                                <p className="font-semibold mr-4">Base Agent: {base.name}</p>
                              </div>
                              <div className="pt-1">
                                <p className="text-slate-300">
                                  (Commission: {base.commission}%, Parent: {base.parentCommission}%)
                                </p>
                              </div>
                            </div>

                            <div className="flex flex-col items-end">
                              <input
                                type="number"
                                value={
                                  formData[head.id]?.middleAgents
                                    ?.find(
                                      (middleAgent) => middleAgent.id === middle.id
                                    )
                                    ?.baseAgents?.find(
                                      (baseAgent) => baseAgent.id === base.id
                                    )?.baseAgentInput || 0
                                }
                                onChange={(e) =>
                                  handleInputChange(
                                    e,
                                    "baseAgent",
                                    base.id,
                                    "baseAgentInput"
                                  )
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

export default Summary;
