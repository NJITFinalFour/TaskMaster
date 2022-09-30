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
flex-direction: column;
  background-color: #88bb44;
  /* position: fixed; */
  bottom: 0px;
  right: 0px;
  left: 0px;
  z-index: 1;

  ${mobile({})}
`;

const Wrapper = styled.div`
  display: flex;
  padding: 0px 15%;
  /* height: 14em; */
  /* position: fixed;
  left: 0px;
  right: 0px;
  bottom: 0px; */

  ${mobile({ flexDirection: "column", fontSize: "75%", padding: "0em" })}
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 2em;

  ${mobile({padding: "1em 2em 0em 2em", margin: "auto", flexDirection: "row"})}
`;

const Logo = styled.h1`
  ${mobile({ display: "none" })}
`;
const Desc = styled.p`
  margin: 1em 0em 2em 0em;

  ${mobile({ display: "none" })}
`;
const SocialContainer = styled.div`
  display: flex;

  ${mobile({ justifyContent: "end" })}
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

  ${mobile({ margin: "0em 0.8em" })}
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

  ${mobile({ display: "none" })}
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
        <Wrapper>
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
              <Place style={{ marginRight: "10px" }} /> 323 Dr Martin Luther
              King Jr Blvd, Newark, NJ 07102
            </ContactItem>
            <ContactItem>
              <Phone style={{ marginRight: "10px" }} /> (234) 456-7890
            </ContactItem>
            <ContactItem>
              <Email style={{ marginRight: "10px" }} /> contact@taskmaster.com
            </ContactItem>
          </Right>
        </Wrapper>
        <FooterSignature />
      </Container>
    </>
  );
};

export default Footer;
