import React, { memo, useContext } from 'react';

import { Provider } from './wish-context';
import {
  onCheckProduct as _onCheckProduct,
  getAfiliateLink as _getAfiliateLink,
} from './wish-resource';
import { useSnackbar } from 'notistack';
import { Context as UserContext } from '../user';

const WishProvider = memo(({ children }) => {
  const { enqueueSnackbar } = useSnackbar();
  const { currentUser, getUserById } = useContext(UserContext);

  const onCheckProduct = async (wishId) => {
    try {
      const data = await _onCheckProduct(wishId);

      enqueueSnackbar(
        `Product checked succesfully. Now available for: ${data.price} ${data.currency}`,
      );
      console.log('currentUser', currentUser);
      getUserById(currentUser.id);
    } catch (err) {
      throw err;
    }
  };

  const getAfiliateLink = async (wishId) => {
    try {
      const storeUrl = await _getAfiliateLink(wishId);

      console.log('storeUrl', storeUrl);
      window.open(storeUrl, '_blank');
    } catch (err) {
      throw err;
    }
  };

  return (
    <Provider
      value={{
        onCheckProduct,
        getAfiliateLink,
      }}
    >
      {children}
    </Provider>
  );
});

WishProvider.propTypes = {};

WishProvider.defaultProps = {};

export default WishProvider;
