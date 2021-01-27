import React from "react";
import { Route, Switch } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import './App.css';
import ProtectedRoute from "./auth/protected-route";
import Home from './views/home';
import Profile from './views/profile';
import TestApi from './views/test-api';
import Manage from './views/manage';
import CircularProgress from '@material-ui/core/CircularProgress';
import Header from './components/header';
import { roles } from './app-constants';

function App() {
  const { isLoading } = useAuth0();

  console.log('isLoading', isLoading);

  if (isLoading) {
    return <CircularProgress />;
  }

  return (
      <div id="app" className="d-flex flex-column h-100">
        <Header />
        <div className="container flex-grow-1">
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/test" component={TestApi} />
            <ProtectedRoute path="/profile" component={Profile} />
            <ProtectedRoute roles={[roles.ADMIN]} path="/manage" component={Manage} />
          </Switch>
        </div>
      </div>
  );
}

export default App;
