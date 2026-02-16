import { useEffect, useState } from "react";

const useAuth = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem("token")

        if(token){
            setIsAuthenticated(true);
        }
        setIsLoading(false)
    }, [])
    return { isAuthenticated, isLoading };
}

export default useAuth;