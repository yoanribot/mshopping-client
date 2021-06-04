import React, { memo, useContext, useState } from 'react';

import { Provider } from './wish-context';
import {
  getWish as _getWish,
  removeWish as _removeWish,
  onCheckProduct as _onCheckProduct,
  getAfiliateLink as _getAfiliateLink,
} from './wish-resource';
import { useSnackbar } from 'notistack';
import { Context as UserContext } from '../user';

const WishProvider = memo(({ children }) => {
  const { enqueueSnackbar } = useSnackbar();
  const { currentUser, getUserById } = useContext(UserContext);
  const [currentWish, setCurrentWish] = useState({ lastPrices: [] });
  const [isLoading, setIsLoading] = useState(false);

  const getWish = async (wishId) => {
    try {
      const wish = await _getWish(wishId);

      console.log('wish', wish);

      setCurrentWish(wish);
    } catch (err) {
      throw err;
    }
  };

  const removeWish = async (wishId) => {
    try {
      await _removeWish(wishId);
      await getUserById(currentUser.id);
    } catch (err) {
      throw err;
    }
  };

  const onCheckProduct = async (wishId) => {
    try {
      setIsLoading(true);
      const data = await _onCheckProduct(wishId);
      setIsLoading(false);

      enqueueSnackbar(
        `Product checked succesfully. Now available for: ${data.price} ${data.currency}`,
      );
      getUserById(currentUser.id);
    } catch (err) {
      throw err;
    }
  };

  const getAfiliateLink = async (wishId) => {
    try {
      setIsLoading(true);
      const storeUrl = await _getAfiliateLink(wishId);

      setIsLoading(false);
      window.open(storeUrl, '_blank');
    } catch (err) {
      throw err;
    }
  };

  return (
    <Provider
      value={{
        currentWish,
        isLoading,
        getWish,
        removeWish,
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
