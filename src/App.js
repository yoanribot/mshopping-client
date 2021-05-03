import React, { useEffect } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { makeStyles } from '@material-ui/core/styles';
import ProtectedRoute from "./auth/protected-route";
import Profile from './views/profile';
import TestApi from './views/test-api';
import Post from './views/posts';
import Manage from './views/manage';
import ContactUs from './views/contact-us';
import WishList from './views/wishlist';

import Home from './views/home';
import'./App.css'
import CircularProgress from '@material-ui/core/CircularProgress';
import Container from '@material-ui/core/Container';
import Header from './components/header';
import NavigationBar from './components/navigation-bar';
import { roles } from './app-constants';
import initHttpInterceptor from './app-http-interceptor';
import { translate } from './services/i18n';

const useStyles = makeStyles((theme) => ({
  container: {
    padding: 60,
  },
}));

const appTabs = [
  {
    label: 'Home',
    url: '/',
  },
  {
    label: 'Test',
    url: '/test',
  },
  {
    label: 'Posts',
    url: '/posts',
  },
  {
    label: 'Wishes',
    url: '/wishlist',
    needLogging: true,
  },
  {
    label: 'Contact us',
    url: '/contact-us',
    needLogging: true,
  },
];

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
        <NavigationBar tabs={appTabs} />

        <p>{translate('hello')}</p>

        <Container className={classes.container}>
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/test" component={TestApi} />
            <Route path="/posts" component={Post} />
            <ProtectedRoute path="/wishlist" component={WishList} />
            <ProtectedRoute path="/contact-us" component={ContactUs} />
            <ProtectedRoute path="/profile" component={Profile} />
            <ProtectedRoute roles={[roles.ADMIN]} path="/manage" component={Manage} />
            <Redirect to='/' />
          </Switch>
        </Container>
      </div>
  );
}

export default App;
