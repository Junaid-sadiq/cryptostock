import React from 'react'
import Header from '../Header/Header'
import './Styles/Dashboard.css'
import {Container} from 'react-bootstrap'
export default function Home() {
  return (
    <div>
      <Header/>
      <div className='HomePageWrapper'>
        <p className='WelcomeMessage'>CryptoStock lets you compare companies against stocks</p>
        <img className='MetaImage' src='https://pngimg.com/uploads/meta/meta_PNG5.png'/>
        <p className='HookMessage'>Keep yourself up to date with what’s happening on the markets</p>
        <img className='BtcImage' src='https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Bitcoin.svg/2048px-Bitcoin.svg.png'/>
        <p className='SignUp'>Get started now - <a href='/register' className='CallToAction'>Sign up</a></p>
      </div>
        
    </div>
  )
}
