import React from 'react'
import { useState } from 'react'
import axios from 'axios';

export const EditableCell = ({polltime, row}) => {
    const [cur, setCur] = useState(polltime);

    const onChange = (e) =>  {
        setCur(e.target.value)
    }

    const onSubmit = (e) => {
        e.preventDefault();
        axios.post("http://localhost:3000/change_polltime", {
            code: row.values["code"],
            new_polltime: parseInt(cur)
        }).then(response => {
                alert("The profile has been changed")
            }).catch(error => {
                alert("Could not change the profile")
            }
        )
    }

    return (
        <form onSubmit = {(e) => onSubmit(e)}>
            <input type = "text" value = {cur} onChange = {(e) => onChange(e)}/>
            <input type = "submit" value = "Submit"/>
        </form>
    )
}

export default EditableCell
