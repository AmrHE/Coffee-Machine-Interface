import React, { useState } from 'react';
import axios from 'axios';
import './forgotPassword.css';

const ForgotPassword = () => {
	const [email, setEmail] = useState('');
	const [error, setError] = useState('');
	const [success, setSuccess] = useState('');

	const forgotPasswordHandler = async (e) => {
		e.preventDefault();
		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		};

		try {
			const { data } = await axios.post(
				'http://localhost:5000/api/v1/user/forgotPassword',
				{ email },
				config
			);

			setSuccess(data.data);
		} catch (error) {
			setError(error.response.data.error);
			setEmail('');
			setTimeout(() => {
				setError('');
			}, 5000);
		}
	};
	return (
		<div className="forgotpassword-screen">
			<form
				onSubmit={forgotPasswordHandler}
				className="forgotpassword-screen__form"
			>
				<h3 className="forgotpassword-screen__title">Forgot Password</h3>
				{error && <span className="error-message">{error}</span>}
				{success && <span className="success-message">{success}</span>}

				<div className="form-group">
					<p className="forgotpassword-screen__subtext">
						Please enter the email address you register your account with, We
						will send you reset password confirmation to this email
					</p>

					<label htmlFor="email">Email:</label>
					<input
						type="email"
						required
						id="email"
						placeholder="Enter your email address"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>
				</div>

				<button className="btn btn-primary" type="submit">
					Send Email
				</button>
			</form>
		</div>
	);
};

export default ForgotPassword;
