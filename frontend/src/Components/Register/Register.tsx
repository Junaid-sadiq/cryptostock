import React, { useState } from 'react'
import Header from '../Header/Header'
import { Button, FormControl } from 'react-bootstrap'
import axios from 'axios'
import './Styles/Register.css'

export default function Register() {
  let [username, setUsername] = useState('')
  let [email, setEmail] = useState('')
  let [password, setPassword] = useState('')
  let [confirmPass, setConfirmPass] = useState('')

  const areCredentialsValid = () => {
    let isValid = true;

    if (!username) 
    {
      isValid = false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) 
    {
      isValid = false;
    } 
    else if (!emailRegex.test(email)) 
    {
      isValid = false;
    }

    if (!password) 
    {
      isValid = false;
    } 
    else if (password.length < 6) 
    {
      isValid = false;
    }

    if (!confirmPass) 
    {
      isValid = false;
    } 
    else if (password !== confirmPass) 
    {
      isValid = false;
    }

    return isValid;
  };

  const handleSubmit = (e:any) => {
    e.preventDefault();
    if (areCredentialsValid()) 
    {
      axios.post('http://localhost:3001/v1/register', {username: username, password: password, email: email})
      .then((res) => {
        window.location.href = '/login'
      })
      .catch((err) => console.log(err))
    }
    else
    {
      console.log("Form not submitted!");
    }
  };
  return (
    <div>
      <Header/>
      <div className='SignUpForm Background'>
        <FormControl className="SignUpInput Username" placeholder='Enter your username' onChange={(e) => setUsername(e.target.value)}/>
        <FormControl className="SignUpInput Email" placeholder='Enter your email' onChange={(e) => setEmail(e.target.value)}/>
        <FormControl className="SignUpInput Password" type='password' placeholder='Enter your password' onChange={(e) => setPassword(e.target.value)}/>
        <FormControl className="SignUpInput Password" type='password' placeholder='Confirm your password' onChange={(e) => setConfirmPass(e.target.value)}/>
        <Button className='SignUpButton' onClick={(e) => handleSubmit(e)}>Sign up</Button>

        <p className='CallToAction Login'><strong>Already registered? <a href='/login' className='FormLink'>Log in.</a> </strong> </p>
      </div>
    </div>
  )
}
