import { makeStyles } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';

const _red = red[700];

const useStyles = makeStyles((theme) => ({
  flex: {
    display: 'flex',
  },
  grow: {
    flexGrow: 1,
  },
  right: {
    float: 'right',
  },
  left: {
    float: 'left',
  },
  removeBtn: {
    color: _red,
  },
  btnAlign: {
    height: '40px',
    alignSelf: 'center',
  },
  btnAction: {
    cursor: 'pointer',
    margin: '0 7px',
  },
  dialog: {
    width: 500,
  },
  formWrapper: {
    padding: '20px 100px',
  },
  inputWrapper: {
    marginBottom: 20,
  },
  iconRigth: {
    marginLeft: 15,
  },
}));

export default useStyles;
