import styled from "styled-components";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import AdminUsersTable from "./AdminUsersTable";
import AdminAllTasksTable from "./AdminAllTasksTable";
import AdminOverdueTasksTable from "./AdminOverdueTasksTable";
import AdminInProgressTasksTable from "./AdminInProgressTasksTable";
import AdminCompletedTasksTable from "./AdminCompletedTasksTable";

const Container = styled.div`
  margin: auto;
  width: 80%;
`

const StyledTabs = styled(Tabs)`
  color: #88bb44;
  font-size: 1.5em;
`;

const AdminTabs = () => {
  return (
    <Container>
      <StyledTabs
        defaultActiveKey="users"
        id="fill-tab-example"
        className="mb-3"
        fill
        // variant="pill"
      >
        <Tab eventKey="users" title="Users">
          <AdminUsersTable />
        </Tab>
        <Tab eventKey="allTasks" title="All Tasks">
          <AdminAllTasksTable />
        </Tab>
        <Tab eventKey="overdueTasks" title="Overdue">
          <AdminOverdueTasksTable/>
        </Tab>
        <Tab eventKey="inProgressTasks" title="In Progress">
          <AdminInProgressTasksTable />
        </Tab>
        <Tab eventKey="completedTasks" title="Completed">
          <AdminCompletedTasksTable />
        </Tab>
      </StyledTabs>
    </Container>
  );
};

export default AdminTabs;
