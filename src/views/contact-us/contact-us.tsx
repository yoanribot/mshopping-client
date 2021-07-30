import React from 'react';
import { useContext, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Context as UserContext } from '../../context/user';
import { useAuth0 } from '@auth0/auth0-react';
import { sendEmail } from '../../services/email';

import useGlobalStyles from '../../common/styles/base';
import TextField from '@material-ui/core/TextField';
import FormHelperText from '@material-ui/core/FormHelperText';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import SendIcon from '@material-ui/icons/Send';

type FormValues = {
  name: string;
  title: string;
  email: string;
  text: string;
};

const ContactUs = () => {
  const globalStyles = useGlobalStyles();
  const { currentUser } = useContext(UserContext);
  const { user } = useAuth0();
  const {
    control,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  useEffect(() => {
    setValue('name', `${currentUser.name} ${currentUser.lastname}`, {
      shouldValidate: true,
    });
    setValue('title', 'Need some help', { shouldValidate: true });
    setValue(
      'text',
      'I dont know how to send an email with a proper template...Can you help me? thank you. have a nice day',
      { shouldValidate: true },
    );
  }, [currentUser, setValue]);

  useEffect(() => {
    setValue('email', user.email, { shouldValidate: true });
  }, [user, setValue]);

  const onSubmit = (data) => {
    sendEmail(data);
  };

  return (
    <Card className={globalStyles.formWrapper}>
      <Typography variant="h5" style={{ textAlign: 'center' }}>
        Support Contact form:
      </Typography>

      <form data-testid="form" onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name={'name'}
          control={control}
          defaultValue=""
          rules={{
            required: 'This field is required',
            maxLength: { value: 20, message: 'You exceed the max length' },
          }}
          render={({ field }) => (
            <div className={globalStyles.inputWrapper}>
              <TextField
                id="contact-form-name"
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
          rules={{ required: 'This field is required' }}
          render={({ field }) => (
            <div className={globalStyles.inputWrapper}>
              <TextField
                id="contact-form-title"
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
          rules={{ required: 'A contact email is required' }}
          render={({ field }) => (
            <div className={globalStyles.inputWrapper}>
              <TextField
                id="contact-form-email"
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
          rules={{ required: 'This field is required' }}
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
};

export default ContactUs;
