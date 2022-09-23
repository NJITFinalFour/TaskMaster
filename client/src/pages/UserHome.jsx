import styled from "styled-components"
import { useAuthContext } from "../hooks/useAuthContext"

const Container = styled.div`
  height: 100vh;
`

const UserHome = () => {
  const {...user} = useAuthContext;

  return (
    <Container>
      {`Hello ${user.userFirstName}`}
    </Container>
  )
}

export default UserHome

