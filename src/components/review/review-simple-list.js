import React, { memo } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Avatar from '@material-ui/core/Avatar';
import BeenhereIcon from '@material-ui/icons/Beenhere';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';

const ReviewSimpleList = memo(({ reviews, onRemove }) => {
  return (
    <Paper elevation={0}>
      <List dense={true}>
        {reviews.map(({ text, date }) => (
          <ListItem key={date}>
            <ListItemAvatar>
              <Avatar>
                <BeenhereIcon />
              </Avatar>
            </ListItemAvatar>

            <ListItemText
              primary={text}
              secondary={moment(date).format('DD-MM-YYYY')}
            />
            {!!onRemove && (
              <ListItemSecondaryAction>
                <IconButton edge="end" aria-label="delete" onClick={onRemove}>
                  <DeleteIcon />
                </IconButton>
              </ListItemSecondaryAction>
            )}
          </ListItem>
        ))}
      </List>
    </Paper>
  );
});

ReviewSimpleList.propTypes = {
  reviews: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.string.isRequired,
      date: PropTypes.string.isRequired,
    }),
  ),
  onRemove: PropTypes.func,
};

ReviewSimpleList.defaultProps = {
  reviews: [],
};

export default ReviewSimpleList;
