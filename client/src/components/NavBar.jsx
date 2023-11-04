import { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Link, useLocation } from 'react-router-dom'

const Navbar = ({ loggedIn, setTokenExpiration }) => {
  const location = useLocation()
  const [display, setDisplay] = useState(false)
  const ignoreRoutes = ["login", "signup"]
  useEffect(() => {
    if(ignoreRoutes.includes(location.pathname.split("/")[1].toLowerCase())){
      setDisplay(false)
      return
    }
    setDisplay(true)
  }, [location])
  return (display &&
    <Container>
      <Link to="/" className='left'>
        GeoFence
      </Link>
      <ul className='right'>
        {
          loggedIn ? 
          <li>
            <button onClick={() => setTokenExpiration(new Date().getTime())}>Sign Out</button>
          </li>
          :
          <>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/signup">Sign Up</Link>
            </li>
          </>
        }
      </ul>
    </Container>
  )
}

export default Navbar

const Container = styled.div`
  display: flex;
  margin: 1em;
  > a{
    flex: 1;
    font-size: 1.15em;
    color: #00000090;
    text-decoration: none;
    &:hover{
      color: #000000;
    }
  }
  ul{
    list-style: none;
    display: flex;
    gap: 0.8em;
    li{
      color: #00000090;
      a, button{
        text-decoration: none;
        color: inherit;
        font-size: 1.15em;
        border: 0;
        background-color: transparent;
      }
      button{
        font-size: 1.05em;
      }
      &:hover{
        color: #000000;
      }
    }
  }
`