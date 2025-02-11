import React, { useEffect, useState } from 'react'
import { Card, Col, Row } from 'react-bootstrap'
import ProjectCard from '../components/ProjectCard'
import Header from '../components/Header'
import { getAllProjectAPI } from '../services/allAPI'
import { useNavigate } from 'react-router-dom'

const Projects = () => {

  const [allProjects, setAllProjects] = useState([])
  const [searchKey,setSearchKey] = useState("")
  const navigate = useNavigate()
  console.log(allProjects)

  const getAllProjects = async () => {

    const token = sessionStorage.getItem('token')
    if (token) {
      const reqHeader = {
        'Authorization': `Bearer ${token}`
      }
      try {
        const result = await getAllProjectAPI(searchKey,reqHeader)
        if (result.status == 200) {
          setAllProjects(result.data)
        } else {
          console.log(result.response.data);
        }
      } catch (e) {
        console.log(e)
      }
    } else {
      alert('Please Login to Explore Projects!')
      navigate('/login')
    }
  }

  useEffect(() => {
    getAllProjects()
  }, [searchKey])

  return (
    <>
      <Header />
      <div style={{ paddingTop: '150px', height: 'auto', minHeight:'100vh' }} className='container-fluid'>
        <div className='d-flex flex-wrap justify-content-around'>
          <h1>All Projects</h1>
          <input onChange={(e) => {setSearchKey(e.target.value)}} type="text" placeholder='Search Projects' className='form-control w-50' />
        </div>

        <Row className='mt-3'>
          {
            allProjects?.length > 0 ?
              allProjects?.map(projects => (
                <Col key={projects?._id} className='mb-3' sm={12} md={6} lg={4}>
                  <ProjectCard displayData={projects} />
                </Col>
              ))
              :
              <Col className='mb-3 fs-1 pt-5 text-danger text-center' sm={12} md={12} lg={12}>
                No Projects to Display
              </Col>
          }
        </Row>
      </div>

    </>
  )
}

export default Projects