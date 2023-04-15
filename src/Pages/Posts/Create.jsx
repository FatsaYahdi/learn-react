import axios from "axios"
import { useEffect, useState } from "react"
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap"
import { useNavigate } from "react-router-dom"

function PostCreate() {
    const [title, setTitle] = useState("")
    const [content, setContent] = useState("")
    const [image, setImage] = useState("")
    const token = localStorage.getItem("token")
    const [tags, setTags] = useState([])
    const [categories, setCategories] = useState([])
    const [error, setError] = useState("")
    const navigate = useNavigate()
    const [selectedTags, setSelectedTags] = useState([])
    const [selectedCategories, setSelectedCategories] = useState([])

    const handleCheckboxChangeTag = (event) => {
        const tagId = parseInt(event.target.value)
        const isSelected = event.target.checked
    
        if (isSelected) {
          setSelectedTags([...selectedTags, tagId])
        } else {
          setSelectedTags(selectedTags.filter(id => id !== tagId))
        }
    }
    const handleCheckboxChangeCategory = (event) => {
        const categoryId = parseInt(event.target.value)
        const isSelected = event.target.checked
    
        if (isSelected) {
            setSelectedCategories([...selectedCategories, categoryId])
        } else {
            setSelectedCategories(selectedCategories.filter(id => id !== categoryId))
        }
    }
    async function handleSubmit(e) {
        e.preventDefault()
        const fData = new FormData()
        fData.append('title', title)
        fData.append('content', content)
        fData.append('image', image)
        selectedTags.forEach(tagId => {
            fData.append('tag[]', tagId);
        })
        selectedCategories.forEach(categoryId => {
            fData.append('category[]', categoryId);
        })
        try {
            await axios.post(`http://localhost:8000/api/v1/posts`, fData , {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            navigate('/posts')
        } catch (e) {
            setError(e.response.data.message)
        }
    }
    function preview(event) {
        const file = event.target.files[0]
        const imageUrl = URL.createObjectURL(file)
        document.getElementById('output').src = imageUrl
        setImage(file)
    }
    useEffect(() => {
        async function fetchData() {
            const tag = await axios.get('http://localhost:8000/api/v2/tag', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            const kategori = await axios.get('http://localhost:8000/api/v2/category', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            setTags(tag.data.data)
            setCategories(kategori.data.data)

        }
        fetchData()
    }, [])


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
                                <Form.Control name="image" id="image" type="file" onChange={preview} />
                                <img id="output" width={300} className="pt-2" />
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <p>Tag</p>
                                {tags.map((tag, index) => (
                                    <span key={index}>
                                    <Form.Control type="checkbox" name="tag[]" id={`tag_${tag.id}`} value={tag.id} className="btn-check" onChange={handleCheckboxChangeTag} />
                                    <Form.Label htmlFor={`tag_${tag.id}`}  className="btn btn-md btn-outline-dark" >{tag.name}</Form.Label>
                                    </span>
                                ))}
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <p>Kategori</p>
                                {categories.map((category) => (
                                    <span key={category.id}>
                                    <Form.Control type="checkbox" name="category[]" id={`category_${category.id}`} value={category.id} className="btn-check" onChange={handleCheckboxChangeCategory} />
                                    <Form.Label htmlFor={`category_${category.id}`}  className="btn btn-md btn-outline-dark" >{category.name}</Form.Label>
                                    </span>
                                ))}
                            </Form.Group>
                            <Form.Group>
                                <p>{error}</p>
                            </Form.Group>

                            <Button variant="primary" type="submit">
                                Create
                            </Button>
                        </Form>
                    </Card.Body>
                </Card>
            </Col>
        </Row>
    </Container>
)
}

export default PostCreate