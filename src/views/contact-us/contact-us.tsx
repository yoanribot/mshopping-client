import React, { memo, useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useForm, Controller } from "react-hook-form";
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
  title: string,
  email: string,
  text: string,
};

const ContactUs = memo(({ }) => {
  const globalStyles = useGlobalStyles();
  const { currentUser } = useContext(UserContext);
  const { user } = useAuth0();
  const { reset, control, getValues, handleSubmit, formState: { errors } } = useForm<FormValues>();

  const currentFormValues = getValues();

  useEffect(() => {
    reset({
      ...currentFormValues,
      name: `${currentUser.name} ${currentUser.lastname}`,
      email: user.email,
      title: 'Need some help',
      text: 'I dont know how to send an email with a proper template...Can you help me? thank you. have a nice day',
    });
  }, [currentUser, user]);

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
        <Controller
          name={'name'}
          control={control}
          defaultValue={currentFormValues.name || "" }
          rules={{ required: "This field is required", maxLength: { value: 20, message: 'You exceed the max length'}}}
          render={({ field }) => (
            <div className={globalStyles.inputWrapper}>
              <TextField
                fullWidth
                error={!!errors.name}
                label={'Name'}
                {...field}
              />
              <FormHelperText error id="component-error-text">
                {errors.name && errors.name.message}
              </FormHelperText>
            </div>
          )}
        />
        <Controller
          name={'title'}
          control={control}
          defaultValue={currentFormValues.title || "" }
          rules={{ required: "This field is required" }}
          render={({ field }) => (
            <div className={globalStyles.inputWrapper}>
              <TextField
                fullWidth
                error={!!errors.title}
                label={'Title'}
                {...field}
              />
              <FormHelperText error id="component-error-text">
                {errors.title && errors.title.message}
              </FormHelperText>
            </div>
          )}
        />

        <Controller
          name={'email'}
          control={control}
          defaultValue={currentFormValues.email || "" }
          rules={{ required: "A contact email is required" }}
          render={({ field }) => (
            <div className={globalStyles.inputWrapper}>
              <TextField
                fullWidth
                error={!!errors.email}
                label={'Contact me at (Email)'}
                {...field}
              />
              <FormHelperText error id="component-error-text">
                {errors.email && errors.email.message}
              </FormHelperText>
            </div>
          )}
        />

        <Controller
          name={'text'}
          control={control}
          defaultValue={currentFormValues.text || "" }
          rules={{ required: "This field is required" }}
          render={({ field }) => (
            <div className={globalStyles.inputWrapper}>
              <TextField
                fullWidth
                multiline
                rows={6}
                variant={'outlined'}
                error={!!errors.text}
                label={'Body'}
                {...field}
              />
              <FormHelperText error id="component-error-text">
                {errors.text && errors.text.message}
              </FormHelperText>
            </div>
          )}
        />

        <Button variant="contained" color="primary" type={'submit'}>
          Send
          <SendIcon className={globalStyles.iconRigth} />
        </Button>
      </form>
    </Card>
    );
  });

  export default ContactUs;