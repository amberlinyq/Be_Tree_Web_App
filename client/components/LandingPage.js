import React from 'react';
import { connect } from 'react-redux';
import './LandingPage.css';
import Navbar from './Navbar';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

/**
 * COMPONENT
 */
export const LandingPage = (props) => {
	const { username } = props;
	const [user, setUser] = useState(null);

	useEffect(() => {
		const getUser = () => {
			fetch('http://localhost:8080/auth/login/success', {
				method: 'GET',
				credentials: 'include',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
					'Access-Control-Allow-Credentials': true,
				},
			})
				.then((response) => {
					if (response.status === 200) return response.json();
					throw new Error('authentication has been failed!');
				})
				.then((resObject) => {
					setUser(resObject.user);
				})
				.catch((err) => {
					console.log(err);
				});
		};
		getUser();
	}, []);
	console.log('user=====', user);

	return (
		<div className='landing_container'>
			<Navbar user={user} />
			<video src='todo3.mp4' autoPlay loop muted />
			<div className='intro_container'>
				<h1 className='intro_header'>
					Stay Creative
					<br />
					Stay Organized{' '}
				</h1>
				<p className='intro_text'>
					Join millions of people to capture ideas, organize life, and do
					something creative everyday.
				</p>
				<Link className='intro_btn' to='/signup'>
					Get Started
				</Link>
			</div>
		</div>
	);
};

/**
 * CONTAINER
 */
const mapState = (state) => {
	return {
		username: state.auth.username,
	};
};

export default connect(mapState)(LandingPage);
