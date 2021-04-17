import { red } from '@material-ui/core/colors';
import { makeStyles } from '@material-ui/core/styles';

const removeBtnColor = red[800];

const useCommonButtonsStyles = makeStyles((theme) => ({
  removeBtn: {
    color: removeBtnColor,
  }
}));

export default useCommonButtonsStyles;