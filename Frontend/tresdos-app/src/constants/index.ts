import {  faSignOutAlt} from '@fortawesome/free-solid-svg-icons';
import { faUserEdit,faHome,faBlog, faUser} from '@fortawesome/free-solid-svg-icons';


export const navItems = [
    {text: "Home", link: '/dashboard/home'},
    {text: "Blog", link: '/dashboard/blog'},
    {text: "Profile", link:'/dashboard/profile'}
]


export const menuItems = [

    { icon: faHome, text: "Home", url: '/dashboard/home' },
    { icon: faUser, text: "Profile", url: '/dashboard/profile' },
    { icon: faUserEdit, text: "Manage Users", url: '/dashboard/user' },
    { icon: faBlog, text: "Blog", url: '/dashboard/blog' },
   
    { icon: faSignOutAlt, text: "Logout",  }
 
]