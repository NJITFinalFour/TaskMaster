import Table from "react-bootstrap/Table";
import styled from "styled-components";
import { useAuthContext } from "../../hooks/useAuthContext";
import { taskFetchPath } from "../../api/fetchpaths";
import { useState, useEffect } from "react";
import { formatDistanceToNow, format } from "date-fns";

const Container = styled.div`
  height: 80vh;
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
    width: 15%;
  }
  &:nth-child(4) {
    width: 20%;
  }
  &:nth-child(5) {
    width: 40%;
  }
  &:last-child {
    width: 5%;
  }
`;

const TaskWrapper = styled.div`
  height: 40vh;
  overflow-y: auto;
  padding: 20px 50px;
  margin: 0px 10%;
  border: 1px solid black;
  border-radius: 10px;
`;

const TaskWrapperTwo = styled.div`
  padding: 20px 50px;
  margin: 20px 10%;
  border: 1px solid black;
  border-radius: 10px;
`;

const Heading = styled.h3`
  font-weight: 600;
  margin: 15px 13%;
  color: #88bb44;
`;


const UserTasksTable = () => {
    const { user } = useAuthContext();

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

      let completed = []
      let unCompleted = []

      for (const task of data) {
        if (task.isComplete === "YES") {
            completed.push(task)
            setCompletedTasks(completed)
        } else {
            unCompleted.push(task)
            setUnCompletedTasks(unCompleted)
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
            <th>Due Date</th>
            <th>Priority</th>
            <th>Created</th>
            <th>Task name</th>
            <th>Notes</th>
            <th>Completed?</th>
          </tr>
        </thead>
        <Tbody>
          {rowData.map((row) => {
            const date = new Date(row.due_date);
            const dueDateFormatted = format(date, "MM/dd/yyyy")
            return (
              <Tr key={row._id}>
                <Td>{dueDateFormatted}</Td>
                <Td>{row.priority}</Td>
                <Td>{formatDistanceToNow(new Date(row.createdAt), { addSuffix: true })}</Td>
                <Td>{row.taskName}</Td>
                <Td>{row.notes}</Td>
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
          <Heading>Needs to be completed</Heading>
        <TaskWrapper>
          {displayTable(unCompletedTasks)}
        </TaskWrapper>
          <Heading>Completed</Heading>
        <TaskWrapperTwo>
          {displayTable(completedTasks)}
        </TaskWrapperTwo>
    </Container>
  );
};

export default UserTasksTable;