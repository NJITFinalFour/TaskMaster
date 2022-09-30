import styled from "styled-components";
import { mobile } from "../responsive";


const Container = styled.div`
  height: 60vh;
  width: 100%;
`;

const Wrapper = styled.div`
  margin: 0 auto;
  margin-top: 10%;
  margin-bottom: 10%;
  text-align: center;

  ${mobile({ fontSize: "0.7em" })};
`;

const Title = styled.h1`
  font-size: 7em;
  font-weight: 800;
`;

const Subtitle = styled.h3`
  font-size: 2em;
  margin-top: 20px;
`;

const Par = styled.p`
  margin-top: 5%;
  font-size: 1em;
`;

const Link = styled.a`
  text-decoration: none;
  color: #88bb44;
  font-size: 1.5em;
`;

const NotFound = () => {
  return (
    <>
      <Container>
        <Wrapper>
        <Title>404</Title>
        <Subtitle>Page Not Found</Subtitle>
        <Par>
          The page you are looking for doesn't exist or an other error occured.
        </Par>
          <Link href="/">Home Page</Link>
        </Wrapper>
      </Container>
    </>
  );
};

export default NotFound;
