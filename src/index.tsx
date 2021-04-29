import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router } from 'react-router-dom';
import Auth0ProviderWithHistory from './auth/auth0-provider-with-history';
import { ThemeProvider } from '@material-ui/core/styles';
import globalTheme from './theme';
import { Provider as UserProvider } from './context/user';
import { Provider as PostProvider } from './context/post';
import { SnackbarProvider } from 'notistack';
import axios from 'axios';

axios.defaults.baseURL = process.env.REACT_APP_SERVER_URL;

ReactDOM.render(
	<Router>
		<Auth0ProviderWithHistory>
			<SnackbarProvider maxSnack={3}>
				<UserProvider>
					<PostProvider>
						<ThemeProvider theme={globalTheme}>
							<App />
						</ThemeProvider>
					</PostProvider>
				</UserProvider>
			</SnackbarProvider>
		</Auth0ProviderWithHistory>
	</Router>,
 	document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
