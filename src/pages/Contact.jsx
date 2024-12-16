import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Link } from 'react-router-dom';

function Contact() {
  const [show, setShow] = useState(false);
  const [contacts, setContacts] = useState([]);
  const [contact, setContact] = useState({ cname: "", cnum: "" });
  const [editIndex, setEditIndex] = useState(null);

  useEffect(() => {
    const storedContacts = JSON.parse(localStorage.getItem("contacts")) || [];
    setContacts(storedContacts);
  }, []);

  const handleClose = () => {
    setShow(false);
    setEditIndex(null);
    setContact({ cname: "", cnum: "" }); 
  };

  const handleShow = () => setShow(true);

  const handleAddOrUpdate = () => {
    let updatedContacts;

    if (editIndex !== null) {
      updatedContacts = contacts.map((item, index) =>
        index === editIndex ? contact : item
      );
    } else {
      updatedContacts = [...contacts, contact];
    }

    setContacts(updatedContacts);
    localStorage.setItem("contacts", JSON.stringify(updatedContacts));

    setContact({ cname: "", cnum: "" });
    setEditIndex(null);
    setShow(false);
  };

  const handleEdit = (index) => {
    setEditIndex(index);
    setContact(contacts[index]);
    setShow(true);
  };

  const handleDelete = (index) => {
    const updatedContacts = contacts.filter((_, i) => i !== index);
    setContacts(updatedContacts);
    localStorage.setItem("contacts", JSON.stringify(updatedContacts));
  };

  return (
    <>
      <h6>1.todo app with add,edit, and delete and tasks are persisted using local storage</h6>
      <div className='mx-5 mt-5 d-flex justify-content-between'>
        <button className='btn btn-success' onClick={handleShow}>Add +</button>
        <Link className='btn btn-info' to={'/'}>Go to Home</Link>
        <Link className='btn btn-info' to={'/about'}>Go to About</Link>
      </div>
      <div className='m-5'>
        <table className='table table-striped table-bordered table-hover'>
          <thead>
            <tr>
              <th>Name</th>
              <th>Number</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {contacts.map((item, index) => (
              <tr key={index}>
                <td>{item.cname}</td>
                <td>{item.cnum}</td>
                <td>
                  <button
                    className='btn btn-success'
                    onClick={() => handleEdit(index)}
                  >
                    Edit
                  </button>
                </td>
                <td>
                  <button
                    className='btn btn-danger'
                    onClick={() => handleDelete(index)}
                  >
                    Delete
                  </button>
                </td>
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
          <Modal.Title>{editIndex !== null ? "Edit Contact" : "Add Contact"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <input
            className='mb-3 form-control'
            onChange={(e) => setContact({ ...contact, cname: e.target.value })}
            value={contact.cname}
            placeholder='Enter Name'
            type="text"
          />
          <input
            className='form-control'
            onChange={(e) => setContact({ ...contact, cnum: e.target.value })}
            value={contact.cnum}
            placeholder='Enter Number'
            type="text"
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleAddOrUpdate}>
            {editIndex !== null ? "Update" : "Add"}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Contact;
