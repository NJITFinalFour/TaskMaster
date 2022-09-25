import styled from "styled-components";

const Container = styled.div`
  width: 300px;
  margin: 0 auto;
  margin-top: 15%;
`;

const Title = styled.div`
  font-size: 80px;
  font-weight: 800;
  text-align: center;
`;

const Subtitle = styled.div`
  font-size: 25px;
  text-align: center;
  margin-top: 40px;
`;

const Par = styled.div`
  margin-top: 5%;
  text-align: center;
  font-size: 12px;
`;

const NotFound = () => {
  return (
    <>
      <Container>
        <Title>404</Title>
        <Subtitle>Page Not Found</Subtitle>
        <Par>
          The page you are looking for doesn't exist or an other error occured.
          Go to <a href="/">Home Page</a>
        </Par>
      </Container>
    </>
  );
};

export default NotFound;
