import React from 'react'
import { useState } from 'react'

export const ReadaOnlyRow = ({ user, handleEditClick }) => {
    return (
            <tr>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.emailaddr}</td>
                <td>{user.user_role}</td>
                <td>{user.created_at}</td>
                <td>
                    <button type = "submit" onClick = {(event) => handleEditClick(event, user)}>Edit</button>
                    <button type = "submit">Delete</button>
                </td>

        </tr>
    )
}

export default ReadaOnlyRow
