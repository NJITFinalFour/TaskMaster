import styled from "styled-components";
import { mobile } from "../responsive";

const Container = styled.div`
  text-align: center;
  margin: 10px 0px;
`;

const Signature = styled.span`
  font-weight: 400;
  ${mobile({ fontSize: "65%" })};
`;

const Link = styled.a`
  ${mobile({ marginLeft: "0em" })};
`;

const GitHub = styled.img`
  height: 20px;
  margin-left: 1em;

  ${mobile({ margin: "auto" })};
`;

const Copyright = styled.span`
  font-weight: 400;
  margin-left: 2.8em;

  ${mobile({ display: "none" })};
`;

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
