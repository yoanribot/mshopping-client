import React from 'react';
import notfound from 'assets/img/404-error-page-found.jpg';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  defaultPagesTitle: {
    textAlign: 'center',
    fontSize: '60px',
    fontWeight: '400',
    marginTop: 0,
    marginBottom: 5,
  },
  bg: {
    height: 'calc(100vh - 223px)',
    background: `url(${notfound}) center / contain no-repeat`,
  },
}));

const Page404 = () => {
  const classes = useStyles();
  return (
    <div>
      <h2 className={classes.defaultPagesTitle}> 404 Not Found </h2>
      <div className={classes.bg}></div>
    </div>
  );
};

export default Page404;
