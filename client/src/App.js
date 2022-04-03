import { BrowserRouter, Switch, Router, Route } from 'react-router-dom';

import PrivateRoute from './routing/PrivateRoute';

import Signup from './pages/signup/Signup';
import Login from './pages/login/Login';
import Dashboard from './pages/dashboard/Dashboard';
import HomePage from './pages/homePage/HomePage';
import OrderNow from './pages/orderNow/OrderNow';
import OrderProgress from './pages/orderProgress/OrderProgress';
import CompletedOrder from './pages/completedOrder/CompletedOrder';
import ForgotPassword from './pages/forgotPassword/ForgotPassword';
import ResetPassword from './pages/resetPassword/ResetPassword';

import './App.css';

const App = () => {
	return (
		<BrowserRouter>
			<div className="app">
				<Switch>
					<Route path="/" exact component={HomePage} />
					<Route path="/order-now" exact component={OrderNow} />
					<Route path="/order-in-progress" exact component={OrderProgress} />
					<Route path="/completed-order" exact component={CompletedOrder} />
					<PrivateRoute exact path="/dashboard" component={Dashboard} />
					<Route path="/login" exact component={Login} />
					<Route path="/signup" exact component={Signup} />
					<Route path="/forgotpassword" exact component={ForgotPassword} />
					<Route
						path="/resetPassword/:resetToken"
						exact
						component={ResetPassword}
					/>
				</Switch>
			</div>
		</BrowserRouter>
	);
};

export default App;
