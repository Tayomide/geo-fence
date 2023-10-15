import styled from "styled-components"
import { useEffect, useState } from "react"
import SVG from "./components/SVG"
import AppContext from "./hooks/AppContext"
import EditSVG from "./components/EditSVG"
import Controls from "./components/Controls"

function App() {
  const [svgList, setSvgList] = useState([])
  const [isEditing, setIsEditing] = useState(false)
  const [editingIdx, setEditingIdx] = useState()
  const [editSvg, setEditSvg] = useState({})

  const handleClick =(e) => {
    setEditSvg(prevEditSvg => {
      const newEditSvg = JSON.parse(JSON.stringify(prevEditSvg))
      if(!newEditSvg.vectors?.length)newEditSvg.vectors = []
      newEditSvg.vectors.push({
        lat: e.x,
        long: e.y
      })

      return newEditSvg
    })
  }
  useEffect(() => {
    if(isEditing){
      document.addEventListener("click", handleClick)
    }
    if(!isEditing){
      if(editSvg?.vectors?.length)setSvgList(prevSvgList => [...prevSvgList, editSvg])
    }
    return () => {
      document.removeEventListener("click", handleClick)
      setEditSvg({})
    }
  }, [isEditing])
  return (
    <AppContext.Provider
      value={{
        isEditing,
        editingIdx,
        editSvg,
        svgList,
        setSvgList,
        setEditingIdx,
        setIsEditing,
        setEditSvg
      }}
    >
      <Container>
        <div className="boundary-container">
          <svg>
            {
              svgList.map((svg, key) => <SVG key={key} {...svg} />)
            }
            {
              isEditing && <EditSVG {...editSvg} />
            }
          </svg>
        </div>
        <Controls />
      </Container>
    </AppContext.Provider>
  )
}

export default App

const Container = styled.div`
  > button{
    position: relative;
    z-index: 100;
  }
  .boundary-container{
    position: fixed;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    svg{
      width: 100%!important;
      height: 100%!important;
    }
  }
`
