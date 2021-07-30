import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import ProtectedRoute from './auth/protected-route';
import Profile from './views/profile';
import TestApi from './views/test-api';
import Post from './views/posts';
import ContactUs from './views/contact-us';
import WishList from './views/wishlist';
import { translate } from './services/i18n';

import Home from './views/home';
import Container from '@material-ui/core/Container';
import NavigationBar from './components/navigation-bar';

const useStyles = makeStyles((theme) => ({
  container: {
    position: 'relative',
    padding: 60,
    minHeight: 'calc(100vh - 193px)',
  },
}));

function AppUser() {
  const classes = useStyles();

  const appTabs = [
    {
      label: translate('Home'),
      url: '/',
    },
    {
      label: translate('Wishes'),
      url: '/wishlist',
      needLogging: true,
    },
    {
      label: translate('Contact us'),
      url: '/contact-us',
      needLogging: true,
    },
  ];

  return (
    <div id="app-user" className={classes.body}>
      <NavigationBar tabs={appTabs} />

      <Container className={classes.container}>
        <Switch>
          <Route path={'/'} exact component={Home} />
          <Route path={'/test'} component={TestApi} />
          <Route path={'/posts'} component={Post} />
          <ProtectedRoute path={'/wishlist'} component={WishList} />
          <ProtectedRoute path={'/contact-us'} component={ContactUs} />
          <ProtectedRoute path={'/profile'} component={Profile} />
          <Redirect to="/" />
        </Switch>
      </Container>
    </div>
  );
}

export default AppUser;
