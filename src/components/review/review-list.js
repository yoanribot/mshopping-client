import React, { memo, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import getGlobalStyles from '../../common/styles/base';
import moment from 'moment';

import useCommonButtonsStyles from '../../common/styles/buttons';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';
import ReviewForm from "./review-form";
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';

const useStyles = makeStyles((theme) => ({
    section: {
        marginTop: 60,
    },
}));

const ReviewList = memo(({ reviews, addReview, onRemoveReview }) => {
    const [isFormOpen, setIsFormOpen] = useState(false);
    const classes = useStyles();
    const btnClasses = useCommonButtonsStyles();
    const globalStyles = getGlobalStyles();

    useEffect(() => {
    }, []);

    const showReviewForm = () => setIsFormOpen(true);
    const hideReviewForm = () => setIsFormOpen(false);
    const _addReview = text => {
        addReview(text);
        hideReviewForm();
    }

    console.log('reviews', reviews);

    return (
        <section className={classes.section}>
            <div className={globalStyles.flex}>
                <h3 className={globalStyles.grow}> Reviews: </h3>
                <Button
                    variant="contained"
                    color="primary"
                    className={globalStyles.btnAlign}
                    onClick={showReviewForm}
                    >
                    <AddIcon /> Add Review
                </Button>
            </div>
            <List className={classes.root}>
                {reviews.map(review => (
                    <div key={review._id}>
                        <ListItem>
                            <ListItemAvatar>
                            <Avatar>
                                <AccountCircleIcon />
                            </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary={`${review.userId.name} ${review.userId.lastname}`} secondary={`${moment(review.date).format("DD-MM-YYYY")}`} />
                            <IconButton aria-label="delete" className={btnClasses.removeBtn} onClick={() => onRemoveReview(review._id)}>
                                <DeleteIcon fontSize="small" />
                            </IconButton>
                        </ListItem>
                        <p>{`${review.text.slice(0, 250)} ... Read more`}</p>
                        <Divider />
                    </div >
                ))}
            </List>
            <ReviewForm
                isOpen={isFormOpen}
                onSave={_addReview}
                onClose={hideReviewForm}
            />
        </section>
    );
});

ReviewList.propTypes = {
    reviews: PropTypes.array,
    addReview: PropTypes.func,
    onRemoveReview: PropTypes.func,
};

ReviewList.defaultProps = {
    reviews: [],
};

export default ReviewList;