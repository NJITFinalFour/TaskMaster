import Table from "react-bootstrap/Table";
import styled from "styled-components";
import { useAuthContext } from "../../hooks/useAuthContext";
import { taskFetchPath, userFetchPath } from "../../api/fetchpaths";
import { useState, useEffect } from "react";
import formatDistanceToNow from "date-fns/formatDistanceToNow";

const Container = styled.div`
overflow: scroll;
`;


const Tbody = styled.tbody``;

const Tr = styled.tr``;

const Td = styled.td`
  height: 60px;
  vertical-align: middle;

  &:first-child {
    width: 4.8%;
  }
  &:nth-child(2) {
    width: 1%;
  }
  &:nth-child(3) {
    width: 5%;
  }
  &:nth-child(4) {
    width: 4%;
  }
  &:nth-child(5) {
    width: 6%;
  }
  &:nth-child(6) {
    width: 10%;
  }
  &:nth-child(7) {
    width: 1%;
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
  color: rgb(236, 10, 10);
  font-size: 20px;

  &:hover {
    color: rgb(88, 37, 37);
    font-size: 22px;
  }
`;

const UserTasksTable = () => {
    const { user } = useAuthContext();
    const [editModalShow, setEditModalShow] = useState(false)
    const [taskID, setTaskID] = useState("")
    const [ users, setUsers ] = useState([])
    const [ completedTasks, setCompletedTasks ] = useState([])
    const [ unCompletedTasks, setUnCompletedTasks ] = useState([])

  // page load fetch all tasks to display
    useEffect(() => {
    const fetchTasks = async () => {
      const res = await fetch(
        `${taskFetchPath}user/${user._id}`,
        {
          method: "GET",
          mode: "cors",
        }
      );
      
      let data = await res.json();

      setCompletedTasks([])
      setUnCompletedTasks([])

      for (const task of data) {
        if (task.isCompleted === "YES") {
            setCompletedTasks([ ...completedTasks, task ])
        } else {
            setUnCompletedTasks([ ...completedTasks, task ])
        }
      }
    };

    fetchTasks();
  }, [user]);

  const displayTable = (rowData) => {
    return (
        <Table striped responsive>
        <thead>
          <tr>
            <th>Priority</th>
            <th>Task name</th>
            <th>Notes</th>
            <th>Due Date</th>
            <th>Created</th>
            <th>Completed?</th>
          </tr>
        </thead>
        <Tbody>
          {rowData.map((row) => {
            return (
              <Tr key={row._id}>
                <Td>{row.priority}</Td>
                <Td>{row.taskName}</Td>
                <Td>{row.notes}</Td>
                <Td>{row.due_date}</Td>
                <Td>{formatDistanceToNow(new Date(row.createdAt), { addSuffix: true })}</Td>
                <Td>{row.isComplete}</Td>
              </Tr>
            );
          })}
        </Tbody>
      </Table>
    )
  }

  return (
    <Container>
      {displayTable(unCompletedTasks)}
      {displayTable(completedTasks)}
    </Container>
  );
};

export default UserTasksTable;