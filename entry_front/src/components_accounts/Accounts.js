// import { TablePagination } from 'react-pagination-table';
import { useState, useEffect } from 'react';
import axios from 'axios';
import AccountTable from './AccountTable';




const Accounts = () => {
    const [accounts, setAccounts] = useState([]);

    //Fetch the Accounds/Devices from the Backend
    useEffect(() => {
        axios.get("http://localhost:3000/devices")
            .then(response => {
                    for (let [i, v] of response.data.entries()) {
                        if (v.device_state === false) {
                            response.data[i].device_state = "offline"
                        } else {
                            response.data[i].device_state = "online"
                        }
                    }
                    setAccounts(response.data)
                }).catch(error => {
                    console.log("Could not get events from the backend.")
                })
            }, 
        []);

    

    return (
        <div className = "Accounts Page">

            { accounts.length > 0 ?
                <div className = "account-table">
                    <AccountTable 
                        accounts = {accounts}
                    />
                </div>
                : "No Devices in the Database"
            }        
        </div>
    )
}

export default Accounts
