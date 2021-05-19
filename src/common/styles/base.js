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
  fixedProgres: {
    position: 'fixed',
    top: '50%',
    left: '50%',
    zIndex: 9999,
  },
  bgMask: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    zIndex: 9998,
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
