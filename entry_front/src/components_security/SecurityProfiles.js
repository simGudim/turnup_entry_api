import React from 'react'
import { useState, useEffect } from 'react';
import axios from 'axios';
import ProfileTable from './ProfileTable';

export const SecurityProfiles = () => {
    const [profiles, setProfiles] = useState([]);
    const [breakdown, setBreakdown] = useState([]);

    //Fill the missing counts with zeros
    const fillProfile = (profiles, breakdown) => {
        for (let j = 0; j < breakdown.length; j++) {
            for (let i = 0; i < profiles.length; i ++) {
                if (profiles[i]["code"] === breakdown[j]["profile"]) {
                    profiles[i]["counts"] = breakdown[j]["profile_counts"];
                }
            }
        }
        
        for (let i = 0; i < profiles.length; i ++) {
            if (!("counts" in profiles[i])) {
                profiles[i]["counts"] = 0;
            }
        }
        return profiles
    }
    

    //Fetch the Profilesfrom the Backend
    useEffect(() => {
        axios.get("http://localhost:3000/security_profiles")
            .then(response => {
                setProfiles(response.data)
            }).catch(error => {
                alert("Could not get profiles from the backend.")
            })
        }, 
    []);
    
    // Fetch Counts of Devices per Profile
    useEffect(() => {
        axios.get("http://localhost:3000/profile_breakdown")
            .then(response => {
                setBreakdown(response.data)
            }).catch(error => {
                console.log("Could not get profile breakdowns from the backend.")
            })
        },
    []);

    fillProfile(profiles, breakdown)
    // setProfiles(profiles)
    console.log(profiles)
    return (
        <div className = "Accounts Page">
            { profiles.length > 0 ?
                <div className = "account-table">
                    <ProfileTable 
                        profiles = { profiles }
                    />
                </div>
                : "No Devices in the Database"
            }        
        </div>
    )
}

export default SecurityProfiles;
