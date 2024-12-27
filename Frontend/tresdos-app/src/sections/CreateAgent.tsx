import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createAgents, getAgents } from '../services/agents';
import SuccessNotif from '../components/SuccessNotif';
import { validateAgentName } from '../constants/validation';
interface AgentProfile {
    agentName: string;
    agentType: string;
    percentage: number;
    assignedHeadAgent?: number;
    assignedMiddleAgent?: number;
    parentMidAgentPercentage?: number;
    parentHeadAgentPercentage?: number;
}

type fieldErrors = {
    agentError: string;
    commissionError: string;
}

type Agent = {
    id: number;
    name: string;

}

const CreateAgent: React.FC = () => {
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [toggleCreate, setToggleCreate] = useState(false);
    const [fieldErrors, setFieldErrors] = useState<fieldErrors>({
        agentError: "",
        commissionError: "",
    });
    const [headAgents, setHeadAgents] = useState<Agent[]>([])
    const [midAgents, setMidAgents] = useState<Agent[]>([])
    const [error, setError] = useState("")
    const [showHeadAgents, setShowHeadAgents] = useState(false);
    const [showMidAgents, setShowMidAgents] = useState(false);
    const [formData, setFormData] = useState<AgentProfile>({
        agentName: '',
        agentType: '',
        percentage: 0,
        assignedHeadAgent: undefined,
        assignedMiddleAgent: undefined,
        parentMidAgentPercentage: undefined,
        parentHeadAgentPercentage: undefined,
    });

    const navigate = useNavigate();

    const handleGoBack = () => {
        navigate('/dashboard/entry');
    };




    const handleAgents = async (agentType: string) => {
        try {


            if (agentType === 'Head Agent') {
                const response = await getAgents(agentType);
                setHeadAgents(response.data.agents);
            } else if (agentType === 'Mid Agent') {
                const response = await getAgents(agentType);
                setMidAgents(response.data.agents);
            }
        } catch (error) {

            alert("Something went wrong");
        }
    };



    const createMyAgents = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");


        const agentNameError = validateAgentName(formData.agentName);

        if (agentNameError) {
            setFieldErrors(prev => ({
                ...prev,
                agentError: agentNameError
            }));
        }


        try {
            const response = await createAgents(formData);
            if (response.status === 201) {
                setToggleCreate(true);
            }

        } catch (error: any) {
            const { status, data } = error.response;

            if (status === 400 && formData.agentType == "Mid Agent") {
                setError(data.error);
            }

            if (status === 400 && formData.agentType == "Base Agent") {
                setError(data.error);
            }

        }
    };

    useEffect(() => {
        if (toggleCreate) {
            const timer = setTimeout(() => {
                setToggleCreate(false);
            }, 7000);
            return () => clearTimeout(timer);
        }
    }, [toggleCreate]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prevData => {
            const updatedData = { ...prevData, [name]: name === 'percentage' ? parseInt(value) : value };
            console.log(updatedData);
            return updatedData;
        });

        if (name === 'agentType') {
            if (value === 'Mid Agent') {

                handleAgents('Head Agent');
                setShowHeadAgents(true);
                setShowMidAgents(false);
            } else if (value === 'Base Agent') {

                handleAgents('Mid Agent');
                setShowMidAgents(true);
                setShowHeadAgents(false);
            } else {
                setShowHeadAgents(false);
                setShowMidAgents(false);
            }
        }
    };


    return (
        <section className="flex items-center h-auto min-h-screen pb-11 justify-center bg-darkbg">
            <div className="md:w-[500px] w-[230px] bg-darkbg p-4 sm:p-6">
                <div className="flex md:flex-row">
                    <h1 className="text-slate-200 md:mr-44 text-3xl font-bold mb-4">Create Agent</h1>
                    <div className="pl-6 md:pl-0">
                        <button
                            onClick={handleGoBack}
                            className="flex items-center pb-2 py-2 text-white rounded-lg"
                        >
                            <span className="mr-2 text-xl">&larr;</span> Go Back
                        </button>
                    </div>
                </div>

                <form className="space-y-4" onSubmit={createMyAgents}>
                    <div>
                        <label htmlFor="agentName" className="block text-slate-100 text-sm font-medium">
                            Agent Name:
                        </label>
                        <input
                            id="agentName"
                            name="agentName"
                            type="text"
                            value={formData.agentName}
                            onChange={handleChange}
                            className={`mt-1 p-2 border rounded w-full ${isEditing
                                ? 'border-inputcolor text-slate-300 placeholder:text-inputtext bg-inputcolor hover:bg-inputcolor focus:bg-inputcolor focus:ring-0 focus:border-inputcolor transition duration-300'
                                : 'text-slate-300 bg-inputcolor'
                                }`}
                        />
                    </div>

                    <div>
                        <label htmlFor="agentType" className="block text-slate-100 text-sm font-medium">
                            Agent Type:
                        </label>
                        <select
                            id="agentType"
                            name="agentType"
                            value={formData.agentType}
                            onChange={handleChange}
                            className="mt-1 p-2 border rounded w-full border-inputcolor text-slate-300 bg-inputcolor"
                        >
                            <option value="" disabled>Select Agent Type</option>
                            <option value="Head Agent">Head Agent</option>
                            <option value="Mid Agent">Mid Agent</option>
                            <option value="Base Agent">Base Agent</option>
                        </select>
                    </div>

                    {showHeadAgents && (
                        <div>
                            <label htmlFor="assignedHeadAgent" className="block text-slate-100 text-sm font-medium">
                                Assign to Head Agent:
                            </label>
                            <select
                                id="assignedHeadAgent"
                                name="assignedHeadAgent"
                                value={formData.assignedHeadAgent || ''}
                                onChange={handleChange}
                                className="mt-1 p-2 border rounded w-full border-inputcolor text-slate-300 bg-inputcolor"
                            >
                                <option value="" disabled>Select Head Agent</option>
                                {headAgents.map((agent) => (
                                    <option key={agent.id} value={agent.id}>{agent.name}</option>
                                ))}

                            </select>
                            {error && (
                                <div className='flex flex-row'>
                                    <p className='text-red-600'>{error}</p>
                                </div>
                            )}
                        </div>

                    )}

                    {showHeadAgents && (
                        <div>
                            <label htmlFor="parentHeadAgentPercentage" className="block text-slate-100 text-sm font-medium">
                               Parent Agent Percentage
                            </label>
                            <input
                                id="parentHeadAgentPercentage"
                                name="parentHeadAgentPercentage"
                                type="number"
                                value={formData.parentHeadAgentPercentage}
                                onChange={handleChange}
                                className="mt-1 p-2 border rounded w-full border-inputcolor text-slate-300 placeholder:text-inputtext bg-inputcolor"
                            />
                        </div>

                    )}

                    {showMidAgents && (
                        <div>
                            <label htmlFor="assignedMiddleAgent" className="block text-slate-100 text-sm font-medium">
                                Assign to Mid Agent:
                            </label>
                            <select
                                id="assignedMiddleAgent"
                                name="assignedMiddleAgent"
                                value={formData.assignedMiddleAgent || ''}
                                onChange={handleChange}
                                className="mt-1 p-2 border rounded w-full border-inputcolor text-slate-300 bg-inputcolor"
                            >
                                <option value="" disabled>Select Mid Agent</option>
                                {midAgents.map((agent) => (
                                    <option key={agent.id} value={agent.id}>{agent.name}</option>
                                ))}
                            </select>

                            {error && (
                                <div className='flex pt-1 flex-row'>
                                    <p className='text-red-600'>{error}</p>
                                </div>
                            )}
                        </div>
                    )}


                    {showMidAgents && (
                        <div>
                            <label htmlFor="parentMidAgentPercentage" className="block text-slate-100 text-sm font-medium">
                               Parent Agent Percentage
                            </label>
                            <input
                                id="parentMidAgentPercentage"
                                name="parentMidAgentPercentage"
                                type="number"
                                value={formData.parentMidAgentPercentage}
                                onChange={handleChange}
                                className="mt-1 p-2 border rounded w-full border-inputcolor text-slate-300 placeholder:text-inputtext bg-inputcolor"
                            />
                        </div>

                    )}


                    <div>
                        <label htmlFor="percentage" className="block text-slate-100 text-sm font-medium">
                            Commission Percentage
                        </label>
                        <input
                            id="percentage"
                            name="percentage"
                            type="number"
                            value={formData.percentage}
                            onChange={handleChange}
                            className="mt-1 p-2 border rounded w-full border-inputcolor text-slate-300 placeholder:text-inputtext bg-inputcolor"
                        />
                    </div>

                    <button
                        type="submit"
                        className="mt-4 px-4 py-2 bg-textHeading text-white rounded w-full transform transition duration-300 ease-in-out hover:scale-105 focus:ring-2 focus:ring-textHeading"
                    >
                        Create
                    </button>

                    {toggleCreate && (

                        <div className={`absolute right-5 top-28 ${toggleCreate ? 'notification-enter' : 'notification-exit'}`}>
                            <SuccessNotif setToggleCreate={setToggleCreate} />
                        </div>

                    )}
                </form>
            </div>
        </section>
    );
};

export default CreateAgent;
