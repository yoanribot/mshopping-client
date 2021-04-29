import React, { useState, useEffect, useContext } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { makeStyles } from '@material-ui/core/styles';
import { Context as userContext } from '../../context/user';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import ReviewSimpleList from '../../components/review/review-simple-list';
import PostsSimpleList from '../posts/posts-simple-list';
import Divider from '@material-ui/core/Divider';

const useStyles = makeStyles((theme) => ({
  input: {
    marginBottom: 20,
  },
  save: {
    float: 'right',
  },
  divider: {
    margin: '20px 0',
  }
}));

const Profile = () => {
  const { user } = useAuth0();
  const { picture, email, sub: auth0UserID } = user;
  const classes = useStyles();

  const { currentUser, createUser } = useContext(userContext);
  const [name, setName] = useState(currentUser.name);
  const [lastname, setLastname] = useState(currentUser.lastname);
  const [description, setDescription] = useState(currentUser.description);
  const [age, setAge] = useState(currentUser.age);

  useEffect(() => {
    setName(currentUser.name);
    setLastname(currentUser.lastname);
    setDescription(currentUser.description);
    setAge(currentUser.age);
  }, [currentUser])


  const onChange = cb => event => cb(event.target.value);
  const onSave = () => createUser({
    auth0_user_id: auth0UserID,
    name,
    lastname,
    description,
    age,
  });

  const onRemoveReview = () => {};


  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={3}>
          <img
            src={picture}
            alt="Profile"
            className="rounded-circle img-fluid profile-picture mb-3 mb-md-0"
          />
          <h3>Role: {user[process.env.REACT_APP_ROLE_PATH]}</h3>
          <p className="lead text-muted">Email: {email}</p>
        </Grid>
        <Grid item xs={12} sm={9}>
          <form>
            <div className={classes.input}>
              <TextField name="name" fullWidth label="Name" variant="outlined" value={name} onChange={onChange(setName)} />
            </div>
            <div className={classes.input}>
              <TextField name="lastname" fullWidth label="Lastname" variant="outlined" value={lastname} onChange={onChange(setLastname)} />
            </div>
            <div className={classes.input}>
              <TextField name="description" fullWidth multiline rows={4} label="Description" variant="outlined" value={description} onChange={onChange(setDescription)} />
            </div>
            <div className={classes.input}>
              <TextField
                name="age"
                label="Age"
                type="number"
                InputLabelProps={{
                  shrink: true,
                }}
                inputProps={{ min: 0, max: 120 }}
                variant="outlined"
                min={0}
                value={age}
                onChange={onChange(setAge)}
              />
            </div>
            <div className={classes.input}>
              <Button variant="contained" color="primary" className={classes.save} onClick={onSave}>
                Save
              </Button>
            </div>
          </form>
        </Grid>
      </Grid>
      <div className="row">
        <h4>Activity / History</h4>
        <Typography variant="h6" className={classes.title}>
          Posts
        </Typography>
        <PostsSimpleList posts={currentUser.posts} onRemove={onRemoveReview} />
        <Divider className={classes.divider}/>
        <Typography variant="h6" className={classes.title}>
          Reviews
        </Typography>
        <ReviewSimpleList reviews={currentUser.reviews} />
      </div>
    </>
  );
};

export default Profile;