import commonAPI from './commonAPI'
import serverURL from './serverURL'

// register USER API, component: Auth.jsx
export const registerAPI = async (reqBody) => {
    return await commonAPI("POST", `${serverURL}/register`, reqBody)
}

// login USER API, component: Auth.jsx
export const loginAPI = async (reqBody) => {
    return await commonAPI("POST", `${serverURL}/login`, reqBody)
}

// addproject, called by Add.jsx
export const addProjectAPI = async (reqBody, reqHeader) => {
    return await commonAPI("POST", `${serverURL}/add-project`, reqBody, reqHeader)
}

// getProjects for home ,called by Home.jsx
export const getProjectforHomeAPI = async () => {
    return await commonAPI("GET", `${serverURL}/home-project`, {})
}

// getAllProjects  ,called by Projects.jsx
export const getAllProjectAPI = async (searchKey, reqHeader) => {
    return await commonAPI("GET", `${serverURL}/all-project?search=${searchKey}`, {}, reqHeader)
}

// getUserProjects  ,called by Dashboard.jsx
export const getUserProjectAPI = async (reqHeader) => {
    return await commonAPI("GET", `${serverURL}/user-project`, {}, reqHeader)
}

// editprojectAPi, called by Edit.jsx
export const editProjectAPI = async (id, reqBody, reqHeader) => {
    return await commonAPI("PUT", `${serverURL}/projects/${id}/edit`, reqBody, reqHeader)
}

// removeprojectAPi, called from View.jsx
export const removeProjectAPI = async (id, reqHeader) => {
    return await commonAPI("DELETE", `${serverURL}/projects/${id}/remove`, {}, reqHeader)
}

// editUserAPI, called from Profile.jsx, need authorization
export const editUserAPI = async (reqBody, reqHeader) => {
    return await commonAPI("PUT", `${serverURL}/edit-user`, reqBody, reqHeader)
}