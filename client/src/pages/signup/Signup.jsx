import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

import './signup.css';

const Signup = ({ history }) => {
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [passwordConfirm, setPasswordConfirm] = useState('');
	const [error, setError] = useState('');

	useEffect(() => {
		if (localStorage.getItem('authToken')) {
			history.push('/dashboard');
		}
	}, [history]);

	const registerHandler = async (e) => {
		e.preventDefault();
		const config = {
			header: {
				'Content-Type': 'application/json',
			},
		};

		if (password !== passwordConfirm) {
			setPassword('');
			setPasswordConfirm('');
			setTimeout(() => {
				setError('');
			});

			return setError('Passwords do not match');
		}

		try {
			const { data } = await axios.post(
				'/api/v1/users/signup',
				{
					name,
					email,
					password,
					passwordConfirm,
				},
				config
			);

			localStorage.setItem('authToken', data.token);
			history.push('/dashboard');
		} catch (error) {
			console.log('ERROR: ' + error);
			setError(error.response.data.error);
			setTimeout(() => {
				setError('');
			}, 5000);
		}
	};

	return (
		<div className="signup-screen">
			<form className="signup-screen__form" onSubmit={registerHandler}>
				<h3 className="signup-screen__title">Register</h3>

				{error && <span className="error-message">{error}</span>}

				<div className="form-group">
					<label htmlFor="name">Username</label>
					<input
						type="text"
						required
						id="name"
						placeholder="Enter username"
						value={name}
						onChange={(e) => setName(e.target.value)}
					/>
				</div>

				<div className="form-group">
					<label htmlFor="email">Email</label>
					<input
						type="email"
						required
						id="email"
						placeholder="Enter email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>
				</div>

				<div className="form-group">
					<label htmlFor="password">Password</label>
					<input
						type="password"
						required
						id="password"
						placeholder="Enter password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>
				</div>
				<div className="form-group">
					<label htmlFor="password">Confirm Password</label>
					<input
						type="password"
						required
						id="passwordConfirm"
						placeholder="Confirm password"
						value={passwordConfirm}
						onChange={(e) => setPasswordConfirm(e.target.value)}
					/>
				</div>

				<button type="submit" className="btn btn-primary">
					Register
				</button>

				<span className="signup-screen__submit">
					Already have an account? <Link to="/login">Login</Link>
				</span>
			</form>
		</div>
	);
};

export default Signup;
