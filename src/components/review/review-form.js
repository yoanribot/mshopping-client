import React, { memo, useState, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import getGlobalStyles from '../global-styles';

const ReviewForm = memo(({ isOpen, onClose, onSave }) => {
    const [text, setText] = useState();
    const globalClasses = getGlobalStyles();

    const onChangeText = e => setText(e.target.value);
    const _onSave = () => onSave(text);

    return (
        <Dialog open={isOpen} onClose={onClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Review Form:</DialogTitle>
            <DialogContent className={globalClasses.dialog}>
                <TextField
                    autoFocus
                    margin="dense"
                    id="text"
                    label="Add your comment"
                    fullWidth
                    multiline
                    rows={10}
                    value={text}
                    onChange={onChangeText}
                />
            </DialogContent>
            <DialogActions>
            <Button onClick={onClose} color="primary">
                Cancel
            </Button>
            <Button onClick={_onSave} color="primary">
                Add
            </Button>
            </DialogActions>
        </Dialog>
    );
});

ReviewForm.propTypes = {

};

ReviewForm.defaultProps = {

};

export default ReviewForm;