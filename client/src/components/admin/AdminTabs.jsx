import styled from "styled-components";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import AdminUsersTable from "./AdminUsersTable";

const Container = styled.div`
  margin: auto;
  width: 80%;
`;

const AdminTabs = () => {
  return (
    <Container>
      <Tabs
        defaultActiveKey="users"
        id="fill-tab-example"
        className="mb-3"
        fill
      >
        <Tab eventKey="users" title="Users">
          <AdminUsersTable />
        </Tab>
        <Tab eventKey="tasks" title="Tasks">
          <AdminUsersTable />
        </Tab>
      </Tabs>
    </Container>
  );
};

export default AdminTabs;
