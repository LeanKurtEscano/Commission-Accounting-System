import {  faSignOutAlt} from '@fortawesome/free-solid-svg-icons';
import { faUserEdit,faChartLine,faTasks, faUser} from '@fortawesome/free-solid-svg-icons';


export const navItems = [
    {text: "Analytics", link: '/dashboard/analytics'},
    {text: "Users", link: '/dashboard/entry'},
    {text: "Tracking", link:'/dashboard/tracking'}
]
interface BaseAgent {
    id: number;
    name: string;
    commission: number;
    parentCommission: number;
  }
  
  interface MiddleAgent {
    id: number;
    name: string;
    commission: number;
    parentCommission: number;
    baseAgents?: BaseAgent[]; // Optional field
  }
  
  interface AgentData {
    id: number;
    headAgent: string;
    commission: number;
    middleAgents?: MiddleAgent[]; // Optional field
  }
export const data: AgentData[] = [
    {
      id: 1,
      headAgent: "Alexandra",
      commission: 10,
      middleAgents: [
        {
          id: 2,
          name: "Benjamin",
          commission: 8,
          parentCommission: 2, // Goes to head agent
          baseAgents: [
            { id: 3, name: "Charles", commission: 5, parentCommission: 1 },
            { id: 4, name: "Diana", commission: 5, parentCommission: 1 },
          ],
        },
        {
          id: 5,
          name: "Evelyn",
          commission: 8,
          parentCommission: 2,
          baseAgents: [
            { id: 6, name: "Frank", commission: 5, parentCommission: 1 },
            { id: 7, name: "Grace", commission: 5, parentCommission: 1 },
          ],
        },
      ],
    },
    {
      id: 8,
      headAgent: "Christopher",
      commission: 12,
      middleAgents: [
        {
          id: 9,
          name: "Hannah",
          commission: 9,
          parentCommission: 3,
          baseAgents: [
            { id: 10, name: "Ivan", commission: 6, parentCommission: 2 },
            { id: 11, name: "Jack", commission: 6, parentCommission: 2 },
          ],
        },
      ],
    },
    {
      id: 12,
      headAgent: "Lean",
      commission: 11,
    },
    {
      id: 13,
      headAgent: "Kurt",
      commission: 9,
      middleAgents: [
        {
          id: 14,
          name: "Hannah",
          commission: 7,
          parentCommission: 2,
          baseAgents: [],
        },
      ],
    },
  ];


export const menuItems = [

    { icon: faChartLine, text: "Analytics", url: '/dashboard/analytics' },
    { icon: faUser, text: "Create Agents", url: '/dashboard/create-agent' },
    { icon: faUserEdit, text: "Create Report", url: '/dashboard/entry' },
    { icon: faTasks, text: "Tracking", url: '/dashboard/tracking' },
    { icon: faSignOutAlt, text: "Logout",  }
 
]