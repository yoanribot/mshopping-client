import React from "react";
import { Route, Switch } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import './App.css';
import ProtectedRoute from "./auth/protected-route";
import Home from './views/home';
import Profile from './views/profile';
import ExternalApi from './views/external-api';
import CircularProgress from '@material-ui/core/CircularProgress';
import Header from './components/header'

function App() {
  const { isLoading } = useAuth0();

  if (isLoading) {
    return <CircularProgress />;
  }

  return (
    <div id="app" className="d-flex flex-column h-100">
      <Header />
      <div className="container flex-grow-1">
        <Switch>
          <Route path="/" exact component={Home} />
          <ProtectedRoute path="/profile" component={Profile} />
          <Route path="/test" component={ExternalApi} />
        </Switch>
      </div>
    </div>
  );
}

export default App;
