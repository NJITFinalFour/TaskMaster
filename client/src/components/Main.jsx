import styled from "styled-components";
import { mobile } from "../responsive";

const Container = styled.div`
  width: 100%;
  height: 100%;
`;

const Wrapper = styled.div`
  width: 80vw;
  height: 100vh;
  background: url("https://images.unsplash.com/photo-1590402494587-44b71d7772f6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3870&q=80")
    center no-repeat;
  background-size: cover;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 10px auto;
  border-radius: 30px;

  ${mobile({ width: "100vw", height: "100vh" })};
`;

const AboutWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40%;
  font-size: 2rem;
  background-color: white;
  border-radius: 10px;
`;

const About = styled.div`
  color: #88bb44;
  padding: 40px 100px;
  text-align: center;
`;

const Button = styled.button`
  margin-top: 20px;
  border: 1px solid #88bb44;
  padding: 10px;
  background-color: #88bb44;
  color: white;
  cursor: pointer;
  font-weight: 600;
  font-size: 2em;
  border-radius: 10px;

  &:hover {
    background-color: white;
    border: 1px solid #88bb44;
    color: #88bb44;
  }
`;

const Main = () => {
  return (
    <Container>
      <Wrapper>
        <AboutWrapper>
          <About>
            Manage workflow and assign tasks in realtime for a more efficient
            operation. Take control of your organization's task priorities and
            get more done.
          </About>
        </AboutWrapper>
        <Button>Sign up Now</Button>
      </Wrapper>
    </Container>
  );
};

export default Main;
