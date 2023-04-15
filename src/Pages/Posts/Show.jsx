import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Card, Container, Row, Col, Button, Modal } from 'react-bootstrap';
import axios from 'axios';
import Loading from './../../Components/Loading';
import './Styles.css';
import { Form } from 'react-bootstrap';
import { IconHeartFilled, IconHeart } from '@tabler/icons-react';

function PostShow() {
  const [post, setPost] = useState(null);
  const [comment, setComment] = useState([]);
  const [text, setText] = useState(null);
  const [tags, setTags] = useState([]);
  const [categories, setCategories] = useState([]);
  const [parentId, setParentId] = useState("");
  const [reply, setReply] = useState("");
  const [replyName, setReplyName] = useState("");
  const [errorComment, setErrorComment] = useState("");
  const [error, setError] = useState("");
  const [length, setLength] = useState(0);
  const [lengthReply, setLengthReply] = useState(0);
  const { id } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const postImagePath = `http://localhost:8000/storage/images/posts/`;
  const [showModal, setShowModal] = useState(false);
  const [like, setLike] = useState(0)
  const [liked, setLiked] = useState(false)

  const handleClose = () => {
    setShowModal(false)
    setReply("")
    setLengthReply(0)
    setError("")
  }
  const reset = () => {
    setText("")
    setLength(0)
    setErrorComment("")
  }
  const showModalReply = (name, parentId) => {
    setShowModal(true)
    setReplyName(name)
    setParentId(parentId)
  }
  function goBack() {
    navigate(-1);
  }

  async function handleComment (e) {
    e.preventDefault();
    try {
      await axios.post(`http://localhost:8000/api/v1/post/${id}/comments`, {
        text: text
      }, {
        headers : {
          Authorization : `Bearer ${token}`
        }
      });
      setText("")
      setErrorComment("")
      setLength(0)
      const commentResponse = await axios.get(`http://localhost:8000/api/v1/post/${id}/comments`);
      setComment(commentResponse.data.data);
    } catch (error) {
      setErrorComment(error.response.data.error);
    }
  }
  const handleReplyComment = async () => {
    try {
      await axios.post(`http://localhost:8000/api/v1/post/${id}/comments`, {
        text: reply,
        parent_id: parentId
      }, {
        headers : {
          Authorization : `Bearer ${token}`
        }
      })
      setShowModal(false)
      setReply("")
      const commentResponse = await axios.get(`http://localhost:8000/api/v1/post/${id}/comments`);
      setComment(commentResponse.data.data);
    } catch (error) {
      setError(error.response.data.error)
    }
  }
  const handleLike = async (e) => {
    e.preventDefault()
    try {
      await axios.post(`http://localhost:8000/api/v2/like/${id}`, {},{
        headers : {
          Authorization : `Bearer ${token}`
        }
      })
      setLiked(true)
      const responseLike = await axios.get(`http://localhost:8000/api/v1/posts/${id}`);
      setLike(responseLike.data.like)
    } catch (error) {
      console.log(error.response)
    }
  }
  const handleUnlike = async (e) => {
    e.preventDefault()
    try {
      await axios.post(`http://localhost:8000/api/v2/like/${id}`, {},{
        headers : {
          Authorization : `Bearer ${token}`
        }
      })
      setLiked(false)
      const responseLike = await axios.get(`http://localhost:8000/api/v1/posts/${id}`);
      setLike(responseLike.data.like)
    } catch (error) {
      console.log(error.response)
    }
  }
  useEffect(() => {
    async function fetchPost() {
      const response = await axios.get(`http://localhost:8000/api/v1/posts/${id}`);
      setPost(response.data.post);
      setTags(response.data.post.tags);
      setCategories(response.data.post.categories);
      setLike(response.data.like);
      try {
        const commentResponse = await axios.get(`http://localhost:8000/api/v1/post/${id}/comments`);
        setComment(commentResponse.data.data);
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
                    <small className="text-muted">{post.views}x ditonton - {like}x disukai</small>
                    <p className="text-muted float-end fs-6">Created by : <span className="fw-bold">{post.user.name}</span></p>
                </div>
                <div className="text-center mt-3 mb-5">
                  { post.image != null
                  ?
                  <img src={postImagePath + `${post.image}`} alt={post.image} className='img-fluid w-75' />
                  : ''
                  }
                  <p className="mb-0 fs-3 fw-bold">{post.title}</p>
                  <p className='text-break'>{post.content}</p>
                  <>
                  {tags.map((tag) => (
                      <a className="mx-1 text-decoration-none text-break" href={`/posts/tag/${tag.id}`} key={tag.id}>
                      #{ tag.name }
                      </a>
                  ))}
                  {categories.map((item) => (
                      <div className="d-block my-2" key={item.id}>
                        <span className="mx-1 border p-1 rounded border-dark fs-6">{item.name}</span>
                      </div>
                  ))}
                  </>
                  <div>
                  {liked ? 
                    <span onClick={handleUnlike}><IconHeartFilled style={{ color: "red" }} /></span>
                  :
                    <span onClick={handleLike}><IconHeart style={{ color: "red" }} /></span>
                  }
                  </div>
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
            <Form.Label>Create Comment</Form.Label>
            {errorComment && <span className="text-danger ms-2 fw-bold">{errorComment}</span> }
            <Form.Control as="textarea" placeholder="Type Something..." name='text' maxLength={255} onChange={(e) => {setText(e.target.value); setLength(e.target.value.length)}} autoComplete="off" value={text} />
            <span className='text-muted'>{255 - length} karakter tersisa</span>
          </Form.Group>
          <Button onClick={reset} variant='danger' className="me-3">Clear</Button>
          <Button type='submit'>Send</Button>
        </Form>
      </>
       :
      <h4 className='my-3'>
        <a href="/login">Login</a> untuk komen
      </h4>
      }

      <div className='mt-2'>
        <hr />
          <h2>Komentar</h2>
          {comment.map((cmt) => (
            <div key={cmt.id} className="mb-3">
            <Card>
              <Card.Body>
                <Card.Title>{cmt.user.name}</Card.Title>
                <Card.Text className='text-break'>{cmt.text}</Card.Text>
                {token && <span className="btn btn-dark btn-sm" onClick={() => showModalReply(cmt.user.name, cmt.id)}>Balas</span>}
                <small className="text-muted d-block">{cmt.created_at}</small>
              </Card.Body>
            </Card>
            {cmt.replies.length > 0 && (
              <div className="ms-5">
                <h6 className="fw-bold mt-1">{cmt.replies.length} Replies</h6>
                {cmt.replies.map(reply => (
                  <div key={reply.id}>
                    <Card>
                      <Card.Body>
                        <Card.Title>{reply.user.name}</Card.Title>
                        <Card.Text className='text-break'>{reply.text}</Card.Text>
                        {token && <span className="btn btn-dark btn-sm" onClick={() => showModalReply(reply.user.name, reply.id)}>Balas</span>}
                        <small className="text-muted d-block">{reply.created_at}</small>
                        </Card.Body>
                    </Card>
                    {reply.replies.length > 0 && (
                      <div className="ms-5 mb-3">
                        <h6 className="fw-bold mt-1">{reply.replies.length} Replies</h6>
                        {reply.replies.map(nestedReply => (
                          <Card key={nestedReply.id}>
                            <Card.Body>
                              <Card.Title>{nestedReply.user.name}</Card.Title>
                              <Card.Text className='text-break'>{nestedReply.text}</Card.Text>
                              <small className="text-muted d-block">{nestedReply.created_at}</small>
                            </Card.Body>
                          </Card>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
            </div>
          ))}
      </div>
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Membalas <span>{replyName}</span></Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <label htmlFor="text">Text :</label>
          {error && <span className="text-danger ms-2 fw-bold">{error}</span> }
          <textarea
            value={reply}
            onChange={(e) => {setReply(e.target.value); setLengthReply(e.target.value.length)}}
            className="form-control"
            id="text"
            placeholder='...'
            maxLength={255}
          ></textarea>
          <span>{255 - lengthReply} karakter tersisa</span>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={() => {handleReplyComment()}}>
            Reply
          </Button>
        </Modal.Footer>
      </Modal>
      </>
      ) : (
        <Loading />
      )}
    </Container>
  );
}

export default PostShow;