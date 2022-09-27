import styled from "styled-components";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useState } from "react";
import AddNewUser from "./AddNewUser";
import AddNewAdmin from "./AddNewAdmin";
import OrgName from "../../components/OrgName";
import AdminAddNewTask from "./AdminAddNewTask";
import AdminDashboard from "./AdminDashboard";



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

const ButtonContainer = styled.div`
  display: flex;
  /* justify-content: end; */
  margin: 50px 20%;
`;

const Left = styled.div`
  display: flex;
  flex: 1;
  justify-content: start;
`;

const Right = styled.div`
  display: flex;
  flex: 1;
  justify-content: flex-end;
`;

const Button = styled.button`
  font-size: 20px;
  cursor: pointer;
  text-decoration: none;
  border: 1px solid rgba(0,0,0,0.5);
  border-radius: 12px;
  color: #7aa83d;
  margin: 15px;

  &:hover {
    color: #4e5c3d;
  }
`;

const AdminHome = () => {
  const { user } = useAuthContext();

  const [userModalShow, setUserModalShow] = useState(false);
  const [adminModalShow, setAdminModalShow] = useState(false);
  const [taskModalShow, setTaskModalShow] = useState(false);

  return (
    <Container>
      <Top>
        <Greeting>
          {`Hello ${user.userFirstName} ${user.userLastName} from `}
          <OrgName user={user} />
        </Greeting>
      </Top>
      <ButtonContainer>
        <Left>
          <AdminAddNewTask
            show={taskModalShow}
            onHide={() => setTaskModalShow(false)}
          />

          <Button variant="primary" onClick={() => setUserModalShow(true)}>
            New User
          </Button>
          <AddNewUser
            show={userModalShow}
            onHide={() => setUserModalShow(false)}
          />

          <Button variant="primary" onClick={() => setAdminModalShow(true)}>
            New Admin
          </Button>
          <AddNewAdmin
            show={adminModalShow}
            onHide={() => setAdminModalShow(false)}
          />
        </Left>
        <Right>
          <Button variant="primary" onClick={() => setTaskModalShow(true)}>
            New Task
          </Button>
        </Right>
      </ButtonContainer>
      <AdminDashboard />
    </Container>
  );
};

export default AdminHome;
