import styled from "styled-components";
import { mobile } from "../responsive";
import Timer from "./Timer";
import logo from "../images/Taskmaster.png";
import { useAuthContext } from "../hooks/useAuthContext";
import { useLogout } from "../hooks/useLogout";

const Container = styled.div`
  height: 90px;
  ${mobile({ height: "20%" })};
`;

const Wrapper = styled.div`
  padding: 10px 20%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #f7f7f7;
  color: #88bb44;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2);
  ${mobile({ padding: "10px 0px" })};
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  ${mobile({ flex: 1.1, marginLeft: "10px" })}
`;

const Center = styled.div`
  flex: 1;
  text-align: center;
`;

const Link = styled.a``;

const Logo = styled.img`
  ${mobile({ fontSize: "24px", textAlign: "center" })}
`;

const Right = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  ${mobile({ flex: 1.1, marginRight: "5%" })}
`;

const NavLink = styled.a`
  font-size: 20px;
  cursor: pointer;
  margin-left: 25px;
  text-decoration: none;
  color: #7aa83d;

  &:hover {
    color: #4e5c3d;
  }

  ${mobile({ fontSize: "12px", marginLeft: "10px" })}
`;

const NavItem = styled.p`
  color: black;
  margin-bottom: 0px;
`;

const LogOutButton = styled.a`
  font-size: 20px;
  cursor: pointer;
  margin-left: 25px;
  text-decoration: none;
  color: white;
  /* border: 1px solid #7aa83d; */
  background-color: #707070;
  border-radius: 14px;
  padding: 6px 14px;

  &:hover {
    color: #9edb4f;
  }
`;

const Navbar = () => {
  const { user } = useAuthContext();
  const { logout } = useLogout();

  const handleLogout = () => {
    logout();
  };

  return (
    <Container>
      <Wrapper>
        <Left>{user && <Timer />}</Left>
        <Center>
          <Link href="/">
            <Logo src={logo} />
          </Link>
        </Center>
        <Right>
          {!user && <NavLink href="/signup">Sign Up</NavLink>}
          {!user && <NavLink href="/login">Log In</NavLink>}
          {user && (
            <NavItem>
              {user.userFirstName} {user.userLastName}
            </NavItem>
          )}
          {user && <LogOutButton onClick={handleLogout}>Log out</LogOutButton>}
        </Right>
      </Wrapper>
    </Container>
  );
};

export default Navbar;
