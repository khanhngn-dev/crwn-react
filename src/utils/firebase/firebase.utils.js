import { initializeApp } from 'firebase/app';
import {
	getAuth,
	signInWithPopup,
	GoogleAuthProvider,
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	signOut,
	onAuthStateChanged,
} from 'firebase/auth';
import {
	getFirestore,
	doc,
	getDoc,
	setDoc,
	collection,
	writeBatch,
	query,
	getDocs,
} from 'firebase/firestore';

const firebaseConfig = {
	apiKey: 'AIzaSyDacAlCqEEz7LksNIzMCgqtU_1MJft_aXY',
	authDomain: 'crwn-clothing-be892.firebaseapp.com',
	projectId: 'crwn-clothing-be892',
	storageBucket: 'crwn-clothing-be892.appspot.com',
	messagingSenderId: '153098366072',
	appId: '1:153098366072:web:65a56c177c2ea0015cd18d',
	measurementId: 'G-LLGZNFDLLL',
};

// eslint-disable-next-line
const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({
	prompt: 'select_account',
});

export const auth = getAuth();
export const db = getFirestore();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const createUserDocumentFromAuth = async (userAuth, additional = {}) => {
	if (!userAuth) return;
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
				...additional,
			});
		} catch (err) {
			console.error(err.message);
		}
	}

	return userSnapshot;
};

export const createAuthUserWithEmailAndPassword = async (email, password) => {
	if (!email || !password) return;
	return await createUserWithEmailAndPassword(auth, email, password);
};

export const signInAuthUserWithEmailAndPassword = async (email, password) => {
	if (!email || !password) return;
	return await signInWithEmailAndPassword(auth, email, password);
};

export const signOutAuthUser = async () => {
	return await signOut(auth);
};

export const onAuthStateChangedListener = (callback) => onAuthStateChanged(auth, callback);

export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
	const collectionRef = collection(db, collectionKey);
	const batch = writeBatch(db);
	objectsToAdd.forEach((object) => {
		const docRef = doc(collectionRef, object.title.toLowerCase());
		batch.set(docRef, object);
	});

	await batch.commit();
};

export const getCategoriesAndDocuments = async () => {
	const collectionRef = collection(db, 'categories');
	const q = query(collectionRef);

	const querySnapshot = await getDocs(q);
	return querySnapshot.docs.map((docSnapshot) => docSnapshot.data());
};

export const getCurrentUser = () => {
	return new Promise((resolve, reject) => {
		const unsub = onAuthStateChanged(
			auth,
			(userAuth) => {
				unsub();
				resolve(userAuth);
			},
			reject
		);
	});
};
