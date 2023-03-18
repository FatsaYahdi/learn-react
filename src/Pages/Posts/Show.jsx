import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Card, Container, Row, Col, Button } from 'react-bootstrap';
import axios from 'axios';
import { IconArrowBackUp } from '@tabler/icons-react';

function PostShow() {
  const [post, setPost] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  function goBack() {
    navigate(-1);
  }

  useEffect(() => {
    async function fetchPost() {
      const response = await axios.get(`http://localhost:8000/api/v1/posts/${id}`);
      setPost(response.data.post);
      console.log(response);
    }
    fetchPost();
  }, [id]);
  return (
    <Container className="mt-3">
      <Row>
        <Col md="12">
          <Card className="px-5 rounded shadow-sm">
            <Card.Body>
              {post ? (
                <>
                <div>
                    <small className="text-muted ">{post.views} Views</small>
                    <p className="text-muted float-end fs-6">Created by : <span className="fw-bold">{post.user.name}</span></p>
                </div>
                <div className="text-center mt-3 mb-5">
                  <p className="mb-0 fs-3 fw-bold">{post.title}</p>
                  <p>{post.content}</p>
                </div>
                  <small className="text-muted float-end">{post.create_at}</small>
                    <Button variant='secondary' onClick={goBack}>
                      <IconArrowBackUp /> Back
                    </Button>
                </>
              ) : (
                <p>Loading...</p>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default PostShow;