import React, { useContext, useEffect } from 'react'
import { Container, Navbar } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { tokenAuthContext } from '../contexts/AuthContextAPI'


const Header = ({insideDashboard}) => {

  const { isAuthorized, setIsAuthorized } = useContext(tokenAuthContext)

  const navigate = useNavigate()

  const handleLogout = () => {
    const {userName} = JSON.parse(sessionStorage.getItem('user'))
    sessionStorage.clear()
    setIsAuthorized(false)
    setTimeout(()=>{alert(`${userName}, Logged Out`)},250)
    // setImmediate(()=>{alert('LoggedOut')})
    // setInterval(()=>{alert('LoggedOut')},2000)
    navigate('/')
  }

  return (
    <Navbar className="border rounded position-fixed w-100 z-1 card">
        <Container>
          <Navbar.Brand>
            <Link to={'/'} style={{textDecoration:'none'}}>
            <h4 className='fs-1'><i className="fa-brands fa-docker me-2"></i>Project Fair</h4>
            </Link>
          </Navbar.Brand>
          {
            insideDashboard && 
              <div className='ms-auto'>
                <button onClick={handleLogout} className='btn btn-link'>Logout <i className='fa-solid fa-right-from-bracket'></i></button>
              </div>
          }
        </Container>
      </Navbar>
  )
}

export default Header