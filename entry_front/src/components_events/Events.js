import { useState, useEffect } from 'react';
import axios from 'axios';
import {CSVLink} from "react-csv";
import EventsTable from './EventsTable';


const Events = () => {
    const [events, setEvents] = useState([]);
    const [headers, setHeaders] = useState([
        {key: "id", label: "#"},
        {key: "created_at", label : "Date and Time"},
        {key: "acnt", label: "Account #"},
        {key: "cid", label: "Event CID"},
        {key: "user_id", label: "User/Zone"}
    ]); 

    //Fetch the Events from the Backend
    useEffect(() => {
        axios.get("http://localhost:3000/all/events")
        .then(response => {
                setEvents(response.data)
            }).catch(error => {
                console.log("Could not get events from the backend.")
            })
        }, []);

    // Create a link for CSV Export
    const csvReport = {
        filename: "Events Report",
        headers: headers,
        data: events
    };

    return (
        <div className = "Event Page">
            <h2>Events</h2>
            <div className = "import-btn">
                <CSVLink {...csvReport}>Export to CSV</CSVLink>
            </div>
            { events.length > 0 ?
                <div className = "event-table">
                    <EventsTable
                        events = {events}
                    />
                </div>
                : "No Events in the Database. All reported to the CMS."
            }
        </div>
    )
}

export default Events