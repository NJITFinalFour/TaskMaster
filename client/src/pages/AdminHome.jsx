import styled from "styled-components"

const Container = styled.div`
  display: flex;
  flex-direction: column;
`

const TopWrapper = styled.div`
  display: flex;
`

const Top = styled.div`
  
`
const ToolbarWrapper = styled.div`
  display: flex;
`

const Toolbar = styled.div`
  
`

const TableWrapper = styled.div`
  display: flex;
`

const Table = styled.div`
  
`

const AdminHome = () => {
  return (
    <Container>
      <TopWrapper>
        <Top>Hello Admin</Top>
      </TopWrapper>
      <ToolbarWrapper>
        <Toolbar></Toolbar>
      </ToolbarWrapper>
      <TableWrapper>
        <Table></Table>
      </TableWrapper>
    </Container>
  );
}

export default AdminHome