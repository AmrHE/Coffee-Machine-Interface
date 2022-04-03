import React, { useEffect, useState } from 'react';
import { CircularProgressbar } from 'react-circular-progressbar';

import Header from '../../components/header/Header';
import ChangingProgressProvider from './ChangingProgressProvider';

import 'react-circular-progressbar/dist/styles.css';
import './orderProgress.css';

const OrderProgress = ({ history }) => {
	const [coffee, setCoffee] = useState();

	useEffect(() => {
		if (history.location.state !== undefined) {
			setCoffee(history.location.state);
			const waitForOrder = setTimeout(() => {
				history.push({
					pathname: '/completed-order',
					state: { ...history.location.state },
				});
			}, 20000);
		}
	}, []);

	return (
		<>
			<Header />
			{coffee ? (
				<div className="orderNow__container">
					<div className="right">
						<img
							src={coffee.imageCover}
							alt={coffee.name}
							className="coffee__image"
						/>
						<p className="coffee__name">{coffee.name}</p>
						<p className="coffee__price">{coffee.price} EGP</p>
					</div>
					<div className="left">
						<ChangingProgressProvider
							values={[
								0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75,
								80, 85, 90, 95, 100,
							]}
						>
							{(percentage) => (
								<CircularProgressbar
									value={percentage}
									text={`${percentage}%`}
								/>
							)}
						</ChangingProgressProvider>

						<div className="order__processing-text">Processing your order</div>
					</div>
				</div>
			) : (
				<h3 className="no__order-header">
					You haven't ordered yet, Please make an{' '}
					<a href="/dashboard" className="no__order-link">
						Order Now
					</a>
				</h3>
			)}
		</>
	);
};

export default OrderProgress;
