import React from 'react'
import ReadaOnlyRow from './ReadaOnlyRow'
import EditRow from './EditRow'
import { Fragment } from 'react'
import { useState } from 'react'
import axios from "axios";


export const UserTable = ({ users, setUsers }) => {
    const[editUserId, setEditUserId] = useState(null);
    const[editFormData, setEditFormData] = useState({
        name: "",
        email: "",
        user_role: ""
    });

      //Fetch data from backend
    const fetchEditUser = async (user) => {
      const res = await fetch("http://localhost:3000/edit_user", {
        method: "POST",
        headers: {
          "Content-type" : "application/json"
        },
        body: JSON.stringify(user)
      })
      const data = await res.json()
      return data
    }

    const handleEditFormChange = (event) => {
        event.preventDefault();
        const fieldname = event.target.getAttribute("name");
        const fieldValue = event.target.value;

        const newFormData = {
            ...editFormData
        };
        newFormData[fieldname] = fieldValue;
        newFormData["id"] = editUserId;
        setEditFormData(newFormData)

    }

    const handleEditClick = (event, user) => {
        event.preventDefault();
        setEditUserId(user.id)
        const formValues = {
            id: editUserId,
            name: user.name,
            email: user.emailaddr,
            user_role: user.user_role
        };

        setEditFormData(formValues);
    };

    const handleSaveClick = async (event) => {
        event.preventDefault()
        const editedUser = {
            id: editUserId,
            name: editFormData.name,
            email: editFormData.email,
            user_role: editFormData.user_role 
        }
        const res = await fetchEditUser(editedUser);
        const newUsers = [...users];
        const index = users.findIndex((user) => 
            user.id === res.id);
        res.user_role = res.user_role === true ? "admin" : "non-admin";
        newUsers[index] = res
        setUsers(newUsers);
        setEditUserId(null);
    } 

    const handleCancelClick = (event) => {
        event.preventDefault();
        setEditUserId(null);
    }

    return (
        <div className = 'user-table'>
            <br/>
            <form>
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Created At</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <Fragment>
                                {editUserId === user.id ? 
                                    (<EditRow 
                                        user = {user}
                                        editFormData = {editFormData}
                                        handleEditFormChange = {handleEditFormChange}
                                        handleSaveClick = {handleSaveClick}
                                        handleCancelClick = {handleCancelClick}
                                    />) : 
                                        (<ReadaOnlyRow 
                                            user = {user} 
                                            handleEditClick = {handleEditClick}/>
                                        )
                                }
                            </Fragment>
                        ))}
                    </tbody>
                </table>
            </form>
            
        </div>
    )
}
