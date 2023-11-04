import React, { useContext, useEffect, useState } from 'react'
import styled from 'styled-components'
import { Link, useLocation } from 'react-router-dom'
import AppContext from '../hooks/AppContext'

export const AuthModal = () => {
  const location = useLocation()
  const [display, setDisplay] = useState(false)
  const ignoreRoutes = ["login", "signup"]
  const { token } = useContext(AppContext)
  useEffect(() => {
    if(ignoreRoutes.includes(location.pathname.split("/")[1].toLowerCase())){
      setDisplay(false)
      return
    }
    setDisplay(true)
  }, [location])
  return (display && token &&
    <Container>
      <div className='modal'>
        <h2>Your sesssion has expired</h2>
        <p>Please log in again to continue using the app.</p>
        <Link to="/login">Log In</Link>
      </div>
    </Container>
  )
}

const Container = styled.div`
  background-color: rgba(0, 0, 0, 0.5);
  position: fixed;
  top: 0;
  height: 100vh;
  width: 100vw;
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
  > div{
    max-width: 450px;
    width: 450px;
    background-color: white;
    padding: 1em 2em;
    align-items: end;
    display: flex;
    flex-direction: column;
    border-radius: 0.3em;
    h2{
      margin-bottom: 0.3em;
      width: 100%;
    }
    p{
      margin-bottom: 1em;
      width: 100%;
    }
    a{
      border: 0;
      outline: 0;
      text-decoration: none;
      padding: 0.5em;
      border-radius: 0.3em;
      border: 1px solid #ccc;
      &:hover, &:focus, &:focus-within{
        border-color: #0170ba;
      }
    }
  }
`