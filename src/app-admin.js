import React from 'react';
import { Route, Switch, Redirect, useRouteMatch } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Manage from './views/manage';
import Wishes from './views/manage/wishes';
import { translate } from './services/i18n';

import Container from '@material-ui/core/Container';
import NavigationBar from './components/navigation-bar';

const useStyles = makeStyles((theme) => ({
  container: {
    position: 'relative',
    padding: 60,
    minHeight: 'calc(100vh - 193px)',
  },
}));

function App() {
  const classes = useStyles();
  let match = useRouteMatch();
  const appTabs = [
    {
      label: translate('Overview'),
      url: '/manage',
    },
    {
      label: translate('Wishes'),
      url: '/manage/wishes',
    },
  ];

  return (
    <div id="app-admin" className={classes.body}>
      <NavigationBar tabs={appTabs} />

      <Container className={classes.container}>
        <Switch>
          <Route path={`${match.path}/`} exact={true} component={Manage} />
          <Route path={`${match.path}/wishes`} component={Wishes} />
          <Redirect to="/" />
        </Switch>
      </Container>
    </div>
  );
}

export default App;
