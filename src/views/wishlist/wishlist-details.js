import React, { memo, useContext, useEffect } from 'react';
import { Context as wishContext } from '../../context/wish';
import { useRouteMatch } from 'react-router-dom';

import { Line } from 'react-chartjs-2';

const WishListDetails = memo(() => {
  const { currentWish, getWish } = useContext(wishContext);

  console.log('currentWish', currentWish);

  const {
    params: { wishId },
  } = useRouteMatch();

  useEffect(() => {
    getWish(wishId);
  }, []);

  const data = {
    labels: [...Array(currentWish.lastPrices.length).keys()],
    datasets: [
      {
        label: 'Price',
        data: currentWish.lastPrices,
        fill: false,
        backgroundColor: 'rgb(255, 99, 132)',
        borderColor: 'rgba(255, 99, 132, 0.2)',
      },
    ],
  };

  const options = {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  };

  return (
    <section>
      <h3>{currentWish.name}</h3>
      <div>
        <Line data={data} options={options} />
      </div>
      <h4>List : </h4>
      <ul>
        {currentWish.lastPrices.map((price, index) => (
          <li key={index}>{price}</li>
        ))}
      </ul>
    </section>
  );
});

export default WishListDetails;
