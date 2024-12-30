import React, { useState, useEffect } from 'react';
import { resetPassword } from '../services/axios';
import { useNavigate} from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import logo from '../assets/logo.jpg'

const ResetPassword: React.FC = () => {
  const [confirmEye, setConfirmEye] = useState(false);
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState(''); 
  const navigate = useNavigate();

  useEffect(() => {
    const email = sessionStorage.getItem('email');
    if(!email) {
        navigate('/');
        
    }

}, [navigate])



  const validatePassword = () => {
    if (password.length < 6) {
      setPasswordError('Password should be a minimum of 6 characters');
      return false;
    }

    if (password.trim().length === 0) {
      setPasswordError('Password should not be empty or contain only spaces');
      return false;
    } 
    
    setPasswordError('');
    return true;
  };

  const validateConfirmPassword = () => {
    if (password !== confirm) {
      setConfirmPasswordError('Passwords do not match'); 
      return false;
    }
    setConfirmPasswordError('');
    return true;
  };

  const toggleIcon = () => setShow(!show);
  const toggleConfirm = () => setConfirmEye(!confirmEye);

  const resetSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    setPasswordError('');
    setConfirmPasswordError(''); 
    setLoading(true);

    const isValidPassword = validatePassword();
    const isValidConfirmPassword = validateConfirmPassword();

    if (!isValidPassword || !isValidConfirmPassword) {
      setLoading(false);
      return;
    }

    try {
      const response = await resetPassword(password, confirm);
      if(response.status === 200) {
        sessionStorage.removeItem('email');
        navigate('/');
      }
    } catch (error: any) {
      setLoading(false);
      if (error.response) {
        const { data } = error.response;
        setPasswordError(data.Pass || data.Invalid || '');
      } else {
        alert("Network error. Please try again.")
      }
    }
  };

  return (
    <section className="min-h-screen w-full flex justify-center items-center bg-darkbg  ">
      <div className="border-1 bg-cardbg flex flex-col p-10 rounded-lg shadow-lg w-[480px] mb-16">
        <div className="flex justify-center mb-2">
          <img src={logo} alt="Logo" className="h-10" />
        </div>
        <h2 className="text-2xl font-semibold text-center text-slate-200 mb-1">Reset your password</h2>
       
        <form className="flex flex-col" onSubmit={resetSubmit}>
         

          <div className="mb-4 relative">
            <label htmlFor="password" className="block text-slate-300 mb-2">New Password:</label>
            <input
              type={show ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              id="password"
              className="border bg-inputcolor border-inputcolor placeholder:text-inputtext text-slate-200 focus:bg-inputcolor rounded p-2 pr-10 w-full"
              placeholder="Enter your password"
            />
            <FontAwesomeIcon
              icon={show ? faEyeSlash : faEye}
              onClick={toggleIcon}
              className="absolute right-2 text-white top-1/2 pt-2 cursor-pointer"
            />
          </div>

          <div className="mb-1 relative">
            <label htmlFor="confirmPassword" className="block text-slate-300 mb-2">Confirm Password:</label>
            <input
              type={confirmEye ? 'text' : 'password'}
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              id="confirmPassword"
              className="border bg-inputcolor border-inputcolor placeholder:text-slate-200 text-slate-200 focus:bg-inputcolor rounded p-2 pr-10 w-full"
              placeholder="Confirm your password"
            />
            <FontAwesomeIcon
              icon={confirmEye ? faEyeSlash : faEye}
              onClick={toggleConfirm}
              className="absolute right-2 text-white top-1/2 pt-2 cursor-pointer"
            />
          </div>
          {passwordError && <p className="text-red-600">{passwordError}</p>}
          {confirmPasswordError && <p className="text-red-600">{confirmPasswordError}</p>}

          <button
            type="submit"
            className="bg-gradient-to-r mt-4  text-white rounded p-2 bg-textHeading transition duration-300 flex justify-center items-center"
            disabled={loading}
          >
            {loading ? (
              <>
                 <svg
                  width="20"
                  height="20"
                  fill="currentColor"
                  className="mr-2 animate-spin"
                  viewBox="0 0 1792 1792"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M526 1394q0 53-37.5 90.5t-90.5 37.5q-52 0-90-38t-38-90q0-53 37.5-90.5t90.5-37.5 90.5 37.5 37.5 90.5zm498 206q0 53-37.5 90.5t-90.5 37.5-90.5-37.5-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm-704-704q0 53-37.5 90.5t-90.5 37.5-90.5-37.5-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm1202 498q0 52-38 90t-90 38q-53 0-90.5-37.5t-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm-964-996q0 66-47 113t-113 47-113-47-47-113 47-113 113-47 113 47 47 113zm1170 498q0 53-37.5 90.5t-90.5 37.5-90.5-37.5-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm-640-704q0 80-56 136t-136 56-136-56-56-136 56-136 136-56 136 56 56 136zm530 206q0 93-66 158.5t-158 65.5q-93 0-158.5-65.5t-65.5-158.5q0-92 65.5-158t158.5-66q92 0 158 66t66 158z"></path>
                </svg>
                loading...
              </>
            ) : (
              'Change Password'
            )}
          </button>
        </form>
      </div>
    </section>
  );
};

export default ResetPassword;
