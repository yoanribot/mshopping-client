import React, { memo, useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Context as PostContext } from '../../context/post';

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
    const classes = useStyles();
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [votes, setVotes] = useState(0);
    const { createPost } = useContext(PostContext);

    useEffect(() => {
    }, []);

    const onChange = cb => event => cb(event.target.value);
    const onSave = () => createPost({
        title,
        content,
        votes,
    });

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