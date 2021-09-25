import { BrowserRouter, Switch, Route, NavLink} from "react-router-dom";
import { useState, useEffect } from "react";

import Login from "./components_login/Login";
import { Forgot } from "./components_login/Forgot";
import PublicRoute from "./utils/PublicRoute";
import PrivateRoute from "./utils/PrivateRoute";
import { getToken, removeUserSession, setUserSession } from "./utils/Common";
import axios from "axios";

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
          <NavLink activeClassName="active" to="/login">Login</NavLink>
        </div>
        <div className = "content">
          <Switch>
            <PublicRoute path="/login" component={Login} />
            <PublicRoute path="/forgot" component={Forgot}/>
            <PrivateRoute path="/dashboard" component={Dashboard} />
          </Switch>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
