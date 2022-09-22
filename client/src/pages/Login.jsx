import styled from "styled-components";
import Navbar from "../components/Navbar";
import logo from "../images/TaskmasterWhite.png";
import { mobile } from "../responsive";

const Container = styled.div`
  width: 100%;
  height: 100vh;
  background-color: #4e5c3d;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 25%;
  padding: 20px;
  border-radius: 20px;
  background-color: white;
  top: 35px;

  ${mobile({ width: "75%" })}
`;

const LogoWrapper = styled.div`
  display: flex;
  margin-bottom: 20px;
`;

const Logo = styled.img`
  margin: auto;
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 10px 0px;
  padding: 10px;
`;

const Button = styled.button`
  flex: 1;
  /* width: 40%; */
  margin-bottom: 10px;
  border: 1px solid black;
  padding: 15px 20px;
  background-color: #c0e195;
  color: black;
  cursor: pointer;
  font-weight: 500;

  &:hover {
    border: 1px solid white;
    background-color: #88bb44;
    color: white;
  }
`;

const Link = styled.a`
  margin: 5px 0px;
  font-size: 12px;
  cursor: pointer;
`;

const Login = () => {
  return (
    <>
      <Navbar />
      <Container>
        <Wrapper>
          <LogoWrapper>
            <Logo src={logo} />
          </LogoWrapper>
          <Title>LOG IN</Title>
          <Form>
            <Input placeholder="Email" />
            <Input placeholder="Password" />
            <Button>SIGN IN</Button>
            <Link>Forgot Password?</Link>
          </Form>
        </Wrapper>
      </Container>
    </>
  );
};

export default Login;
