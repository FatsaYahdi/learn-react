import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Button, Modal, Table } from 'react-bootstrap'

export default function Test() {
    const [status, setStatus] = useState("")
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [showModal, setShowModal] = useState(false)
    const [category, setCategory] = useState([])
    const [categoryId, setCategoryId] = useState("")
    const [error, setError] = useState("")

    const handleClose = () => {
        setShowModal(false)
        setName("")
        setDescription("")
        setStatus("")
        setError("")
    }
    const handleShow = (data) => {
        setShowModal(true)
        setStatus(data.status)
        setName(data.name)
        setDescription(data.desc)
        setCategoryId(data.id)
    }
    const handleSubmit = async (data) => {
        if (data.status === "Edit") {
            try {
                const response = await axios.put(`http://localhost:8000/api/v2/category/${categoryId}/edit`, {
                    name: data.name,
                    description: data.description
                }, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                })
                const newCategory = category.map((item) => {
                    if (item.id === categoryId) {
                        return response.data.data
                    } else {
                        return item
                    }
                })
                setCategory(newCategory)
                handleClose()
            } catch (error) {
                setError(error.response.data.errors)
            }
        } else if (data.status === "Delete") {
            try {
                await axios.delete(`http://localhost:8000/api/v2/category/${categoryId}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }})
                handleClose()
                const newCategory = category.filter((item) => {
                    return item.id !== categoryId
                })
                setCategory(newCategory)
            }
             catch (error) {
                setError(error.response.data.errors)
            }
        } else if (data.status === "Create") {
            try {
                const response = await axios.post("http://localhost:8000/api/v2/category/create", {
                    name: name,
                    description: description
                }, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                })
                setCategory([...category, response.data.data])
                handleClose()
            } catch (error) {
                setError(error.response.data.errors)
            }
        }
    }
    useEffect(() => {
        async function fetchData() {
        try {
            const response = await axios.get("http://localhost:8000/api/v2/category")
            setCategory(response.data.data)
        } catch (error) {
            console.log(error.response)
        }
        }
        fetchData()
    }, [])
  return (
    <div className='container mt-3 '>
        <button className='btn btn-outline-primary mb-3' onClick={() => {
            handleShow({status:'Create'})
        }}>Create</button>
         <Table striped bordered>
            <thead className='table-dark'>
                <tr>
                    <td width="5%">No</td>
                    <td width="40%">Name</td>
                    <td width="30%">Description</td>
                    <td width="15%">Action</td>
                </tr>
            </thead>
            <tbody>
            { category.map((item,index) => (
                <tr key={item.id}>
                    <td>{index+1}</td>
                    <td>{item.name}</td>
                    <td>{item.description ?? "-"}</td>
                    <td>
                      <span className='pe-2' onClick={() => handleShow({name: item.name, desc: item.description , status:'Edit', id: item.id})}>Edit</span>
                      <span onClick={() => handleShow({status: 'Delete', id: item.id})}>Delete</span>
                    </td>
            </tr>
            ))}
            </tbody>
          </Table>
    <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
            <Modal.Title>{status}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        {status !== "Delete" ? (
            <>
            <label htmlFor="title">Name :</label>
            <input
            type="text"
            value={name}
            onChange={(e) => {setName(e.target.value)}}
            className="form-control"
            id="title"
            placeholder='Title'
            />
            <label htmlFor="desc" className="form-label">
            Description :
            </label>
            <textarea
            value={description}
            onChange={(e) => {setDescription(e.target.value)}}
            placeholder="Description"
            className="form-control"
            id="desc"
            rows="3"
            ></textarea>
            <p className="text-danger form-label">{error}</p>
            </>
        ) : (
            <h5>are you sure you want to delete {name}?</h5>
        )}
        </Modal.Body>
        <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
            Cancel
            </Button>
            <Button variant={status === "Delete" ? "danger" : "primary"} onClick={() => {
                if (status === "Delete") {
                    handleSubmit({status, id: categoryId });
                } else {
                    handleSubmit({name, description, status} );
                }
            }}>
            {status}
            </Button>
        </Modal.Footer>
    </Modal>
    </div>
  )
}
