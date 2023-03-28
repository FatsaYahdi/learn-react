import { useEffect, useState } from "react";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";

function PostCreate() {
    const [title, setTitle] = useState(() => JSON.parse(localStorage.getItem("title")) || null);
    const [content, setContent] = useState(() => JSON.parse(localStorage.getItem("content")) || null);

    useEffect(() => {
    localStorage.setItem('title', JSON.stringify(title));
    localStorage.setItem('content', JSON.stringify(content));
    }, [title, content]);

return (
    <Container className="mt-3">
        <Row>
            <Col md="{12}">
                <Card className="border-0 rounded shadow-sm">
                    <Card.Body>
                        <Form>
                            <Form.Group className="mb-3">
                                <Form.Label htmlFor="title">Title</Form.Label>
                                <Form.Control name="title" id="title" type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label htmlFor="content">Content</Form.Label>
                                <Form.Control name="content" id="content" as="textarea" rows={3} placeholder="Content" value={content} onChange={(e) => setContent(e.target.value)} />
                            </Form.Group>

                            <Button variant="primary" type="submit">
                                Send
                            </Button>
                        </Form>
                    </Card.Body>
                </Card>
            </Col>
        </Row>
    </Container>
);
}

export default PostCreate;