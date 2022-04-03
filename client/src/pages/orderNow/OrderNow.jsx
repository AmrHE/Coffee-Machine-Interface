import React, { useEffect, useState } from 'react';
import axios from 'axios';

import Header from '../../components/header/Header';

import 'react-input-range/lib/css/index.css';
import './orderNow.css';

const OrderNow = ({ history }) => {
	const [coffee, setCoffee] = useState({});
	const [strengthInputValue, setStrengthInputValue] = useState(50);
	const [sugarInputValue, setSugarInputValue] = useState(25);
	const [milkInputValue, setMilkInputValue] = useState(75);

	let coffeeName;
	if (history.location.state.name) {
		coffeeName = history.location.state.name;
	}

	useEffect(() => {
		const fetchSingleCoffeeData = async () => {
			const config = {
				header: {
					'Content-Type': 'application/json',
					Autherizaiton: `Bearer ${localStorage.getItem('authToken')}`,
				},
			};

			try {
				const response = await axios.get(
					`/api/v1/coffee/${coffeeName}`,
					config
				);

				if (response) {
					setCoffee(response.data.data.data[0]);
				}
			} catch (err) {
				console.log(err);
			}
		};

		fetchSingleCoffeeData();
	}, []);

	const handleConfrimOrderClick = () => {
		history.push({
			pathname: '/order-in-progress',
			state: { ...coffee, strengthInputValue, sugarInputValue, milkInputValue },
		});
	};

	return (
		<>
			<Header />
			<div className="orderNow__container">
				{coffee && (
					<div className="right">
						<img
							src={coffee.imageCover}
							alt={coffee.name}
							className="coffee__image"
						/>
						<p className="coffee__name">{coffee.name}</p>
						<p className="coffee__price">{coffee.price} EGP</p>
					</div>
				)}
				<div className="left">
					<p className="input-label">Strength</p>
					<div className="input-contianer">
						<span className="input-min">0</span>
						<input
							className="input-range"
							type="range"
							name="strength"
							id="strength"
							step="25"
							min="0"
							max="100"
							value={strengthInputValue}
							onChange={(e) => setStrengthInputValue(e.target.value)}
						/>
						<span className="input-max">100</span>
					</div>
					<output for="strength">{strengthInputValue}</output>

					<p className="input-label">Sugar</p>
					<div className="input-contianer">
						<span className="input-min">0</span>
						<input
							className="input-range"
							type="range"
							name="sugar"
							id="sugar"
							step="25"
							min="0"
							max="100"
							value={sugarInputValue}
							onChange={(e) => setSugarInputValue(e.target.value)}
						/>
						<span className="input-max">100</span>
					</div>
					<output for="sugar">{sugarInputValue}</output>

					<p className="input-label">Milk</p>
					<div className="input-contianer">
						<span className="input-min">0</span>
						<input
							className="input-range"
							type="range"
							name="milk"
							id="milk"
							step="25"
							min="0"
							max="100"
							value={milkInputValue}
							onChange={(e) => setMilkInputValue(e.target.value)}
						/>
						<span className="input-max">100</span>
					</div>
					<output for="milk">{milkInputValue}</output>

					<button
						className="confirm__order-button"
						onClick={handleConfrimOrderClick}
					>
						Confirm Order
					</button>
				</div>
			</div>
		</>
	);
};

export default OrderNow;
