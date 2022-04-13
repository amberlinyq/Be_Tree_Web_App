import React from 'react';
import './Login.css';
import * as FcIcons from 'react-icons/fc';
import * as AiIcons from 'react-icons/Ai';
import * as BsIcons from 'react-icons/Bs';


const Login = () => {
	const google = () => {
		window.open('http://localhost:8080/auth/google', '_self');
	};
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
					<input type='text' placeholder='Username' />
					<input type='text' placeholder='Password' />
					<button className='submit'>Login</button>
				</div>
			</div>
		</div>
	);
};

export default Login;
