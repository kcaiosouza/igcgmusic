import { createContext, useContext,  useState, useEffect } from "react";
import { parseCookies } from "nookies";
import { api } from "@/services/api";

export const AuthContext = createContext({});

export function AuthContextProvider({ children }) {
    const [user, setUser] = useState({});

    useEffect(() => {
        const {'token.auth' : token} = parseCookies(null)
        if(token){
            api.get(`/account/reload`, { params: {
                userUUID: token
            }})
            .then(result => {
                if(result.data.success){
                    setUser(result.data.account)
                }
            })
            .catch(err => {
                console.log(err)
            })
        }
    }, [])
    
    function setLogin(data) {
        setUser(data.user)
        console.log(data)
    }
    return (
        <AuthContext.Provider value={{
            setLogin,
            user,
        }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    return useContext(AuthContext);
  }