import { initializeApp } from 'firebase/app';
import { getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';

const firebaseConfig = {
	apiKey: 'AIzaSyDacAlCqEEz7LksNIzMCgqtU_1MJft_aXY',
	authDomain: 'crwn-clothing-be892.firebaseapp.com',
	projectId: 'crwn-clothing-be892',
	storageBucket: 'crwn-clothing-be892.appspot.com',
	messagingSenderId: '153098366072',
	appId: '1:153098366072:web:65a56c177c2ea0015cd18d',
	measurementId: 'G-LLGZNFDLLL',
};

const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({
	prompt: 'select_account',
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
	const userDocRef = doc(db, `/users`, userAuth.uid);
	const userSnapshot = await getDoc(userDocRef);

	if (!userSnapshot.exists()) {
		const { displayName, email } = userAuth;
		const createdAt = new Date();
		try {
			setDoc(userDocRef, {
				displayName,
				email,
				createdAt,
			});
		} catch (error) {
			console.error(error.message);
		}
	}

	return userDocRef;
};
