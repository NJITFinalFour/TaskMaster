import Table from "react-bootstrap/Table";
import styled from "styled-components";
import { useAuthContext } from "../../hooks/useAuthContext";
import { taskFetchPath } from "../../api/fetchpaths";
import { useState, useEffect } from "react";
import {BiEdit} from "react-icons/bi"
import {RiDeleteBinLine} from "react-icons/ri"
import "./AdminTasksTable.css"
import EditTask from "./EditTask"

const Container = styled.div`
  margin: auto;
  /* width: 80%; */
`

const AdminTasksTable = () => {
    const { user } = useAuthContext();
    const [ tasks, setTasks ] = useState([]);
    const [editModalShow, setEditModalShow] = useState(false)
    const [taskID, setTaskID] = useState("")

    
// page load fetch all tasks to display
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

// Delete a task
const handleDelete = async (id) => {

    
    const response = await fetch(`${taskFetchPath}${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });

    if (response.ok) {
        setTasks(tasks.filter((task) => task._id !== id));
    }
  };




    return (
        <Container>
            <Table striped>
                <thead>
                    <tr>
                        <th>Assigned To</th>
                        <th>Priority</th>
                        <th>Task name</th>
                        <th>Notes</th>
                        <th>Completed?</th>
                        <th>Edit Task</th>
                        <th>Delete Task</th>
                    </tr>
                </thead>
                <tbody>
                    {tasks.map(task => {
                        return (
                            <tr key={task._id}>
                                <td>
                                    {task.user_id}
                                </td>
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
                                <td>
                                    <BiEdit   className="editButton" onClick={() => {setEditModalShow(true); console.log(`here ${task._id}`)}} />
                                    <EditTask task={task}
                                     show={editModalShow}
                                    onHide={() => setEditModalShow(false)}
        />
                                </td>
                                <td>
                                    <RiDeleteBinLine className="deleteButton"  onClick={() => { handleDelete(task._id)}}/>
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
