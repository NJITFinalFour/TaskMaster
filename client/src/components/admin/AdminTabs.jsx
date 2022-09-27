import styled from "styled-components";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import AdminUsersTable from "./AdminUsersTable";
import AdminTasksTable from "./AdminTasksTable";

const Container = styled.div`
  margin: auto;
  width: 80%;
  color: #88bb44;
`;

// const TabContainer = styled.div`
//   color: #88bb44;

// `;

const AdminTabs = () => {
  return (
    <Container>
      <Tabs
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
      </Tabs>
    </Container>
  );
};

export default AdminTabs;
