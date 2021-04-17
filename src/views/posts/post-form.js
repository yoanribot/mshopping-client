import React, { memo, useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { useHistory, useLocation } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import { Context as PostContext } from '../../context/post';
import { Context as UserContext } from '../../context/user';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
    input: {
      marginBottom: 20,
    },
    save: {
      float: 'right',
    }
  }));


const Post = memo(({ }) => {
    const { pathname } = useLocation();
    const history = useHistory();

    const classes = useStyles();
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [votes, setVotes] = useState(0);
    const { createPost } = useContext(PostContext);
    const { currentUser } = useContext(UserContext);

    const onChange = cb => event => cb(event.target.value);
    const onSave = () => {
        createPost({
            author: currentUser.id,
            title,
            content,
            votes,
        });
        history.push(pathname.split('/').slice(0, -1).join('/'))
    }

    return (
        <form>
            <div className={classes.input}>
                <TextField name="title" fullWidth label="Title" variant="outlined" value={title} onChange={onChange(setTitle)} />
            </div>
            <div className={classes.input}>
                <TextField name="content" fullWidth multiline rows={4} label="Content" variant="outlined" value={content} onChange={onChange(setContent)} />
            </div>
            <div className={classes.input}>
                <Button variant="contained" color="primary" className={classes.save} onClick={onSave}>
                    Save
                </Button>
            </div>
        </form>
    );
});

Post.propTypes = {

};

Post.defaultProps = {

};

export default Post;