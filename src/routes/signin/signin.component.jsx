import { signInWithGooglePopup } from '../../utils/firebase/firebase.utils';

const SignIn = () => {
	const logGoogleUser = async () => {
		const response = await signInWithGooglePopup();
	};
	return (
		<div>
			<button onClick={logGoogleUser}>Sign In With Google</button>
		</div>
	);
};

export default SignIn;
