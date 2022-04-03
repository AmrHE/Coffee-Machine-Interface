import React from 'react';
import { Navbar, Container, Nav } from 'react-bootstrap';

const NavigationBar = () => {
	return (
		<Navbar bg="dark" variant="dark">
			<Container>
				<Navbar.Brand href="/">Esspresso Delivery</Navbar.Brand>

				<Nav>
					<Nav.Link href="/login">Login</Nav.Link>
				</Nav>
			</Container>
		</Navbar>
	);
};

export default NavigationBar;
