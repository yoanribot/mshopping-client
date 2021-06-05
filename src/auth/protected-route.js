import React from 'react';
import { Route } from 'react-router-dom';
import { withAuthenticationRequired, useAuth0 } from '@auth0/auth0-react';
import CircularProgress from '@material-ui/core/CircularProgress';
import Page403 from '../views/default/403';

const ProtectedRoute = ({ component, roles, ...args }) => {
  const { user, isAuthenticated } = useAuth0();

  const userRole = !!user && user[process.env.REACT_APP_ROLE_PATH];

  return roles.length > 0 ? (
    roles.includes(userRole) && isAuthenticated ? (
      <Route component={component} {...args} />
    ) : (
      <Page403 />
    )
  ) : (
    <Route
      component={withAuthenticationRequired(component, {
        onRedirecting: () => <CircularProgress />,
      })}
      {...args}
    />
  );
};

ProtectedRoute.defaultProps = {
  roles: [],
};

export default ProtectedRoute;
