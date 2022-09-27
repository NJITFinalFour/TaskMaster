
import { useState, useEffect } from "react"
import Modal from "react-bootstrap/Modal";
import { useRouteLoaderData } from "react-router-dom";
import styled from "styled-components"
import { taskFetchPath, userFetchPath } from "../../api/fetchpaths"
import { useAuthContext } from "../../hooks/useAuthContext"


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
`

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


const EditUser = (props) => {
  const { user } = useAuthContext();
  const [error, setError] = useState("");
  const [ users, setUsers ] = useState([])


  // console.log(props.task)

  const [newUser, setNewUser] = useState ({
    
    first_name: props.first_name,
    last_name: props.last_name,
    email: props.email,
    isAdmin: (props.is_admin === "True") ? true : false,
    _id: props._id,
  });

  

//Submit changes
    const handleSubmit= async (e) => {
        console.log(newUser)
      
      e.preventDefault();

      const toSend = newUser

      if (newUser.isAdmin === "true"){
        toSend.isAdmin = true
      } else {
        toSend.isAdmin = false
      }

      const response = await fetch(`${userFetchPath}update`, {
        method: "PUT",
        body: JSON.stringify(newUser),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      });
      const json = await response.json();
      console.log(json)
    };

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
                <Label>Firstname</Label>
                <Input
                  type="text"
                  name="first_name"
                  // placeholder="Task Name"
                  onChange={(event) => {
                    setNewUser({ ...newUser, first_name: event.target.value });
                  }}
                  defaultValue={newUser.first_name}
                  required
                />
                <Label>Lastname</Label>
                <Input
                  type="text"
                  name="last_name"
                  onChange={(event) => {
                    setNewUser({ ...newUser, last_name: event.target.value });
                  }}
                  defaultValue={newUser.last_name}
                  required
                />
                <Label>Email</Label>
                <Input
                  type="text"
                  name="email"
                  onChange={(event) => {
                    setNewUser({ ...newUser, email: event.target.value });
                  }}
                  defaultValue={newUser.email}
                  required
                />
                <Label>Is Admin</Label>
                <Select
                  name="isAdmin"
                  placeholder="IsAdmin"
                  label="isAdmin"
                  onChange={(event) => {
                    setNewUser({ ...newUser, isAdmin: event.target.value });
                  }}
                  value={newUser.isAdmin}
                  required
                >
                  <Option value={true}>True</Option>
                  <Option value={false}>False</Option>
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
}

export default EditUser