import React from 'react'
import styled from 'styled-components';
import { useAuthContext } from '../../hooks/useAuthContext';
import UserTasksTable from './UserTasksTable';

const Container = styled.div`
  height: 100vh;
`;

const Top = styled.div`
  margin-top: 2%;
  margin-bottom: 3%;
`;

const Greeting = styled.h1`
  display: flex;
  justify-content: center;
`;

const Bottom = styled.div`
  
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
        <UserTasksTable />
      </Bottom>
    </Container>
  );
}

export default NormalUserHome