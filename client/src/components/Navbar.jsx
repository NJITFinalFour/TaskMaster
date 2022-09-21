import styled from "styled-components";
import { mobile } from "../responsive";
import Timer from "./Timer";
import logo from '../images/Taskmaster.png'

const Container = styled.div`
  height: 90px;
  ${mobile({ height: "50px" })};
`;

const Wrapper = styled.div`
  padding: 10px 25%;
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

const Logo = styled.img`
  /* font-weight: bold; */
  ${mobile({ fontSize: "24px", textAlign: "center" })}
`;

const Right = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  ${mobile({ flex: 1.1, marginRight: "10px" })}
`;

const MenuItem = styled.div`
  font-size: 18px;
  cursor: pointer;
  margin-left: 25px;

  &:hover {
    color: #4e5c3d;
  }

  ${mobile({ fontSize: "12px", marginLeft: "10px" })}
`;

const Navbar = () => {
  return (
    <Container>
      <Wrapper>
        <Left>
          <Timer/>
        </Left>
        <Center>
          <Logo src={logo}/>
        </Center>
        <Right>
          <MenuItem>Sign Up</MenuItem>
          <MenuItem>Log In</MenuItem>
        </Right>
      </Wrapper>
    </Container>
  );
};

export default Navbar;
