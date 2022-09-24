import styled from "styled-components";
import { useAuthContext } from "../hooks/useAuthContext";
import { useEffect, useState } from "react";
import AddNewUser from "../components/AddNewUser";

const Container = styled.div`
  height: 100vh;
`;

const Top = styled.div`
  
`;

const Greeting = styled.h1`
  display: flex;
  justify-content: center;
`

const Verify = styled.h4`
  display: flex;
  justify-content: center;
`;

const ModalContainer = styled.div`
  margin-top: 50px;
`;

const Button = styled.button`
  font-size: 20px;
  cursor: pointer;
  text-decoration: none;
  color: #7aa83d;

  &:hover {
    color: #4e5c3d;
  }
`;

const UserHome = () => {
  const { user } = useAuthContext();
  const [isUserAdmin, setIsUserAdmin] = useState("");
  useEffect(() => {
    if (user.isAdmin) {
      setIsUserAdmin("You are a system ADMIN, Welcome to TaskMaster USA");
    } else {
      setIsUserAdmin("Welcome to TaskMasterUSA");
    }
  }, []);

  const [modalShow, setModalShow] = useState(false);

  return (
    <Container>
      <Top>
        <Greeting>{`Hello ${user.userFirstName} ${user.userLastName} from ${user.organization}`}</Greeting>
        <Verify>{isUserAdmin}</Verify>
      </Top>
      <ModalContainer>
        <Button variant="primary" onClick={() => setModalShow(true)}>
          Add a New User
        </Button>
        <AddNewUser show={modalShow} onHide={() => setModalShow(false)} />
      </ModalContainer>
    </Container>
  );
};

export default UserHome;
