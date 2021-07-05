import React, { useEffect, useContext } from 'react';
import { Context as wishContext } from 'context/wish';
import { useParams } from 'react-router-dom';

import { makeStyles, styled } from '@material-ui/core/styles';
import getGlobalStyles from 'common/styles/base';
import { indigo, red } from '@material-ui/core/colors';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import SendIcon from '@material-ui/icons/Send';
import Graphic from 'components/graphic';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import NotificationsActiveIcon from '@material-ui/icons/NotificationsActive';

const _indigo = indigo[400];
const _red = red[700];

const useStyles = makeStyles((theme) => ({
  field: {
    fontSize: 17,
  },
  fieldLabel: {
    fontWeight: 'bold',
  },
}));

const NotificationsActiveIconX = styled(NotificationsActiveIcon)({
  color: _indigo,
});

const DeleteIconX = styled(DeleteIcon)({
  color: _red,
});

const WishDetail = () => {
  const classes = useStyles();
  const globalStyles = getGlobalStyles();
  const { currentWish, getWish } = useContext(wishContext);
  let { wishId } = useParams();

  useEffect(() => {
    getWish(wishId);
  }, [wishId]);

  return (
    <section>
      <h3>{currentWish.name}</h3>
      <Grid container spacing={3}>
        <Grid item xs={4}>
          <p className={classes.field}>
            <span className={classes.fieldLabel}>Product ID: </span>{' '}
            {currentWish.productId}
          </p>
        </Grid>
        <Grid item xs={4}>
          <p className={classes.field}>
            <span className={classes.fieldLabel}>Current Price: </span>{' '}
            {currentWish.currentPrice} {currentWish.currency}
          </p>
        </Grid>
        <Grid item xs={4}>
          <p className={classes.field}>
            <span className={classes.fieldLabel}>Out of stock: </span>{' '}
            {currentWish.outOfStock.toString()}
          </p>
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        <Grid item xs={10}>
          <span className={classes.fieldLabel}>URL: </span> {currentWish.url}
        </Grid>
        <Grid item xs={2}>
          <Button
            variant="contained"
            color="primary"
            className={classes.button}
            endIcon={<SendIcon>send</SendIcon>}
            onClick={() => window.open(currentWish.url)}
          >
            Visit
          </Button>
        </Grid>
      </Grid>

      <div>
        <h3>Prices :</h3>
        <Graphic prices={currentWish.lastPrices} />
      </div>
      <div>
        <h3>Users intresting:</h3>

        <Grid item xs={12} md={6}>
          <div className={classes.demo}>
            <List>
              {!!currentWish.users &&
                currentWish.users.map((user) => (
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar>
                        <AccountCircleIcon />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={`${user.userId.name} ${user.userId.lastname} ( _id: ${user.userId._id})`}
                    />
                    {user.notificationEnable && (
                      <NotificationsActiveIconX
                        fontSize="small"
                        className={globalStyles.btnAction}
                      />
                    )}
                    <ListItemSecondaryAction>
                      <IconButton edge="end" aria-label="delete">
                        <DeleteIconX />
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
                ))}
            </List>
          </div>
        </Grid>
      </div>
    </section>
  );
};

export default WishDetail;
