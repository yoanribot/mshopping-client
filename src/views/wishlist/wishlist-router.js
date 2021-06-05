import React, { memo } from 'react';
import { Route, Switch, Redirect, useRouteMatch } from 'react-router-dom';

import WishList from './wishlist';
import WishListDetails from './wishlist-details';

const Wishes = memo(() => {
  let match = useRouteMatch();

  return (
    <Switch>
      <Route path={`${match.path}/`} exact={true} component={WishList} />
      <Route
        exact={true}
        path={`${match.path}/:wishId`}
        component={WishListDetails}
      />
      <Redirect from={`${match.path}`} to={`${match.path}/`} />
    </Switch>
  );
});

export default Wishes;
