import PolylineIcon from '@mui/icons-material/Polyline';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import AddLocationIcon from '@mui/icons-material/AddLocation';
import DeleteIcon from '@mui/icons-material/Delete';
import AppContext from "../hooks/AppContext"
import { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';

const Controls = () => {
  const { setIsEditing, isEditing, setEditSvg, svgList, token, isDeleting, setIsDeleting, setGlobalPoints } = useContext(AppContext)
  const [copied, setCopied] = useState(false)
  const handleDefaultClick = (e) => {
    e.stopPropagation();
    e.preventDefault();
  }
  const handlePoligonClick = (e) => {
    if(!isEditing)setIsEditing(true)
    handleDefaultClick(e)
  }
  const handlePoligonFinishClick = (e) => {
    setIsEditing(false)
    handleDefaultClick(e)
  }
  const handlePoligonCancelClick = (e) => {
    setEditSvg([])
    setIsEditing(false)
    handleDefaultClick(e)
  }
  const handleCopyClick = (e) => {
    console.log("working")
    navigator.clipboard.writeText(JSON.stringify(svgList))
    setCopied(true)
    handleDefaultClick(e)
  }
  const handlePointClick = (e) => {
    setGlobalPoints(prevPoints => {
      let newPoints = JSON.parse(JSON.stringify(prevPoints))
      newPoints.adding = !newPoints.adding
      return newPoints
    })
  }
  const handleDeleteClick = (e) => {
    setIsDeleting(!isDeleting)
    handleDefaultClick(e)
  }
  useEffect(() => {
    const clearCopied = () => setCopied(false)
    if(copied)setTimeout(clearCopied, 500)
    return clearTimeout(clearCopied)
  }, [copied])
  return (
      token && 
      <Container>
        <div className='button-container' onClick={handlePoligonClick}>
          <PolylineIcon sx={{
            height: "18px",
            width: "18px"
          }}/>
          {
            isEditing &&
              <div className='options'>
                <p onClick={handlePoligonFinishClick}>Finish</p>
                <p onClick={handlePoligonCancelClick}>Cancel</p>
              </div>
          }
        </div>
        <div className='button-container copy' onClick={handleCopyClick}>
          <ContentCopyIcon sx={{
            height: "18px",
            width: "18px"
          }}/>
          <div className='options'>
            {copied && <p>Copied!</p>}
          </div>
        </div>
        <div className='button-container' onClick={handlePointClick}>
          <AddLocationIcon sx={{
            height: "18px",
            width: "18px"
          }}/>
        </div>
        <div className='button-container' onClick={handleDeleteClick}>
          <DeleteIcon sx={{
            height: "18px",
            width: "18px"
          }}/>
        </div>
      </Container>
    )
  }

export default Controls

const Container = styled.div`
  position: fixed;
  z-index: 9999999;
  left: 10px;
  top: 80px;
  display: flex;
  flex-direction: column;
  border: 2px solid #00000030;
  border-radius: 3px;
  .button-container{
    height: 30px;
    width: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    position: relative;
    background-color: #fff;
    .options{
      position: absolute;
      left: 30px;
      display: flex;
      flex-direction: row;
      height: 25px;
      border-radius: 0 4px 4px 0;
      p{
        background-color: #b5b5b0;
        padding: 0 1em;
        height: 100%;
        display: inline-flex;
        align-items: center;
        & ~ p{
          border-left: 1px solid white;
        }
        &:hover{
          background-color: #91918780;
        }
      }
    }
    &.copy .options{
      left: 30px;
      border-radius: 5px;
      p{
        border-radius: 5px;
        background-color: #dcdcd8;
        &:hover{
          background-color: #dcdcd8;
        }
      }
    }
    border-radius: 4px 4px 0 0;
    & ~ .button-container{
      border-top: 1px solid #ccc;
      border-radius: 0 0 4px 4px;
    }
  }
`