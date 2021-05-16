import React, { memo } from 'react';
import { Route, Switch, Redirect, useRouteMatch } from 'react-router-dom';

import PostsList from './posts-list';
import PostForm from './post-form';
import Post from './post';

const Posts = memo(() => {
  let match = useRouteMatch();

  return (
    <Switch>
      <Route path={`${match.path}/`} exact={true} component={PostsList} />
      <Route exact={true} path={`${match.path}/new`} component={PostForm} />
      <Route path={`${match.path}/:id`} exact={true} component={Post} />
      <Redirect from={`${match.path}`} to={`${match.path}/`} />
    </Switch>
  );
});

export default Posts;
