import React from 'react';
import NavigationBar from '../../components/navbar/Navbar';
import './homePage.css';

const HomePage = () => {
	return (
		<>
			<NavigationBar />
			<div className="homepage__contianer">
				<div className="homepage__container-text">
					Wanna Coffee? Just <a href="/login">Login</a>{' '}
				</div>
			</div>
		</>
	);
};

export default HomePage;
