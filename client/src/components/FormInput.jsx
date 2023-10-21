import React, { useState } from 'react'
import styled from 'styled-components'
import ErrorIcon from '@mui/icons-material/Error';

export const FormInput = ({name, autoComplete, type, error, setError, setFormError}) => {
  const [containsContent, setContainsContent] = useState(false)
  return (
    <Container
      htmlFor={name.toLowerCase()}
      className = {[
        containsContent ? "contains-content" : "",
        error ? "error" : ""
      ].join(" ")}
    >
      <span>{name.replace(/[^a-zA-Z]+/g, " ")}</span>
      <input
        type={type}
        name={name.toLowerCase()}
        autoComplete={autoComplete}
        id={name.toLowerCase()}
        onInput={(e) => {
          setContainsContent(!!e.target.value.length)
          setFormError(false)
          if(error && e.target?.value?.length)setError(false)
        }}
      />
      {error && <p>
        <ErrorIcon sx={{ width: "0.75em", height: "0.75em", color: "#de5757" }}/> {error?.length ? error : `${name.slice(0,1).toUpperCase() + name.slice(1,)} is required`}
      </p>}
    </Container>
  )
}

const Container = styled.label`
  border: 1px solid #d1d1d1;
  cursor: text;
  margin-bottom: 1em;
  width: 100%;
  min-width: 22.5em;
  height: 3em;
  display: flex;
  flex-direction: column;
  border-radius: 0.2em;
  position: relative;
  span{
    position: absolute;
    top: 1em;
    font-size: 1em;
    color: #757575;
    transition: all linear 0.1s;
    line-height: 1em;
    text-transform: capitalize;
    left: 0.4em;
  }
  input{
    border: 0;
    border-radius: 0.2em;
    outline: 0;
    width: 100%;
    padding: 1em 0.4em 0 0.4em;
    height: 100%;
  }
  p{
    position: absolute;
    display: flex;
    align-items: center;
    svg{
     margin-right: 0.2em;
    }
  }
  &:hover{
    border-color: #198edc;
  }
  &:focus-within{
    border-color: #198edc;
    box-shadow: 0 0 0 2px #7bc2f1
  }
  &:focus-within, &.contains-content{
    span {
      top: 2px;
      font-size: 0.8em;
    }
  }
  &.error{
    border-color: #d19292;
    margin-bottom: 2em;
    &:focus-within{
      box-shadow: 0 0 0 2px #ffbdbd;
    }
    p:not(.or){
      bottom: -1.5em;
    }
  }
`