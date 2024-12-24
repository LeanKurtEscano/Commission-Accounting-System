import React from 'react'

const Tracking = () => {
  const data = [
    {
      headAgent: "Alexandra",
      middleAgents: [
        {
          name: "Benjamin",
          baseAgents: ["Charles", "Diana"],
        },
        {
          name: "Evelyn",
          baseAgents: ["Frank", "Grace"],
        },
      ],
    },
    {
      headAgent: "Christopher",
      middleAgents: [
        {
          name: "Hannah",
          baseAgents: ["Ivan", "Jack"],
        },
      ],
    },
  ];
  return (
    <section className='bg-darkbg w-full min-h-screen'>
      <section className="bg-darkbg w-full min-h-screen p-6">
        <div className="max-w-4xl mx-auto space-y-6">
          <h1 className="text-2xl font-bold text-slate-100">Agent Hierarchy</h1>
          {data.map((head, index) => (
            <div
              key={index}
              className="bg- p-4 rounded-lg shadow-lg text-slate-100"
            >
              <h2 className="text-xl font-semibold">
                Head Agent: {head.headAgent}
              </h2>
              <div className="mt-4 space-y-4">
                {head.middleAgents.map((middle, midIndex) => (
                  <div
                    key={midIndex}
                    className="bg-slate-700 p-3 rounded-lg shadow"
                  >
                    <h3 className="text-lg font-semibold">
                      Middle Agent: {middle.name}
                    </h3>
                    <ul className="mt-2 space-y-2">
                      {middle.baseAgents.map((base, baseIndex) => (
                        <li
                          key={baseIndex}
                          className="bg-slate-600 p-2 rounded-md shadow text-sm"
                        >
                          Base Agent: {base}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>


    </section>
  )
}

export default Tracking