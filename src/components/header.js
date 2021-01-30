import React from 'react';
import { useAuth0 } from "@auth0/auth0-react";

import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

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
		console.log('singup ....');
		const res = await loginWithRedirect({
			screen_hint: "signup",
		});

		console.log('res', res);
	}
	const _logout = () => logout({
		returnTo: window.location.origin,
	})

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            News
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
						: (<Button
							color="inherit"
							onClick={_logout}
						>
							Logout
						</Button>)
					}
        </Toolbar>
      </AppBar>
    </div>
  );
}