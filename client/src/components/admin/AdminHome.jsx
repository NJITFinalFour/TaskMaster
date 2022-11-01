import styled from "styled-components";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useState, useEffect } from "react";
import AddNewUser from "./AddNewUser";
import AddNewAdmin from "./AddNewAdmin";
import OrgName from "../../components/OrgName";
import AdminAddNewTask from "./AdminAddNewTask";
import AdminDashboard from "./AdminDashboard";
import { taskFetchPath } from "../../api/fetchpaths";
import { mobile } from "../../responsive";

const Container = styled.div`
  height: 100vh;
`;

const Top = styled.div`
  margin-top: 1%;
`;

const Greeting = styled.h1`
  display: flex;
  justify-content: center;

  ${mobile({ margin: "0.7em 0.7em 0em 0.7em", fontSize: "1.3em" })};
`;

const ButtonContainer = styled.div`
  display: flex;
  margin: 4em 20%;

  ${mobile({ margin: "0.7em 0.8em" })};
`;

const Left = styled.div`
  display: flex;
  flex: 1;
  justify-content: start;

  ${mobile({ flex: 2, justifyContent: "end" })};
`;

const Right = styled.div`
  display: flex;
  flex: 1;
  justify-content: flex-end;

  ${mobile({ justifyContent: "start" })};
`;

const Button = styled.button`
  font-size: 1.3em;
  cursor: pointer;
  text-decoration: none;
  color: white;
  background-color: #014866;
  border-width: 0px;
  border-radius: 14px;
  padding: 6px 14px;
  margin: 1em;

  &:hover {
    color: #dddddd;
  }

  ${mobile({ fontSize: "0.9em" })};
`;

const AdminHome = () => {
  const { user } = useAuthContext();
  const [allTasks, setAllTasks] = useState([]);
  const [userModalShow, setUserModalShow] = useState(false);
  const [adminModalShow, setAdminModalShow] = useState(false);
  const [taskModalShow, setTaskModalShow] = useState(false);

  //Get All Tasks on Page Load
  useEffect(() => {
    const fetchTasks = async () => {
      const res = await fetch(
        `${taskFetchPath}/organization/${user.organization}`,
        {
          method: "GET",
          mode: "cors",
        }
      );
      let data = await res.json();
      setAllTasks(data);
    };

    fetchTasks();
  }, [user.organization]);

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
