import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useHistory } from 'react-router-dom';
import { changeLanguage } from '../services/i18n';

import { roles } from '../app-constants';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import UserMenu from './user-menu';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { translate } from 'services/i18n';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  languageWrapper: {
    marginRight: 10,
    color: 'white',
  },
  languageSelection: {
    marginLeft: 10,
    marginRight: 10,
    color: 'white',
    '&:before': {
      borderBottom: '1px solid transparent',
    },
  },
  selectIcon: {
    fill: 'white',
  },
}));

export default function Header() {
  const classes = useStyles();
  const history = useHistory();
  const { loginWithRedirect, logout, user, isAuthenticated } = useAuth0();
  const userRole = !!user && user[process.env.REACT_APP_ROLE_PATH];

  const login = () => loginWithRedirect();
  const singup = async () => {
    await loginWithRedirect({
      screen_hint: 'signup',
    });
  };
  const _logout = () =>
    logout({
      returnTo: window.location.origin,
    });

  const _changeLanguage = (e) => changeLanguage(e.target.value);

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
            onClick={() => history.push('/')}
          >
            <SupervisorAccountIcon />
          </IconButton>
          <Typography
            variant="h6"
            className={classes.title}
            style={{ cursor: 'pointer' }}
            onClick={() => history.push('/')}
          >
            iTeam
          </Typography>
          <p>
            ( Language: {localStorage.getItem('language')} /{' '}
            {translate('hello')}){' '}
          </p>
          <FormControl className={classes.languageWrapper}>
            <Select
              className={classes.languageSelection}
              value={localStorage.getItem('language')}
              onChange={_changeLanguage}
              inputProps={{
                classes: {
                  icon: classes.selectIcon,
                },
              }}
            >
              <MenuItem value={'en'}>EN</MenuItem>
              <MenuItem value={'es'}>ES</MenuItem>
              <MenuItem value={'fr'}>FR</MenuItem>
            </Select>
          </FormControl>
          {!isAuthenticated && (
            <Button color="inherit" onClick={singup}>
              Signup
            </Button>
          )}
          {!isAuthenticated ? (
            <Button color="inherit" onClick={login}>
              Login
            </Button>
          ) : (
            <UserMenu
              onLogout={_logout}
              isAdmin={isAuthenticated && userRole === roles.ADMIN}
            />
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
}
