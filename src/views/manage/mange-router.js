import React from 'react';
import { Route, Switch, Redirect, useRouteMatch } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { translate } from '../../services/i18n';
import Overview from './overview';
import Wishes from './wishes';
import WishDetail from './wishes/wish-detail';

import Container from '@material-ui/core/Container';
import NavigationBar from '../../components/navigation-bar';

const useStyles = makeStyles((theme) => ({
  container: {
    position: 'relative',
    padding: 60,
    minHeight: 'calc(100vh - 193px)',
  },
}));

function Manage() {
  const classes = useStyles();
  let match = useRouteMatch();
  const appTabs = [
    {
      label: translate('Overview'),
      url: '/manage',
    },
    {
      label: translate('Wishes'),
      url: '/manage/wish',
    },
  ];

  return (
    <div id="app-admin" className={classes.body}>
      <NavigationBar tabs={appTabs} />

      <Container className={classes.container}>
        <Switch>
          <Route path={`${match.path}`} exact component={Overview} />
          <Route path={`${match.path}/wish`} exact component={Wishes} />
          <Route path={`${match.path}/wish/:wishId`} component={WishDetail} />
          <Redirect to="/" />
        </Switch>
      </Container>
    </div>
  );
}

export default Manage;
