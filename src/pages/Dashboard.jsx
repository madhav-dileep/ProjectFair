import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import View from '../components/View'
import Profile from '../components/Profile'
import { useNavigate } from 'react-router-dom'
import { Toast } from 'react-bootstrap'


const Dashboard = () => {

  const [userName, setUserName] = useState("")
  const navigate = useNavigate()
  const [show,setShow] = useState(false)
  const [add,setAdd] = useState(false)

  useEffect(()=>{
    if(sessionStorage.getItem('user')){
      setUserName(JSON.parse(sessionStorage.getItem('user')).userName.split(' ')[0])
    }else{
      alert("Please Login to access the Dashboard!");
      navigate('/login')
    }
  },[])

  return (
    <>
      <Header insideDashboard={true}/>
      <div style={{paddingTop:'100px', minHeight:'100vh',height:'auto',position:'relative'}} className='container-fluid'> 
        <div style={{position:'absolute',bottom:'5%',right:'5%'}}>
        <Toast onClose={() => {setShow(false),setAdd(false)}} show={show || add} delay={3000} bg='light' autohide>
          <Toast.Header>
          <strong className="me-auto text-dark">Notification</strong>
          <small className='text-dark'>just now</small>
          </Toast.Header>
          <Toast.Body className='text-dark'>
            {
              add && 
                "Project Added"
            }
            {
              show &&
              "Project Removed"
            }
          </Toast.Body>
        </Toast>
        </div>
        <div className="row mt-3">
          <div className="col-lg-8 container">
            <h1>Welcome <span className='text-warning'>{userName},</span></h1>
            <View setShow={setShow} setAdd={setAdd}/>
          </div>
          <div className="col-lg-4">
            <Profile/>
          </div>
        </div>
      </div>
    </>
  )
}

export default Dashboard