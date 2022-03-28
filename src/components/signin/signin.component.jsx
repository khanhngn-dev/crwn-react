import { useState } from 'react';
import { useDispatch } from 'react-redux';


import FormInput from '../form-input/form-input.component';
import Button, { BUTTON_TYPE_CLASSES } from '../button/button.component';
import { googleSignInStart, emailSignInStart } from '../../store/user/user.action';

import './signin.styles.scss';

const defaultFormFields = {
	email: '',
	password: '',
};

const SignInForm = () => {
	const dispatch = useDispatch();
	const [formFields, setFormFields] = useState(defaultFormFields);
	const { email, password } = formFields;

	const resetForm = () => {
		setFormFields(defaultFormFields);
	};

	const signInWithGoogle = async () => {
		dispatch(googleSignInStart());
	};

	const handleChange = (event) => {
		const { name, value } = event.target;
		setFormFields({ ...formFields, [name]: value });
	};

	const handleSubmit = async (event) => {
		event.preventDefault();
		try {
			dispatch(emailSignInStart(email, password));
			resetForm();
		} catch (err) {
			switch (err.code) {
				case 'auth/wrong-password':
					alert('Incorrect Password Or Email');
					break;
				case 'auth/user-not-found':
					alert('No user associated with this email');
					break;
				default:
					console.error(err.message);
			}
		}
	};
	return (
		<div className='sign-up-container'>
			<h2>Already have an account?</h2>
			<span>Sign in with email and password</span>
			<form onSubmit={handleSubmit}>
				<FormInput
					label='Email'
					required
					name='email'
					type='email'
					value={email}
					onChange={handleChange}
				/>
				<FormInput
					label='Password'
					required
					name='password'
					type='password'
					value={password}
					onChange={handleChange}
					minLength={6}
				/>
				<div className='button-containers'>
					<Button type='submit'>SIGN IN</Button>
					<Button buttonType={BUTTON_TYPE_CLASSES.google} onClick={signInWithGoogle} type='button'>
						Google Sign In
					</Button>
				</div>
			</form>
		</div>
	);
};

export default SignInForm;
