import React from 'react'
import styled from 'styled-components';
import { useAuthContext } from '../../hooks/useAuthContext';

const Container = styled.div`
  height: 100vh;
`;

const Top = styled.div`
  margin-top: 1%;
`;

const Greeting = styled.h1`
  display: flex;
  justify-content: center;
`;

const Bottom = styled.div`
  
`

const TaskWrapper = styled.div`
  padding: 20px 50px;
`

const Heading = styled.h3`
  
`

const NormalUserHome = () => {
  const { user } = useAuthContext();

  return (
    <Container>
      <Top>
        <Greeting>
          {`Hello ${user.userFirstName} ${user.userLastName}`}
        </Greeting>
      </Top>
      <Bottom>
        <TaskWrapper>
          <Heading>Needs to be completed</Heading>
        </TaskWrapper>
        <TaskWrapper>
          <Heading>Completed</Heading>
        </TaskWrapper>
      </Bottom>
    </Container>
  );
}

export default NormalUserHome