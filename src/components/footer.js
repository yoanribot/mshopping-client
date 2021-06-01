import React from 'react';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  footerWrapper: {
    padding: '10px',
    textAlign: 'center',
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
  },
}));

const Footer = () => {
  const classes = useStyles();

  return (
    <div className={classes.footerWrapper}>
      <p className={classes.disclaimer}>
        {`Copyright ${new Date().getFullYear()} - All Rigths Reserved @ Yoan Ribot`}
      </p>
    </div>
  );
};

export default Footer;
