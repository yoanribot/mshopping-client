import React, { memo, useState, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';

const Post = memo(({ }) => {
    const [state, setstate] = useState();

    useEffect(() => {
    }, []);

    return (
        <>Functional Post component structure mock up</>
    );
});

Post.propTypes = {

};

Post.defaultProps = {

};

export default Post;