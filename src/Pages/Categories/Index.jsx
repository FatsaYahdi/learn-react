import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Button, Modal, Table } from 'react-bootstrap'

export default function CategoryIndex() {
  const [categories, setCategories] = useState([])
  const [showModalCreate, setShowModalCreate] = useState(false)
  const [showModalEdit, setShowModalEdit] = useState(false)
  const [showModalDelete, setShowModalDelete] = useState(false)
  const [name, setName] = useState("")
  const [desc, setDesc] = useState("")
  const [idDelete, setIdDelete] = useState("")
  const [idEdit, setIdEdit] = useState("")
  const [nameEdit, setNameEdit] = useState("")
  const [descEdit, setDescEdit] = useState("")
  const [errorCreate, setErrorCreate] = useState("")
  const [errorEdit, setErrorEdit] = useState("")
  // close
  const handleCloseDelete = () => {
    setShowModalDelete(false)
    setIdDelete("")
  }
  const handleCloseCreate = () => {
    setShowModalCreate(false)
    setName("")
    setDesc("")
    setErrorCreate("")
  }
  const handleCloseEdit = () => {
    setShowModalEdit(false)
    setIdEdit("")
    setNameEdit("")
    setDescEdit("")
    setErrorEdit("")
  }
  // show
  const handleModalCreate = () => {
    setShowModalCreate(true)
  }
  const handleModalEdit = (id,name,desc) => {
    setShowModalEdit(true)
    setIdEdit(id)
    setNameEdit(name)
    setDescEdit(desc)
  }
  const handleModalDelete = (id) => {
    setShowModalDelete(true)
    setIdDelete(id)
  }
  // form
  const handleCreateSubmit = async () => {
    try {
      const response = await axios.post("http://localhost:8000/api/v2/category/create", {
          name: name,
          description: desc
      }, {
          headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`
          }
      })
      setShowModalCreate(false)
      setCategories([...categories, response.data.data])
    } catch (error) {
      errorCreate(error.response.data.message)
    }
  }
  const handleEditSubmit = async () => {
    await axios.put(`http://localhost:8000/api/v2/category/${idEdit}/edit`, {
      name: nameEdit,
      description : descEdit
    }, {
      headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
    setCategories(categories => categories.map(item => {
      if (item.id === idEdit) {
        return {
          ...item,
          name: nameEdit,
          description: descEdit
        }
      }
      return item
    }))
    setShowModalEdit(false)
  }
  const handleDeleteSubmit = async () => {
    await axios.delete(`http://localhost:8000/api/v2/category/${idDelete}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
    }})
    setCategories(categories.filter(categories => categories.id !== idDelete))
    setShowModalDelete(false)
  }
  useEffect(() => {
    async function fetchData() {
        try {
            const response = await axios.get('http://localhost:8000/api/v2/category')
            setCategories(response.data.data)
        } catch (error) {
            console.error(error)
        }
    }
    fetchData()
  }, [])
  return (
    <div className="container mt-3">
      <div className='btn btn-outline-dark mb-2 btn-sm' onClick={handleModalCreate}>Create Category</div>
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
            { categories.map((category,index) => (
                <tr key={category.id}>
                    <td>{index+1}</td>
                    <td>{category.name}</td>
                    <td>{category.description ?? "-"}</td>
                    <td>
                      <span className='pe-2' onClick={() => handleModalEdit(category.id, category.name, category.description)}>Edit</span>
                      <span onClick={() => handleModalDelete(category.id)}>Delete</span>
                    </td>
            </tr>
            ))}
            </tbody>
          </Table>
          {/* // create */}
          <Modal show={showModalCreate} onHide={handleCloseCreate}>
            <Modal.Header closeButton>
              <Modal.Title>Create Category</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <label htmlFor="title">Title :</label>
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
                value={desc}
                onChange={(e) => {setDesc(e.target.value)}}
                placeholder="Description"
                className="form-control"
                id="desc"
                rows="3"
              ></textarea>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleCloseCreate}>
                Cancel
              </Button>
              <Button variant="primary" onClick={handleCreateSubmit}>
                Create
              </Button>
            </Modal.Footer>
          </Modal>
          {/* edit */}
          <Modal show={showModalEdit} onHide={handleCloseEdit}>
            <Modal.Header closeButton>
              <Modal.Title>Edit Category</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <label htmlFor="title">Title :</label>
              <input
                type="text"
                value={nameEdit}
                onChange={(e) => {setNameEdit(e.target.value)}}
                className="form-control"
                id="title"
                placeholder='Title'
              />
              <label htmlFor="desc" className="form-label">
                Description :
              </label>
              <textarea
                value={descEdit}
                onChange={(e) => {setDescEdit(e.target.value)}}
                placeholder="Description"
                className="form-control"
                id="desc"
                rows="3"
              ></textarea>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleCloseEdit}>
                Cancel
              </Button>
              <Button variant="primary" onClick={handleEditSubmit}>
                Update
              </Button>
            </Modal.Footer>
          </Modal>
          {/* delete */}
          <Modal show={showModalDelete} onHide={handleCloseDelete}>
            <Modal.Header closeButton>
              <Modal.Title>Hapus Category</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <h4>Data yang di hapus tidak bisa di kembalikan</h4>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleCloseDelete}>
                Cancel
              </Button>
              <Button variant="danger" onClick={handleDeleteSubmit}>
                Delete
              </Button>
            </Modal.Footer>
          </Modal>
    </div>
  )
}
