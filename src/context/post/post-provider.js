import React, { memo, useState, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import { Provider } from './post-context';
import {
    getPosts as _getPosts,
    createPost as _createPost,
    getPost as _getPost,
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

    return (
        <Provider
            value={{
                currentPost,
                posts,
                getPosts,
                getPost,
                createPost,
                // updateUser,
                // removeUser,
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