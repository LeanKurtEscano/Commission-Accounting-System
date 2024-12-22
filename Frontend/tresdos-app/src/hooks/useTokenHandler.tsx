import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { userAuth } from "../services/token";
import { useMyContext } from "../context/MyContext";

const useTokenHandler = () => {
  const { setIsAuthenticated } = useMyContext();
  const navigate = useNavigate();

  useEffect(() => {
    const validateToken = async () => {
      try {
        const authStatus = await userAuth();
        setIsAuthenticated(authStatus);
       
      } catch (error) {
        console.log(`Token validation failed: ${error}`);
        setIsAuthenticated(false);
        navigate("/");
      }
    };

    validateToken();
  }, [setIsAuthenticated, navigate]);
};

export default useTokenHandler;
