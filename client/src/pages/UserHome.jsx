import styled from "styled-components";
import { useAuthContext } from "../hooks/useAuthContext";
import { useEffect, useState } from "react";
import AddNewUser from "../components/AddNewUser";
import AdminTabs from "../components/admin/AdminTabs";
import AddNewAdmin from "../components/AddNewAdmin";
import OrgName from "../components/OrgName";

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

const Verify = styled.h4`
  display: flex;
  justify-content: center;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: end;
  margin: 50px 20%;
`;

const Button = styled.button`
  font-size: 20px;
  cursor: pointer;
  text-decoration: none;
  border: 1px solid black;
  border-radius: 12px;
  color: #7aa83d;
  margin: 15px;

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

  const [userModalShow, setUserModalShow] = useState(false);
  const [adminModalShow, setAdminModalShow] = useState(false);
    

  return (
    <Container>
      <Top>
        <Greeting>{`Hello ${user.userFirstName} ${user.userLastName} from `}<OrgName user={user}/></Greeting>
        <Verify>{isUserAdmin}</Verify>
      </Top>
      <ButtonContainer>
        <Button>New Task</Button>
        <Button variant="primary" onClick={() => setUserModalShow(true)}>
          New User
        </Button>
        <AddNewUser show={userModalShow} onHide={() => setUserModalShow(false)} />
        <Button variant="primary" onClick={() => setAdminModalShow(true)}>
          New Admin
        </Button>
        <AddNewAdmin show={adminModalShow} onHide={() => setAdminModalShow(false)} />
      </ButtonContainer>
      <AdminTabs />
    </Container>
  );
};

export default UserHome;
