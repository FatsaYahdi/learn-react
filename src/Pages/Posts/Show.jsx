import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Card, Container, Row, Col, FormControl, Button } from 'react-bootstrap';
import axios from 'axios';
import Loading from './../../Components/Loading';
import './Show.css';
import { Form } from 'react-bootstrap';

function PostShow() {
  const [post, setPost] = useState(null);
  const [comment, setComment] = useState([]);
  const [text, setText] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const userId = localStorage.getItem('user_id');
  let postImagePath = `http://localhost:8000/storage/images/posts/`;
  function goBack() {
    navigate(-1);
  }

  // handle comment
  const handleComment = async (e) => {
    e.preventDefault();
    try {
      axios.post(`http://localhost:8000/api/v1/post/${id}/comments`, {
        text: text
      }, {
        headers : {
          Authorization : `Bearer ${token}`
        }
      });
      navigate(`/post/${id}`)
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    async function fetchPost() {
      const response = await axios.get(`http://localhost:8000/api/v1/posts/${id}`);
      setPost(response.data.post);
      try {
        const commentResponse = await axios.get(`http://localhost:8000/api/v1/post/${id}/comments`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setComment(commentResponse.data.data);
        console.log(commentResponse.data.data);
      } catch (error) {
        console.log(error.response.data);
      }
    }
    fetchPost();
  }, [id]);
  return (
    <Container className="mt-3">
    {post ? (
      <>
      <Row>
        <Col md="12">
          <Card className="px-5 rounded shadow-sm">
            <Card.Body>
                <div>
                    <small className="text-muted">{post.views}x ditonton</small>
                    <p className="text-muted float-end fs-6">Created by : <span className="fw-bold">{post.user.name}</span></p>
                </div>
                <div className="text-center mt-3 mb-5">
                  { post.image != null
                  ?
                  <img src={postImagePath + `${post.image}`} alt={post.image} className='img-fluid' />
                  : ''
                  }
                  <p className="mb-0 fs-3 fw-bold">{post.title}</p>
                  <p className='text-break'>{post.content}</p>
                </div>
                  <small className="text-muted float-end">{post.create_at}</small>
                    <span className='hover__' onClick={goBack}>
                      Back
                    </span>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      { token ? 
      <>
        <Form onSubmit={handleComment}>
          <Form.Group className="mb-3 mt-2">
            <Form.Label>Create An Comment</Form.Label>
            <Form.Control as="textarea" placeholder="Enter Comment" name='text' maxLength={255} onChange={(e) => setText(e.target.value)} autoComplete="off" />
            <input type="hidden" name="user_id" value={userId} />
            <input type="hidden" name="post_id" value={post.id} />
          </Form.Group>
          <Button type='submit'>Send</Button>
        </Form>
      </>
       :
      <>
        Login for komen
      </>
      }

      <div className='mt-2'>
            <h2>Comments ( {comment.length} )</h2>
              {comment.map((comment) => (
                <Card key={comment.id} className="my-3">
                  <Card.Body>
                    <Card.Title>{comment.user.name}</Card.Title>
                    <Card.Text className='text-break'>{comment.text}</Card.Text>
                    <small className="text-muted">{comment.created_at}</small>
                  </Card.Body>
                </Card>
              ))}
      </div>
      </>
      ) : (
        <Loading />
      )}

    </Container>
  );
}

export default PostShow;