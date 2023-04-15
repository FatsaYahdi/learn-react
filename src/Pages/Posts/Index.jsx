import axios from "axios";
import { useEffect, useState } from "react";
import Loading from "../../Components/Loading";
import { Carousel } from "react-bootstrap";

export default function PostIndex() {
    const [posts, setPosts] = useState([]);
    const [postsPinned, setPostsPinned] = useState([]);
    const [index, setIndex] = useState(0);
    const handleSelect = (selectedIndex, e) => {
        setIndex(selectedIndex);
    };
    const imagePath = "http://localhost:8000/storage/images/posts/";
    useEffect(() => {
        async function fetchData() {
            const response = await axios.get(`http://localhost:8000/api/v1/posts`);
            setPosts(response.data.posts);
            setPostsPinned(response.data.pinned);
        }
        fetchData();
    }, []);
    return (
    <div className="container">
        {posts ? 
        <>
            <Carousel className="mt-3">
            {postsPinned.map((post) => (
                <Carousel.Item interval={null}>
                    <img
                    className="d-block w-100"
                    style={{ minHeight: "480px", maxHeight: "480px", filter: "brightness(50%)" }}
                    src={imagePath + post.image}
                    />
                    <Carousel.Caption>
                    <h3>{post.title}</h3>
                    <p>{post.content}</p>
                    {post.tags.map((tag) => (
                        <span key={tag.id} className="px-1 fs-6">#{tag.name}</span>
                    ))}
                    </Carousel.Caption>
                </Carousel.Item>
            ))}
            </Carousel>
        <div className="row">
            { posts.map((post, index) => (
                <div className="col-md-4 my-4" key={index}>
                    <div className="card" style={{ minHeight: "440px" }} >
                    {post.image ?
                     <img className="card-img-top img-fluid" src={imagePath + post.image} alt={post.image} style={{ minHeight: "199px" }} />
                     :
                     <img className="card-img-top img-fluid" src="./default.png" alt={post.image} style={{ minHeight: "199px" }} />
                    }
                    <div className="card-body">
                    <h5 className="card-title text-truncate">{post.title}</h5>
                    <p className="card-text text-truncate">{post.content}</p>
                    <div>
                    {post.tags.map((tag,index) => (
                        <span key={index} className="pe-1">#{tag.name}</span>
                    ))}
                    </div>
                    <div>
                    {post.categories.map((ctg) => (
                        <span key={ctg.id} className="pe-1 fs-6">{ctg.name}</span>
                    ))}
                    </div>
                        <span className="text-muted">Views: {post.views}</span>
                    </div>
                        <div className="card-footer text-center">
                            <a href={`/post/${post.id}`}>Read</a>
                        </div>
                    </div>
                </div>
            ))}
        </div>
        </>
        : <Loading /> }
    </div>
    );
}
