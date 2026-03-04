import { useContext } from "react";
import { AuthContext } from "../auth.context";
import {login,logout,register,getMe} from '../services/api.auth'

export const useAuth = () =>{

    const context = useContext(AuthContext)
    const {user,setUser,loading,setloading} = context

    const handleLogin = async ({email,password})=>{
        setloading(true)
        try {
            const data = await login({email,password})
            if (data && data.user) {
                setUser(data.user)
            } else {
                setUser(null)
            }
        } catch (err) {
            setUser(null)
        }
        setloading(false)
    }

    const handleRegister = async ({username,email,password}) =>{
        setloading(true)
        try {
            const data = await register({username,email,password})
            if (data && data.user) {
                setUser(data.user)
            } else {
                setUser(null)
            }
        } catch (err) {
            setUser(null)
        }
        setloading(false)
    }

    const handleLogout = async () =>{
        setloading(true)
        try {
            await logout()
        } catch (err) {
            // Optionally handle error
        }
        setUser(null)
        setloading(false)
    }

    return {user,loading,handleLogin,handleRegister,handleLogout}

}