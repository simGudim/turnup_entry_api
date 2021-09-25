import { removeUserSession, getUser } from "../utils/Common"
import { useState, useEffect } from "react";
import Header from "./Header";
import AddTask from "./AddTask";
import { UserTable } from "./UserTable";

const Dashboard = (props) => {
    const [showAddTask, setShowAddTask] = useState(false)
    const [users, setUsers] = useState([])
    const user = getUser();

    useEffect(() => {
        const getUsers = async () => {
          const usersFromServer = await fetchUsers()
          if (usersFromServer.length > 0) {
              for(let i = 0; i < usersFromServer.length; i++) {
                if (usersFromServer[i].user_role === true) {
                    usersFromServer[i].user_role = "admin"
                } else {
                    usersFromServer[i].user_role = "non-admin"
                }
              }
          }
          setUsers(usersFromServer)
        }
        getUsers()
      }, [])

    //Fetch data from backend
    const fetchUsers = async () => {
        const res = await fetch('http://localhost:3000/users')
        const data = await res.json()
        return data
    }

    //Fetch data from backend
    const fetchUser = async (id) => {
      const res = await fetch(`http://localhost:3000/user/${id}`)
      const data = await res.json()
      return data
    }

    //Add Task
    const addUser = async (user) => {
        const res = await fetch("http://localhost:3000/register", {
        method: "POST",
        headers: {
            "Content-type" : "application/json"
        },
            body: JSON.stringify(user)
        })
        const data = await res.json();
        setUsers([...users, data])


    }

    //Delete taks
    const deleteUser = async (id) => {
        await fetch(`http://localhost:3000/tasks/${id}`, {
            method: 'DELETE'
        })
        setUsers(users.filter((user) => user.id !== id))
    };

    const handleLogout = () => {
        removeUserSession();
        props.history.push("/login")
    };

    return (
        <div>
            <Header onAdd = {() => setShowAddTask(!showAddTask)}
                showAdd = {showAddTask}
            />
            {showAddTask && <AddTask onAdd = {addUser}/>}
            { users.length > 0 ?
                <UserTable 
                    users = {users}
                    setUsers = {setUsers}
                />
                : "No users in the database"
            }
            <br/>
            <br/>
            <input
                type = "button"
                value = "Logout"
                onClick = {handleLogout}
            />
        </div>
    )
}

export default Dashboard
