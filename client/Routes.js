import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { withRouter, Route, Switch, Redirect } from 'react-router-dom';
import { Login, Signup } from './components/AuthForm';
import Home from './components/Home';
import { me } from './store';
import LandingPage from './components/LandingPage';

/**
 * COMPONENT
 */
class Routes extends Component {
	componentDidMount() {
		this.props.loadInitialData();
	}

	render() {
		const { isLoggedIn } = this.props;

		return (
			<div>
				{isLoggedIn ? (
					<Switch>
						<Route path='/' exact component={LandingPage} />
						<Route path='/home' component={Home} />
						<Redirect to='/' />
					</Switch>
				) : (
					<Switch>
						<Route path='/' exact component={LandingPage} />
						<Route path='/login' component={Login} />
						<Route path='/signup' component={Signup} />
					</Switch>
				)}
			</div>
		);
	}
}

/**
 * CONTAINER
 */
const mapState = (state) => {
	return {
		// Being 'logged in' for our purposes will be defined has having a state.auth that has a truthy id.
		// Otherwise, state.auth will be an empty object, and state.auth.id will be falsey
		isLoggedIn: !!state.auth.id,
	};
};

const mapDispatch = (dispatch) => {
	return {
		loadInitialData() {
			dispatch(me());
		},
	};
};

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes));


// import React, { Component, Fragment } from 'react';
// import { connect } from 'react-redux';
// import {
// 	withRouter,
// 	Route,
// 	Switch,
// 	Redirect,
// 	Navigate,
// 	BrowserRouter,
// } from 'react-router-dom';
// import { Signup } from './components/AuthForm';
// import Login from './components/Login';
// import Home from './components/Home';
// import { me } from './store';
// import LandingPage from './components/LandingPage';
// import { useEffect, useState } from 'react';

// /**
//  * COMPONENT
//  */

// const Routes = (props) => {
// 	console.log('props===', props);
// 	const [user, setUser] = useState(null);
// 	useEffect(() => {
// 		props.loadInitialData();
// 	});

// 	useEffect(() => {
// 		const getUser = () => {
// 			fetch('http://localhost:8080/auth/login/success', {
// 				method: 'GET',
// 				credentials: 'include',
// 				headers: {
// 					Accept: 'application/json',
// 					'Content-Type': 'application/json',
// 					'Access-Control-Allow-Credentials': true,
// 				},
// 			})
// 				.then((response) => {
// 					if (response.status === 200) return response.json();
// 					throw new Error('authentication has been failed!');
// 				})
// 				.then((resObject) => {
// 					setUser(resObject.user);
// 				})
// 				.catch((err) => {
// 					console.log(err);
// 				});
// 		};
// 		getUser();
// 	}, []);
// 	console.log('user=====', user);

// 	return (
// 		<>
// 			<BrowserRouter>
// 				<Route path='/' exact component={LandingPage} />
// 				{user ? (
// 					<Switch>
// 						<Route path='/' exact component={LandingPage} />
// 						<Route path='/home' component={Home} />
// 						<Redirect to='/' />
// 					</Switch>
// 				) : (
// 					<Switch>
// 						<Route path='/' exact component={LandingPage} />
// 						<Route path='/login' component={Login} />
// 						<Route path='/signup' component={Signup} />{' '}
// 					</Switch>
// 				)}
// 				{/* <Route path='/login' element={user ? <Navigate to='/' /> : <Login />} /> */}
// 			</BrowserRouter>
// 		</>
// 	);
// };
// const mapState = (state) => {
// 	return {
// 		// Being 'logged in' for our purposes will be defined has having a state.auth that has a truthy id.
// 		// Otherwise, state.auth will be an empty object, and state.auth.id will be falsey
// 		isLoggedIn: !!state.auth.id,
// 	};
// };

// const mapDispatch = (dispatch) => {
// 	return {
// 		loadInitialData() {
// 			dispatch(me());
// 		},
// 	};
// };

// // The `withRouter` wrapper makes sure that updates are not blocked
// // when the url changes
// export default withRouter(connect(mapState, mapDispatch)(Routes));