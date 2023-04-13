import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'
import { Button, Modal, Table } from 'react-bootstrap'

export default function TagIndex() {
    const [tag, setTag] = useState([])
    const [showModal, setShowModal] = useState(false)
    const [showModalCreate, setShowModalCreate] = useState(false)
    const [nameTagEdit, setNameTagEdit] = useState(null)
    const [nameDescEdit, setNameDescEdit] = useState("")
    const [idEdit, setIdEdit] = useState(null)
    const [nameTag, setNameTag] = useState("")
    const [tagDesc, setTagDesc] = useState("")
    const [error, setError] = useState(null)

    const handleClose = () => {setShowModal(false)}
    const handleShow = (a, b, c) => {
        setShowModal(true)
        setIdEdit(a)
        setNameTagEdit(b)
        setNameDescEdit(c)
    }
    const handleCloseCreateModal = () => {setShowModalCreate(false)}
    const handleCreateModal = () => {
        setShowModalCreate(true)
    }
    const handleCreateSubmit = async () => {
        try {
            const response = await axios.post("http://localhost:8000/api/v2/tag/create", {
                name: nameTag,
                description: tagDesc
            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
            setShowModalCreate(false)
            setTag([...tag, response.data.data])
        } catch (error) {
            setError(error.response.data.message)
        }
    }
    const handleSubmit = async (id, nameTag, desc) => {
        await axios.put(`http://localhost:8000/api/v2/tag/update/${id}`, {
            name: nameTag,
            description : desc
        }, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
        setTag(tag => tag.map(item => {
              if (item.id === id) {
                return {
                  ...item,
                  name: nameTag,
                  description: desc
                }
              }
              return item
            }))
        setShowModal(false)
    }
    const handleDelete = async (id) => {
        await axios.delete(`http://localhost:8000/api/v2/tag/delete/${id}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
        setTag(tag.filter(tag => tag.id !== id))
    }
    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.get('http://localhost:8000/api/v2/tags', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                })
                setTag(response.data.data)
            } catch (error) {
                console.error(error)
            }
        }
        fetchData()
    }, [])

  return (
    <div className="container mt-3">
        <div className='btn btn-outline-dark mb-2 btn-sm' onClick={handleCreateModal}>Create Tag</div>
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
            { tag.map((tags,index) => (
                <tr key={index}>
                    <td>{index+1}</td>
                    <td>{tags.name}</td>
                    <td>{tags.description ?? "-"}</td>
                    <td>
                    <span className='pe-2' onClick={() => handleShow(tags.id, tags.name, tags.description)}>Edit</span>
                        <span onClick={() => handleDelete(tags.id)}>Delete</span>
                    </td>
            </tr>
            ))}
            </tbody>
        </Table>
        {/* edit */}
        <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Editing Tag</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <label htmlFor="title">Title :</label>
          <input
            type="text"
            value={nameTagEdit}
            onChange={(e) => {setNameTagEdit(e.target.value)}}
            className="form-control"
            id="title"
          />
          <label htmlFor="desc" className="form-label">
            Description :
          </label>
          <textarea
            value={nameDescEdit}
            onChange={(e) => {setNameDescEdit(e.target.value)}}
            placeholder="Description"
            className="form-control"
            id="desc"
            rows="3"
          ></textarea>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={() => {handleSubmit(idEdit ,nameTagEdit, nameDescEdit)}}>
            Update
          </Button>
        </Modal.Footer>
      </Modal>

      {/* create */}
        <Modal show={showModalCreate} onHide={handleCloseCreateModal}>
        <Modal.Header closeButton>
          <Modal.Title>Create Tag</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <label htmlFor="title">Title :</label>
          <input
            type="text"
            value={nameTag}
            onChange={(e) => {setNameTag(e.target.value)}}
            className="form-control"
            id="title"
            placeholder='Name...'
          />
          <label htmlFor="desc" className="form-label">
            Description :
          </label>
          <textarea
            value={tagDesc}
            onChange={(e) => {setTagDesc(e.target.value)}}
            placeholder="Description..."
            className="form-control"
            id="desc"
            rows="3"
          ></textarea>
          <span>{error ?? error}</span>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseCreateModal}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleCreateSubmit}>
            Create
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}
