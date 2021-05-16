import React, { memo } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Avatar from '@material-ui/core/Avatar';
import FolderIcon from '@material-ui/icons/Folder';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';

const PostsSimpleList = memo(({ posts, onRemove }) => {
  return (
    <Paper elevation={0}>
      <List dense={true}>
        {posts.map(({ title, date }) => (
          <ListItem key={date}>
            <ListItemAvatar>
              <Avatar>
                <FolderIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={title}
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

PostsSimpleList.propTypes = {
  posts: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      date: PropTypes.string.isRequired,
    }),
  ),
  onRemove: PropTypes.func,
};

PostsSimpleList.defaultProps = {
  posts: [],
};

export default PostsSimpleList;
