import React from "react";
import { AuthRoute, ProtectedRoute } from "../util/routeUtil";
import { Switch } from "react-router-dom";
import NavBarContainer from "./NavBar/NavBar";

import MainPage from "./main/main_page";
import LoginFormContainer from "./session/loginFormContainer";
import SignupFormContainer from "./session/signupFormContainer";

const App = () => (
  <div>
    <NavBarContainer />
    <Switch>
      <AuthRoute exact path="/" component={MainPage} />
      <AuthRoute exact path="/login" component={LoginFormContainer} />
      <AuthRoute exact path="/signup" component={SignupFormContainer} />
    </Switch>
  </div>
);

export default App;
