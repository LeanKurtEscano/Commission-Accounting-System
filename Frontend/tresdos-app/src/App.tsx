import { useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import './App.css';
import { MyProvider, useMyContext } from './context/MyContext';
import useTokenHandler from './hooks/useTokenHandler';
import Navbar from './layouts/Navbar'
import Login from './sections/Login';
import ProtectedRoutes from './protected/ProtectedRoutes';
import Dashboard from './sections/Dashboard';
import Entry from './sections/Entry';
import LogOut from './components/LogOut';
import Analytics from './sections/Analytics';
import CreateAgent from './sections/CreateAgent';
import Email from './sections/Email';
import Tracking from './sections/Tracking';
import Otp from './sections/Otp';
import TrackingDetails from './layouts/TrackingDetails';
import ManageAgents from './sections/ManageAgents';
import ResetPassword from './sections/ResetPassword';
function App() {
  return (
    <MyProvider>
      <Main />
    </MyProvider>
  );
}

const Main = () => {
  const location = useLocation();
  const { isAuthenticated, toggleLog } = useMyContext();
  const navigate = useNavigate();
  useTokenHandler();


  useEffect(() => {
    if (isAuthenticated) {
      localStorage.setItem('currentPath', location.pathname);
    }
  }, [location, isAuthenticated]);

  useEffect(() => {
    const savedPath = localStorage.getItem('currentPath');
    if (savedPath) {
      navigate(savedPath);
    } else if (isAuthenticated && location.pathname === '/') {
      navigate('/dashboard/analytics');
    }
  }, []);

  return (
    <>


      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/email" element={<Email />} />
        <Route path="/otp" element={<Otp />} />
        <Route path="/reset" element={<ResetPassword />} />

        <Route
          path="/dashboard/*"
          element={
            <ProtectedRoutes>
              {toggleLog && (
                <LogOut />
              )}

             
              <Dashboard />
            </ProtectedRoutes>
          }
        >
          <Route path="analytics" element={<Analytics />} />
          <Route path="entry" element={<Entry />} />
          <Route path="create-agent" element = {<CreateAgent />} />
          <Route path="tracking" element={<Tracking />} />
          <Route path='tracking/:reportId' element={ <TrackingDetails />}/>
          <Route path="manage-agent" element={<ManageAgents />} />
          
        </Route>

      </Routes>

    </>
  )
}

export default App
