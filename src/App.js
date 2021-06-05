import React, { useEffect } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import { makeStyles } from '@material-ui/core/styles';
import ProtectedRoute from './auth/protected-route';
import Admin from './app-admin';
import User from './app-user';

import './App.css';
import CircularProgress from '@material-ui/core/CircularProgress';
import Header from './components/header';
import Footer from './components/footer';
import { roles } from './app-constants';
import initHttpInterceptor from './app-http-interceptor';

const useStyles = makeStyles((theme) => ({
  container: {
    position: 'relative',
    padding: 60,
    minHeight: 'calc(100vh - 193px)',
  },
}));

function App() {
  const { isLoading, isAuthenticated, getAccessTokenSilently } = useAuth0();
  const classes = useStyles();

  useEffect(() => {
    // Add a request interceptor
    isAuthenticated && initHttpInterceptor(getAccessTokenSilently);
  }, [isAuthenticated, getAccessTokenSilently]);

  if (isLoading) {
    return <CircularProgress />;
  }

  return (
    <div id="app" className={classes.body}>
      <Header />

      <Switch>
        <ProtectedRoute
          roles={[roles.ADMIN]}
          path="/manage"
          component={Admin}
        />
        <Route path="/" component={User} />
        <Redirect to="/" />
      </Switch>

      <Footer />
    </div>
  );
}

export default App;
