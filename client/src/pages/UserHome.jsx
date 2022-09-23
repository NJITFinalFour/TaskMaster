import styled from "styled-components"
import { useAuthContext } from "../hooks/useAuthContext"
import { useEffect, useState } from "react"

const Container = styled.div`
  height: 100vh;
`

const UserHome = () => {
  const { user } = useAuthContext();
  const [isUserAdmin, setIsUserAdmin] = useState("")
  useEffect(() => {
 if (user.isAdmin) {
  setIsUserAdmin("You are a system ADMIN, Welcome to TaskMaster USA")
 } else {
  setIsUserAdmin("Welcome to TaskMasterUSA")
 }

  },[])
  return (
    <Container>
      <h2>{`Hello ${user.userFirstName} ${user.userLastName} from ${user.organization}`}</h2>
      <h5>{isUserAdmin}</h5>
  
    </Container>
  )
}

export default UserHome

