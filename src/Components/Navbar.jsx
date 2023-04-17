import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap"
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import '../App.css'
import Home from './../Pages/Home'
import PostIndex from './../Pages/Posts/Index'
import PostCreate from './../Pages/Posts/Create'
import PostShow from './../Pages/Posts/Show'
import ProtectedRoute from "../Routes/ProtectedRoute"
import Login from "../Pages/Login"
import axios from 'axios'
import ProfileShow from './../Profiles/Show';
import ResetPassword from "../Profiles/ResetPassword"
import Reset from "../Profiles/Reset"
import ProfileEdit from "../Profiles/Edit"
import PostList from "../Pages/Posts/List"
import PostEdit from "../Pages/Posts/Edit"
import PostTagIndex from "../Pages/Posts/Tags/Show"
import TagIndex from "../Pages/Tags/Index"
import CategoryIndex from "../Pages/Categories/Index"
import Test from "../Pages/Categories/test"
import IsLogin from "../Routes/Islogin"
import IsAdmin from "../Routes/IsAdmin"

export default function NavbarC() {
  const token = localStorage.getItem('token')

  const handleLogout = async () => {
    try {
      axios.post('http://localhost:8000/api/v1/logout',token)
      localStorage.removeItem('token')
    } catch (error) {
      console.log(error)
    }
  }
    return (
        <div>
          <Navbar bg="dark" variant="dark">
            <Container>
              <Navbar.Brand href="/">Landermooo</Navbar.Brand>
              <Nav className="me-auto">
                <Nav.Item>
                  <Nav.Link href="/">Home</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link href="/posts">Posts</Nav.Link>
                </Nav.Item>
              </Nav>
              <Nav className="mr-auto">
                  {token ? (
                  <NavDropdown title="Menu" id="basic-nav-dropdown">
                      <NavDropdown.Item href="/profile">
                        Profile
                      </NavDropdown.Item>
                      <NavDropdown.Item href="/posts/list">
                        Post
                      </NavDropdown.Item>
                      <NavDropdown.Item href="/tag">
                        Tag
                      </NavDropdown.Item>
                      <NavDropdown.Item href="/category">
                        Category
                      </NavDropdown.Item>
                      <NavDropdown.Divider />
                    <NavDropdown.Item onClick={token ? handleLogout : ""} href={token ? "/" : "/login"}>
                      {token ? "Logout" : "Login"}
                    </NavDropdown.Item>
                  </NavDropdown>
                  ) : (
                    <Nav.Item>
                      <Nav.Link href="/login">Login</Nav.Link>
                    </Nav.Item>
                  ) }
                  
              </Nav>
            </Container>
          </Navbar>
    
        <Router>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="/posts" element={<PostIndex />} />
            <Route path="/post/:id" element={<PostShow />} />
            {/* protect */}
            <Route element={<ProtectedRoute />}>
              <Route path="/posts/create" element={<PostCreate />} />
              <Route path="/profile" element={<ProfileShow />} />
              <Route path="/profile/edit" element={<ProfileEdit />} />
              <Route path="/posts/list" element={<PostList />} />
              <Route path="/posts/:id/edit" element={<PostEdit />} />
              <Route path="/tag" element={<TagIndex />} />
              <Route path="/category" element={<CategoryIndex />} />
            </Route>
            <Route path="/posts/tag/:id" element={<PostTagIndex />} />
            {/* is login */}
            <Route element={<IsLogin /> }>
            {/* admin */}
            <Route element={<IsAdmin />}>
              <Route path="/test" element={<Test />} />
            </Route>
              <Route path="/login" element={<Login />} />
              <Route path="/reset-password/send" element={<ResetPassword />} />
              <Route path="/reset-password/reset" element={<Reset />} />
            </Route>
            {/* not found */}
            <Route path="*" element={<p>nothin here</p>} />
          </Routes>
        </Router>
        </div>
        )
}