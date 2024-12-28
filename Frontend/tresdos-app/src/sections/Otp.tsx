import React, { useState, useEffect, useRef } from 'react';

import { passwordOTP, userEmailResend } from '../services/axios';
import { useNavigate } from 'react-router-dom';
import Notification from '../components/Notification';

const Otp: React.FC = () => {
    const [otpValues, setOtpValues] = useState<string[]>(Array(6).fill(''));
    const [invalid, setInvalid] = useState('');

    const [timer, setTimer] = useState(120);
    const [isResendDisabled, setIsResendDisabled] = useState(false);
    // @ts-ignore
    const [expired, setExpired] = useState(false);
    const [toggleNotif, setToggleNotif] = useState(false);
    const inputRefs = useRef<Array<HTMLInputElement | null>>(Array(6).fill(null));
    const heading = "OTP Sent!"
    const message = "A new OTP has been sent to your registered email."
    const navigate = useNavigate();





    const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
        const { value } = e.target;
        if (/^[0-9]?$/.test(value)) {
            const newOtpValues = [...otpValues];
            newOtpValues[index] = value;
            setOtpValues(newOtpValues);
        }

        if (value !== '' && index < 5) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setInvalid('');

        const otpCode = otpValues.join('');


        try {

            const response = await passwordOTP(otpCode);

            if (response.status === 200) {
                console.log(response.data);
                navigate('/reset');



            }

        } catch (error: any) {
            const { status, data } = error.response;

            switch (status) {

                case 400:
                    setInvalid(data.error);
                    break;
                case 404:
                    setInvalid(data.error);
                    break;
                case 500:
                    setInvalid(data.error);
                    break;
                default:
                    alert("Lexscribe is under maintenance. Please try again later.")
            }
        }


    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
        if (e.key === 'Backspace' && otpValues[index] === '') {
            // Move to the previous input box if backspace is pressed
            if (index > 0) {
                inputRefs.current[index - 1]?.focus();
            }
        }
    };

    const handleResendOTP = async (e: React.FormEvent) => {
        e.preventDefault();
        setInvalid('');

        try {

            const response = await userEmailResend();

            if(response.status === 200) {
                setIsResendDisabled(true);
            }

        } catch (error: any) {
            const { status, data } = error.response;

            switch (status) {

                case 400:
                    setInvalid(data.error);
                    break;
                case 404:
                    setInvalid(data.error);
                    break;
                case 500:
                    setInvalid(data.error);
                    break;
                default:
                    alert("Lexscribe is under maintenance. Please try again later.")
            }
        }
      


    }
    useEffect(() => {
        let interval: ReturnType<typeof setInterval> | null = null;

        if (isResendDisabled && timer > 0) {
            interval = setInterval(() => {
                setTimer((prev) => {
                    if (prev <= 1) {
                        setIsResendDisabled(false);
                        if (interval) clearInterval(interval);
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
        }

        return () => {
            if (interval) clearInterval(interval);
        };
    }, [isResendDisabled, timer]);




    return (
        <section className='flex items-center min-h-screen justify-center bg-darkbg'>
            <div className="relative border-darkbg bg-cardbg border-2 rounded-lg shadow-xl px-6 pt-10 pb-9 mx-auto w-full max-w-lg">
                <div className="mx-auto flex w-full max-w-md flex-col space-y-16">
                    <div className="flex flex-col items-center justify-center text-center space-y-2">
                        <div className="font-bold text-slate-200 text-3xl">
                            <p>Reset Password</p>
                        </div>
                        <div className="flex flex-row text-sm font-medium text-gray-400">
                            <p>We have sent a 6-digit verification code to your email address</p>
                        </div>
                    </div>

                    <div>
                        <form onSubmit={handleSubmit}>
                            <div className="flex flex-col space-y-16">
                                <div className="flex flex-row items-center justify-between mx-auto w-full max-w-sm space-x-2">
                                    {[...Array(6)].map((_, index) => (
                                        <div key={index} className="w-14 h-14">
                                            <input
                                                ref={(el) => (inputRefs.current[index] = el)} // Assign ref
                                                className="w-full h-full flex items-center text-white justify-center text-center text-lg px-5 outline-none rounded-xl border-layer3 border-2  bg-layer3 focus:bg-gray-900 focus:ring-1 ring-textHeading"
                                                type="text"
                                                maxLength={1}
                                                value={otpValues[index]}
                                                onChange={(e) => handleChange(e, index)}
                                                onKeyDown={(e) => handleKeyDown(e, index)}
                                            />
                                        </div>
                                    ))}
                                </div>

                                {invalid && (
                                    <div className='absolute left-16'>
                                        <p className='text-red-600'>{invalid}</p>
                                    </div>
                                )}

                                <div className="flex flex-col space-y-5">
                                    <div>
                                        <button type="submit" className="flex items-center justify-center w-full py-4 bg-textHeading    focus:ring-4 focus:outline-none dark:focus:ring-textHeading text-white text-sm rounded-xl shadow-sm">
                                            Verify Account
                                        </button>
                                    </div>

                                    <div className='flex items-end justify-end pr-4'>
                                        {isResendDisabled && (
                                            <p className='text-textHeading font-bold'>OTP expires in: {timer} seconds</p>
                                        )}
                                    </div>

                                    <div className="flex flex-row items-center justify-center text-sm font-medium space-x-1 text-gray-500">
                                        <p>Didn't receive code?</p>
                                        <div onClick={handleResendOTP}>
                                            <button disabled={isResendDisabled} className={`text-textHeading hover:underline cursor-pointer ${isResendDisabled ? 'text-gray-500' : 'text-textHeading'
                                                }`}>Resend</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            {toggleNotif && (
                <div className={`absolute right-5 top-20 ${toggleNotif ? 'notification-enter' : 'notification-exit'}`}>
                    <Notification setToggle={setToggleNotif} message={message} heading={heading} />
                </div>
            )}


        </section>
    );
};

export default Otp;
