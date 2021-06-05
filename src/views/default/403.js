import React from 'react';
import accessDenied from 'assets/img/access-denied.jpg';

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
    background: `url(${accessDenied}) center / contain no-repeat`,
  },
}));

const Page403 = () => {
  const classes = useStyles();
  return (
    <div>
      <h2 className={classes.defaultPagesTitle}> 403 Access Denied </h2>
      <div className={classes.bg}></div>
    </div>
  );
};

export default Page403;
