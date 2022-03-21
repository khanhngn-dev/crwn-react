import { useState } from 'react';
import {
	createAuthUserWithEmailAndPassword,
	createUserDocumentFromAuth,
} from '../../utils/firebase/firebase.utils';

import FormInput from '../form-input/form-input.component';
import Button from '../button/button.component';

import './signup.styles.scss';

const defaultFormFields = {
	displayName: '',
	email: '',
	password: '',
	confirmPassword: '',
};

const SignUpForm = () => {
	const [formFields, setFormFields] = useState(defaultFormFields);
	const { displayName, email, password, confirmPassword } = formFields;

	const resetForm = () => {
		setFormFields(defaultFormFields);
	};

	const handleSubmit = async (event) => {
		event.preventDefault();
		if (password !== confirmPassword) {
			alert('Passwords do not match');
			return;
		}
		try {
			const { user } = await createAuthUserWithEmailAndPassword(email, password);
			await createUserDocumentFromAuth(user, { displayName });
			resetForm();
		} catch (err) {
			if (err.code === 'auth/email-already-in-use') {
				alert('Cannot create user, email already in use');
			} else console.error(err.message);
		}
	};

	const handleChange = (event) => {
		const { name, value } = event.target;
		setFormFields({ ...formFields, [name]: value });
	};

	return (
		<div className='sign-up-container'>
			<h2>Don't have an account?</h2>
			<span>Sign up with email and password</span>
			<form onSubmit={handleSubmit}>
				<FormInput
					label='Display Name'
					required
					name='displayName'
					type='text'
					onChange={handleChange}
					value={displayName}
				/>
				<FormInput
					label='Email'
					required
					name='email'
					type='email'
					onChange={handleChange}
					value={email}
				/>
				<FormInput
					label='Password'
					required
					name='password'
					type='password'
					onChange={handleChange}
					value={password}
					minLength={6}
				/>
				<FormInput
					label='Confirm Password'
					required
					name='confirmPassword'
					type='password'
					onChange={handleChange}
					value={confirmPassword}
					minLength={6}
				/>
				<Button type='submit'>SIGN UP</Button>
			</form>
		</div>
	);
};

export default SignUpForm;
