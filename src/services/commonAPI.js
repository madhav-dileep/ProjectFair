import axios from "axios"

const commonAPI = async (methodData, urlData, dataBody, reqHeader) => {
    const reqConfig = {
        method: methodData,
        url: urlData,
        data: dataBody,
        headers: reqHeader ? reqHeader : { "Content-Type": "application/json" },
    }

    return await axios(reqConfig).then(response => {
        return response
    }).catch(err => {
        return err
    })
}

export default commonAPI