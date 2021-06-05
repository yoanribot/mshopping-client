import React, { memo, useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { Context as UserContext } from '../context/user';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

const useStyles = makeStyles((theme) => ({
  userLabel: {
    marginLeft: 10,
    color: 'white',
  },
}));

const UserMenu = memo(({ isAdmin, onLogout }) => {
  const history = useHistory();
  const classes = useStyles();

  const [anchorEl, setAnchorEl] = useState(null);
  const { currentUser } = useContext(UserContext);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const goToProfile = () => {
    history.push('/profile');
    setAnchorEl(null);
  };

  const goToAdminSpace = () => {
    history.push('/manage');
    setAnchorEl(null);
  };

  const _onLogout = () => {
    setAnchorEl(null);
    onLogout();
  };

  const handleClose = () => setAnchorEl(null);

  return (
    <div>
      <Button
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        <Avatar src="/broken-image.jpg" />
        <p className={classes.userLabel}> {currentUser.name} </p>
      </Button>
      <Menu
        id="simple-menu"
        className={classes.userMenuWrapper}
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={goToProfile}>Profile</MenuItem>
        {isAdmin && <MenuItem onClick={goToAdminSpace}>Admin Space</MenuItem>}
        <MenuItem onClick={_onLogout}>Logout</MenuItem>
      </Menu>
    </div>
  );
});

UserMenu.propTypes = {
  onLogout: PropTypes.func,
};

UserMenu.defaultProps = {};

export default UserMenu;
