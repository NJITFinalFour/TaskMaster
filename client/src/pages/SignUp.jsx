import styled from "styled-components";
import logo from "../images/TaskmasterWhite.png";
import { mobile } from "../responsive";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: #4e5c3d;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 40%;
  padding: 20px;
  border-radius: 20px;
  background-color: white;

  ${mobile({ width: "75%" })}
`;

const LogoWrapper = styled.div`
  display: flex;
  margin-bottom: 20px;
`

const Logo = styled.img`
  margin: auto;
`

const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
`;

const Form = styled.form`

`;

const Top = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 20px 10px 0px 0px;
  padding: 10px;
`;

const Bottom = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Agreement = styled.span`
  display: flex;
  font-size: 12px;
  margin: 20px 0px;
`;

const Button = styled.button`
  flex: 1;
  margin: auto;
  width: 40%;
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



const SignUp = () => {
  return (
    <Container>
      <Wrapper>
        <LogoWrapper>
          <Logo src={logo} />
        </LogoWrapper>
        <Title>CREATE AN ORGANIZATION</Title>
        <Form>
          <Top>
            <Input placeholder="Organization" />
            <Input placeholder="Admin First Name" />
            <Input placeholder="Admin Last Name" />
            <Input placeholder="Admin Email" />
            <Input placeholder="Admin Password" />
            <Input placeholder="Confirm Admin Password" />
          </Top>
          <Bottom>
            <Agreement>
              By creating an account, I consent to the processing of my personal
              data in accordance with the <b>PRIVACY POLICY</b>
            </Agreement>
            <Button>REGISTER ORGANIZATION</Button>
          </Bottom>
        </Form>
      </Wrapper>
    </Container>
  );
};

export default SignUp;
