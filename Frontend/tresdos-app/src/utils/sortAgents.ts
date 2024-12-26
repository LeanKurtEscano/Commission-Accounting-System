import { AgentData } from "../services/agents";

export const sortAgentsByName = (data: AgentData[]): AgentData[] => {
    return data.map((headAgent) => ({
      ...headAgent,
      middleAgents: headAgent.middleAgents
        ?.map((midAgent) => ({
          ...midAgent,
          baseAgents: [...(midAgent.baseAgents ?? [])].sort((a, b) =>
            a.name.localeCompare(b.name)
          ),
        }))
        .sort((a, b) => a.name.localeCompare(b.name)),
    }));
  };