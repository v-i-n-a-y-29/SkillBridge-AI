import { useState,useEffect } from "react";
import { AuthContext } from "./auth.context";
import { getMe } from "./services/api.auth";

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setloading] = useState(true);

    useEffect(()=>{
        async function getAndSetUser(){
            try{
                const data = await getMe()
                if(data) setUser(data.user)
            }
            catch(err){
                console.log(err)
            }
            finally{
                setloading(false)
            }
        }
        getAndSetUser()
    },[])

    return (
        <AuthContext.Provider value={{ user, setUser, loading, setloading }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
