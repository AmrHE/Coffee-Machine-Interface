import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Col, Row, Card } from 'react-bootstrap';
import Header from '../../components/header/Header';

import './dashboard.css';

const Dashboard = ({ history }) => {
	const [error, setError] = useState('');
	const [coffeeData, setCoffeeData] = useState([]);

	useEffect(() => {
		if (!localStorage.getItem('authToken')) {
			history.push('/login');
		}
		const fetchCoffeeData = async () => {
			const config = {
				header: {
					'Content-Type': 'application/json',
					Autherizaiton: `Bearer ${localStorage.getItem('authToken')}`,
				},
			};

			try {
				const { data } = await axios.get('/api/v1/coffee', config);
				setCoffeeData(data.data.data);
			} catch (error) {
				localStorage.removeItem('authToken');
				setError('you are not authirized, please login');
				history.push('/login');
			}
		};

		fetchCoffeeData();
	}, []);

	const handleOrderNowClick = (e) => {
		console.log(e.target.getAttribute('name'));
		history.push({
			pathname: '/order-now',
			state: { name: e.target.getAttribute('name') },
		});
	};

	return error ? (
		<span className="error-message">{error}</span>
	) : (
		<>
			<Header />
			<div>
				<Container>
					<Row>
						{coffeeData.map((coffee) => (
							<Col key={coffee._id}>
								<Card
									style={{
										width: '17rem',
										backgroundColor: 'transparent',
										border: 'none',
									}}
								>
									<Card.Img variant="top" src={coffee.imageCover} />
									<Card.Body onClick={handleOrderNowClick} name={coffee.name}>
										<Card.Title name={coffee.name}>{coffee.name}</Card.Title>
										<Card.Text name={coffee.name}>{coffee.price} EGP</Card.Text>
									</Card.Body>
								</Card>
							</Col>
						))}
					</Row>
				</Container>
			</div>
		</>
	);
};

export default Dashboard;
