import React, { useEffect, useState } from 'react'
import { Collapse } from 'react-bootstrap'
import addUser from '../assets/addUser.png'
import serverURL from '../services/serverURL';
import { editUserAPI } from '../services/allAPI';


const Profile = () => {

  // States
  const [open, setOpen] = useState(false);
  const [profileDetails, setProfileDetails] = useState({
    userName: "",
    email: "",
    password: "",
    github: "",
    linkedIn: "",
    profilePicture: ""
  })
  const [existingProfileImg, setExistingProfileImg] = useState("")
  const [preview, setPreview] = useState("")

  // functions
  const handleUpdateProfile = async () => {
    const { userName, email, password, github, linkedIn, profilePicture } = profileDetails
    if (github && linkedIn) {
      const reqBody = new FormData()
      reqBody.append('userName', userName)
      reqBody.append('email', email)
      reqBody.append('password', password)
      reqBody.append('github', github)
      reqBody.append('linkedIn', linkedIn)
      // reqBody.append('profilePicture',profilePicture)
      reqBody.append('profilePicture', preview ? profilePicture : existingProfileImg)
      const token = sessionStorage.getItem('token')
      if(token){
        const reqHeaders = {
          "Content-Type":"multipart/form-data",
          "Authorization" : `Bearer ${token}`
        }
       try{ const result = await editUserAPI(reqBody, reqHeaders)
        if(result.status == 200){
          alert('Profile Updated!')
          sessionStorage.setItem('user',JSON.stringify(result.data))
          setOpen(!open)
        }else{
          console.log(result.response.data);
        }}catch(e){
          console.error(e);
        }
      }else{
        console.log("Login/No Token Found");
      }
    } else {
      alert("Please fill the Fields!!")
    }
  }

  // useEffect()
  useEffect(() => {
    if (sessionStorage.getItem('user')) {
      const userData = JSON.parse(sessionStorage.getItem('user'))
      // console.log(userData);
      setProfileDetails({
        ...profileDetails,
        userName: userData.userName,
        email: userData.email,
        password: userData.password,
        github: userData.github,
        linkedIn: userData.linkedIn,
      })
      setExistingProfileImg(userData.profilePicture)
    }
  }, [open])

  useEffect(() => {
    if (profileDetails.profilePicture) {
      setPreview(URL.createObjectURL(profileDetails.profilePicture))
    } else {
      setPreview("")
    }
  }, [profileDetails.profilePicture])

  return (
    <>
      <div className='d-flex justify-content-evenly'>
        <h3 className='text-warning'>Profile</h3>
        <button onClick={() => setOpen(open => !open)} className='btn text-warning'><i className='fa-solid fa-angle-down'></i></button>
      </div>

      <Collapse in={open}>
        <div className='border p-2 rounded-3 row container-fluid align-items-center justify-content-center'>
          <label className='text-center mb-2'>
            <input onChange={(e) => { setProfileDetails({ ...profileDetails, profilePicture: e.target.files[0] }) }} type="file" className='d-none' />
            <img height={'300px'} width={'300px'} className='img-fluid' src={existingProfileImg ? preview ? preview : `${serverURL}/uploads/${existingProfileImg}` : preview ? preview : addUser} alt="" />
          </label>
          <div className='mb-2 w-100'>
            <input value={profileDetails?.github} onChange={e => { setProfileDetails({ ...profileDetails, github: e.target.value }) }} type="text" className='form-control' placeholder='User GITHUB Link' />
          </div>
          <div className='mb-2 w-100'>
            <input value={profileDetails?.linkedIn} onChange={e => { setProfileDetails({ ...profileDetails, linkedIn: e.target.value }) }} type="text" className='form-control' placeholder='User Linked Profile Link' />
          </div>
          <div className="d-grid w-100">
            <button onClick={handleUpdateProfile} className='btn btn-warning'>Update Profile</button>
          </div>
        </div>
      </Collapse>
    </>
  )
}

export default Profile