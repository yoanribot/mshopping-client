import React, { memo, useState, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import { useAuth0 } from "@auth0/auth0-react";
import { Provider } from './user-context';
import {
    getUserByAuth0Id as _getUserByAuth0Id,
    createUser as _createUser,
} from './resource';
import UserModel from '../models/user';

const UserProvider = memo(({ children }) => {
    const [currentUser, setCurrentUser] = useState(new UserModel({
        name: '',
        lastname: '',
        description: '',
        age: 0,
    }));

    const { user, isAuthenticated } = useAuth0();

    useEffect(() => {
        if (isAuthenticated && !!user) {
            const { sub: auth0UserID } = user;

            getUserByAuth0Id(auth0UserID);
        }
    }, [isAuthenticated, user]);

    const getUserByAuth0Id = async userAuthId => {
        try {
            const data = await _getUserByAuth0Id(userAuthId);

            if (data) {
                setCurrentUser(new UserModel(data));
            }

        } catch(err) {
            throw err;
        }
    };

    const createUser = async user => {
        try {
            const data = await _createUser(user);

            setCurrentUser(new UserModel(data));
        } catch(err) {
            throw err;
        }
    }

    return (
        <Provider
            value={{
                currentUser,
                getUserByAuth0Id,
                // getUser,
                createUser,
                // updateUser,
                // removeUser,
            }}
        >
            {children}
        </Provider>
    );
});

UserProvider.propTypes = {

};

UserProvider.defaultProps = {

};

export default UserProvider;