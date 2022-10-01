// import { useState, useEffect } from "react";
// import { fetchUserName } from "../api/fetchpaths";
// import { useAuthContext } from "../hooks/useAuthContext";

// const OrgName = () => {
//     const { user } = useAuthContext();
//     const [ orgName, setOrgName ] = useState(null);

    

//     useEffect(() => {
//         const fetchUserName = async (id) => {
//             const res = await fetch(`${orgFetchPath}/${user.organization}`, {
//                 method: "GET",
//                 mode: "cors"
//             })
//             let data = await res.json()
//             setOrgName(data.name)
//         }
//         fetchOrgName()
//     }, [user.organization])

//     return (
//         <>
//             {orgName}
//         </>
//     )
// };

// export default OrgName