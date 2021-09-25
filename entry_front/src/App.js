import { BrowserRouter, Switch, Route, NavLink} from "react-router-dom";
import { useState, useEffect } from "react";

import Home from "./components_login/Home";
import Login from "./components_login/Login";
import Dashboard from "./components_dashboard/Dashboard";
import Events from "./components_events/Events";
import { Forgot } from "./components_login/Forgot";
import PublicRoute from "./utils/PublicRoute";
import PrivateRoute from "./utils/PrivateRoute";
import { getToken, removeUserSession, setUserSession } from "./utils/Common";
import axios from "axios";
import Accounts from "./components_accounts/Accounts";
import SecurityProfiles from "./components_security/SecurityProfiles";

function App() {
  const [authLoding, setAuthLoading] = useState(true);
  useEffect(() => {
    const token = getToken();
    if(!token) {
      return;
    } else {
      axios.post("http://localhost:3000/verifyToken", {
        token: token
    }).then(response => {
          setUserSession(response.data.token, response.data.user);
          setAuthLoading(false);
        }).catch(error => {
          removeUserSession();
          setAuthLoading(false);
        })
    }
  }, []);

  if(authLoding && getToken()) {
    return <div className = "content">
      Checking Authentication...
    </div>
  }
  return (
    <div className="App">
      <BrowserRouter >
        <div className = "header">
          <NavLink exact activeClassName="active" to="/">Home</NavLink>
          <NavLink activeClassName="active" to="/login">Login</NavLink>
          <NavLink activeClassName="active" to="/dashboard">Configuration</NavLink>
          <NavLink activeClassName="active" to="/events">Events</NavLink>
          <NavLink activeClassName="active" to="/accounts">Accounts</NavLink>
          <NavLink activeClassName="active" to="/security_profiles">Security Profiles</NavLink>
        </div>
        <div className = "content">
          <Switch>
            <Route exact path="/" component={Home} />
            <PublicRoute path="/login" component={Login} />
            <PublicRoute path="/forgot" component={Forgot}/>
            <PrivateRoute path="/dashboard" component={Dashboard} />
            <PrivateRoute path="/events" component={Events} />
            <PrivateRoute path="/accounts" component={Accounts} />
            <PrivateRoute path="/security_profiles" component={SecurityProfiles} />
          </Switch>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
