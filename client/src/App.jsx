import styled from "styled-components"
import { useEffect, useState } from "react"
import {Routes, Route } from "react-router-dom"
import AppContext from "./hooks/AppContext"
import Home from "./pages/Home"
import {Signup} from "./pages/Signup"
import { Login } from "./pages/Login"
import { AuthModal } from "./components/AuthModal"
import Navbar from "./components/NavBar"

function App() {
  const [token, setToken] = useState(
    localStorage["token"] !== "undefined" ? 
    localStorage["token"] : undefined
  )
  const [tokenExpiration, setTokenExpiration] = useState(
    localStorage["tokenExpiration"] !== "undefined" ? 
    localStorage["tokenExpiration"] : undefined
  )
  const [loggedIn, setLoggedIn] = useState(false)

  // useEffect(() => {
  //   localStorage["svgList"] = svgList
  //   if(svgList?.length && JSON.stringify(svgList) !== JSON.stringify(boundaries)){
  //     const body = JSON.stringify({
  //       boundaries: svgList
  //     })
  //     const requestOptions = {
  //       method: 'POST',
  //       headers: {
  //         "Content-Type": "application/json",
  //         "Authorization": `Bearer ${token}`
  //       },
  //       body: body
  //     };
    
  //     fetch(import.meta.env.VITE_REACT_SERVER_URI + "/user", requestOptions)
  //     .then(res => res.text())
  //     .then(res => {
  //       console.log(res)
  //       setBoundaries(svgList)
  //     })
  //     .catch(err => {
  //       console.log(err)
  //     })
  //   }

  // }, [svgList])

  useEffect(() => {
    localStorage["token"] = token
    localStorage["tokenExpiration"] = tokenExpiration
  }, [token, tokenExpiration])

  const logout = () => {
    setToken()
    setTokenExpiration()
    setLoggedIn(false)
  }

  useEffect(() => {
    if(!tokenExpiration)return
    setLoggedIn(!!(new Date(tokenExpiration) - new Date()))
    const tokenTimeout = setTimeout(logout, new Date(tokenExpiration) - new Date())
    return () => {
      clearTimeout(tokenTimeout)
    }
  }, [tokenExpiration])

  return (
    <Container>
      <Navbar loggedIn={loggedIn} setTokenExpiration={setTokenExpiration} />
      <AppContext.Provider
        value={{
          token,
          setToken,
          tokenExpiration,
          setTokenExpiration,
          loggedIn,
          setLoggedIn
        }}
      >
        {!loggedIn && <AuthModal />}
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/signup" exact element={<Signup />} />
          <Route path="/login" exact element={<Login />} />
        </Routes>
      </AppContext.Provider>
    </Container>
  )
}

export default App

const Container = styled.div``