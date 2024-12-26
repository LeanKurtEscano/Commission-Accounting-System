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
import Summary from './sections/Summary';
import LogOut from './components/LogOut';
import Analytics from './sections/Analytics';
import CreateAgent from './sections/CreateAgent';
import Email from './sections/Email';
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

        <Route
          path="/dashboard/*"
          element={
            <ProtectedRoutes>
              {toggleLog && (
                <LogOut />
              )}

              <Navbar />
              <Dashboard />
            </ProtectedRoutes>
          }
        >
          <Route path="analytics" element={<Analytics />} />
          <Route path="entry" element={<Entry />} />
          <Route path="create-agent" element = {<CreateAgent />} />
          <Route path="tracking" element={<Summary />} />

        </Route>

      </Routes>

    </>
  )
}

export default App
