import React from 'react';
import { render, fireEvent, cleanup, screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import { useAuth0 } from '@auth0/auth0-react';
import { Context as UserContext } from 'context/user';
import * as emailServices from '../../services/email';

import ContactUs from './contact-us';

jest.mock('@auth0/auth0-react');

beforeEach(() => {
  useAuth0.mockReturnValue({
    isAuthenticated: true,
    user: { email: 'tester@gmail.com' },
    logout: jest.fn(),
    loginWithRedirect: jest.fn(),
    getAccessTokenWithPopup: jest.fn(),
    getAccessTokenSilently: jest.fn(),
    getIdTokenClaims: jest.fn(),
    loginWithPopup: jest.fn(),
    isLoading: false,
  });
});

afterEach(() => {
  cleanup();
});

// Form field tests
test('should render a contact us form', () => {
  const user = {
    currentUser: {
      name: 'Yoan',
      lastname: 'Ribot',
    },
  };
  act(() => {
    render(
      <UserContext.Provider value={user}>
        <ContactUs />
      </UserContext.Provider>,
    );
  });

  expect(screen.getByLabelText('Name').value).toBe('Yoan Ribot');
  expect(screen.getByLabelText('Title').value).toBe('Need some help');
  expect(screen.getByLabelText('Contact me at (Email)').value).toBe(
    'tester@gmail.com',
  );
});

// Default Form data
test('should render a submit form btn with default data', async () => {
  const user = {
    currentUser: {
      name: 'Yoan',
      lastname: 'Ribot',
    },
  };

  const sendEmailSpy = jest.spyOn(emailServices, 'sendEmail');
  const defaultEmail = {
    email: 'tester@gmail.com',
    name: 'Yoan Ribot',
    text: 'I dont know how to send an email with a proper template...Can you help me? thank you. have a nice day',
    title: 'Need some help',
  };

  const { getByTestId } = render(
    <UserContext.Provider value={user}>
      <ContactUs />
    </UserContext.Provider>,
  );

  await act(async () => {
    await fireEvent.submit(getByTestId('form'));
  });

  expect(sendEmailSpy).toBeCalledTimes(1);
  expect(sendEmailSpy).toHaveBeenCalledWith(defaultEmail);
});

test('should render a submit form btn', async () => {
  const user = {
    currentUser: {
      name: 'Yoan',
      lastname: 'Ribot',
    },
  };

  const sendEmailSpy = jest.spyOn(emailServices, 'sendEmail');
  const defaultEmail = {
    email: 'tester@gmail.com',
    name: 'Yoan Ribot',
    text: 'I dont know how to send an email with a proper template...Can you help me? thank you. have a nice day',
    title: 'Need some help',
  };

  const { getByTestId } = render(
    <UserContext.Provider value={user}>
      <ContactUs />
    </UserContext.Provider>,
  );

  await act(async () => {
    const nameField = screen.getByLabelText('Name');
    await fireEvent.change(nameField, { target: { value: 'Anais Ribot' } });
    await fireEvent.submit(getByTestId('form'));
  });

  expect(sendEmailSpy).toBeCalledTimes(1);
  expect(sendEmailSpy).toHaveBeenCalledWith({
    ...defaultEmail,
    name: 'Anais Ribot',
  });
});
