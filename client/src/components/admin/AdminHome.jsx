import styled from "styled-components";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useState, useEffect } from "react";
import AddNewUser from "./AddNewUser";
import AddNewAdmin from "./AddNewAdmin";
import OrgName from "../../components/OrgName";
import AdminAddNewTask from "./AdminAddNewTask";
import AdminDashboard from "./AdminDashboard";
import { taskFetchPath } from "../../api/fetchpaths";
import * as XLSX from "xlsx";

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
  border: 1px solid rgba(0, 0, 0, 0.5);
  border-radius: 12px;
  color: #7aa83d;
  margin: 15px;

  &:hover {
    color: #4e5c3d;
  }
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

  // export Excel All Tasks
  const exportTasksExcel = () => {
    const wb = XLSX.utils.book_new(),
      ws = XLSX.utils.json_to_sheet(allTasks);
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
    XLSX.writeFile(wb, "TaskMasterUSA.xlsx");
  };

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
          <Button variant="primary" onClick={exportTasksExcel}>
            Export Task List Excel
          </Button>
        </Right>
      </ButtonContainer>
      <AdminDashboard />
    </Container>
  );
};

export default AdminHome;
