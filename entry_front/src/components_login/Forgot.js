import {useState} from 'react'
import axios from "axios";

export const Forgot = (props) => {
    const [email, setEmail] = useState("");
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const sendEmail = () => {
        setError(null);
        setLoading(true);
        
        axios.post("http://localhost:3000/forgotpass", {
            email: email
        })
        .then(response => {
            setLoading(false)
            props.history.push("/login")
        }).catch(error => {
            setLoading(false);
            console.log("error >>> ", error);
            if(error.response.status === 401 || error.response.status === 400) {
                setError(error.response.data.message);
            } else {
                setError("Something went wrong. Please try again.");
            }
        });
    }
    return (
       <form className = "forgot-password-form">
           <h3>Forgot Password</h3>

           <div className = "login-form">
               <label>Email</label>
               <input 
                    type = "email" 
                    className = "form-control" 
                    placeholder = "Email"
                    onChange = {(e) => setEmail(e.target.value)}
                />
            {error && <div className = "error">{error}</div>}
            <input
                type = "button"
                value = {loading ? "Loading..." : "Login"}
                disabled = {loading}
                onClick = {sendEmail}
            />
           </div>
       </form>
    )
}

export default Forgot;
