import React, { memo, useState } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

const DeleteConfirmation = memo(
  ({ isOpen, showConfirmDeleteWish, handleAgree, handleClose }) => {
    const [showAgain, setShowAgain] = useState(
      showConfirmDeleteWish === 'true',
    );

    console.log('showAgain', showAgain);

    const onChangeShowAgain = (event) => {
      console.log('event.target', event.target.checked);
      setShowAgain(event.target.checked);
    };

    const _handleAgree = () => {
      localStorage.setItem('showConfirmDeleteWish', showAgain);
      handleAgree();
    };

    return (
      <div>
        <Dialog
          open={isOpen}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"Use Google's location service?"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Let Google help apps determine location. This means sending
              anonymous location data to Google, even when no apps are running.
            </DialogContentText>
            <FormControlLabel
              control={
                <Checkbox
                  checked={showAgain}
                  onChange={onChangeShowAgain}
                  name="checkedB"
                  color="primary"
                />
              }
              label="Dont show this message again"
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Disagree
            </Button>
            <Button onClick={_handleAgree} color="primary" autoFocus>
              Agree
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  },
);

export default DeleteConfirmation;
