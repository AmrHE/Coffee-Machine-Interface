import { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import './resetPassword.css';

const ResetPasswordScreen = ({ history, match }) => {
	const [password, setPassword] = useState('');
	const [passwordConfirm, setPasswordConfirm] = useState('');
	const [error, setError] = useState('');
	const [success, setSuccess] = useState('');

	const resetPasswordHandler = async (e) => {
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
			}, 5000);
			return setError("Passwords don't match");
		}

		try {
			const { data } = await axios.patch(
				`http://localhost:5000/api/v1/users/resetPassword/${match.params.resetToken}`,
				{
					password,
				},
				config
			);

			setSuccess(data.data);
		} catch (error) {
			setError(error.response.data.error);
			setTimeout(() => {
				setError('');
			}, 5000);
		}
	};

	return (
		<div className="resetpassword-screen">
			<form
				onSubmit={resetPasswordHandler}
				className="resetpassword-screen__form"
			>
				<h3 className="resetpassword-screen__title">Forgot Password</h3>
				{error && <span className="error-message">{error} </span>}
				{success && (
					<span className="success-message">
						{success} <Link to="/login">Login</Link>
					</span>
				)}
				<div className="form-group">
					<label htmlFor="password">New Password:</label>
					<input
						type="password"
						required
						id="password"
						placeholder="Enter new password"
						autoComplete="true"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>
				</div>
				<div className="form-group">
					<label htmlFor="confirmpassword">Confirm New Password:</label>
					<input
						type="password"
						required
						id="confirmpassword"
						placeholder="Confirm new password"
						autoComplete="true"
						value={passwordConfirm}
						onChange={(e) => setPasswordConfirm(e.target.value)}
					/>
				</div>
				<button type="submit" className="btn btn-primary">
					Reset Password
				</button>
			</form>
		</div>
	);
};

export default ResetPasswordScreen;
