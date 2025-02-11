import React, { useContext, useEffect, useState } from 'react'
import { Button, FloatingLabel, Form, Modal } from 'react-bootstrap';
import addImage from '../assets/addimage.png'
import { addProjectAPI } from '../services/allAPI';
import { addProjectResponseContext } from '../contexts/ContextApi';

const Add = ({setAdd}) => {

  const {addProjectResponse, setAddProjectResponse} = useContext(addProjectResponseContext)
  const [show, setShow] = useState(false);
  const [projectDetails, setProjectDetails] = useState({
    title: "",
    languages: "",
    overview: "",
    github: "",
    website: "",
    projectImg: "",
  })
  const [imageFileStatus, setImageFileStatus] = useState(false)
  const [preview, setPreview] = useState("")
  
  // console.log(projectDetails);

  useEffect(() => {
    if (projectDetails.projectImg.type == "image/png" || projectDetails.projectImg.type == "image/jpg" || projectDetails.projectImg.type == "image/jpeg") {
      // valid image.
      setImageFileStatus(true)
      setPreview(URL.createObjectURL(projectDetails.projectImg))
      // console.log(preview);
    } else {
      // invalid image.
      setImageFileStatus(false)
      setPreview("")
      setProjectDetails({ ...projectDetails, projectImg: "" })
    }
  }, [projectDetails.projectImg])

  const handleClose = () => {
    setProjectDetails({
      title: "",
      languages: "",
      overview: "",
      github: "",
      website: "",
      projectImg: "",
    })
    setPreview("")
    setImageFileStatus(false)
    setShow(false)
  };
  const handleShow = () => setShow(true);

  const handleAddProject = async () => {
    const { title, languages, overview, github, website, projectImg } = projectDetails

    if (title && languages && overview && github && website && projectImg) {
      // Proceed to API
      // alert("Make API Call")
      const reqBody = new FormData()
      reqBody.append("title",title)
      reqBody.append("languages",languages)
      reqBody.append("overview",overview)
      reqBody.append("github",github)
      reqBody.append("website",website)
      reqBody.append("projectImg",projectImg)
      const token = sessionStorage.getItem('token')
      if(token){
        const reqHeaders = {
          "Content-Type" : "multipart/form-data",
          "Authorization" : `Bearer ${token}`
        }
        try{  
          const result = await addProjectAPI(reqBody,reqHeaders)
          if(result.status == 200 ){
            // alert("Project added Succesfully")
            setAddProjectResponse(result)
            handleClose()
            setAdd(true)
          }else{
              alert(result.response.data)
          }
        }catch(e){
          console.error(e);
        }
      }
    } else {
      alert("Please fill the form completely!")
    }
  }

  return (
    <>
      <button onClick={handleShow} className='btn btn-primary'>+ New Project</button>

      <Modal centered size='lg' show={show} onHide={handleClose} backdrop="static" keyboard={false}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Project</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row">
            <div className="col-lg-4">
              <label>
                <input onChange={e => setProjectDetails({ ...projectDetails, projectImg: e.target.files[0] })} type="file" style={{ display: 'none' }} />
                <img height={'200px'} className='img-fluid' src={preview ? preview : addImage} alt="" />
              </label>
              {
                !imageFileStatus &&
                <div className='text-warning px-2 fw-bold'>
                  *Upload Only the follwing types (jpeg, jpg, png) here!
                </div>
              }
            </div>
            <div className="col-lg-8">
              <div className='mb-2'>
                <input value={projectDetails?.title} onChange={(e) => { setProjectDetails({ ...projectDetails, title: e.target.value }) }} type="text" placeholder='Project Name' className='form-control' id='Pname' />
              </div>
              <div className='mb-2'>
                <input value={projectDetails?.languages} onChange={(e) => { setProjectDetails({ ...projectDetails, languages: e.target.value }) }} type="text" placeholder='Languages Used' className='form-control' />
              </div>
              <div className='mb-2'>
                <input value={projectDetails?.overview} onChange={(e) => { setProjectDetails({ ...projectDetails, overview: e.target.value }) }} type="text" placeholder='Project Overview' className='form-control' />
              </div>
              <div className='mb-2'>
                <input value={projectDetails?.github} onChange={(e) => { setProjectDetails({ ...projectDetails, github: e.target.value }) }} type="text" placeholder='Project GitHub Link' className='form-control' />
              </div>
              <div className='mb-2'>
                <input value={projectDetails?.website} onChange={(e) => { setProjectDetails({ ...projectDetails, website: e.target.value }) }} type="text" placeholder='Project Link' className='form-control' />
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleAddProject}>
            Add
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default Add