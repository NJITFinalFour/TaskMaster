import Table from "react-bootstrap/Table";
import styled from "styled-components";
import { useAuthContext } from "../../hooks/useAuthContext";
import { taskFetchPath, userFetchPath } from "../../api/fetchpaths";
import { useState, useEffect } from "react";
import { BiEdit } from "react-icons/bi";
import { RiDeleteBinLine } from "react-icons/ri";
import EditTask from "./AdminEditTask";
import formatDistanceToNow from "date-fns/formatDistanceToNow";

const Container = styled.div`
  height: 50vh;
  overflow-y: auto;
`;


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
    width: 20%;
  }
  &:nth-child(4) {
    width: 10%;
  }
  &:nth-child(5) {
    width: 10%;
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
  color: rgb(107, 108, 110);
  font-size: 20px;

  &:hover {
    color: rgb(243, 36, 36);
    font-size: 22px;
  }
`;

const AdminTasksTable = () => {
    const { user } = useAuthContext();
    const [ tasks, setTasks ] = useState([]);
    const [editModalShow, setEditModalShow] = useState(false)
    const [taskID, setTaskID] = useState("")
    const [ users, setUsers ] = useState([])
    
    

// Get Users
useEffect(() => {
    const fetchTasks = async () => {
        const res = await fetch(`${userFetchPath}${user.organization}`, {
            method: "GET",
            mode: "cors"
        })
        let alldata = await res.json()
        setUsers(alldata)
        
    }
    
    fetchTasks()
}, [user.organization])


  // page load fetch all tasks to display
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
      setTasks(data);
    };

    fetchTasks();
  }, [user.organization]);

  // Delete a task
  const handleDelete = async (id) => {
    const response = await fetch(`${taskFetchPath}${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });

    if (response.ok) {
        setTasks(tasks.filter((task) => task._id !== id));
    }
  };

  return (
    <Container>
      <Table striped responsive>
        <thead>
          <tr>
            <th>Assigned To</th>
            <th>Priority</th>
            <th>Task name</th>
            <th>Due Date</th>
            <th>Created</th>
            <th>Notes</th>
            <th>Completed?</th>
            <th>Edit Task</th>
            <th>Delete Task</th>
          </tr>
        </thead>
        <Tbody>
          {tasks.map((task) => {
            
            return (
              <Tr key={task._id}>
                <Td> {users.map((worker) => {
                   if (task.user_id == worker._id) {
                    return (
                        <Td key={worker._id} value={worker._id}>
                          {worker.first_name + " " + worker.last_name}
                        </Td>);}})}</Td>
                <Td>{task.priority}</Td>
                <Td>{task.taskName}</Td>
                <Td>{task.due_date}</Td>
                <Td>{formatDistanceToNow(new Date(task.createdAt), { addSuffix: true })}</Td>
                <Td>{task.notes}</Td>

                <Td>{task.isComplete}</Td>
                <Td>
                  <EditWrapper>
                    <BiEdit
                      className="editButton"
                      onClick={() => {setEditModalShow(true); setTaskID(task._id);  }}
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
    </Container>
  );
};

export default AdminTasksTable;
