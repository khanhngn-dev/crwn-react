import SignUpForm from '../../components/signup/signup.component';
import SignInForm from '../../components/signin/signin.component';

import './authentication.styles.scss';

const Authentication = () => {
	return (
		<div className='authentication-container'>
			<SignInForm />
			<SignUpForm />
		</div>
	);
};

export default Authentication;
