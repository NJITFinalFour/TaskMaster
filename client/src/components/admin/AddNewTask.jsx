import axios from "axios"
import { useState, useEffect } from "react"
import Modal from "react-bootstrap/Modal";
import styled from "styled-components"
import { taskFetchPath } from "../../api/fetchpaths"
import { useAuthContext } from "../../hooks/useAuthContext"

const Container = styled.div`
  
`

const Form = styled.form``;

const Top = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 20px 10px;
  padding: 10px;
`;

const Select = styled.select`
  
`

const Option = styled.option`
  
`


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
  background-color: #c0e195;
  color: black;
  cursor: pointer;
  font-weight: 500;

  &:hover {
    border: 1px solid white;
    background-color: #88bb44;
    color: white;
  }
`;


const AddNewTask = (props) => {
  const { user } = useAuthContext();
  const [error, setError] = useState("");
  const [userID, setUserID] = useState ("")
  const [ users, setUsers ] = useState([])




  const [newTask, setNewTask] = useState ({
    taskName: "",
    organization_id: user.organization,
    user_id: "",
    due_date: "",
    priority: "",
    notes: ""
  });

    const handleChange = ({ currentTarget: input }) => {
      setNewTask({ ...newTask, [input.name]: input.value });
      console.log(newTask)
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const url = taskFetchPath;
        const { data: res } = await axios.post(url, newTask);
        // navigate("/user");
        console.log(res.message);
      } catch (error) {
        if (
          error.response &&
          error.response.status >= 400 &&
          error.response.status <= 500
        ) {
          setError(error.response.data.message);
        }
      }
    };

    useEffect(() => {
        const fetchTasks = async () => {
            const res = await fetch(`http://localhost:5000/user/${user.organization}`, {
                method: "GET",
                mode: "cors"
            })
            let data = await res.json()
            console.log(data)
            setUsers(data)
        }

        fetchTasks()
    }, [user.organization])

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
            CREATE A NEW TASK
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form autocomplete="off" onSubmit={handleSubmit}>
            <Top>
              <Input
                type="text"
                name="taskName"
                placeholder="Task Name"
                onChange={handleChange}
                value={newTask.taskName}
                required
              />
              <Select
                name="user_id"
                placeholder="User Name"
                onChange={handleChange}
                value={newTask.user_id}
                required
              >
                {/* {user.user_id.map((firstName, lastName) => (
                  <Option value={firstName + lastName}></Option>
                ))} */}
                {users.map(worker => {
                  return (
                    <option key={worker._id} value={worker._id}>{worker.first_name + " " + worker.last_name}</option>
                  )
                })}
              </Select>

              <Input
                type="date"
                name="due_date"
                placeholder="Due Date"
                onChange={handleChange}
                value={newTask.due_date}
                required
              />
              <Select
                name="priority"
                placeholder="Priority Level"
                onChange={handleChange}
                value={newTask.priority}
                required
              >
                <Option value="high">High</Option>
                <Option value="medium">Medium</Option>
                <Option value="low">Low</Option>
              </Select>
              <Input
                type="text"
                name="notes"
                placeholder="Notes"
                onChange={handleChange}
                value={newTask.password}
              />
            </Top>
            <Bottom>
              {error && <div>{error}</div>}
              <Button type="submit" onClick={props.onHide}>
                ADD USER
              </Button>
            </Bottom>
          </Form>
        </Modal.Body>
      </Modal>
    </Container>
  );
}

export default AddNewTask