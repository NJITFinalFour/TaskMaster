import { formatDistanceToNow, format } from "date-fns";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { mobile } from "../../responsive";
import { taskFetchPath, userFetchPath } from "../../api/fetchpaths";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import Table from "react-bootstrap/Table";
import AdminUsersTable from "./AdminUsersTable";
import EditTask from "./AdminEditTask";
import { BiEdit } from "react-icons/bi";
import { RiDeleteBinLine } from "react-icons/ri";
import { useAuthContext } from "../../hooks/useAuthContext";
import * as XLSX from "xlsx";
import { useTasksContext } from "../../hooks/useTaskContext";

const Container = styled.div`
  margin: auto;
  width: 80%;

  ${mobile({ width: "100%" })};
`;

const StyledTabs = styled(Tabs)`
  background-color: #f1f0f0;
  font-size: 1.5em;

  & .nav-link {
    color: #014866;
    font-weight: 600;

    &:hover {
      color: #027db3;
    }
  }

  ${mobile({ fontSize: "1em" })};
`;

const StyledTab = styled(Tab)`
  color: #027db3;
`;

const Wrapper = styled.div`
  height: 80vh;
  overflow-y: auto;
  border-width: 0px 1px 1px 1px;
  border-style: solid;
  border-color: #9c9c9ca6;
  border-radius: 10px;

  ${mobile({ height: "100%" })};
`;

const WrapperAllTasks = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0em 6em 0em 0em;
`;
const WrapperAllUsers = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0em 6em 0em 0em;
`;

const Button = styled.button`
  font-size: 1.2em;
  padding: 0.2em 0.4em;
  cursor: pointer;
  text-decoration: none;
  border-radius: 12px;
  border-width: 0px;
  color: white;
  background-color: #707070;
  /* margin: 15px; */

  &:hover {
    background-color: #014866;
    color: white;
  }

  ${mobile({ display: "none" })};
`;

const Th = styled.th`
  ${mobile({ fontSize: "0.7em" })};
`;

const StyledTable = styled(Table)``;

const Tbody = styled.tbody``;

const Tr = styled.tr`
  &:nth-child(odd) {
    background-color: #f0f0f0;
  }
`;

const Td = styled.td`
  height: 60px;
  vertical-align: middle;
  color: ${(props) => (props.taskPriority === "high" ? "#ff0000" : "black")};
  font-weight: ${(props) => (props.taskPriority === "high" ? 600 : 400)};

  &:first-child {
    width: 8%;
  }
  &:nth-child(2) {
    width: 10%;
  }
  &:nth-child(3) {
    width: 7%;
  }
  &:nth-child(4) {
    width: 13%;
  }
  &:nth-child(5) {
    width: 20%;
  }
  &:nth-child(6) {
    width: 40%;
  }
  &:nth-child(7) {
    width: 4%;
  }
  &:nth-child(8) {
    width: 4%;
  }
  &:last-child {
    width: 4%;
  }

  ${mobile({ fontSize: "0.7em" })};
`;

const EditWrapper = styled.div`
  color: #6b6c6e;
  font-size: 20px;

  &:hover {
    color: #027db3;
    font-size: 22px;
  }
`;

const DeleteWrapper = styled.div`
  color: #6b6c6e;
  font-size: 20px;

  &:hover {
    color: #f32424;
    font-size: 22px;
  }
`;

const Heading = styled.h3`
  font-weight: 600;
  padding: 1em 2em 0.5em 2em;
  color: #027db3;

  ${mobile({ padding: "0.3em 2em" })};
`;

const AdminDashboard = () => {
  const { user } = useAuthContext();
  const { tasks, dispatch } = useTasksContext();
  const [users, setUsers] = useState([]);
  const [taskID, setTaskID] = useState("");
  const [editModalShow, setEditModalShow] = useState(false);
  const [allTasks, setAllTasks] = useState([]);
  const [overdueTasks, setOverdueTasks] = useState([]);
  const [inProgressTasks, setInProgressTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);

  // Get Users
  useEffect(() => {
    const fetchTasks = async () => {
      const res = await fetch(`${userFetchPath}${user.organization}`, {
        method: "GET",
        mode: "cors",
      });
      let alldata = await res.json();
      setUsers(alldata);
    };

    fetchTasks();
  }, [user.organization]);

  // Get Tasks
  useEffect(() => {
    const fetchTasks = async (id) => {
      /*const res = await fetch(
        `${taskFetchPath}/organization/${user.organization}`,
        {
          method: "GET",
          mode: "cors",
        }
      );
      let data = await res.json();
      dispatch({ type: "SET_Tasks", payload: data });*/
      // console.log(data);

      let all = [];
      let overdue = [];
      let inProgress = [];
      let completed = [];

      for (const task of tasks) {
        let currentDate = task.due_date;
        let goodDate = currentDate.replace("-", "/");
        const dueDate = new Date(goodDate);
        const dueDateFormatted = format(dueDate, "MM/dd/yyyy");
        const today = Date.now();
        const todayFormatted = format(today, "MM/dd/yyyy");
        // console.log(`current date ${currentDate}`);
        // console.log(`good date ${goodDate}`);
        // console.log(`dueDateFormatted ${dueDateFormatted}`);

        if (dueDateFormatted < todayFormatted && task.isComplete === "NO") {
          overdue.push(task);
        } else if (dueDateFormatted >= todayFormatted && task.isComplete === "NO") {
          inProgress.push(task);
        } else if (task.isComplete === "YES") {
          completed.push(task);
        }
        all.push(task);
      }
      setOverdueTasks(overdue);
      setInProgressTasks(inProgress);
      setCompletedTasks(completed);
      setAllTasks(all);
      // if (res.ok) {
      //   setAllTasks(allTasks.filter((task) => task._id !== id));
      // }
    };
    if (tasks) {
      fetchTasks();
    }
  }, [tasks]);

  //delete task
  const handleDelete = async (id) => {
    const response = await fetch(`${taskFetchPath}${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });

    if (response.ok) {
      dispatch({ type: "DELETE_Tasks", payload: id });
      //setAllTasks(allTasks.filter((task) => task._id !== id));
      // window.location.reload(false);
    }
  };

  //export tasks to excel
  const exportTasksExcel = () => {
    const wb = XLSX.utils.book_new(),
      ws = XLSX.utils.json_to_sheet(allTasks);
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
    XLSX.writeFile(wb, "TaskMasterUSA_All_Tasks.xlsx");
  };
  //export users to excel
  const exportUsersExcel = () => {
    const wb = XLSX.utils.book_new(),
      ws = XLSX.utils.json_to_sheet(users);
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
    XLSX.writeFile(wb, "TaskMasterUSA_All_Users.xlsx");
  };

  const findWorkerName = (task) => {
    let workerName = "Nobody";
    let foundWorker = { _id: task.user_id };

    for (const worker of users) {
      if (worker._id === task.user_id) {
        workerName = worker.first_name + " " + worker.last_name;
        foundWorker = worker;
      }
    }

    return (
      <Td data-label="Assigned to" key={foundWorker._id} value={foundWorker._id}>
        {workerName}
      </Td>
    );
  };

  const displayTable = (rowData) => {
    if (rowData) {
      return (
        <StyledTable responsive>
          <thead>
            <tr>
              <Th>Due Date</Th>
              <Th>Created</Th>
              <Th>Priority</Th>
              <Th>Assigned To</Th>
              <Th>Task name</Th>
              <Th>Notes</Th>
              <Th>Completed?</Th>
              <Th>Edit Task</Th>
              <Th>Delete Task</Th>
            </tr>
          </thead>
          <Tbody>
            {rowData.map((task) => {
              let currentDate = task.due_date;
              let goodDate = currentDate.replace("-", "/");
              const dueDate = new Date(goodDate);
              const dueDateFormatted = format(dueDate, "MM/dd/yyyy");

              return (
                <Tr key={task._id}>
                  <Td data-label="Due Date">
                    <b>{dueDateFormatted}</b>
                  </Td>
                  <Td data-label="Created">
                    {formatDistanceToNow(new Date(task.createdAt), {
                      addSuffix: true,
                    })}
                  </Td>
                  <Td data-label="Priority" taskPriority={task.priority}>
                    {task.priority}
                  </Td>
                  {findWorkerName(task)}
                  <Td data-label="Task Name">{task.taskName}</Td>
                  <Td data-label="Notes">{task.notes}</Td>
                  <Td data-label="Completed?">{task.isComplete}</Td>
                  <Td data-label="Edit Task">
                    <EditWrapper>
                      <BiEdit
                        className="editButton"
                        onClick={() => {
                          setEditModalShow(task._id);
                          setTaskID(task._id);
                        }}
                      />
                    </EditWrapper>
                    <EditTask taskid={taskID} task={task} show={editModalShow === task._id} onHide={() => setEditModalShow(false)} />
                  </Td>
                  <Td data-label="Delete Task">
                    <DeleteWrapper>
                      <RiDeleteBinLine
                        className="deleteButton"
                        onClick={() => {
                          if (window.confirm("Are youu sure you wnat to delete this task?")) handleDelete(task._id);
                        }}
                      />
                    </DeleteWrapper>
                  </Td>
                </Tr>
              );
            })}
          </Tbody>
        </StyledTable>
      );
    }
  };

  return (
    <Container>
      <StyledTabs defaultActiveKey="users" id="fill-tab-example" className="mb-3" fill>
        <StyledTab eventKey="users" title={`Users (${users.length})`}>
          <Wrapper>
            <WrapperAllUsers>
              <Heading>All Users</Heading>
              <Button variant="primary" onClick={exportUsersExcel}>
                Export All Users to Excel
              </Button>
            </WrapperAllUsers>
            <AdminUsersTable />
          </Wrapper>
        </StyledTab>
        <StyledTab eventKey="allTasks" title={`All Tasks (${allTasks.length})`}>
          <Wrapper>
            <WrapperAllTasks>
              <Heading>All Tasks</Heading>

              <Button variant="primary" onClick={exportTasksExcel}>
                Export All Tasks to Excel
              </Button>
            </WrapperAllTasks>
            {displayTable(allTasks)}
          </Wrapper>
        </StyledTab>
        <StyledTab eventKey="overdueTasks" title={`Overdue (${overdueTasks.length})`}>
          <Wrapper>
            <Heading>Overdue Tasks</Heading>
            {displayTable(overdueTasks)}
          </Wrapper>
        </StyledTab>
        <StyledTab eventKey="inProgressTasks" title={`In Progress (${inProgressTasks.length})`}>
          <Wrapper>
            <Heading>In Progress Tasks</Heading>
            {displayTable(inProgressTasks)}
          </Wrapper>
        </StyledTab>
        <StyledTab eventKey="completedTasks" title={`Completed (${completedTasks.length})`}>
          <Wrapper>
            <Heading>Completed Tasks</Heading>
            {displayTable(completedTasks)}
          </Wrapper>
        </StyledTab>
      </StyledTabs>
    </Container>
  );
};

export default AdminDashboard;
