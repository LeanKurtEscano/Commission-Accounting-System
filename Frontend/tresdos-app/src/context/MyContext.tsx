import React, { createContext, useState, useContext } from 'react';



interface UserDetails {
    username: string;
    email: string;
}

interface UserSignIn {
    username: string;
    email: string;
    password: string;
}

const MyContext = createContext<any>(null);

export const MyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [userDetails, setUserDetails] = useState<UserDetails>({
        username: "",
        email: "",
      
    })
    const [sessionExpired, setSessionExpired] = useState(false);
    const [toggleLog, setToggleLog] = useState(false);
    const [toggleSesh, setToggleSesh] = useState(false);

    const [userSignUp, setUserSignUp] = useState<UserSignIn>({
        username: '',
        email: '',
        password: '',
      

    })
    const [result, setResult] = useState(0);
    const [runTimer, setRunTimer] = useState(false);

    return (
        <MyContext.Provider value={{ isAuthenticated, setIsAuthenticated, result, setResult, userDetails, setUserDetails, userSignUp, setUserSignUp, runTimer, setRunTimer, toggleLog, setToggleLog, sessionExpired, setSessionExpired, toggleSesh, setToggleSesh }}>
            {children}
        </MyContext.Provider>
    );
};


export const useMyContext = () => {
    return useContext(MyContext);
};