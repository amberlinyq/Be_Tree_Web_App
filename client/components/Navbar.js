import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../store';
import * as AiIcons from 'react-icons/ai';
import './Navbar.css';

const Navbar = ({ handleClick, isLoggedIn }) => (
	<div className='navbar_container'>
		<div className='logo_container'>
			{' '}
			<AiIcons.AiOutlineRobot className='logo narvar_child' />
			<span className='logo_name'>ThreeTech</span>
		</div>

		<nav className='navbar_right'>
			{isLoggedIn ? (
				<div className='nav_right'>
					{/* The navbar will show these links after you log in */}
					{/* <Link to='/home'>Home</Link> */}
          <a href='#' onClick={handleClick}>
						Dashboard
					</a>
					<a href='/' onClick={handleClick}>
						Logout
					</a>
				</div>
			) : (
				<div className='nav_right'>
					{/* The navbar will show these links before you log in */}
					<Link to='/login'>Login</Link>
					<Link to='/signup'>Sign Up</Link>
				</div>
			)}
		</nav>
	</div>
);

/**
 * CONTAINER
 */
const mapState = (state) => {
	return {
		isLoggedIn: !!state.auth.id,
	};
};

const mapDispatch = (dispatch) => {
	return {
		handleClick() {
			dispatch(logout());
		},
	};
};

export default connect(mapState, mapDispatch)(Navbar);
