import React, { memo, useState, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';

const PostForm = memo(({ }) => {
    const [state, setstate] = useState();

    useEffect(() => {
    }, []);

    return (
        <>Functional PostForm component structure mock up</>
    );
});

PostForm.propTypes = {

};

PostForm.defaultProps = {

};

export default PostForm;