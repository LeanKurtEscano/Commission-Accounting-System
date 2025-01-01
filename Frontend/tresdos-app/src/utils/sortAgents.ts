import { AgentData } from "../services/agents";
import { ReportDetails } from "../layouts/TrackingDetails";
import { AgentSummary } from "../sections/AgentsSummary";
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
    })).sort((a,b) => a.name.localeCompare(b.name) );
  };


export const sortAgentsByIncome = (data: ReportDetails[]): ReportDetails[] => {
  return data.sort((a,b) => b.income - a.income );
}

export const sortAgentsByIncomeSummary = (data: AgentSummary[]): AgentSummary[] => {
  return data.sort((a,b) => b.totalAmount - a.totalAmount );
}