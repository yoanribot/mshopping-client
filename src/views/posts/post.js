import React, { memo, useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import { useParams } from "react-router-dom";
import { Context as PostContext } from '../../context/post';
import { Context as UserContext } from '../../context/user';
import moment from 'moment';

import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import ReviewList from '../../components/review';
import { useSnackbar  } from 'notistack';

const useStyles = makeStyles((theme) => ({
    root: {
        padding: 20,
    },
    header: {
        display: 'flex',
    },
    title: {
        flexGrow: 1,
        fontStyle: 'italic',
    },
    flex: {
        display: 'flex',
    },
    btn: {
        cursor: 'pointer',
        fontSize: 30,
    },
    votesWrapper: {
        display: 'flex',
        marginLeft: 40,
    },
    votes: {
        fontSize: 44,
        alignSelf: 'center',
        margin: 0,
    },
    btnVotes: {
        display: 'flex',
        flexDirection: 'column',
        alignSelf: 'center',
    },
    date: {
        margin: 'auto',
    },
    sign: {
        fontSize: '19px',
        fontStyle: 'italic',
    },
}));

const Post = memo(({ }) => {
    const [post, setPost] = useState({ author: {} });
    const [votes, setVotes] = useState(0);
    const { getPost, upVote, decVote, addReview } = useContext(PostContext);
    const { currentUser } = useContext(UserContext);
    const { enqueueSnackbar } = useSnackbar();
    let { id } = useParams();
    const classes = useStyles();

    useEffect(() => {
        (async () => {
            const currentPost = await getPost(id);

            setPost(currentPost);
            setVotes(currentPost.votes);
        })();
    }, []);

    const _upVote = () => {
        upVote(id);
        setVotes(votes + 1);
    };
    const _decVote = () => {
        decVote(id);
        setVotes(votes - 1);
    }

    const _addReview = async text => {
        const data = await addReview(post.id, currentUser.id, text);

        console.log('data', data);
        enqueueSnackbar(data.message);
    }

    console.log('post', post);

    return (
        <Paper className={classes.root}>
            <div className={classes.header}>
                <h2 className={classes.title}>{post.title}</h2>
                <div className={classes.flex}>
                    <span className={classes.date}>{moment(post.date).format("DD-MM-YYYY")}</span>
                    <div className={classes.votesWrapper}>
                        <h3 className={classes.votes}>{votes}</h3>
                        <div className={classes.btnVotes}>
                            <IconButton onClick={_upVote} >
                                <KeyboardArrowUpIcon className={classes.btn} />
                            </IconButton>
                            <IconButton onClick={_decVote} >
                                <KeyboardArrowDownIcon className={classes.btn} />
                            </IconButton>
                        </div>
                    </div>
                </div>
            </div>
            <p>{post.content}</p>
            <p className={classes.sign}>{`By: ${post.author.name} ${post.author.lastname}`}</p>

            <ReviewList addReview={_addReview} reviews={post.reviews} />
        </Paper>
    );
});

Post.propTypes = {

};

Post.defaultProps = {

};

export default Post;