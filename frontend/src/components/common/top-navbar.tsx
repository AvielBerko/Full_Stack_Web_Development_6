import { Navbar, Nav, Container } from "react-bootstrap";
import { useSession } from "../../hooks/use-session";
import { Nullable } from "../../types/react.types";
import { useCookie } from "../../hooks/use-cookie";
import { COOKIE_NAME } from "../../lib/data/loders/mainLoader/getLoader";
import User from "../../lib/data/dataObjects/User";

export default function TopNavbar() {

  const [user,setUser] = useSession<Nullable<User>>("user",null);
  const [isAdmin, setIsAdmin] = useSession<Nullable<boolean>>("isAdmin", null);
  const [_, clearCookie] = useCookie(COOKIE_NAME); 
  
  async function logOut() {
    if (!user) return;
    const userl = new User(user);
    const result = await userl.logout();
    clearCookie();
    setUser(null);
    setIsAdmin(false);
    console.log(result);
  }

  const notLoggedInLinks = (
    <Nav className="me-auto">
      <Nav.Link href="/login">Login</Nav.Link>
      <Nav.Link href="/signup">Sign Up</Nav.Link>
    </Nav>
  );

  const loggedInLinks = (
    <>
      <Navbar.Brand href="/home">JPH visual</Navbar.Brand>
      <Nav className="me-auto">
        <Nav.Link href="/home">Home</Nav.Link>
        <Nav.Link href="/info">My Info</Nav.Link>
        <Nav.Link href="/todos">My Todos</Nav.Link>
        <Nav.Link href="/posts">My Posts</Nav.Link>
        <Nav.Link href="/albums">My Albums</Nav.Link>
        {isAdmin && <Nav.Link href="/user_passwords">User Manager</Nav.Link>}
        <Nav.Link href="#" onClick={logOut}>
          Logout
        </Nav.Link>
      </Nav>
    </>
  );

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        {user ? loggedInLinks : notLoggedInLinks}
      </Container>
    </Navbar>
  );
}
