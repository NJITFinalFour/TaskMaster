import styled from "styled-components";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import AdminUsersTable from "./AdminUsersTable";
import AdminTasksTable from "./AdminTasksTable";

const Container = styled.div`
  margin: auto;
  width: 80%;
`

const StyledTabs = styled(Tabs)`
  color: #88bb44;
  font-size: 2em;
`;

const AdminTabs = () => {
  return (
    <Container>
      <StyledTabs
        defaultActiveKey="tasks"
        id="fill-tab-example"
        className="mb-3"
        fill
      >
          <Tab eventKey="users" title="Users">
            <AdminUsersTable />
          </Tab>
          <Tab eventKey="tasks" title="Tasks">
            <AdminTasksTable />
          </Tab>
      </StyledTabs>
    </Container>
  );
};

export default AdminTabs;
