import React, { memo, useState } from 'react';

import { Provider } from './wish-context';
import {
  getWishes as _getWishes,
  getWish as _getWish,
  removeWish as _removeWish,
  onCheckProduct as _onCheckProduct,
  getAfiliateLink as _getAfiliateLink,
} from './wish-resource';
import { useSnackbar } from 'notistack';

const WishProvider = memo(({ children }) => {
  const { enqueueSnackbar } = useSnackbar();
  const [wishes, setWishes] = useState([]);
  const [currentWish, setCurrentWish] = useState({
    lastPrices: [],
    outOfStock: false,
  });
  const [isLoading, setIsLoading] = useState(false);

  const getWishes = async () => {
    try {
      const wishes = await _getWishes();
      setWishes(wishes);
    } catch (err) {
      throw err;
    }
  };

  const getWish = async (wishId) => {
    try {
      const wish = await _getWish(wishId);

      setCurrentWish(wish);
    } catch (err) {
      throw err;
    }
  };

  const removeWish = async (wishId) => {
    try {
      await _removeWish(wishId);
      await getWishes();
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
      getWishes();
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
        wishes,
        currentWish,
        isLoading,
        getWishes,
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
