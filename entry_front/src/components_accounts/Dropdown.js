import React, { useEffect } from 'react'
import { useState } from 'react'
import axios from 'axios';

export const Dropdown = ({profile, row}) => {
    const profile_choice = [1,2,3,4,5]
    const [cur, setCur] = useState(profile)

    const handleChange = async (e) => {
        setCur(e.target.value)
    }

    const submitProile = (e) => {
        e.preventDefault();
        axios.post("http://localhost:3000/change_profile", {
            profile: parseInt(cur),
            panelserial: row.values["panelserial"],
            serial: row.values["serial"]
        }).then(response => {
                row.values["profile"] = response.data["profile"]
                alert("The profile has been changed")
            }).catch(error => {
                alert("Could not change the profile")
            }
        )
    }


    return (
        <form onSubmit = {(e) => submitProile(e)}>
            <select id = 'dropdown' onChange = {(e) => handleChange(e)}>
                {profile_choice.map((elem) => {
                    if (elem === cur) {
                        return <option value = {cur} selected = "selected">{cur}</option>
                    } else {
                        return <option value = {elem}>{elem}</option>
                    }
                })}
            </select>
            <input type = "submit" value = "Submit"></input>
        </form>
    )
}

export default Dropdown;
