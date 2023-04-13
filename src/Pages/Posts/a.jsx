comments.map(comment => (
    <div key={comment.id} className="mb-3">
      <Card>
        <Card.Body>
          <Card.Title>{comment.user.name}</Card.Title>
          <Card.Text className='text-break'>{comment.text}</Card.Text>
          {token && <span className="btn btn-dark btn-sm" onClick={showModalReply}>Balas</span>}
          <small className="text-muted d-block">{comment.created_at}</small>
        </Card.Body>
      </Card>
      {comment.replies.length > 0 && (
        <div className="ms-3">
          <h6 className="fw-bold mt-1">{comment.replies.length} Replies</h6>
          {comment.replies.map(reply => (
            <div key={reply.id}>
              <Card>
                <Card.Body>
                  <Card.Title>{reply.user.name}</Card.Title>
                  <Card.Text className='text-break'>{reply.text}</Card.Text>
                  <small className="text-muted">{reply.created_at}</small>
                  </Card.Body>
              </Card>
              {reply.replies.length > 0 && (
                <div className="ms-3">
                  <h6 className="fw-bold mt-1">{reply.replies.length} Replies</h6>
                  {reply.replies.map(nestedReply => (
                    <Card key={nestedReply.id} className="mb-3">
                      <Card.Body>
                        <Card.Title>{nestedReply.user.name}</Card.Title>
                        <Card.Text className='text-break'>{nestedReply.text}</Card.Text>
                        <small className="text-muted">{nestedReply.created_at}</small>
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