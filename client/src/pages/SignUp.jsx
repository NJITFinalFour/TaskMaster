import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import logo from "../images/TaskmasterWhite.png";
import { mobile } from "../responsive";
import { signupAdminFetchPath } from "../api/fetchpaths";
import Navbar from "../components/Navbar";


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
  max-width: 50%;
  margin: 20px auto;
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
  const [data, setData] = useState({
    organization: "",
    first_name: "",
    last_name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = signupAdminFetchPath;
      const { data: res } = await axios.post(url, data);
      navigate("/admin");
      console.log(res.message);
    } catch (error) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        setError(error.response.data.message);
      }
    }
  };

  return (
    <>
      <Navbar />
      <Container>
        <Wrapper>
          <LogoWrapper>
            <Logo src={logo} />
          </LogoWrapper>
          <Title>CREATE AN ORGANIZATION</Title>
          <Form onSubmit={handleSubmit}>
            <Top>
              <Input
                type="text"
                name="organization"
                placeholder="Organization"
                onChange={handleChange}
                value={data.organization}
                required
              />
              <Input
                type="text"
                name="first_name"
                placeholder="Admin First Name"
                onChange={handleChange}
                value={data.first_name}
                required
              />
              <Input
                type="text"
                name="last_name"
                placeholder="Admin Last Name"
                onChange={handleChange}
                value={data.last_name}
                required
              />
              <Input
                type="email"
                name="email"
                placeholder="Admin Email"
                onChange={handleChange}
                value={data.email}
                required
              />
              <PasswordInput
                type="password"
                name="password"
                placeholder="Admin Password"
                onChange={handleChange}
                value={data.password}
                required
              />
              {/* <Input placeholder="Confirm Admin Password" /> */}
            </Top>
            <Bottom>
              <Agreement>
                By creating an account, I consent to the processing of my
                personal data in accordance with the <b> PRIVACY POLICY </b>
              </Agreement>
              {error && <div>{error}</div>}
              <Button type="submit">REGISTER ORGANIZATION</Button>
            </Bottom>
          </Form>
        </Wrapper>
      </Container>
    </>
  );
};

export default SignUp;
