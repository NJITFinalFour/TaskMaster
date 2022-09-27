import Table from "react-bootstrap/Table";
import styled from "styled-components";
import { useAuthContext } from "../../hooks/useAuthContext";
import { userFetchPath } from "../../api/fetchpaths";
import { useState, useEffect } from "react";
import { BiEdit } from "react-icons/bi";
import { RiDeleteBinLine } from "react-icons/ri";
import EditUser from "./AdminEditUser";

const Container = styled.div`
  height: 50vh;
  overflow-y: auto;
  border-width: 0px 1px 1px 1px;
  border-style: solid;
  border-color: #9c9c9ca6;
  border-radius: 10px;
`;


const Tbody = styled.tbody``;

const Tr = styled.tr``;

const Td = styled.td`
  height: 60px;
  vertical-align: middle;

  &:first-child {
    width: 20%;
  }
  &:nth-child(2) {
    width: 25%;
  }
  &:nth-child(3) {
    width: 25%;
  }
  &:nth-child(4) {
    width: 10%;
  }
  &:nth-child(5) {
    width: 10%;
  }
  &:last-child {
    width: 10%;
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

const AdminUsersTable = () => {
  const { user } = useAuthContext();
  const [editModalShow, setEditModalShow] = useState(false);

  const [ workers, setWorkers ] = useState([]);

  // Get Users
  useEffect(() => {
    const fetchUsers = async () => {
      const res = await fetch(`${userFetchPath}${user.organization}`, {
        method: "GET",
        mode: "cors",
      });
      const json = await res.json()
      setWorkers(json);
    };

    fetchUsers();
  }, [user.organization]);


  // Delete a task
  const handleDelete = async (id) => {
    const response = await fetch(`${userFetchPath}delete/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
    if (response.ok) {
      setWorkers(workers.filter((task) => task._id !== id));
    }
  };

  return (
    <Container>
      <Table striped responsive>
        <thead>
          <tr>
            <th>Last Name</th>
            <th>First Name</th>
            <th>Email</th>
            <th>Is Admin</th>
            <th>Edit User</th>
            <th>Delete User</th>
          </tr>
        </thead>
        <Tbody>
          {workers.map((worker) => {
            return (
              <Tr key={worker._id}>
                <Td>
                  {worker.last_name}
                </Td>
                <Td>
                  {worker.first_name}
                </Td>
                <Td>
                  {worker.email}
                </Td>
                <Td>
                  {worker.isAdmin ? "True" : "False"}
                </Td>
                <Td>
                  <EditWrapper>
                    <BiEdit
                      className="editButton"
                      onClick={() => {
                        setEditModalShow(true);
                      }}
                    />
                  </EditWrapper>
                  <EditUser
                    setWorkers={setWorkers}
                    first_name={worker.first_name}
                    last_name={worker.last_name}
                    email={worker.email}
                    is_admin={worker.isAdmin ? "True" : "False"}
                    _id={worker._id}
                    show={editModalShow}
                    onHide={() => setEditModalShow(false)}
                  />
                </Td>
                <Td>
                  <DeleteWrapper>
                    <RiDeleteBinLine
                      className="deleteButton"
                      onClick={() => {
                        handleDelete(worker._id);
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

export default AdminUsersTable;