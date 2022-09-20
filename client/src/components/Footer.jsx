import {
  Email,
  Phone,
  Facebook,
  Instagram,
  Place,
  Twitter,
} from "@mui/icons-material";
import styled from "styled-components";
import { mobile } from "../responsive";
import FooterSignature from "./FooterSignature";

const Container = styled.div`
  display: flex;
  background-color: #88bb44;
  ${mobile({ flexDirection: "column" })}
`;
const Left = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 20px;
`;

const Logo = styled.h1``;
const Desc = styled.p`
  margin: 20px 0px;
`;
const SocialContainer = styled.div`
  display: flex;
`;
const SocialIcon = styled.h1`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  color: white;
  background-color: #${(props) => props.color};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 20px;
`;

const Center = styled.div`
  flex: 1;
  padding: 20px;
  ${mobile({ display: "none" })}
`;

const Title = styled.h3`
  margin-bottom: 30px;
`;
const List = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  flex-wrap: wrap;
`;
const ListItem = styled.li`
  width: 50%;
  margin-bottom: 10px;
`;

const Right = styled.div`
  flex: 1;
  padding: 20px;
`;

const ContactItem = styled.div`
  margin-bottom: 20px;
  display: flex;
  align-items: center;
`;

const Footer = () => {
  return (
    <>
      <Container>
        <Left>
          <Logo>TaskMaster</Logo>
          <Desc>Take control of your workflow</Desc>
          <SocialContainer>
            <SocialIcon color="3B5999">
              <Facebook />
            </SocialIcon>
            <SocialIcon color="E4405F">
              <Instagram />
            </SocialIcon>
            <SocialIcon color="55ACEE">
              <Twitter />
            </SocialIcon>
          </SocialContainer>
        </Left>
        <Center>
          <Title>Useful Links</Title>
          <List>
            <ListItem>Home</ListItem>
            <ListItem>My Account</ListItem>
            <ListItem>About Us</ListItem>
            <ListItem>Legal</ListItem>
            <ListItem>Privacy Policy</ListItem>
            <ListItem>Terms of Service</ListItem>
            <ListItem>Work Here</ListItem>
            <ListItem>Cookie Settings</ListItem>
          </List>
        </Center>
        <Right>
          <Title>Contact</Title>
          <ContactItem>
            <Place style={{ marginRight: "10px" }} /> 323 Dr Martin Luther King
            Jr Blvd, Newark, NJ 07102
          </ContactItem>
          <ContactItem>
            <Phone style={{ marginRight: "10px" }} /> (234) 456-7890
          </ContactItem>
          <ContactItem>
            <Email style={{ marginRight: "10px" }} /> contact@taskmaster.com
          </ContactItem>
        </Right>
      </Container>
      <FooterSignature />
    </>
  );
};

export default Footer;
