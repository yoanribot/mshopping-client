import React, { memo, useEffect, useState } from 'react';

import clsx from 'clsx';
import { Line } from 'react-chartjs-2';
import getGlobalStyles from 'common/styles/base';

const WishListDetails = memo(({ prices }) => {
  const [data, setData] = useState({});
  const [minMax, setMinMax] = useState({ min: 0, max: 0 });
  const globalClasses = getGlobalStyles();

  useEffect(() => {
    const { min: _min, max: _max } =
      prices.length > 0
        ? prices.reduce(
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
      labels: [...Array(prices.length).keys()],
      datasets: [
        {
          label: 'Price',
          data: prices,
          fill: true,
          backgroundColor: 'rgb(255, 99, 132)',
          borderColor: 'rgba(255, 99, 132, 0.2)',
        },
      ],
    });
  }, [prices]);

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
      <h4 className={globalClasses.subtitle}> Price Change </h4>
      <div className={globalClasses.flex}>
        <p
          className={clsx(
            globalClasses.flexListItem,
            globalClasses.flexListItemHighlight,
          )}
        >
          Actual Price: {prices[prices.length - 1]}
        </p>
        <p className={globalClasses.flexListItem}>Min: {minMax.min} </p>
        <p className={globalClasses.flexListItem}>Max: {minMax.max} </p>
        <p className={globalClasses.flexListItem}>
          Media: {(minMax.max + minMax.min) / 2}
        </p>
      </div>
      <Line data={data} options={options} />
    </section>
  );
});

export default WishListDetails;
