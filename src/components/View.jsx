import React, { useContext, useEffect, useState } from 'react'
import Add from '../components/Add'
import Edit from '../components/Edit'
import { useNavigate } from 'react-router-dom'
import { getUserProjectAPI, removeProjectAPI } from '../services/allAPI'
import Projects from '../pages/Projects'
import { addProjectResponseContext, editProjectResponseContext } from '../contexts/ContextApi'

const View = ({setShow,setAdd}) => {

  const [userProjects, setUserProjects] = useState([])
  const { addProjectResponse, setAddProjectResponse } = useContext(addProjectResponseContext)
  const { editProjectResponse, setEditProjectResponse } = useContext(editProjectResponseContext)

  const navigate = useNavigate()

  // Functions
  const getUserProjects = async () => {
    const token = sessionStorage.getItem("token")
    if (token) {
      const reqHeader = {
        'Authorization': `Bearer ${token}`
      }
      try {
        const result = await getUserProjectAPI(reqHeader)
        if (result.status == 200) {
          // console.log("Inside" + result.data);
          setUserProjects(result.data)
        } else {

        }
      } catch (e) {
        console.error(e)
      }
    } else {
      // alert("Please Login to view projects!")
      // navigate('/login')
      console.log('not logged in');
    }
  }

  const removeProject = async (id) => {
    // alert(id)
    const token = sessionStorage.getItem('token')
    if (token) {
      const reqHeader = {
        "Authorization": `Bearer ${token}`
      }
      try {
        await removeProjectAPI(id, reqHeader)
        getUserProjects()
      } catch (e) {
        console.error(e);
      }
      setShow(true)
    } else {
      console.log('Need To Login to remove items!');

    }
  }

  useEffect(() => {
    getUserProjects()
  }, [addProjectResponse, editProjectResponse])

  // console.log(userProjects);

  return (
    <>
      <div className='d-flex justify-content-between container'>
        <h2 className='text-warning'>All Projects</h2>
        <div><Add setAdd={setAdd} /></div>
      </div>
      <div className='AllProjects mt-2 container'>
        {
          userProjects?.length > 0 ?
            userProjects?.map((projects) => (
              <div key={projects?._id} className='border rounded p-2 d-flex justify-content-between mb-2'>
                <h3>{projects?.title}</h3>
                <div className='d-flex align-items-center'>
                  <div className=''><Edit project={projects} /></div>
                  <div className='btn'><a href={projects?.github} target='_blank'><i className='fa-brands fa-github'></i></a></div>
                  <button onClick={() => removeProject(projects?._id)} className='btn'><i className='fa-solid fa-trash text-danger'></i></button>
                </div>
              </div>
            ))
            :
            <div className='text-warning fw-bolder'>
              No Projects Uploaded Yet!.....
            </div>
        }
      </div>
    </>
  )
}

export default View