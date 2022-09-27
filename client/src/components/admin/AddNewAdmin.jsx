import axios from "axios";
import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { signupFetchPath } from "../../api/fetchpaths";
import { useAuthContext } from "../../hooks/useAuthContext";

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

const PasswordInput = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 20px 10px;
  padding: 10px;
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

function AddNewAdmin(props) {
  const { user } = useAuthContext();

  const [modalShow, setModalShow] = useState(true);

  const [data, setData] = useState({
    organization: user.organization,
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    isAdmin: true,
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = signupFetchPath;
      const { data: res } = await axios.post(url, data);
      navigate("/user");
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

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          CREATE A NEW ADMIN
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form autocomplete="off" onSubmit={handleSubmit}>
          <Top>
            <Input
              type="text"
              name="first_name"
              placeholder="First Name"
              onChange={handleChange}
              value={data.first_name}
              required
            />
            <Input
              type="text"
              name="last_name"
              placeholder="Last Name"
              onChange={handleChange}
              value={data.last_name}
              required
            />
            <Input
              type="email"
              name="email"
              placeholder="Email"
              autocomplete="off"
              onChange={handleChange}
              value={data.email}
              required
            />
            <PasswordInput
              type="password"
              name="password"
              autocomplete="off"
              placeholder="Password"
              onChange={handleChange}
              value={data.password}
              required
            />
            {/* <Input
              type="checkbox"
              name="isAdmin"
              label="Admin"
              onChange={e => setData(e.target.checked)}
              value={data.isAdmin}
              required
            /> */}
            {/* <Input placeholder="Confirm Admin Password" /> */}
          </Top>
          <Bottom>
            {error && <div>{error}</div>}
            <Button type="submit" onClick={props.onHide}>
              ADD ADMIN
            </Button>
          </Bottom>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default AddNewAdmin;
