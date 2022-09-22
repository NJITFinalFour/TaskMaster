import styled from "styled-components";

const Container = styled.div`
  text-align: center;
  margin: 10px 0px;
`;

const Signature = styled.span`
  font-weight: 400;
`;

const Link = styled.a``

const GitHub = styled.img`
  height: 20px;
  margin-left: 20px;
`

const Copyright = styled.span`
  font-weight: 400;
  margin-left: 20px;
`

const FooterSignature = () => {
  return (
    <Container>
      <Signature>
        <b>Created by:</b> David Wendt, John Margotti, Jonathan Shinault, and
        Patrick Bowes
      </Signature>
      <Link href="https://github.com/NJITFinalFour/TaskMaster" target="_blank">
        <GitHub src="https://cdn-icons-png.flaticon.com/512/25/25231.png" />
      </Link>
      <Copyright>Copyright {new Date().getFullYear()}</Copyright>
    </Container>
  );
};

export default FooterSignature;
