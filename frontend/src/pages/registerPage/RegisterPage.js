import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Message from '../../components/Message'
import Loader from '../../components/Loader'
import './RegisterPage.css'
import axios from '../../axios/axios'

function RegisterPage() {
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
    })
    const [message, setMessage] = useState(null)
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const handleChange = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleSubmit = (e) => {
      e.preventDefault()
      console.log(e.target.name)
      if (!formData.first_name.trim()){
        setMessage('First name cannot be blank')
      }

      else if (!formData.last_name.trim()){
        setMessage('Last name cannot be blank')
      }

      else if (!formData.username.trim()){
        setMessage('Username cannot be blank')
      }

      else if (!/^[a-zA-Z0-9]{4,16}$/.test(formData.username)){
        setMessage('Invalid username')
      }

      else if (!formData.email.trim()){
        setMessage('Email cannot be blank')
      }

      else if (!formData.password.trim()){
        setMessage('Password cannot be blank')
      }
      
      else if (formData.password.length < 6){
        setMessage('Password must be at least 6 characters')
      }

      else if (formData.password !== formData.confirmPassword) {
        setMessage('Passwords do not match')
      }

      else {
        setLoading(true)
        axios.post('auth/register', JSON.stringify({
          username: formData.username,
          first_name: formData.first_name,
          last_name: formData.last_name,
          email: formData.email,
          password: formData.password,
          password2: formData.confirmPassword
        }))
        .then((res) => {
          console.log(res,"---------------")
          setFormData({
            first_name: '',
            last_name: '',
            username: '',
            email: '',
            password: '',
            confirmPassword: '',
          })
          setLoading(false)
          navigate('/login')
        })
        .catch((err) => {
          setLoading(false)
          
          if (err.code === 'ERR_NETWORK') {
            setError('Network error')
          }

          else if (err.response.data.username) {
            setError(err.response.data.username)
          }

          else if (err.response.data.email) {
            setError(err.response.data.email)
          }

          else if (err.response.data.password) {
            setError(err.response.data.password)
          }
        })
      }
    }
  
    return (
      <form onSubmit={handleSubmit}>
        <h1>Sign Up</h1>
        {message && <Message variant='danger'>{message}</Message>}
        {error && <Message variant='danger'>{error}</Message>}
        {loading && <Loader />}
      <div>
        <label>Firstname:</label>
        <input
          type="text"
          name="first_name"
          placeholder='Firstname'  
          autoComplete='off'  
          onChange={handleChange}   
        />  
      </div>
      <div>
        <label>Lastname:</label>
        <input
          type="text"
          name="last_name"
          placeholder='Lastname'  
          autoComplete='off'  
          onChange={handleChange}   
        />  
      </div>
      <div>
        <label>Username:</label>
        <input
          type="text"
          name="username"
          placeholder='username'  
          autoComplete='off'  
          onChange={handleChange}   
        />  
      </div>
      <div>
        <label>Email:</label>
        <input
          type="email"
          name="email"
          placeholder='example@gmail.com'
          autoComplete='off'
          onChange={handleChange} 
        /> 
      </div>
      <div>
        <label>Password:</label>
        <input
          type="password"
          name="password"
          placeholder='******'
          onChange={handleChange} 
        />
      </div>
      <div>
        <label>Confirm Password:</label>
        <input
          type="password"
          name="confirmPassword"
          placeholder='******'
          onChange={handleChange} 
        />
      </div>
      <button type="submit">Submit</button>
    </form>
    )
  }


export default RegisterPage