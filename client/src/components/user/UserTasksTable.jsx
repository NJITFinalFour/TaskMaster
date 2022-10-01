import Table from "react-bootstrap/Table";
import styled from "styled-components";
import { mobile } from "../../responsive";
import { useAuthContext } from "../../hooks/useAuthContext";
import { taskFetchPath } from "../../api/fetchpaths";
import { useState, useEffect } from "react";
import { formatDistanceToNow, format } from "date-fns";
import { GrCheckbox } from "react-icons/gr"
import { GrCheckboxSelected } from "react-icons/gr"
import { useTasksContext } from "../../hooks/useTaskContext";



const Container = styled.div`
  height: 80vh;
`;

const StyledTable = styled(Table)``;

const Tbody = styled.tbody`
  overflow-y: auto;
`;

const Tr = styled.tr`
  &:nth-child(odd) {
    background-color: #f0f0f0;
  }
`;

const Td = styled.td`
  height: 60px;
  vertical-align: middle;
  font-weight: ${(props) => (props.rowPriority === "high" ? 600 : 400)};
  color: ${(props) => (props.rowPriority === "high" ? "red" : "black")};

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
    width: 35%;
  }
  &:last-child {
    width: 10%;
  }

  ${mobile({ fontSize: "0.7em" })};
`;

const TaskWrapper = styled.div`
  height: 40vh;
  overflow-y: auto;
  padding: 20px 50px;
  margin: 0px 10%;
  border: 1px solid black;
  border-radius: 10px;

  ${mobile({ margin: "0px", padding: "0.7em " })};
`;

const TaskWrapperTwo = styled.div`
  height: 40vh;
  overflow-y: auto;
  padding: 20px 50px;
  margin: 0px 10%;
  border: 1px solid black;
  border-radius: 10px;

  ${mobile({ margin: "0px", padding: "0.7em " })};
`;

const Heading = styled.h3`
  font-weight: 600;
  margin: 15px 13%;
  color: #88bb44;

  ${mobile({ fontSize: "1.2em", textAlign: "center" })};
`;

const UserTasksTable = () => {
  const { user } = useAuthContext();
  const { tasks, dispatch } = useTasksContext();
  const [completedTasks, setCompletedTasks] = useState([])
  const [unCompletedTasks, setUnCompletedTasks] = useState([])
  // const [taskID, setTaskID] = useState("")

  // Mark task as complete/uncomplete
  const handleClick = async (task) => {
    if (task.isComplete === "YES") {
      task.isComplete = "NO"
    } else {
      task.isComplete = "YES"
    }
    const response = await fetch(`${taskFetchPath}${task._id}`, {
      method: "PUT",
      body: JSON.stringify(task),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    });
    const json = await response.json();
    
    if (response.ok) {
      dispatch({ type: "EDIT_Tasks", payload: {json}});
    }
  }

  // START OF LOGIC FOR Mark as Complete or NOT complete //

  /*useEffect(() => {
    const handleChange = async () => {
      console.log(taskID);
      const response = await fetch(`${taskFetchPath}${taskID}`, {
        method: "Get",
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      const json = await response.json();
      if (!response.ok) {
        console.log(json.error);
      }
      console.log(`get ${json.isComplete}`);

      if (json.isComplete === "NO") {
        console.log("NO was not Completed  change to completed");

        const isComplete = "YES";
        const change = { isComplete };
        console.log(change);

        ////////////////////////// NOT Patch completed change
        const res = await fetch(taskFetchPath + taskID, {
          method: "PUT",
          body: JSON.stringify(change),
          headers: {
            "content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        });
        const results = await res.json();
        console.log(results);

        if (!response.ok) {
          console.log(json.error);
        }
        if (response.ok) {
          console.log("change made");
          window.location.reload(false);
        }
      }
      if (json.isComplete === "YES") {
        console.log("YES is completed change to NOT");

        const isComplete = "NO";
        const change = { isComplete };
        console.log(change);

        ///////////////////////////////////// IS Patch paid change
        const res = await fetch(taskFetchPath + taskID, {
          method: "PUT",
          body: JSON.stringify(change),
          headers: {
            "content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        });
        const results = await res.json();
        console.log(results);

        if (!response.ok) {
          console.log(json.error);
        }
        if (response.ok) {
          console.log("change made");
          window.location.reload(false);
        }
      }
    };
    handleChange();
  }, [taskID])*/

  // END of COMPLETE TOGGLE LOGIC ??

  // page load fetch all tasks to display
  useEffect(() => {
    const fetchTasks = async () => {
      /*const res = await fetch(
        `${taskFetchPath}user/${user._id}`,
        {
          method: "GET",
          mode: "cors",
        }
      );

      let data = await res.json();
      */
      setCompletedTasks([])
      setUnCompletedTasks([])
      
      let completed = []
      let unCompleted = []

      for (const task of tasks) {
        if (task.isComplete === "YES") {
          completed.push(task);
          setCompletedTasks(completed);
        } else {
          unCompleted.push(task);
          setUnCompletedTasks(unCompleted);
        }
      }
    };

    fetchTasks();
  }, [tasks]);

  const displayTable = (rowData, complete) => {
    return (
      <StyledTable responsive>
        <thead>
          <tr>
            <th>Due Date</th>
            <th>Priority</th>
            <th>Created</th>
            <th>Task name</th>
            <th>Notes</th>
            {complete === true && <th>Complete</th>}
            {complete === false && <th>Undo Complete</th>}
          </tr>
        </thead>
        <Tbody>
          {rowData.map((row) => {
            const date = new Date(row.due_date);
            const dueDateFormatted = format(date, "MM/dd/yyyy");
            return (
              <Tr key={row._id}>
                <Td>{dueDateFormatted}</Td>
                <Td rowPriority={row.priority}>{row.priority}</Td>
                <Td>
                  {formatDistanceToNow(new Date(row.createdAt), {
                    addSuffix: true,
                  })}
                </Td>
                <Td>{row.taskName}</Td>
                <Td>{row.notes}</Td>
                {row.isComplete === "NO" && (
                  <Td
                    onClick={() => {
                      handleClick(row);
                      //setTaskID(row._id);
                    }}
                  >
                    <GrCheckbox />
                  </Td>
                )}
                {row.isComplete === "YES" && (
                  <Td
                    onClick={() => {
                      handleClick(row);
                      //setTaskID(row._id);
                    }}
                  >
                    <GrCheckboxSelected />
                  </Td>
                )}
              </Tr>
            );
          })}
        </Tbody>
      </StyledTable>
    );
  };

  return (
    <Container>
      <Heading>Needs to be completed {`(${unCompletedTasks.length})`}</Heading>
      <TaskWrapper>{displayTable(unCompletedTasks, true)}</TaskWrapper>
      <Heading>Completed {`(${completedTasks.length})`}</Heading>
      <TaskWrapperTwo>{displayTable(completedTasks, false)}</TaskWrapperTwo>
    </Container>
  );
};

export default UserTasksTable;
