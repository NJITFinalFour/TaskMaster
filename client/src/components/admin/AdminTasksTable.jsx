import Table from "react-bootstrap/Table";
import styled from "styled-components";
import { useAuthContext } from "../../hooks/useAuthContext";
import { taskFetchPath } from "../../api/fetchpaths";
import { useState, useEffect } from "react";

const Container = styled.div`
  margin: auto;
  /* width: 80%; */
`

const AdminTasksTable = () => {
    const { user } = useAuthContext();

    const [ tasks, setTasks ] = useState([]);

    

    useEffect(() => {
        const fetchTasks = async () => {
            const res = await fetch(`${taskFetchPath}/organization/${user.organization}`, {
                method: "GET",
                mode: "cors"
            })
            let data = await res.json()
            setTasks(data)
        }

        fetchTasks()
    }, [user.organization])

    return (
        <Container>
            <Table striped>
                <thead>
                    <tr>
                        <th>Priority</th>
                        <th>Task name</th>
                        <th>Notes</th>
                        <th>Completed?</th>
                    </tr>
                </thead>
                <tbody>
                    {tasks.map(task => {
                        return (
                            <tr key={task._id}>
                                <td>
                                    {task.priority}
                                </td>
                                <td>
                                    {task.taskName}
                                </td>
                                <td>
                                    {task.notes}
                                </td>
                                <td>
                                    {task.isComplete}
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </Table>
        </Container>
    );
};

export default AdminTasksTable
