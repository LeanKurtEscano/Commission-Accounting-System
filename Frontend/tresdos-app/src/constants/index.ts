import {  faSignOutAlt} from '@fortawesome/free-solid-svg-icons';
import { faUserEdit,faChartLine,faTasks, faUser} from '@fortawesome/free-solid-svg-icons';


export const navItems = [
    {text: "Analytics", link: '/dashboard/analytics'},
    {text: "Users", link: '/dashboard/entry'},
    {text: "Tracking", link:'/dashboard/tracking'}
]


export const menuItems = [

    { icon: faChartLine, text: "Analytics", url: '/dashboard/analytics' },
    { icon: faUser, text: "Create User", url: '/dashboard/create-agent' },
    { icon: faUserEdit, text: "Manage Agents", url: '/dashboard/entry' },
    { icon: faTasks, text: "Tracking", url: '/dashboard/tracking' },
    { icon: faSignOutAlt, text: "Logout",  }
 
]