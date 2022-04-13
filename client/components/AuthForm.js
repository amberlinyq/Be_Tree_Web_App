// import React from 'react'
// import {connect} from 'react-redux'
// import {authenticate} from '../store'

// /**
//  * COMPONENT
//  */
// const AuthForm = props => {
//   const {name, displayName, handleSubmit, error} = props

//   return (
//     <div>
//       <form onSubmit={handleSubmit} name={name}>
//         <div>
//           <label htmlFor="username">
//             <small>Username</small>
//           </label>
//           <input name="username" type="text" />
//         </div>
//         <div>
//           <label htmlFor="password">
//             <small>Password</small>
//           </label>
//           <input name="password" type="password" />
//         </div>
//         <div>
//           <button type="submit">{displayName}</button>
//         </div>
//         {error && error.response && <div> {error.response.data} </div>}
//       </form>
//     </div>
//   )
// }

// /**
//  * CONTAINER
//  *   Note that we have two different sets of 'mapStateToProps' functions -
//  *   one for Login, and one for Signup. However, they share the same 'mapDispatchToProps'
//  *   function, and share the same Component. This is a good example of how we
//  *   can stay DRY with interfaces that are very similar to each other!
//  */
// const mapLogin = state => {
//   return {
//     name: 'login',
//     displayName: 'Login',
//     error: state.auth.error
//   }
// }

// const mapSignup = state => {
//   return {
//     name: 'signup',
//     displayName: 'Sign Up',
//     error: state.auth.error
//   }
// }

// const mapDispatch = dispatch => {
//   return {
//     handleSubmit(evt) {
//       evt.preventDefault()
//       const formName = evt.target.name
//       const username = evt.target.username.value
//       const password = evt.target.password.value
//       dispatch(authenticate(username, password, formName))
//     }
//   }
// }

// export const Login = connect(mapLogin, mapDispatch)(AuthForm)
// export const Signup = connect(mapSignup, mapDispatch)(AuthForm)

import React from 'react';
import { connect } from 'react-redux';
import { authenticate } from '../store';
import './Login.css';
import * as FcIcons from 'react-icons/fc';
import * as AiIcons from 'react-icons/Ai';
import * as BsIcons from 'react-icons/Bs';
/**
 * COMPONENT
 */
const AuthForm = (props) => {
	const google = () => {
		window.open('http://localhost:8080/auth/google', '_self');
	};
	const { name, displayName, handleSubmit, error } = props;

	return (
		<div className='login'>
			{/* <h1 className='loginTitle'>Choose a Login Method</h1> */}
			<div className='wrapper'>
				<div className='left'>
					<div className='loginButton google' onClick={google}>
						<FcIcons.FcGoogle />
						Google
					</div>
					<div className='loginButton facebook'>
						<AiIcons.AiFillFacebook />
						Facebook
					</div>
					<div className='loginButton apple'>
						<BsIcons.BsApple />
						Apple
					</div>
				</div>
				<div className='center'>
					<div className='line' />
					<div className='or'>OR</div>
				</div>
				<div className='right'>
					<form onSubmit={handleSubmit} name={name}>
						<div>
							<label htmlFor='username'>
								<small>Username</small>
							</label>
							<input name='username' type='text' />
						</div>
						<div>
							<label htmlFor='password'>
								<small>Password</small>
							</label>
							<input name='password' type='password' />
						</div>
						<div>
							<button type='submit'>{displayName}</button>
						</div>
						{error && error.response && <div> {error.response.data} </div>}
					</form>
				</div>
			</div>
		</div>
	);
};

/**
 * CONTAINER
 *   Note that we have two different sets of 'mapStateToProps' functions -
 *   one for Login, and one for Signup. However, they share the same 'mapDispatchToProps'
 *   function, and share the same Component. This is a good example of how we
 *   can stay DRY with interfaces that are very similar to each other!
 */
const mapLogin = (state) => {
	return {
		name: 'login',
		displayName: 'Login',
		error: state.auth.error,
	};
};

const mapSignup = (state) => {
	return {
		name: 'signup',
		displayName: 'Sign Up',
		error: state.auth.error,
	};
};

const mapDispatch = (dispatch) => {
	return {
		handleSubmit(evt) {
			evt.preventDefault();
			const formName = evt.target.name;
			const username = evt.target.username.value;
			const password = evt.target.password.value;
			dispatch(authenticate(username, password, formName));
		},
	};
};

export const Login = connect(mapLogin, mapDispatch)(AuthForm);
export const Signup = connect(mapSignup, mapDispatch)(AuthForm);
