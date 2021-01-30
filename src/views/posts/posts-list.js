import React, { memo, useState, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';

const PostsList = memo(({ }) => {
    const [state, setstate] = useState();

    useEffect(() => {
    }, []);

    return (
        <>Functional PostsList component structure mock up</>
    );
});

PostsList.propTypes = {

};

PostsList.defaultProps = {

};

export default PostsList;