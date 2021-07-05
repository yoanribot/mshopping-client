import React, { memo, useEffect, useState } from 'react';

import { Line } from 'react-chartjs-2';

const WishListDetails = memo(({ prices }) => {
  const [data, setData] = useState({});
  const [minMax, setMinMax] = useState({ min: 0, max: 0 });

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

  return <Line data={data} options={options} />;
});

export default WishListDetails;
