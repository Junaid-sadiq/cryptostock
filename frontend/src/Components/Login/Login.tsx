import React, { useState } from 'react'
import Header from '../Header/Header'
import { Button, FormControl } from 'react-bootstrap'
import {Person} from 'react-bootstrap-icons'
import './Styles/Styles.css'
import axios from 'axios'
export default function Login() {
  let [username, setUsername] = useState('')
  let [password, setPassword] = useState('')

  const areCredentialsValid = () => {
    let isValid = true;

    if (!username) 
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
    return isValid;
  };
  const handleSubmit = (e:any) => {
    e.preventDefault();
    if (areCredentialsValid()) 
    {
      axios.post('http://localhost:3001/v1/login', {username: username, password: password})
      .then((res:any) => {
       localStorage.setItem('token', res.data);
       window.location.href = '/'
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
      <div className='LoginForm Background'>
        <FormControl className="LoginInput Username" placeholder='Enter your username' onChange={(e) => setUsername(e.target.value)}/>
        <FormControl className="LoginInput Password" type='password' placeholder='Enter your password' onChange={(e) => setPassword(e.target.value)}/>
        <Button className='LoginButton' onClick={(e) => handleSubmit(e)}>Log in</Button>

        <p className='CallToAction SignUp'><strong>Don't have an account? <a href='/register' className='FormLink'>Sign up.</a> </strong> </p>
      </div>
    </div>
  )
}
