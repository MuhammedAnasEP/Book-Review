import { React, useContext } from "react";
import axios from "axios";
import { baseUrl } from "./constants/Constants";


const instance = axios.create({
    baseURL: baseUrl,
    
})

export default instance;