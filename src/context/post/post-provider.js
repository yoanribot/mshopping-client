import React, { memo, useState, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import { Provider } from './post-context';

import {
    getPosts as _getPosts,
    createPost as _createPost,
    getPost as _getPost,
    upVote as _upVote,
    decVote as _decVote,
    addReview as _addReview,
} from './post-resource';
import PostModel from '../models/post';

const PostProvider = memo(({ children }) => {
    const [currentPost, setCurrentPost] = useState(new PostModel({
        title: 'Title',
        content: 'Once upon a time ...',
        author: 'Yoan RR',
        votes: 1,
        age: Date.now(),
    }));
    const [posts, setPosts] = useState([]);

    const getPost = async postId => {
        try {
            const data = await _getPost(postId);

            return new PostModel(data);
        } catch(err) {
            throw err;
        }
    };

    const getPosts = async () => {
        try {
            const data = await _getPosts();

            setPosts(data.map(p => new PostModel(p)));
        } catch(err) {
            throw err;
        }
    };

    const createPost = async user => {
        try {
            const data = await _createPost(user);

            setPosts([...posts, new PostModel(data)]);
        } catch(err) {
            throw err;
        }
    }

    const upVote = async postId => {
        try {
            await _upVote(postId);
        } catch(err) {
            throw err;
        }
    };

    const decVote = async postId => {
        try {
            await _decVote(postId);
        } catch(err) {
            throw err;
        }
    };

    const addReview = async (postId, userId, text) => {
        try {
            const data = await _addReview(postId, userId, text);

            console.log('data', data);

            return data;
        } catch(err) {
            throw err;
        }
    };

    return (
        <Provider
            value={{
                currentPost,
                posts,
                getPosts,
                getPost,
                createPost,
                upVote,
                decVote,
                addReview,
            }}
        >
            {children}
        </Provider>
    );
});

PostProvider.propTypes = {

};

PostProvider.defaultProps = {

};

export default PostProvider;