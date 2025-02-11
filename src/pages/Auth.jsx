import React, { useContext, useState } from 'react'
import placeholder1 from '../assets/placeHolder1.png'
import { Button, FloatingLabel, Form, Spinner, Toast } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { loginAPI, registerAPI } from '../services/allAPI'
import { tokenAuthContext } from '../contexts/AuthContextAPI'


const Auth = ({ insideRegister }) => {
  const { isAuthorized, setIsAuthorized } = useContext(tokenAuthContext)
  const navigate = useNavigate()

  const [userDetails, setUserDetails] = useState({
    userName: '',
    email: '',
    password: ''
  })
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const handleRegister = async (e) => {
    e.preventDefault()
    console.log("inside Handle Register");
    if (userDetails.userName && userDetails.email && userDetails.password) {
      // alert("Make API call")
      console.log(userDetails);
      try {
        const result = await registerAPI(userDetails)
        console.log(result);
        if (result.status == 200) {
          alert(`Welcome ${result.data.userName}! \n\tPlease Login to Explore!`)
          setUserDetails({
            userName: '',
            email: '',
            password: ''
          })
          navigate('/login')
        } else {
          if (result.response.status == 406) {
            alert(result.response.data)
            setUserDetails({
              userName: '',
              email: '',
              password: ''
            })
            navigate('/login')
          }
        }
      } catch (e) {
        console.error(e)
      }

    } else {
      alert("Please Fill the form")
    }

  }

  const handleLogin = async (e) => {
    e.preventDefault()
    console.log("inside Login handle");
    if (userDetails.email && userDetails.password) {
      try {
        const result = await loginAPI(userDetails)
        if (result.status == 200) {
          sessionStorage.setItem("user", JSON.stringify(result.data.user))
          sessionStorage.setItem("token", result.data.token)
          setIsAuthorized(true)
          setIsLoggedIn(true)
          setTimeout(()=>{
            setUserDetails({
            userName: '',
            email: '',
            password: ''
          })
          navigate('/')
          setIsLoggedIn(false)  
        },1200)
        } else {
          if (result.response.status == 404) {
            alert(result.response.data)
          }
        }
      } catch (e) {
        console.log(e);
      }
    } else {
      alert("Please Fill the Form!")
    }
  }

  return (
    <div style={{ minHeight: '100vh', width: '100%' }} className='d-flex justify-content-center align-items-center'>
      <div className='container w-75 '>
        <div className='card shadow p-4'>
          <div className="row align-items-center">
            <div className="col-lg-6">
              <img className='img-fluid' src={placeholder1} alt="" />
            </div>
            <div className="col-lg-6 ">
              <h1 className='mt-2'> <i className='fa-brands fa-docker'></i> Project Fair</h1>
              <h5 className='mt-2 mb-3'>Sign {insideRegister ? "up" : "in"} to your Account</h5>

              <Form>
                {
                  insideRegister &&
                  <FloatingLabel controlId="floatingUSernameInput" label="Username" className="mb-3"
                  >
                    <Form.Control onChange={(e) => { setUserDetails({ ...userDetails, userName: e.target.value }) }} value={userDetails.userName || ""} type="text" placeholder="username" />
                  </FloatingLabel>
                }
                <FloatingLabel controlId="floatingEmailInput" label="Email address" className="mb-3"
                >
                  <Form.Control onChange={(e) => { setUserDetails({ ...userDetails, email: e.target.value }) }} value={userDetails.email || ""} type="email" placeholder="name@example.com" />
                </FloatingLabel>
                <FloatingLabel controlId="floatingPassword" label="Password">
                  <Form.Control onChange={(e) => { setUserDetails({ ...userDetails, password: e.target.value }) }} value={userDetails.password || ""} type="password" placeholder="Password" />
                </FloatingLabel>

                {
                  insideRegister ?
                    <div className='mt-3'>
                      <button onClick={handleRegister} className='btn btn-primary register'>Register</button>
                      <p>Already a User? Please Click here to <Link to={'/login'}>Login</Link></p>
                    </div>
                    :
                    <div className='mt-3'>
                      <button onClick={handleLogin} className='btn btn-primary login text-center align-center'>Login{isLoggedIn && <Spinner animation="border" />}</button>
                      <p className='mt-1'>New User ?, Please Click here to <Link to={'/register'}>Register</Link></p>
                    </div>
                }
              </Form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Auth