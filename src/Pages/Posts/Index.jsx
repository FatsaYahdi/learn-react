import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Container, Table } from "react-bootstrap";

export default function PostIndex() {
    const [posts, setPosts] = useState([]);
    useEffect(() => {
        async function fetchData() {
            const response = await axios.get('http://localhost:8000/api/v1/posts');
            setPosts(response.data.posts);
            console.log(response);
        }
        fetchData();
    }, []);
    return (
    <div>
        <Container className="mt-3">
        <Button href="/posts/create" variant="success" className="mb-3">Create Post</Button>
            <Table striped bordered size="md">
            <thead>
                <tr>
                <th width='5%'>No.</th>
                <th>Title</th>
                <th>Content</th>
                </tr>
            </thead>
            <tbody>
                {posts.map((post, index) => (
                <tr key={post.id}>
                    <td>{index + 1}</td>
                    <td>{post.title}</td>
                    <td>{post.content}</td>
                </tr>
                ))}
            </tbody>
            </Table>
        </Container>
    </div>
    );
}
