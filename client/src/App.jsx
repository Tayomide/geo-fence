import styled from "styled-components"
import { useEffect, useState } from "react"
import {Routes, Route } from "react-router-dom"
import AppContext from "./hooks/AppContext"
import Home from "./pages/Home"
import {Signup} from "./pages/Signup"
import { Login } from "./pages/Login"
import { AuthModal } from "./components/AuthModal"

function App() {
  const [svgList, setSvgList] = useState(
    (localStorage["svgList"] && localStorage["svgList"] !== "undefined") ? 
    JSON.parse(localStorage["svgList"]) : []
  )
  const [isEditing, setIsEditing] = useState(false)
  const [editingIdx, setEditingIdx] = useState()
  const [editSvg, setEditSvg] = useState([])
  const [token, setToken] = useState(
    localStorage["token"] !== "undefined" ? 
    localStorage["token"] : undefined
  )
  const [tokenExpiration, setTokenExpiration] = useState(
    localStorage["tokenExpiration"] !== "undefined" ? 
    localStorage["tokenExpiration"] : undefined
  )
  const [boundaries, setBoundaries] = useState(
    (localStorage["boundaries"] && localStorage["boundaries"] !== "undefined") ?
    JSON.parse(localStorage["boundaries"]) : []
  )
  const [isDeleting, setIsDeleting] = useState(false)
  const [globalPoints, setGlobalPoints] = useState({
    points: [],
    adding: false
  })

  useEffect(() => {
    if(!isEditing){
      if(editSvg.length > 2)setSvgList(prevSvgList => [...prevSvgList, editSvg])
    }
    return () => {
      setEditSvg([])
    }
  }, [isEditing])

  useEffect(() => {
    localStorage["svgList"] = svgList
    if(svgList?.length && JSON.stringify(svgList) !== JSON.stringify(boundaries)){
      const body = JSON.stringify({
        boundaries: svgList
      })
      const requestOptions = {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: body
      };
    
      fetch(import.meta.env.VITE_REACT_SERVER_URI + "/user", requestOptions)
      .then(res => res.text())
      .then(res => {
        console.log(res)
        setBoundaries(svgList)
      })
      .catch(err => {
        console.log(err)
      })
    }

  }, [svgList])

  useEffect(() => {
    localStorage["token"] = token
    localStorage["tokenExpiration"] = tokenExpiration
    localStorage["boundaries"] = JSON.stringify(boundaries)
    localStorage["svgList"] = JSON.stringify(svgList)
  }, [token, tokenExpiration, svgList, boundaries])

  const logout = () => {
    setToken()
    setTokenExpiration()
  }

  useEffect(() => {
    if(!tokenExpiration)return
    const tokenTimeout = setTimeout(logout, new Date(tokenExpiration) - new Date())
    return () => {
      clearTimeout(tokenTimeout)
    }
  }, [tokenExpiration])

  return (
    <Container>
      <AppContext.Provider
        value={{
          isEditing,
          editingIdx,
          editSvg,
          svgList,
          setSvgList,
          setEditingIdx,
          setIsEditing,
          setEditSvg,
          token,
          setToken,
          tokenExpiration,
          setTokenExpiration,
          boundaries,
          setBoundaries,
          isDeleting,
          setIsDeleting,
          globalPoints,
          setGlobalPoints
        }}
      >
        {!token?.length && <AuthModal />}
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