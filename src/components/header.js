import React from 'react';
import { useAuth0 } from "@auth0/auth0-react";

import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import UserMenu from './user-menu';

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
}));

export default function Header() {
	const classes = useStyles();
	const { loginWithRedirect, logout, isAuthenticated } = useAuth0();

	const login = () => loginWithRedirect();
	const singup = async () => {
		await loginWithRedirect({
			screen_hint: "signup",
		});
	}
	const _logout = () => logout({
		returnTo: window.location.origin,
	})

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <SupervisorAccountIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            iTeam
          </Typography>
          {!isAuthenticated && (
						<Button
							color="inherit"
							onClick={singup}
						>
							Signup
						</Button>
					)}
					{!isAuthenticated
						?(<Button
							color="inherit"
							onClick={login}
						>
							Login
						</Button>)
						: (
							<UserMenu
								onLogout={_logout}
							/>
						)
					}
        </Toolbar>
      </AppBar>
    </div>
  );
}