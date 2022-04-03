import React from 'react';
import moment from 'moment';

import './header.css';
import { useHistory } from 'react-router-dom';

const Header = () => {
	const history = useHistory();

	const logoutHandler = () => {
		localStorage.removeItem('authToken');
		history.push('/login');
	};
	return (
		<div className="header__container">
			<div className="time__container">
				<p>{moment().format('D MMM, YYYY')}</p>
				<span> | </span>
				<p>
					{new Date().toLocaleTimeString([], {
						hour: '2-digit',
						minute: '2-digit',
					})}
				</p>
			</div>
			<button className="coffee__logout-button" onClick={logoutHandler}>
				logout
			</button>
		</div>
	);
};

export default Header;
