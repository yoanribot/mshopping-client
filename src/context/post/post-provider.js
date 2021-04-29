import React, { memo, useState } from 'react';
import { Provider } from './post-context';

import {
    getPosts as _getPosts,
    createPost as _createPost,
    removePost as _removePost,
    getPost as _getPost,
    upVote as _upVote,
    decVote as _decVote,
    addReview as _addReview,
    removeReview as _removeReview,
} from './post-resource';
import PostModel from '../models/post';

const PostProvider = memo(({ children }) => {
    const [currentPost, setCurrentPost] = useState({ author: {} });
    const [posts, setPosts] = useState([]);

    const getPost = async postId => {
        try {
            const data = await _getPost(postId);
            setCurrentPost(data);
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

    const removePost = async postId => {
        try {
            await _removePost(postId);
            await getPosts();
        } catch(err) {
            throw err;
        }
    }

    const upVote = async postId => {
        try {
            await _upVote(postId);
            await getPost(postId);
        } catch(err) {
            throw err;
        }
    };

    const decVote = async postId => {
        try {
            await _decVote(postId);
            await getPost(postId);
        } catch(err) {
            throw err;
        }
    };

    const addReview = async (postId, userId, text) => {
        try {
            const data = await _addReview(postId, userId, text);
            await getPost(postId);

            return data;
        } catch(err) {
            throw err;
        }
    };

    const removeReview = async (postId, reviewId) => {
        try {
            const data = await _removeReview(postId, reviewId);
            await getPost(postId);

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
                removePost,
                upVote,
                decVote,
                addReview,
                removeReview,
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