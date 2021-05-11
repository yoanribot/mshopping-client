import React, { memo } from 'react';

import { Provider } from './wish-context';
import { onCheckProduct as _onCheckProduct } from './wish-resource';

const WishProvider = memo(({ children }) => {
  const onCheckProduct = async (wishId) => {
    try {
      const data = await _onCheckProduct(wishId);

      console.log('prodcut checked', data);
    } catch (err) {
      throw err;
    }
  };

  return (
    <Provider
      value={{
        onCheckProduct,
      }}
    >
      {children}
    </Provider>
  );
});

WishProvider.propTypes = {};

WishProvider.defaultProps = {};

export default WishProvider;
