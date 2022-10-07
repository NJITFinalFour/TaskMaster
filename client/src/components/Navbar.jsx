import styled from "styled-components";
import { mobile } from "../responsive";
import Timer from "./Timer";
import logo from "../images/TaskmasterBlueNav.png";
import { useAuthContext } from "../hooks/useAuthContext";
import { useLogout } from "../hooks/useLogout";
import { useEffect } from "react";
import { userFetchPath } from "../api/fetchpaths";

const Container = styled.div`
  height: 90px;
  ${mobile({ height: "20%" })};
`;

const Wrapper = styled.div`
  padding: 10px 15%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #f7f7f7;
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
  ${mobile({ textAlign: "center" })}
`;

const Right = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  ${mobile({ flex: 1.1 })}
`;

const NavLink = styled.a`
  font-size: 1.5em;
  cursor: pointer;
  margin: 0em 0.7em;
  padding: 0.2em 0.6em;
  text-decoration: none;
  color: #205166;

  &:hover {
    background-color: #205166;
    color: white;
    border-radius: 5px;
  }

  ${mobile({ fontSize: "0.9em", margin: "0em", padding: "0em 0.6em 0em 0em" })}
`;

const NavItem = styled.p`
  color: black;
  margin-bottom: 0px;

  ${mobile({ display: "none" })}
`;

const LogOutButton = styled.a`
  font-size: 1.1em;
  cursor: pointer;
  margin-left: 1.2em;
  text-decoration: none;
  color: white;
  background-color: #707070;
  border-radius: 14px;
  padding: 6px 14px;

  &:hover {
    background-color: #014866;
    color: white;
  }

  ${mobile({ margin: "0em 1em 0em 0em", fontSize: "0.8em" })};
`;

const Navbar = () => {
  const { user } = useAuthContext();
  const { logout } = useLogout();

  const handleLogout = () => {
    logout();
  };

  useEffect(() => {
    const authenticateUser = async () => {
      if (user !== null) {
        const res = await fetch(`${userFetchPath}${user.organization}`, {
          method: "GET",
          mode: "cors",
        });
        const json = await res.json();
        let authenticated = false;
        for (const entry of json) {
          if (user._id === entry._id && user.isAdmin === entry.isAdmin) {
            authenticated = true;
          }
        }
        if (!authenticated) {
          handleLogout();
        }
      }
    };
    authenticateUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

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
