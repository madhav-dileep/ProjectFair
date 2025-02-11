import React, { useContext, useEffect, useState } from 'react'
import { Button, Modal, Toast } from 'react-bootstrap'
import addImage from '../assets/addimage.png'
import serverURL from '../services/serverURL';
import { editProjectAPI } from '../services/allAPI';
import { editProjectResponseContext } from '../contexts/ContextApi';


const Edit = ({ project }) => {
  // States
  const [show, setShow] = useState(false);
  const [projectDetails, setProjectDetails] = useState({
    id: project._id,
    title: project.title,
    languages: project.languages,
    overview: project.overview,
    github: project.github,
    website: project.website,
    projectImg: "",
  })
  const [imageFileStatus, setImageFileStatus] = useState(false)
  const [preview, setPreview] = useState("")
  const [viewToast, setViewToast] = useState(false)

    const {editProjectResponse, setEditProjectResponse} = useContext(editProjectResponseContext)
  

  // Functions
  const handleClose = () => {
    setProjectDetails({
      id: project._id,
      title: project.title,
      languages: project.languages,
      overview: project.overview,
      github: project.github,
      website: project.website,
      projectImg: "",
    })
    setShow(false)
  };
  const handleShow = () => {
    setShow(true)
    setProjectDetails({
      id: project._id,
      title: project.title,
      languages: project.languages,
      overview: project.overview,
      github: project.github,
      website: project.website,
      projectImg: "",
    })
  };



  const handleUpdateProject = async () => {
    const { id, title, languages, overview, github, website, projectImg } = projectDetails
    if(title && languages && overview && github && website){
      const reqBody = new FormData()
      reqBody.append("title",title)
      reqBody.append("languages",languages)
      reqBody.append("overview",overview)
      reqBody.append("github",github)
      reqBody.append("website",website)
      // preview ? reqBody.append("projectImg",projectImg) : reqBody.append("proejctImg",project.projectImg)
      reqBody.append("projectImg", preview ? projectImg : project.projectImg)
      const token = sessionStorage.getItem('token')
      if(token){
        const reqHeaders = {
          "Content-Type" : "multipart/form-data",
          "Authorization" : `Bearer ${token}`
        }
        try{
          const result = await editProjectAPI(id,reqBody,reqHeaders)
          if(result.status == 200){
            alert('Project Updated SuccessFully')
            setEditProjectResponse(result)
            handleClose()
          }else{
            if(result.response.status == 406){
              alert(result.response.data)
            }
          }
        }catch(e){
          console.error(e)
        }
      }else{
        // alert('Please Login')
      }
    }else{
      alert('Please Dont leave any fields empty!')
    }
  }

  // useEffect
  useEffect(() => {
    if (projectDetails.projectImg.type == "image/png" || projectDetails.projectImg.type == "image/jpg" || projectDetails.projectImg.type == "image/jpeg") {
      // valid image.
      console.log("inside valid image type");
      
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


  return (
    <>
      <button className='btn' onClick={handleShow}><i className='fa-solid fa-edit'></i></button>

      <Modal centered size='lg' show={show} onHide={handleClose} backdrop="static" keyboard={false}>
        <Modal.Header closeButton>
          <Modal.Title>Update Project Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row">
            <div className="col-lg-4">
              <label>
                <input onChange={e => setProjectDetails({ ...projectDetails, projectImg: e.target.files[0] })} type="file" style={{ display: 'none' }} />
                <img height={'200px'} className='img-fluid border' src={preview ? preview : `${serverURL}/uploads/${project.projectImg}`} alt="" />
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
          <Button variant="primary" onClick={handleUpdateProject}>
            Update
          </Button>
        </Modal.Footer>
      </Modal>
      
    </>
  )
}

export default Edit