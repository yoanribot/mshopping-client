import React, { memo, useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const NotificationForm = memo(
  ({ isVisible, hasNotification, onChange, onCancel }) => {
    const handleClose = () => onCancel();
    const [isActive, setIsActive] = useState(hasNotification);

    useEffect(() => {
      setIsActive(hasNotification);
    }, [hasNotification]);

    const _onChangeActivity = (e) => {
      setIsActive(e.target.checked);
    };

    const onSubmit = () => {
      onChange({
        notification: isActive,
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
          <FormGroup row>
            <FormControlLabel
              control={
                <Switch
                  checked={isActive}
                  onChange={_onChangeActivity}
                  name="checkedB"
                  color="primary"
                />
              }
              label="Active Notifications"
            />
          </FormGroup>
        </DialogContent>
        <DialogActions>
          <Button onClick={onSubmit} color="primary">
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    );
  },
);

NotificationForm.propTypes = {
  isVisible: PropTypes.bool,
  onAdd: PropTypes.func,
  onCancel: PropTypes.func,
};

export default NotificationForm;
