import React, { memo, useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import TextField from '@material-ui/core/TextField';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const useStyles = makeStyles((theme) => ({
  currency: {
    display: 'flex',
    margin: 'auto 0',
    fontSize: '21px',
    fontWeight: '600',
  },
}));

const NotificationForm = memo(
  ({
    isVisible,
    hasNotification,
    maxPrice,
    actualPrice,
    currency,
    onChange,
    onCancel,
  }) => {
    const classes = useStyles();
    const [isActive, setIsActive] = useState(hasNotification);
    const [price, setPrice] = useState(maxPrice || actualPrice);

    useEffect(() => {
      setIsActive(hasNotification);
    }, [hasNotification]);

    const handleClose = () => onCancel();

    const _onChangeActivity = (e) => {
      setIsActive(e.target.checked);
    };

    const onChangeMaxPrice = (e) => {
      setPrice(e.target.value);
    };

    const onSubmit = () => {
      onChange({
        notification: isActive,
        maxPrice: price,
      });
      handleClose();
    };

    return (
      <Dialog
        open={isVisible}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">
          {'Wish notification'}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Add a configuration to recive a proper notification for your product
          </DialogContentText>
          <h5>
            Actual price: {actualPrice} {currency}
          </h5>
          <FormGroup row>
            <FormControlLabel
              control={
                <Checkbox
                  checked={isActive}
                  onChange={_onChangeActivity}
                  name="gilad"
                  color="primary"
                />
              }
            />
            <TextField
              id="outlined-basic"
              label="Wished price"
              variant="outlined"
              value={price}
              onChange={onChangeMaxPrice}
            />
            <span className={classes.currency}>{currency}</span>
          </FormGroup>
        </DialogContent>
        <DialogActions>
          <Button onClick={onSubmit} color="primary" variant="contained">
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    );
  },
);

NotificationForm.propTypes = {
  isVisible: PropTypes.bool,
  isActive: PropTypes.bool,
  maxPrice: PropTypes.number,
  onAdd: PropTypes.func,
  onCancel: PropTypes.func,
};

export default NotificationForm;
