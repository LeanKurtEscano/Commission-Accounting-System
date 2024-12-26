import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { sendEmail } from '../services/axios'
import { useNavigate } from 'react-router-dom'

const Email = () => {
    const [email, setEmail] = useState("");
    const [emailError, setEmailError] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
      const userEmail = localStorage.getItem('email_otp');
        if(userEmail) {
            localStorage.removeItem('email_otp');
        }
 
    }, [])

    const submitEmail = async (e: React.FormEvent) => {
        e.preventDefault();
        setEmailError("");

        try {
            const response = await sendEmail(email);

            if(response.status == 202){
                localStorage.setItem('email_otp', email);
                navigate('/emailotp');
               
            }

        } catch(error: any){
            if (error.response) {
                if (error.response.status === 404) {
               
                  setEmailError("Email is not registered"); 
                } else {
                  alert(error.response.data.error || 'Something went wrong');
                }
              } else {
                alert('Network error. Please try again later.');
              }
        }
    }
    return (
        <section className='flex items-center min-h-screen justify-center pb-9 bg-darkbg'>
            <div className="relative border-cardbg bg-loginbg border-2 bg-cardbg rounded-lg shadow-xl px-6 pt-8 pb-8 mx-auto w-full max-w-lg">
                <div className="mx-auto flex w-full max-w-md flex-col space-y-6">
                    <div className="flex flex-col items-center justify-center text-center space-y-1"> 
                        <div className="font-bold text-slate-200 mb-2 text-3xl">
                            <p>Forgot your Password?</p>
                        </div>
                        <div className="flex flex-row text-sm font-medium text-gray-400">
                            <p>Send a 6-digit verification code to your email address</p>
                        </div>

                        <div className=''>
                            <Link to='/' className="text-textHeading hover:underline">← Back to Login?</Link>
                        </div>
                    </div>
                    <div>
                        <form onSubmit={submitEmail}>
                            <div className="flex flex-col space-y-8">
                                <div className="flex flex-col items-center justify-between mx-auto w-full max-w-sm space-x-2">
                                    <div className='w-full flex flex-col mb-1'>
                                        <label htmlFor='email' className='text-slate-200 mb-1'>Email Address:</label>
                                        <input value={email} onChange={(e) => setEmail(e.target.value)} type='email' className='border bg-inputcolor text-slate-300 placeholder:text-inputtext border-inputcolor rounded p-2 pr-10 w-full'></input>
                                    </div>
                                    <div className='h-[30px] flex items-start justify-start w-full'>
                                       {emailError && (
                                       
                                       <p className='text-red-600'>{emailError}</p>
                                    
                                      )}

                                    </div>

                                   
                                    <div className="flex w-full flex-col space-y-2 pr-2">

                                        <button type="submit" className="flex items-center justify-center w-full py-3 bg-textHeading focus:ring-4 focus:outline-none dark:focus:textHeading text-white text-sm rounded-xl shadow-sm"> {/* Reduced py-4 to py-3 */}
                                            Verify Account
                                        </button>

                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>


    )
}

export default Email;