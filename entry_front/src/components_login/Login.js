import { useState} from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { setUserSession } from "../utils/Common";

const Login = (props) => {
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = () => {
        setError(null);
        setLoading(true);
            
        axios.post("http://localhost:3000/users/signin", {
            username: username,
            password: password
        })
        .then(response => {
            setLoading(false);
            setUserSession(response.data.token, response.data.user);
            props.history.push("/dashboard")
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
        <div>
            Login <br /> <br />
            <div>
                Username<br/>
                <input
                    type = "text"
                    value = {username}
                    onChange = {(e) => setUsername(e.target.value)}
                />
            </div>
            <div>
                Password<br/>
                <input
                    type = "password"
                    value = {password}
                    onChange = {(e) => setPassword(e.target.value)}
                />
            </div><br />
            {error && <div className = "error">{error}</div>}
            <input
                type = "button"
                value = {loading ? "Loading..." : "Login"}
                disabled = {loading}
                onClick = {handleLogin}
            />
            <p className = "forgot-password">
                <Link to = {"/forgot"}>Forgot Password?</Link>
            </p>
        </div>
    )
}

export default Login
