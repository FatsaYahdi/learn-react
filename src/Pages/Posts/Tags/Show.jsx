import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

export default function PostTagIndex() {
    const { id } = useParams()
    const [posts, setPosts] = useState([])
    const imagePath = "http://localhost:8000/storage/images/posts/"
    useEffect(() => {
        async function fetchData() {
            const response = await axios.get(`http://localhost:8000/api/v2/posts/tag/${id}`)
            setPosts(response.data.data)
        }
        fetchData()
    }, [])
    return (
        <div className="container">
            <div className="row">
            { posts.map((post, index) => (
                <div className="col-md-4 my-4" key={index}>
                <div className="card" style={{ maxHeight: "368px", minHeight: "auto" }} >
                {post.image ?
                 <img className="card-img-top img-fluid" src={imagePath + post.image} alt={post.image} style={{ minHeight: "199px" }} />
                 :
                 <img className="card-img-top img-fluid" src="./default.png" alt={post.image} style={{ minHeight: "199px" }} />
                }
                <div className="card-body">
                <h5 className="card-title text-truncate">{post.title}</h5>
                <p className="card-text text-truncate">{post.content}</p>
                <div className="d-flex justify-content-between align-items-center">
                    <span className="text-muted">Views: {post.views}</span>
                    <a href={`/post/${post.id}`} className="btn btn-primary">Read more</a>
                </div>
                </div>
            </div>
            </div>
            )) }
            </div>
        </div>
    )
}
