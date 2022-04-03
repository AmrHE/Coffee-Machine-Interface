import React, { useEffect, useState } from 'react';
import Header from '../../components/header/Header';

import './completedOrder.css';

const CompletedOrder = ({ history }) => {
	const [coffee, setCoffee] = useState();

	useEffect(() => {
		if (history.location.state !== undefined) {
			setCoffee(history.location.state);
		}
	}, []);

	const handleNewOrderClick = () => {
		history.push('/dashboard');
	};

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
						<p className="order__finished_text">Pick your cup</p>
						<p className="order__finished-subtext">stay cafinated</p>
					</div>
					<div className="left">
						<img
							src="https://png.monster/wp-content/uploads/2021/06/png.monster-9-700x700.png"
							alt="Completed"
						/>
						<div className="order__completed-header">
							Your Order is finished . . . Wanna another cup?
						</div>
						<button className="new__order-btn" onClick={handleNewOrderClick}>
							NEW ORDER
						</button>
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

export default CompletedOrder;
