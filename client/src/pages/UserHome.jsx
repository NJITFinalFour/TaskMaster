import { useAuthContext } from "../hooks/useAuthContext";
import AdminHome from "../components/admin/AdminHome";
import NormalUserHome from "../components/user/NormalUserHome";


const UserHome = () => {
  const { user } = useAuthContext();
    
  if (user.isAdmin) {
  return (
    <>
      <AdminHome/>
    </>
    )
  } else {
    return(
      <>
        <NormalUserHome/>
      </>
  )}
};

export default UserHome;