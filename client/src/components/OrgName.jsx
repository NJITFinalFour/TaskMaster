import { useState, useEffect } from "react";
import { orgFetchPath } from "../api/fetchpaths";

const OrgName = (props) => {
    const user = props.user
    const [ orgName, setOrgName ] = useState(null);

    const fetchOrgName = async () => {
        const res = await fetch(`${orgFetchPath}/${user.organization}`, {
            method: "GET",
            mode: "cors"
        })
        let data = await res.json()
        setOrgName(data.name)
    }

    useEffect(() => {
        fetchOrgName()
    }, [])

    return (
        <>
            {orgName}
        </>
    )
};

export default OrgName