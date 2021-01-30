import React, { memo, useState, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import { Provider } from './user-context';
import {
    getUserByAuth0Id as _getUserByAuth0Id,
    createUser as _createUser,
} from './resource';
import UserModel from '../models/user';

const UserProvider = memo(({ children }) => {
    const [currentUser, setCurrentUser] = useState(new UserModel({
        name: 'Yoan',
        lastname: 'Ribot',
        description: 'some blablabla...',
        age: 32,
    }));

    const getUserByAuth0Id = async userAuthId => {
        try {
            const data = await _getUserByAuth0Id(userAuthId);

            setCurrentUser(new UserModel(data));
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