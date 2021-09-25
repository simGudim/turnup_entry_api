import React from 'react'

export const EditRow = ({ user, editFormData, handleEditFormChange, handleSaveClick, handleCancelClick }) => {
    return (
        <tr>
            <td>{user.id}</td>
            <td>
                    <input
                        type = "text"
                        required = 'required'
                        placeholder = "Enter an Name"
                        name = "name"
                        value = {editFormData.name}
                        onChange = {handleEditFormChange}
                    />
            </td>
            <td>
                    <input
                        type = "email"
                        required = 'required'
                        placeholder = "Enter an email"
                        name = "email"
                        value = {editFormData.email}
                        onChange = {handleEditFormChange}
                    />
            </td>
            <td>
                    <input
                        type = "text"
                        required = 'required'
                        placeholder = "Enter a role"
                        name = "user_role"
                        value = {editFormData.user_role}
                        onChange = {handleEditFormChange}
                    />
            </td>
            <td>
                <button type = "submit" onClick = {(event) => handleSaveClick(event)}>Save
                </button><button type = "submit" onClick = {(event) => handleCancelClick(event)}>Cancel</button>
            </td>
        </tr>
    )
}

export default EditRow
