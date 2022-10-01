import { useState } from "react";
import styled from "styled-components";
import logo from "../images/TaskmasterWhite.png";
import { mobile } from "../responsive";

import { useSignup } from "../hooks/useSignup";
import "../index.css";

const Container = styled.div`
  width: 100%;
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
`;

const Logo = styled.img`
  margin: auto;
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
`;

const Form = styled.form``;

const Top = styled.div`
  display: flex;
  flex-wrap: wrap;

  ${mobile({ flexDirection: "column" })}
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 20px 10px 0px 0px;
  padding: 10px;
`;

const PasswordInput = styled.input`
  flex: 1;
  min-width: 40%;
  /* max-width: 50%; */
  margin: 20px auto;
  padding: 10px;

  ${mobile({ width: "100%", margin: "20px 10px 0px 0px" })}
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

const Error = styled.div`
  width: 60%;
  padding: 0.5em;
  margin: auto;
  font-size: 1em;
  background-color: #f34646;
  color: white;
  border-radius: 5px;
  text-align: center;

  ${mobile({ width: "75%" })}
`;

const Button = styled.button`
  flex: 1;
  margin: 10px auto;
  width: 40%;
  border: 1px solid black;
  border-radius: 15px;
  padding: 15px 20px;
  background-color: #c0e195;
  color: black;
  cursor: pointer;
  font-weight: 500;

  ${mobile({ fontSize: "1em", width: "80%" })}

  &:hover {
    border: 1px solid white;
    background-color: #88bb44;
    color: white;
  }
`;

const SignUp = () => {
  const [organization, setOrganization] = useState("");
  const [first_name, setFirst_name] = useState("");
  const [last_name, setLast_name] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signup, error } = useSignup();
 

  const handleSubmit = async (e) => {
    e.preventDefault();
    await signup(organization, first_name, last_name, email, password);
  };

  return (
    <Container>
      <Wrapper>
        <LogoWrapper>
          <Logo src={logo} />
        </LogoWrapper>
        <Title>CREATE AN ORGANIZATION</Title>
        <Form onSubmit={handleSubmit}>
          <Top>
            <Input type="text" name="organization" placeholder="Organization" onChange={(e) => setOrganization(e.target.value)} value={organization} required />
            <Input type="text" name="first_name" placeholder="Admin First Name" onChange={(e) => setFirst_name(e.target.value)} value={first_name} required />
            <Input type="text" name="last_name" placeholder="Admin Last Name" onChange={(e) => setLast_name(e.target.value)} value={last_name} required />
            <Input type="email" name="email" placeholder="Admin Email" onChange={(e) => setEmail(e.target.value)} value={email} required />
            <PasswordInput type="password" name="password" placeholder="Admin Password" onChange={(e) => setPassword(e.target.value)} value={password} required />
          </Top>
          <Bottom>
            <Agreement>By creating an account, I consent to the processing of my personal data in accordance with our PRIVACY POLICY</Agreement>
            {error && <Error>{error}</Error>}
            <Button type="submit">REGISTER ORGANIZATION</Button>
          </Bottom>
        </Form>
      </Wrapper>
    </Container>
  );
};

export default SignUp;
