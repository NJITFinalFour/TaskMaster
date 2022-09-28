import { formatDistanceToNow, format } from "date-fns";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { taskFetchPath, userFetchPath } from "../../api/fetchpaths";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import Table from "react-bootstrap/Table";
import AdminUsersTable from "./AdminUsersTable";
import EditTask from "./AdminEditTask";
import { BiEdit } from "react-icons/bi";
import { RiDeleteBinLine } from "react-icons/ri";
import { useAuthContext } from "../../hooks/useAuthContext";

const Container = styled.div`
  margin: auto;
  width: 80%;
`;

const StyledTabs = styled(Tabs)`
  background-color: #f1f0f0;
  font-size: 1.5em;

  & .nav-link {
    color: #88bb44;
    font-weight: 600;
  }
`;

const StyledTab = styled(Tab)``;

const Wrapper = styled.div``;

const Tbody = styled.tbody``;

const Tr = styled.tr``;

const Td = styled.td`
  height: 60px;
  vertical-align: middle;

  &:first-child {
    width: 10%;
  }
  &:nth-child(2) {
    width: 10%;
  }
  &:nth-child(3) {
    width: 10%;
  }
  &:nth-child(4) {
    width: 10%;
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
    width: 3%;
  }
  &:last-child {
    width: 3%;
  }
  &  {
  color: #${(props) => (props.highPriority ==="true" && "f32424")};
  font-weight: ${(props) => (props.highPriority ? 600 : 400)};
  }
`;

const EditWrapper = styled.div`
  color: rgb(107, 108, 110);
  font-size: 20px;

  &:hover {
    color: #9edb4f;
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
  margin: 15px 5%;
  color: #88bb44;
`;

const AdminDashboard = () => {
  const { user } = useAuthContext();
  const [users, setUsers] = useState([]);
  const [taskID, setTaskID] = useState("");
  const [editModalShow, setEditModalShow] = useState(false);
  const [allTasks, setAllTasks] = useState([]);
  const [overdueTasks, setOverdueTasks] = useState([]);
  const [inProgressTasks, setInProgressTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);
  const [highPriority, setHighPriority] = useState(false);

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
      const res = await fetch(
        `${taskFetchPath}/organization/${user.organization}`,
        {
          method: "GET",
          mode: "cors",
        }
      );
      let data = await res.json();
      setAllTasks(data);
      console.log(data);

      // let alltasks = [];
      let overdueTasks = [];
      let inProgressTasks = [];
      let completedTasks = [];

      for (const task of data) {
        const dueDate = new Date(task.due_date);
        const dueDateFormatted = format(dueDate, "MM/dd/yyyy");
        const today = Date.now();
        const todayFormatted = format(today, "MM/dd/yyyy");

        if (task.priority === "high") {
          setHighPriority(true);
        }
        if (dueDateFormatted < todayFormatted && task.isComplete === "NO") {
          overdueTasks.push(task);
          setOverdueTasks(overdueTasks);
        } else if (
          dueDateFormatted >= todayFormatted &&
          task.isComplete === "NO"
        ) {
          inProgressTasks.push(task);
          setInProgressTasks(inProgressTasks);
        } else if (task.isComplete === "YES") {
          completedTasks.push(task);
          setCompletedTasks(completedTasks);
        } else {
          allTasks.push(task);
          setAllTasks(allTasks);
        }
      }

      // if (res.ok) {
      //   setAllTasks(allTasks.filter((task) => task._id !== id));
      // }
    };

    fetchTasks();
  }, [user.organization]);

  const handleDelete = async (id) => {
    const response = await fetch(`${taskFetchPath}${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });

    if (response.ok) {
      setAllTasks(allTasks.filter((task) => task._id !== id));
    }
  };

  const displayTable = (rowData) => {
    return (
      <Table striped responsive>
        <thead>
          <tr>
            <th>Due Date</th>
            <th>Created</th>
            <th>Priority</th>
            <th>Assigned To</th>
            <th>Task name</th>
            <th>Notes</th>
            <th>Completed?</th>
            <th>Edit Task</th>
            <th>Delete Task</th>
          </tr>
        </thead>
        <Tbody>
          {rowData.map((task) => {
            const date = new Date(task.due_date);
            const dueDateFormatted = format(date, "MM/dd/yyyy");
            return (
              <Tr key={task._id}>
                <Td>
                  <b>{dueDateFormatted}</b>
                </Td>
                <Td>
                  {formatDistanceToNow(new Date(task.createdAt), {
                    addSuffix: true,
                  })}
                </Td>
                <Td props={highPriority}>{task.priority}</Td>
                {users.map((worker) => {
                  if (task.user_id === worker._id) {
                    return (
                      <Td key={worker._id} value={worker._id}>
                        {worker.first_name + " " + worker.last_name}
                      </Td>
                    );
                  }
                })}
                <Td>{task.taskName}</Td>
                <Td>{task.notes}</Td>
                <Td>{task.isComplete}</Td>
                <Td>
                  <EditWrapper>
                    <BiEdit
                      className="editButton"
                      onClick={() => {
                        setEditModalShow(true);
                        setTaskID(task._id);
                      }}
                    />
                  </EditWrapper>
                  <EditTask
                    taskid={taskID}
                    task={task}
                    show={editModalShow}
                    onHide={() => setEditModalShow(false)}
                  />
                </Td>
                <Td>
                  <DeleteWrapper>
                    <RiDeleteBinLine
                      className="deleteButton"
                      onClick={() => {
                        handleDelete(task._id);
                      }}
                    />
                  </DeleteWrapper>
                </Td>
              </Tr>
            );
          })}
        </Tbody>
      </Table>
    );
  };

  return (
    <Container>
      <StyledTabs
        defaultActiveKey="users"
        id="fill-tab-example"
        className="mb-3"
        fill
      >
        <StyledTab eventKey="users" title="Users">
          <Wrapper>
            <Heading>All Users</Heading>
            <AdminUsersTable />
          </Wrapper>
        </StyledTab>
        <StyledTab eventKey="allTasks" title="All Tasks">
          <Wrapper>
            <Heading>All Tasks</Heading>
            {displayTable(allTasks)}
          </Wrapper>
        </StyledTab>
        <StyledTab eventKey="overdueTasks" title="Overdue">
          <Wrapper>
            <Heading>Overdue Tasks</Heading>
            {displayTable(overdueTasks)}
          </Wrapper>
        </StyledTab>
        <StyledTab eventKey="inProgressTasks" title="In Progress">
          <Wrapper>
            <Heading>In Progress Tasks</Heading>
            {displayTable(inProgressTasks)}
          </Wrapper>
        </StyledTab>
        <StyledTab eventKey="completedTasks" title="Completed">
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
