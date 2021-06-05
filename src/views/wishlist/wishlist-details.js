import React, { memo, useContext, useEffect, useState } from 'react';
import { Context as wishContext } from '../../context/wish';
import { useRouteMatch } from 'react-router-dom';

import { Line } from 'react-chartjs-2';

const WishListDetails = memo(() => {
  const { currentWish, getWish } = useContext(wishContext);
  const [data, setData] = useState({});
  const [minMax, setMinMax] = useState({ min: 0, max: 0 });

  const {
    params: { wishId },
  } = useRouteMatch();

  useEffect(() => {
    getWish(wishId);
  }, []);

  useEffect(() => {
    const { min: _min, max: _max } =
      currentWish.lastPrices.length > 0
        ? currentWish.lastPrices.reduce(
            (acc, current) => {
              if (acc.min > current) {
                acc.min = current;
              }

              if (acc.max < current) {
                acc.max = current;
              }

              return acc;
            },
            { min: 100000, max: 0 },
          )
        : { min: 0, max: 0 };

    setMinMax({ min: _min, max: _max });
    setData({
      labels: [...Array(currentWish.lastPrices.length).keys()],
      datasets: [
        {
          label: 'Price',
          data: currentWish.lastPrices,
          fill: true,
          backgroundColor: 'rgb(255, 99, 132)',
          borderColor: 'rgba(255, 99, 132, 0.2)',
        },
      ],
    });
  }, [currentWish]);

  const { min, max } = minMax;
  const step = max - min + 50;
  const options = {
    scales: {
      y: {
        suggestedMin: min - step > 0 ? min - step : 0,
        suggestedMax: max + step,
      },
    },
  };

  return (
    <section>
      <h3>{currentWish.name}</h3>
      <div>
        <Line data={data} options={options} />
      </div>
    </section>
  );
});

export default WishListDetails;
