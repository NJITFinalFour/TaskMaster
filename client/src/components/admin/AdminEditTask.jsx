import { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import styled from "styled-components"
import { taskFetchPath, userFetchPath } from "../../api/fetchpaths"
import { useAuthContext } from "../../hooks/useAuthContext"
import { useTasksContext } from "../../hooks/useTaskContext";

const Container = styled.div`
  
`

const Form = styled.form`
  /* align-items: center;
  justify-content: center; */
  margin: auto;
`;

const Top = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
`;

const Input = styled.input`
  flex: 1;
  /* min-width: 40%; */
  margin: 20px 10px;
  padding: 10px;
`;

const Label = styled.label`
  margin: auto;
`;

const Select = styled.select`
  flex: 1;
  min-width: 40%;
  max-width: fit-content;
  margin: 20px 10px;
  padding: 10px;
`;

const Option = styled.option`
  flex: 1;
  min-width: 40%;
  max-width: fit-content;

  margin: 20px 10px;
  padding: 10px;
`;
const NotesInput = styled.textarea`
  flex: 1;
  min-width: 40%;
  margin: 20px 10px;
  padding: 10px;
  height: 200px;
`;

const Bottom = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Button = styled.button`
  flex: 1;
  margin: auto;
  width: 30%;
  border: 1px solid black;
  border-radius: 15px;
  padding: 10px 15px;
  margin-top: 20px;
  background-color: #014866;
  color: white;
  cursor: pointer;
  font-weight: 500;

  &:hover {
    border: 1px solid white;
    background-color: #027db3;
    color: white;
  }
`;

const EditTask = (props) => {
  const { user } = useAuthContext();
  const [error, setError] = useState("");
  const [ users, setUsers ] = useState([])
  const { tasks, dispatch } = useTasksContext();

  // console.log(props.task)

  const [newTask, setNewTask] = useState({
    taskName: props.task.taskName,
    organization_id: user.organization,
    user_id: props.task.user_id,
    due_date: props.task.due_date,
    priority: props.task.priority,
    isComplete: props.task.isComplete,
    notes: props.task.notes,
  });

  

//Submit changes
    const handleSubmit= async (e) => {
      
      e.preventDefault();
      const response = await fetch(`${taskFetchPath}${props.taskid}`, {
        method: "PUT",
        body: JSON.stringify(newTask),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      });
      const json = await response.json();
      
      
  
      if (response.ok) {
        dispatch({ type: "EDIT_Tasks", payload: {...json, ...newTask}});
        // setNewTask({});
        // window.location.reload(false);
      
        
        
      }
    }; 
// Get all usrs to populate drop down
    useEffect(() => {
      const fetchTasks = async () => {
          const res = await fetch(`${userFetchPath}${user.organization}`, {
              method: "GET",
              mode: "cors"
          })
          let alldata = await res.json()

      setUsers(alldata);
    };

    fetchTasks();
  }, [user.organization]);

  // Get task being edited
  /*useEffect(() => {
        const fetchTask = async () => {
            const res = await fetch(`${taskFetchPath}${props.taskid}`, {
              headers: { Authorization: `Bearer ${user.token}` },
            });
            let data = await res.json()
            
          
            setNewTask({
              taskName: data.taskName,
              organization_id: user.organization,
              user_id: data.user_id,
              due_date: data.due_date,
              priority: data.priority,
              isComplete: data.isComplete,
              notes: data.notes,
            });
            
        }

        fetchTask()
    }, [props.taskid])*/

  return (
    <Container>
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Modify Task
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form autocomplete="off" onSubmit={handleSubmit}>
            <Top>
              <Label>Task name:</Label>
              <Input
                type="text"
                name="taskName"
                // placeholder="Task Name"
                onChange={(event) => {
                  setNewTask({ ...newTask, taskName: event.target.value });
                }}
                defaultValue={newTask.taskName}
                required
              />
              <Label>Assign to:</Label>
              <Select
                name="user_id"
                placeholder="User Name"
                onChange={(event) => {
                  setNewTask({ ...newTask, user_id: event.target.value });
                }}
                value={newTask.user_id}
                required
              >
                {/* {user.user_id.map((firstName, lastName) => (
                    <Option value={firstName + lastName}></Option>
                  ))} */}
                <Option>Select a user</Option>
                {users.map((worker) => {
                  return (
                    <option key={worker._id} value={worker._id}>
                      {worker.first_name + " " + worker.last_name}
                    </option>
                  );
                })}
              </Select>
              <Label>Due date:</Label>
              <Input
                type="date"
                name="due_date"
                // placeholder="Due Date"
                onChange={(event) => {
                  setNewTask({ ...newTask, due_date: event.target.value });
                }}
                defaultValue={newTask.due_date}
                required
              />
              <Label>Priority level:</Label>
              <Select
                name="priority"
                placeholder="Priority Level"
                label="Priority"
                onChange={(event) => {
                  setNewTask({ ...newTask, priority: event.target.value });
                }}
                value={newTask.priority}
                required
              >
                <Option>Select a level</Option>
                <Option value="high">High</Option>
                <Option value="medium">Medium</Option>
                <Option value="low">Low</Option>
              </Select>
              <Label>Notes:</Label>
              <NotesInput
                type="text"
                name="notes"
                onChange={(event) => {
                  setNewTask({ ...newTask, notes: event.target.value });
                }}
                defaultValue={newTask.notes}
              />
              <Label>Set as complete or NOT complete:</Label>
              <Select
                name="priority"
                placeholder="Priority Level"
                label="Priority"
                onChange={(event) => {
                  setNewTask({ ...newTask, isComplete: event.target.value });
                }}
                value={newTask.isComplete}
                required
              >
                <Option>Select a level</Option>
                <Option value="NO">NOT COMPLETE</Option>
                <Option value="YES">COMPLETE</Option>
              </Select>
            </Top>
            <Bottom>
              {error && <div>{error}</div>}
              <Button type="submit" onClick={props.onHide}>
                Submit Change
              </Button>
            </Bottom>
          </Form>
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default EditTask;
