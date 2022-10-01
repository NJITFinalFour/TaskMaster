import Table from "react-bootstrap/Table";
import styled from "styled-components";
import { mobile } from "../../responsive";
import { useAuthContext } from "../../hooks/useAuthContext";
import { userFetchPath } from "../../api/fetchpaths";
import { useState, useEffect } from "react";
import { BiEdit } from "react-icons/bi";
import { RiDeleteBinLine } from "react-icons/ri";
import EditUser from "./AdminEditUser";

const Container = styled.div`
  /* height: 50vh; */
  /* overflow-y: auto; */
  /* border-width: 0px 1px 1px 1px;
  border-style: solid;
  border-color: #9c9c9ca6;
  border-radius: 10px; */

  /* ${mobile({ height: "100vh" })}; */
`;

const StyledTable = styled(Table)``;
const Thead = styled.thead``;

const Th = styled.th`
  ${mobile({ fontSize: "0.7em" })};
`;

const Tbody = styled.tbody``;

const Tr = styled.tr`
  &:nth-child(odd) {
    background-color: #f0f0f0;
  }
`;

const Td = styled.td`
  height: 60px;
  vertical-align: middle;
  color: ${(props) => (props.isAdmin ? "#88bb44" : "black")};
  font-weight: ${(props) => (props.isAdmin ? 600 : 400)};

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
  ${mobile({ fontSize: "0.7em" })};
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

  const [workers, setWorkers] = useState([]);

  // Get Users
  useEffect(() => {
    const fetchUsers = async () => {
      const res = await fetch(`${userFetchPath}${user.organization}`, {
        method: "GET",
        mode: "cors",
      });
      const json = await res.json();
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
    console.log(response);
  };

  const displayEdit = (worker) => {
    return (
      <>
        <EditWrapper>
          <BiEdit
            className="editButton"
            onClick={() => {
              setEditModalShow(worker._id);
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
          show={editModalShow === worker._id}
          onHide={() => setEditModalShow(null)}
        />
      </>
    );
  };

  const displayDelete = (worker) => {
    return (
      <DeleteWrapper>
        <RiDeleteBinLine
          className="deleteButton"
          onClick={() => {
            handleDelete(worker._id);
          }}
        />
      </DeleteWrapper>
    );
  };

  return (
    <Container>
      <StyledTable className="table" responsive>
        <Thead>
          <tr>
            <Th>Last Name</Th>
            <Th>First Name</Th>
            <Th>Email</Th>
            <Th>Role</Th>
            <Th>Edit User</Th>
            <Th>Delete User</Th>
          </tr>
        </Thead>
        <Tbody>
          {workers.map((worker) => {
            return (
              <Tr key={worker._id}>
                <Td data-label="Last Name">{worker.last_name}</Td>
                <Td data-label="First name">{worker.first_name}</Td>
                <Td data-label="Email">{worker.email}</Td>
                <Td data-label="Is Admin" isAdmin={worker.isAdmin}>
                  {worker.isAdmin ? "Admin" : "User"}
                </Td>
                <Td data-label="Edit User">
                  {user._id === worker._id ? "" : displayEdit(worker)}
                </Td>
                <Td data-label="Delete User">
                  {user._id === worker._id ? "" : displayDelete(worker)}
                </Td>
              </Tr>
            );
          })}
        </Tbody>
      </StyledTable>
    </Container>
  );
};

export default AdminUsersTable;
