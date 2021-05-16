import React, { memo, useContext } from 'react';
import { Context as userContext } from '../../context/user';
import { useRouteMatch } from 'react-router-dom';
import { Line } from 'react-chartjs-2';

const WishListDetails = memo(() => {
  const { currentUser } = useContext(userContext);
  const {
    params: { wishId },
  } = useRouteMatch();
  const currentWish = currentUser.wishes.find((wish) => wish._id === wishId);

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
        {currentWish.lastPrices.map((price) => (
          <li>{price}</li>
        ))}
      </ul>
    </section>
  );
});

export default WishListDetails;
