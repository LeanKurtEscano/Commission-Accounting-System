import {  faSignOutAlt} from '@fortawesome/free-solid-svg-icons';
import { faUserEdit,faChartLine,faTasks, faUser,faFileCirclePlus} from '@fortawesome/free-solid-svg-icons';


export const navItems = [
    {text: "Analytics", link: '/dashboard/analytics'},
    {text: "Users", link: '/dashboard/entry'},
    {text: "Tracking", link:'/dashboard/tracking'}
]



export const menuItems = [

    { icon: faChartLine, text: "Analytics", url: '/dashboard/analytics' },
    { icon: faUser, text: "Create Agents", url: '/dashboard/create-agent' },
    { icon: faUserEdit, text: "Manage Agents", url: '/dashboard/manage-agent' },
    { icon: faFileCirclePlus, text: "Create Report", url: '/dashboard/entry' },
    { icon: faTasks, text: "Tracking", url: '/dashboard/tracking' },
    { icon: faSignOutAlt, text: "Logout",  }
 
]