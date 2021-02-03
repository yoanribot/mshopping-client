import { makeStyles } from '@material-ui/core/styles';

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
    btnAlign: {
        height: '40px',
        alignSelf: 'center',
    },
    dialog: {
        width: 500,
    }
}));

export default useStyles;