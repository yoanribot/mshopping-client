import React, { memo, useState, useEffect } from 'react';

import { useAuth0 } from '@auth0/auth0-react';
import { Provider } from './user-context';
import {
  getUserByAuth0Id as _getUserByAuth0Id,
  getUserById as _getUserById,
  createUser as _createUser,
  addWish as _addWish,
  updateWish as _updateWish,
  removeWish as _removeWish,
} from './resource';
import { onCheckProduct } from '../wish/wish-resource';
import UserModel from '../models/user';

const UserProvider = memo(({ children }) => {
  const [currentUser, setCurrentUser] = useState(
    new UserModel({
      name: '',
      lastname: '',
      description: '',
      age: 0,
    }),
  );

  const { user, isAuthenticated } = useAuth0();

  useEffect(() => {
    if (isAuthenticated && !!user) {
      const { sub: auth0UserID } = user;

      getUserByAuth0Id(auth0UserID);
    }
  }, [isAuthenticated, user]);

  const getUserByAuth0Id = async (userAuthId) => {
    try {
      const data = await _getUserByAuth0Id(userAuthId);

      if (data) {
        setCurrentUser(new UserModel(data));
      }
    } catch (err) {
      throw err;
    }
  };

  const getUserById = async (userId) => {
    try {
      const data = await _getUserById(userId);

      if (data) {
        setCurrentUser(new UserModel(data));
      }
    } catch (err) {
      throw err;
    }
  };

  const createUser = async (user) => {
    try {
      const data = await _createUser(user);

      setCurrentUser(new UserModel(data));
    } catch (err) {
      throw err;
    }
  };

  const addWish = async (wish) => {
    try {
      const { wish: _wish } = await _addWish(currentUser.id, wish);

      console.log('_wish', _wish);

      await onCheckProduct(_wish._id);
      await getUserById(currentUser.id);
    } catch (err) {
      throw err;
    }
  };

  const updateWish = async (wish) => {
    try {
      await _updateWish(currentUser.id, wish);

      await getUserById(currentUser.id);
    } catch (err) {
      throw err;
    }
  };

  const removeWish = async (wishId) => {
    try {
      await _removeWish(currentUser.id, wishId);
      await getUserById(currentUser.id);
    } catch (err) {
      throw err;
    }
  };

  return (
    <Provider
      value={{
        currentUser,
        getUserByAuth0Id,
        getUserById,
        createUser,
        addWish,
        updateWish,
        removeWish,
      }}
    >
      {children}
    </Provider>
  );
});

UserProvider.propTypes = {};

UserProvider.defaultProps = {};

export default UserProvider;
