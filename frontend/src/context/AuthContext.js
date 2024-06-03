import axios from '../Axios';
import { jwtDecode } from 'jwt-decode';
import { createContext, useState} from 'react';
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';
import { login } from '../constants/Constants';

const AuthContext = createContext()

export default AuthContext

export const AuthProvider = ({ children }) => {

    const [authTokens, setAuthTokens] = useState(()=> Cookies.get('authToken') ? JSON.parse(Cookies.get('authToken')) : null )
    const [user, setUser] = useState(()=>Cookies.get('authToken') ? jwtDecode(Cookies.get('authToken')) : null)
    const [errors, setErrors] = useState({})
    const navigate = useNavigate()

    let loginUser = (e) => {
        e.preventDefault()
        const username = e.target.username.value
        const password = e.target.password.value

        const err = Validate(username, password)
        
        if (err !== true){
            setErrors(err)
        }
        if (err === true){
            axios.post(login,JSON.stringify({ 'username': username, 'password': password }),
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            ).then((respone) => {
                if (respone.status === 200) {
                    
                    setAuthTokens(respone.data)
                    setUser(jwtDecode(respone.data.access))
                    console.log(respone.data)
                    Cookies.set('authToken',JSON.stringify(respone.data),{secure: true})
                    
                    navigate('/')

                } else {
                    alert('Somthing went Wrong')
                }
            }).catch((error)=>{
                if (error.response.status === 401){
                    setErrors({username:"Inavalid username or password", password:"Inavalid username or password"})
                }
            })
        }

    }

    const Validate = (username, password) =>{
        const error = {}
        let flag = false

        if (username === ""){
            flag = true
            error.username = "Username should not be empty"
        }
        if (password === "")
        {
            flag = true
            error.password = "Password should not be empty"
        }

       if (flag === true){
        return error
       }
       else{
        return true
       }

    }

    let logoutUser = () =>{
        setAuthTokens(null)
        setUser(null)
        Cookies.remove('authToken')
    }

    let contextData = {
        user: user,
        logoutUser: logoutUser,
        loginUser: loginUser,
        errors: errors,
        setErrors: setErrors,
        token: authTokens
    }

    return (
        <AuthContext.Provider value={contextData}>
            {children}
        </AuthContext.Provider>
    )
}