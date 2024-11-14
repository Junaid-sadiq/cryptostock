import React, { useEffect, useState } from 'react';
import './Styles/Profile.css';
import Header from '../Header/Header';
import Settings from '../Settings/Settings';
// Placeholder for Preferences
import Preferences from '../Preferences/Preferences';
import axios from 'axios'


export default function Profile() {
  const [userData, setUserData] = useState()
  useEffect(() => {
    axios.get('http://localhost:3001/v1/user',{headers: {
      'Authorization': localStorage.getItem('token')
    }})
    .then((res) => setUserData(res.data))
    .catch((err) => console.log(err))

    axios.get('http://localhost:3001/v1/preferences',{headers: {
      'Authorization': localStorage.getItem('token')
    }})
    .then((res) => console.log(res))
    .catch((err) => console.log(err))
  },[])
  return (
    <div className="profile-page">
      <Header />

      {/* Settings Section */}
      <div className="section">
        <Settings />
      </div>

      {/* Preferences Section (Will be implemented later) */}
      <div className="section">
        <Preferences />
      </div>
    </div>
  );
}
