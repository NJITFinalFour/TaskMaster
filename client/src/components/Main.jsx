import styled from "styled-components";
import { mobile } from "../responsive";
import backgroundImg from "../images/backgroundTwo.jpg";

const Container = styled.div`
  width: 100%;
  height: 100vh;
  margin-bottom: 5em;

  ${mobile({
    marginBottom: "0.5em",
  })}
`;

const Wrapper = styled.div`
  width: 75vw;
  height: 100vh;
  background-image: url(${backgroundImg});
  /* center no-repeat; */
  background-size: cover;
  background-position: center center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 10px auto 30em auto;
  border-radius: 30px;

  ${mobile({
    width: "100vw",
    height: "100vh",
    borderRadius: "0px",
  })};
`;

const AboutWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 60%;
  font-size: 2rem;
  background-color: white;
  border-radius: 10px;
  margin-top: 60vh;
  ${mobile({ width: "90%", marginTop: "40vh" })}
`;

const About = styled.div`
  color: #205166;
  padding: 1em 2em;
  text-align: center;
  font-size: 30px;
  ${mobile({ fontSize: "20px", padding: "1em 0.5em" })}
`;

const Button = styled.a`
  margin-top: 30px;
  border: 1px solid #02a1e6;
  padding: 10px 20px;
  background-color: #02a1e6;
  color: white;
  cursor: pointer;
  font-weight: 600;
  font-size: 1.8em;
  border-radius: 10px;
  text-decoration: none;

  &:hover {
    background-color: white;
    border: 1px solid #02a1e6;
    color: #02a1e6;
  }

  ${mobile({ width: "70%", textAlign: "center" })}
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
        <Button href="/signup">Sign up Now</Button>
      </Wrapper>
    </Container>
  );
};

export default Main;
