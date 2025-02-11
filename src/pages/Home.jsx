import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import schedulingHeader from '../assets/schedulingHeader.png'
import { Button, Card } from 'react-bootstrap'
import ProjectCard from '../components/ProjectCard'
import AOS from 'aos';
import 'aos/dist/aos.css';
import { getProjectforHomeAPI } from '../services/allAPI'


const Home = () => {

  const navigate = useNavigate()
  const [allHomeProjects, setAllHomeProjects] = useState([])

  const handleProjects = () => {
    if (sessionStorage.getItem('token')) {
      navigate('/projects')
    } else {
      alert('Please Login!')
      navigate('/login')
    }
  }

  const getHomeProjects = async () => {
    try {
      const result = await getProjectforHomeAPI()
      if (result.status == 200) {
        console.log(result.data);
        setAllHomeProjects(result.data)
      } else {
        console.log(result.response.data);
      }
    } catch (e) {

    }
  }

  useEffect(() => {
    AOS.init();
    getHomeProjects()
  }, [])

  return (
    <>
      <div style={{ minHeight: '100vh' }} className='d-flex justify-content-center align-items-center rounded shadow w-100'>
        <div className='container mt-5'>
          <div className='row align-items-center gap-sm-4 gap-lg-0'>
            <div className='col-lg-6'>
              <h1 style={{ fontSize: 80 }}><i className='fa-brands fa-docker me-2'></i>Project Fair</h1>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate necessitatibus exercitationem et rerum libero nisi iste laudantium ipsa cumque? Eveniet ab provident quod voluptatem qui voluptas sunt perferendis nihil velit.</p>
              {
                sessionStorage.getItem('token') ?
                  <Link to={'/dashboard'} className='btn btn-warning text-dark'>Manage Your Projects</Link>
                  :
                  <Link to={'/login'} className='btn btn-warning text-dark'> Start to Explore</Link>
              }
            </div>
            <div className='col-lg-6'>
              <img src={schedulingHeader} alt="" />
            </div>
          </div>
          {/* Works */}
          <div className='text-center my-5'>
            <a className='text-decoration-none' href='#your-works'><h3 id='your-works' className='my-5'>Your Works</h3></a>
            <div data-aos="fade-left" className='row'>
              {
                allHomeProjects?.length > 0 ?
                  allHomeProjects?.map(project => (
                    <div className="col-lg-4 my-3 text-center"><ProjectCard displayData={project} /></div>
                  ))
                  :
                  <div>
                    Add Projects
                  </div>
              }
            </div>
            <button className='btn mt-3' onClick={handleProjects}>Click to view more Projects</button>
          </div>
          {/* Testimonials */}
          <div>
          <a className='text-decoration-none text-center' href='#your-testimonials'><h3 id='your-testimonials' className='my-5'>Our Testimonials</h3></a>
            <div className='d-flex flex-wrap justify-content-center align-items-center mt-3 w-100'>
              <Card data-aos="fade-down-right" style={{ width: '18rem',height:'22rem', marginBottom: 50, marginTop: 50,marginRight:50 }}>
                {/* <Card.Img variant="top" src="holder.js/100px180" /> */}
                <Card.Body>
                  <Card.Title className='d-flex align-items-center justify-content-center flex-column'>
                    <img width={'60px'} height={'60px'} className='rounded-circle img-fluid' src="https://th.bing.com/th/id/R.b555d7948d84650a71a2872731e2bb61?rik=HsoNDf54pEgcww&riu=http%3a%2f%2fclipart-library.com%2fimages_k%2fsilhouette-of-girl-head%2fsilhouette-of-girl-head-18.png&ehk=BkERKxx20I6cRLEJI6eHZfL7xIcKlpApFwAQJ5xtN4M%3d&risl=&pid=ImgRaw&r=0" alt="" />
                    <h3 className='mt-2'>Max Miller</h3>
                    <div className='d-flex align-items-center justify-content-center'>
                      <i className='fa-solid fa-star text-warning'></i>
                      <i className='fa-solid fa-star text-warning'></i>
                      <i className='fa-solid fa-star text-warning'></i>
                      <i className='fa-solid fa-star text-warning'></i>
                      <i className='fa-solid fa-star text-warning'></i>
                    </div>
                  </Card.Title>
                  <Card.Text className='text-center'>
  
                    Some quick example text to build on the card title and make up the
                    bulk of the card's content.
  
                  </Card.Text>
                </Card.Body>
              </Card>
              <Card data-aos="fade-down-right" style={{ width: '18rem',height:'22rem', marginBottom: 50, marginTop: 50,marginRight:50 }}>
                {/* <Card.Img variant="top" src="holder.js/100px180" /> */}
                <Card.Body>
                  <Card.Title className='d-flex align-items-center justify-content-center flex-column'>
                    <img width={'60px'} height={'60px'} className='rounded-circle img-fluid' src="https://th.bing.com/th/id/R.b555d7948d84650a71a2872731e2bb61?rik=HsoNDf54pEgcww&riu=http%3a%2f%2fclipart-library.com%2fimages_k%2fsilhouette-of-girl-head%2fsilhouette-of-girl-head-18.png&ehk=BkERKxx20I6cRLEJI6eHZfL7xIcKlpApFwAQJ5xtN4M%3d&risl=&pid=ImgRaw&r=0" alt="" />
                    <h3 className='mt-2'>Liza Kudrow</h3>
                    <div className='d-flex align-items-center justify-content-center'>
                      <i className='fa-solid fa-star text-warning'></i>
                      <i className='fa-solid fa-star text-warning'></i>
                      <i className='fa-solid fa-star text-warning'></i>
                      <i className='fa-solid fa-star text-warning'></i>
                      <i className='fa-solid fa-star text-warning'></i>
                    </div>
                  </Card.Title>
                  <Card.Text className='text-center'>
  
                    Some quick example text to build on the card title and make up the
                    bulk of the card's content.
  
                  </Card.Text>
                </Card.Body>
              </Card>
              <Card data-aos="fade-down-right" style={{ width: '18rem',height:'22rem', marginBottom: 50, marginTop: 50,marginRight:50 }}>
                {/* <Card.Img variant="top" src="holder.js/100px180" /> */}
                <Card.Body>
                  <Card.Title className='d-flex align-items-center justify-content-center flex-column'>
                    <img width={'60px'} height={'60px'} className='rounded-circle img-fluid' src="https://th.bing.com/th/id/R.b555d7948d84650a71a2872731e2bb61?rik=HsoNDf54pEgcww&riu=http%3a%2f%2fclipart-library.com%2fimages_k%2fsilhouette-of-girl-head%2fsilhouette-of-girl-head-18.png&ehk=BkERKxx20I6cRLEJI6eHZfL7xIcKlpApFwAQJ5xtN4M%3d&risl=&pid=ImgRaw&r=0" alt="" />
                    <h3 className='mt-2 text-center'>Charles Kendrick</h3>
                    <div className='d-flex align-items-center justify-content-center'>
                      <i className='fa-solid fa-star text-warning'></i>
                      <i className='fa-solid fa-star text-warning'></i>
                      <i className='fa-solid fa-star text-warning'></i>
                      <i className='fa-solid fa-star text-warning'></i>
                      <i className='fa-solid fa-star text-warning'></i>
                    </div>
                  </Card.Title>
                  <Card.Text className='text-center'>
  
                    Some quick example text to build on the card title and make up the
                    bulk of the card's content.
  
                  </Card.Text>
                </Card.Body>
              </Card>
            </div>
          </div>
         

        </div>



      </div>
    </>
  )
}

export default Home