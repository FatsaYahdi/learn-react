import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap"

export default function PostEdit() {
    const [title, setTitle] = useState("")
    const [content, setContent] = useState("")
    const [image, setImage] = useState(null)
    const token = localStorage.getItem("token")
    const navigate = useNavigate()
    const imagePath = "http://localhost:8000/storage/images/posts/"
    const { id } = useParams()
    // const [selectedTags, setSelectedTags] = useState([])
    // const [tags, setTags] = useState([])
    // const [tagsPost, setTagsPost] = useState([])

    // const handleCheckboxChange = (event) => {
    //     const tagId = parseInt(event.target.value)
    //     const isSelected = event.target.checked
    
    //     if (isSelected) {
    //       setSelectedTags([...selectedTags, tagId])
    //     } else {
    //       setSelectedTags(selectedTags.filter(id => id !== tagId))
    //     }
    // }

    const preview = (event) => {
        const file = event.target.files[0]
        const imageUrl = URL.createObjectURL(file)
        document.getElementById('output').src = imageUrl
        setImage(file)
    }
    async function handleSubmit(e) {
        e.preventDefault()
        const fData = new FormData()
        fData.append('title', title)
        fData.append('content', content)
        fData.append('image', image)
        // selectedTags.forEach(tagId => {
        //     fData.append('tag_id[]', tagId);
        // })
        try {
            await axios.post(`http://localhost:8000/api/v1/posts/${id}/edit`, fData , {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            navigate('/posts/list')
        } catch (e) {
            console.log(e)
        }
    }
    useEffect(() => {
        async function fetch() {
          const response = await axios.get(`http://localhost:8000/api/v1/posts/${id}`)
          setTitle(response.data.post.title)
          setContent(response.data.post.content)
          setImage(response.data.post.image)
          setTagsPost(response.data.post.tags)

        //   const responseTag = await axios.get('http://localhost:8000/api/v2/tag', {
        //         headers: {
        //             Authorization: `Bearer ${token}`
        //         }
        //     })
        //   setTags(responseTag.data.data)
        }
        fetch()
      }, [id])
  return (
    <Container className="mt-3">
        <Row>
            <Col md="{12}">
                <Card className="border-0 rounded shadow-sm">
                    <Card.Body>
                        <Form onSubmit={handleSubmit}>
                            <Form.Group className="mb-3">
                                <Form.Label htmlFor="title">Title</Form.Label>
                                <Form.Control name="title" id="title" type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} autoComplete="off" />
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label htmlFor="content">Content</Form.Label>
                                <Form.Control name="content" id="content" as="textarea" rows={3} placeholder="Content" value={content} onChange={(e) => setContent(e.target.value)} autoComplete="off" />
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label htmlFor="image">Image</Form.Label>
                                <Form.Control name="image" id="image" type="file" />
                                <img id="output" width={300} className="pt-2" src={imagePath + image} />
                            </Form.Group>

                            {/* <Form.Group className="mb-3">
                                <p>Tag</p>
                                {tags.map((tag, index) => (
                                    <span key={index}>
                                    <Form.Control type="checkbox" name="tags[]" id={`tag_${tag.id}`} value={tag.id} className="btn-check" onChange={handleCheckboxChange} />
                                    <Form.Label htmlFor={`tag_${tag.id}`}  className="btn btn-md btn-outline-dark" >{tag.name}</Form.Label>
                                    </span>
                                ))}
                            </Form.Group> */}

                            <Button variant="primary" type="submit">
                                Update
                            </Button>
                        </Form>
                    </Card.Body>
                </Card>
            </Col>
        </Row>
    </Container>
  )
}
