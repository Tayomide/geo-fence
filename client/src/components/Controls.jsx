import PolylineIcon from '@mui/icons-material/Polyline';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import AppContext from "../hooks/AppContext"
import { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';

const Controls = () => {
  const { setIsEditing, isEditing, setEditSvg, svgList } = useContext(AppContext)
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
    setEditSvg({})
    setIsEditing(false)
    handleDefaultClick(e)
  }
  const handleCopyClick = (e) => {
    if(!isEditing){
      navigator.clipboard.writeText(JSON.stringify(svgList))
      setCopied(true)
    }
    handleDefaultClick(e)
  }
  useEffect(() => {
    const clearCopied = () => setCopied(false)
    if(copied)setTimeout(clearCopied, 500)
    return clearTimeout(clearCopied)
  }, [copied])
  return (
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
    </Container>
  )
}

export default Controls

const Container = styled.div`
  position: fixed;
  z-index: 2;
  left: 5px;
  top: 20px;
  display: flex;
  flex-direction: column;
  border: 1px solid gray;
  .button-container{
    height: 24px;
    width: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    position: relative;
    .options{
      position: absolute;
      left: 24px;
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
      left: 26px;
      border-radius: 5px;
      p{
        border-radius: 5px;
        background-color: #dcdcd8;
        &:hover{
          background-color: #dcdcd8;
        }
      }
    }
    & ~ .button-container{
      border-top: 1px solid black;
    }
  }
`