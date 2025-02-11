import React, { useState } from 'react'
import { Card, Modal, ModalFooter } from 'react-bootstrap'
import serverURL from '../services/serverURL';


const ProjectCard = ({displayData}) => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <Card style={{width:'24rem'}} onClick={handleShow} className='btn shadow'>
                <Card.Img height={'200px'} variant="top" src={`${serverURL}/uploads/${displayData?.projectImg}`} />
                <Card.Body>
                    <Card.Title className='d-flex align-items-center justify-content-center flex-column'>
                        {displayData?.title}
                    </Card.Title>
                </Card.Body>
            </Card>

            <Modal centered size='lg' show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Project Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='row'>
                        <div className="col-lg-6">
                            <img className='img-fluid' src={`${serverURL}/uploads/${displayData?.projectImg}`} alt="" />
                        </div>
                        <div className="col-lg-6">
                            <h3>{displayData?.title}</h3>
                            <h6 className='fw-bolder'>Languages Used: <span className='text-danger'>{displayData?.languages}</span></h6>
                            <p style={{textAlign:'justify'}}> <span className='fw-bolder'>Project Overview :</span> {displayData?.overview}</p>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer className='mt-2 float-start'>
                    <a href={displayData?.github} target='_blank' className='btn btn-secondary'><i className='fa-brands fa-github'></i></a>
                    <a href={displayData?.website} target='_blank' className='btn btn-secondary ms-2'><i className='fa-solid fa-link'></i></a>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default ProjectCard