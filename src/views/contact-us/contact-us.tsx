import React, { memo, useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useForm } from "react-hook-form";
import { Context as UserContext } from '../../context/user';
import { useAuth0 } from "@auth0/auth0-react";
import { sendEmail } from '../../services/email';

import useGlobalStyles from '../../common/styles/base';
import TextField from '@material-ui/core/TextField';
import FormHelperText from '@material-ui/core/FormHelperText';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import SendIcon from '@material-ui/icons/Send';

type FormValues = {
  name: string,
  age: number,
  title: string,
  email: string,
  text: string,
};

const ContactUs = memo(({ }) => {
  const globalStyles = useGlobalStyles();
  const { currentUser } = useContext(UserContext);
  const { user } = useAuth0();

  const [name, setName] = useState('');
  const [age, setAge] = useState(0);
  const [email, setEmail] = useState('');
  const [title, setTitle] = useState('Need some help');
  const [text, setText] = useState('I dont know how to send an email with a proper template...Can you help me? thank you. have a nice day');

  useEffect(() => {
    setName(`${currentUser.name} ${currentUser.lastname}`);
    setAge(currentUser.age);
  }, [currentUser]);

  useEffect(() => {
    setEmail(user.email);
  }, [user]);

  const { register, handleSubmit, formState: { errors } } = useForm<FormValues>();
  const onSubmit = data => {
    console.log('data', data);
    sendEmail(data);
  }

  console.log('errors', errors)

  return (
    <Card className={globalStyles.formWrapper}>
      <Typography variant="h5" style={{ textAlign: 'center' }}>
        Support Contact form:
      </Typography>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={globalStyles.inputWrapper}>
          <TextField
            fullWidth
            error={!!errors.name}
            label={'Name'}
            value={name}
            {...register("name", { required: "This field is required", maxLength: { value: 20, message: 'You exceed the max length'} })}
          />
          <FormHelperText error id="component-error-text">
            {errors.name && errors.name.message}
          </FormHelperText>
        </div>
        <div className={globalStyles.inputWrapper}>
          <TextField
            fullWidth
            label={'Age'}
            value={age}
            type="number" {...register("age", { min: 18, max: 99 })}
          />
        </div>
        <div className={globalStyles.inputWrapper}>
          <TextField
            fullWidth
            value={title}
            label={'Title'}
           {...register("title")}
          />
        </div>

        <div className={globalStyles.inputWrapper}>
          <TextField
            fullWidth
            value={email}
            label={'Contact me at (Email)'}
            type='email' {...register("email")}
          />
        </div>

        <div className={globalStyles.inputWrapper}>
          <TextField
            label={'Body'}
            fullWidth
            multiline
            rows={6}
            value={text}
            variant={'outlined'}
           {...register("text")}
          />
        </div>

        <Button variant="contained" color="primary" type={'submit'}>
          Send
          <SendIcon className={globalStyles.iconRigth} />
        </Button>
      </form>
    </Card>
    );
  });

  export default ContactUs;