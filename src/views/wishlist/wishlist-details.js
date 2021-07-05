import React, { memo, useContext, useEffect } from 'react';
import { Context as wishContext } from '../../context/wish';
import { useRouteMatch } from 'react-router-dom';

import Graphic from 'components/graphic';

const WishListDetails = memo(() => {
  const { currentWish, getWish } = useContext(wishContext);

  const {
    params: { wishId },
  } = useRouteMatch();

  useEffect(() => {
    getWish(wishId);
  }, []);

  return (
    <section>
      <h3>{currentWish.name}</h3>
      <div>
        <Graphic prices={currentWish.lastPrices} />
      </div>
    </section>
  );
});

export default WishListDetails;
