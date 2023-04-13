import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Table } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import './Styles.css'

export default function PostList() {
    const [posts, setPosts] = useState([])
    const navigate = useNavigate()
    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:8000/api/v1/posts/${id}/delete`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
            setPosts(posts.filter(post => post.id !== id))
            navigate('/posts/list')
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        async function fetchData() {
            const response = await axios.get('http://localhost:8000/api/v1/posts')
            setPosts(response.data.posts)
        }
        fetchData()
    }, [])
  return (
    <div className='container mt-3'>
        <Link to="/posts/create" className='btn btn-outline-dark mb-3'>Create Post</Link>
        <Table striped bordered>
            <thead className='table-dark'>
                <tr>
                    <th width="5%">No</th>
                    <th>Title</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                { posts.map((post,index) => (
                    <tr key={index}>
                        <td>{index+1}</td>
                        <td>{post.title}</td>
                        <td>
                            <a href={`/posts/${post.id}/edit`} className='pe-2' style={{ textDecoration: "none", color: "black" }}>edit</a>
                            <span onClick={() => handleDelete(post.id)} className='hover__'>delete</span>
                        </td>
                    </tr>
                ))}
            </tbody>
        </Table>
    </div>
  )
}
