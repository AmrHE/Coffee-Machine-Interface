import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

import './login.css';

const Login = ({ history }) => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState('');

	useEffect(() => {
		if (localStorage.getItem('authToken')) {
			history.push('/dashboard');
		}
	}, [history]);

	const loginHandler = async (e) => {
		e.preventDefault();
		const config = {
			header: {
				'Content-Type': 'application/json',
			},
		};

		try {
			const { data } = await axios.post(
				'/api/v1/users/login',
				{
					email,
					password,
				},
				config
			);
			console.log(data);
			localStorage.setItem('authToken', data.token);
			history.push('/dashboard');
		} catch (error) {
			setError(error.response.data.error);
			setTimeout(() => {
				setError('');
			}, 5000);
		}
	};

	return (
		<div className="login-screen">
			<form className="login-screen__form" onSubmit={loginHandler}>
				<h3 className="login-screen__title">Login</h3>

				{error && <span className="error-message">{error}</span>}

				<div className="form-group">
					<label htmlFor="email">Email</label>
					<input
						type="email"
						required
						id="email"
						placeholder="Enter email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						tabIndex={1}
					/>
				</div>

				<div className="form-group">
					<label htmlFor="password">
						Password:
						<Link
							to="/forgotpassword"
							className="login-screen__forgotpassword"
							tabIndex={4}
						>
							Forgot Password?
						</Link>
					</label>
					<input
						type="password"
						required
						id="password"
						placeholder="Enter password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						tabIndex={1}
					/>
				</div>

				<button type="submit" className="btn btn-primary" tabIndex={3}>
					Login
				</button>

				<span className="login-screen__submit">
					Don't have an account? <Link to="/signup">Register</Link>
				</span>
			</form>
		</div>
	);
};

export default Login;
