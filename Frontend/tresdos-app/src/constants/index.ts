import {  faSignOutAlt} from '@fortawesome/free-solid-svg-icons';
import { faUserEdit,faTable ,faTasks, faUser,faFileCirclePlus,faClipboardList} from '@fortawesome/free-solid-svg-icons';


export const navItems = [
    {text: "Analytics", link: '/dashboard/analytics'},
    {text: "Agents", link: '/dashboard/manage-agent'},
    {text: "Tracking", link:'/dashboard/tracking'}
]



export const menuItems = [
    { icon: faUser, text: "Create Agents", url: '/dashboard/create-agent' },
    { icon: faUserEdit, text: "Manage Agents", url: '/dashboard/manage-agent' },
    { icon: faFileCirclePlus, text: "Create Report", url: '/dashboard/entry' },
    { icon: faTasks, text: "Tracking", url: '/dashboard/tracking' },
    { icon: faTable, text: "Agents Summary", url: '/dashboard/agents-summary' }, // Added Agents Summary
    { icon: faSignOutAlt, text: "Logout" }
];


export const months = [
    { month: 'January' },
    { month: 'February' },
    { month: 'March' },
    { month: 'April' },
    { month: 'May' },
    { month: 'June' },
    { month: 'July' },
    { month: 'August' },
    { month: 'September' },
    { month: 'October' },
    { month: 'November' },
    { month: 'December' }
  ];
  