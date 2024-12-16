import React from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'

function Home() {
    const [show, setShow] = useState(false);
    const [data, setData] = useState([])
  
    useEffect(() => {
      getdata()
    }, [])
  
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
  
    const getdata = async () => {
      const result = await axios.get("https://jsonplaceholder.typicode.com/todos")
      console.log(result)
      setData(result.data)
    }

    const handleadd=()=>{
        handleClose()
        alert("soryy,we can't update in fake api")
    }
  
    return (
        <>
        <h6>3.fetchand displayed data</h6>
        <h6>2.added router and implemented routing between home,about and contact</h6>
        
            <h1 className='m-5'>todo</h1>
            <div className='mx-5 d-flex justify-content-between'>
                <button className='btn btn-success' onClick={handleShow}>Add +</button>
                <Link className='btn btn-info' to={'/contact'}>Go to Contacts</Link>
                <Link className='btn btn-info' to={'/about'}>Go to About</Link>
            </div>
            <div className='m-5'>
                <table className='table table-striped table-bordered table-hover'>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>UserID</th>
                            <th>Title</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data?.map((item) => (
                            <tr key={item?.id}>
                                <td>{item?.id}</td>
                                <td>{item?.userId}</td>
                                <td>{item?.title}</td>
                                <td>{item?.completed ? "completed" : "Not completed"}</td>
                            </tr>
                        ))}
                    </tbody>

                </table>
            </div>

            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Add Task</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <input className='form-control' placeholder='Add a new Task' type="text" />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleadd}>Add</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default Home