import React from 'react';
import maintenance from 'assets/img/maintenance.jpg';

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
    background: `url(${maintenance}) center / contain no-repeat`,
  },
}));

const Page503 = () => {
  const classes = useStyles();
  return (
    <div>
      <h2 className={classes.defaultPagesTitle}> 403 Maintenance </h2>
      <div className={classes.bg}></div>
    </div>
  );
};

export default Page503;
