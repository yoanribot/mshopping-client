import { createMuiTheme } from '@material-ui/core/styles';
import { purple, green } from '@material-ui/core/colors';

const globalTheme = createMuiTheme({
  palette: {
    primary: {
      main: purple[500],
      contrastText: 'white',
    },
    secondary: {
      main: green[500],
    },
  },
  overrides: {
    MuiFab: {
      root: {
        width: 35,
        height: 35,
      }
    },
    MuiBottomNavigationAction: {
      label: {
        '&.Mui-selected': {
          fontSize: '1.5rem',
        }
      }
    }
  }
});

export default globalTheme;