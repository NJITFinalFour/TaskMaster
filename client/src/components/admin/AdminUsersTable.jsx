import Table from "react-bootstrap/Table";
import styled from "styled-components";

const Container = styled.div`
  margin: auto;
  /* background-color: #88bb44; */
  /* width: 80%; */
`;

const Wrapper = styled.div`
  margin-top: 200px;
`

const AdminUsersTable = () => {
  return (
    <Container>
      <Wrapper>
        <Table striped>
          <thead>
            <tr>
              <th>#</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Username</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>Mark</td>
              <td>Otto</td>
              <td>@mdo</td>
            </tr>
            <tr>
              <td>2</td>
              <td>Jacob</td>
              <td>Thornton</td>
              <td>@fat</td>
            </tr>
            <tr>
              <td>3</td>
              <td colSpan={2}>Larry the Bird</td>
              <td>@twitter</td>
            </tr>
          </tbody>
        </Table>
      </Wrapper>
    </Container>
  );
}

export default AdminUsersTable
