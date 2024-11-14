import React from 'react'
import {Navbar, NavLink, NavItem,Nav, NavDropdown} from 'react-bootstrap'
import './Styles/Header.css'
import SearchBar from '../SearchBar/SearchBar'
export default function Header() {
  // This function will handle the search logic.
  const handleSearch = (query: string) => {
    // Here you can implement the search logic (e.g., API call or state update).
    console.log("Searching for:", query);
  };
  let isUserLoggedIn : boolean = false;
  if(localStorage.getItem('token') != null)
  {
    isUserLoggedIn = true
  }
  return (
    <div>
      {isUserLoggedIn 
      ?
        <Navbar className='Header' expand='xxl'>
          <Navbar.Brand className='HeaderBrand' href='/'>CryptoStock</Navbar.Brand>
          <Navbar.Toggle/>
          <Navbar.Collapse>
            <Nav>
            <NavItem>
              <NavLink className='HeaderLink crypto' href='/cryptos'>Crypto</NavLink>
            </NavItem>
            <NavItem>
              <NavLink className='HeaderLink stocks' href='/stocks'>Stocks</NavLink>
            </NavItem>
            <NavItem>
              <NavLink className='HeaderLink compare' href='/compare'>Compare</NavLink>
            </NavItem>
            <NavItem>
              <NavLink className='HeaderLink compare'>
              <SearchBar onSearch={handleSearch} />
            </NavLink>
            </NavItem>
            <NavItem>
              <NavLink className='HeaderLink compare' href='/profile'>Profile</NavLink>
            </NavItem>
            <NavItem>
              <NavLink className='HeaderLink compare' href='/logout'>Log out</NavLink>
            </NavItem>         
            </Nav>
          </Navbar.Collapse>   
        </Navbar> 
      :
        <Navbar className='Header' expand='xxl'>
          <Navbar.Brand className='HeaderBrand' href='/'>CryptoStock</Navbar.Brand>
          <Navbar.Toggle/>
          <Navbar.Collapse>
            <Nav>
            <NavItem>
              <NavLink className='HeaderLink crypto' href='/cryptos'>Crypto</NavLink>
            </NavItem>
            <NavItem>
              <NavLink className='HeaderLink stocks' href='/stocks'>Stocks</NavLink>
            </NavItem>
            <NavItem>
              <NavLink className='HeaderLink compare' href='/compare'>Compare</NavLink>
            </NavItem>
            <NavItem>
              <NavLink className='HeaderLink search'>
              <SearchBar onSearch={handleSearch} />
            </NavLink>
            </NavItem>
            <NavItem>
              <NavLink className='HeaderLink compare' href='/login'>Log in</NavLink>
            </NavItem>
            <NavItem>
              <NavLink className='HeaderLink compare' href='/register'>Sign up</NavLink>
            </NavItem>         
            </Nav>
          </Navbar.Collapse>
          
        </Navbar>
    }
    </div>
  )
}

