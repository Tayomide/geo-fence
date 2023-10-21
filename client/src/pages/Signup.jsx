import { Link, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { useState } from "react"
import WarningIcon from '@mui/icons-material/Warning';

import { FormInput } from '../components/FormInput'

export const Signup = () => {
  const [emailError, setEmailError] = useState(false)
  const [passwordError, setPasswordError] = useState(false)
  const [confirmPasswordError, setConfirmPasswordError] = useState(false)
  const [signupError, setSignupError] = useState(false)
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()


  const handleSubmit = (e) => {
    if(loading)return
    setLoading(true)
    e.preventDefault()
    setEmailError(false)
    setPasswordError(false)
    setConfirmPasswordError(false)
    const email = e.target.elements.email.value
    const password = e.target.elements.password.value
    const confirmPassword = e.target.elements["confirm-password"].value
    if(email.length === 0 || password.length === 0 || confirmPassword.length === 0){
      setEmailError(email.length === 0)
      setPasswordError(password.length === 0)
      confirmPassword.length === 0 && setConfirmPasswordError("Confirmation is required")
      setLoading(false)
      return
    }
    const emailRegex = new RegExp(/([a-zA-Z0-9]+)([\_\.\-{1}])?([a-zA-Z0-9]+)\@([a-zA-Z0-9]+)([\.])([a-zA-Z\.]+)/g)
    const emailTest = emailRegex.test(email)
    if(!emailTest || password !== confirmPassword){
      if(!emailTest){
        setEmailError("Invalid email")
      }
      (password !== confirmPassword) && setConfirmPasswordError("Password does not match")
      setLoading(false)
      return
    }

    const body = JSON.stringify({
      "email": email,
      "password": password
    })
    const requestOptions = {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: body
    };
  
    fetch(import.meta.env.VITE_REACT_SERVER_URI + "/signup", requestOptions)
    .then(res => res.json())
    .then(res => {
      console.log(res)
      if(res.error){
        throw new Error(res.error)
      }
      setLoading(false)
      navigate("/login")

    })
    .catch(err => {
      setLoading(false)
      setSignupError("User exists.")
    })
  }

  return (
    <Container>
      <div className='form'>
        <form onSubmit={handleSubmit}>
          <h1>Sign Up</h1>
          {signupError && <p className='signup-error'><WarningIcon sx={{ width: "0.75em", height: "0.75em", color: "#de5757" }}/> {signupError}</p>}
          <FormInput
            name="email"
            type="text"
            autoComplete="true"
            error={emailError}
            setError={setEmailError}
            setFormError={setSignupError}
          />
          <FormInput
            name="password"
            type="password"
            autoComplete="false"
            error={passwordError}
            setError={setPasswordError}
            setFormError={setSignupError}
          />
          <FormInput
            name="confirm-password"
            type="password"
            autoComplete="false"
            error={confirmPasswordError}
            setError={setConfirmPasswordError}
            setFormError={setSignupError}
          />
          <button className='next'>{loading ? "Loading..." : "Sign Up"}</button>
        </form>
        <p className='or'>or</p>
        <Link to="/login" className='login'>Log In</Link>
      </div>
    </Container>
  )
}

const Container = styled.div`
  height: 100vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  .form{
    display: flex;
    flex-direction: column;
    max-width: 31.25em;
    border: 1px solid #eaeced;
    border-radius: 0.3em;
    padding: 1.4em;
    h1{
      text-align: center;
      margin-bottom: 1em;
      font-size: 1.5em;
    }
    .signup-error{
      border: 1px solid #d19292;
      background-color: #ffdada;
      padding: 0.8em;
      margin-bottom: 1em;
      display: flex;
      align-items: center;
      border-radius: 0.2em;
      svg{
        margin-right: 0.2em;
      }
    }
    button.next{
      background-color: #0170ba;
      color: #fff;
      padding: 0.2em;
      font-size: 1em;
      border: 0;
      margin-bottom: 1em;
      height: 2em;
      width: 100%;
      border-radius: 0.2em;
      cursor: pointer;
    }
    p.or{
      display: inline-flex;
      flex-direction: row;
      align-items: center;
      padding: 0 0.4em;
      margin-bottom: 1em;
      &::before{
        content: "";
        height: 0;
        flex: 1;
        border-top: 1px solid #d7d7d7;
        margin-right: 0.4em;
      }
      &::after{
        content: "";
        height: 0;
        flex: 1;
        border-top: 1px solid #d7d7d7;
        margin-left: 0.4em;
      }
    }
    a.login{
      color: #00497c;
      border: 1px solid #198edc;
      text-align: center;
      padding: 0.2em;
      text-decoration: none;
      height: 2em;
      border-radius: 0.2em;
      display: inline-flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      &:hover{
        border-color: #0170ba;
        border-width: 1.5px;
      }
    }
  }
`
