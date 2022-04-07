import { initializeApp } from 'firebase/app';
import {
	getAuth,
	signInWithPopup,
	GoogleAuthProvider,
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	signOut,
	onAuthStateChanged,
	User,
	NextOrObserver,
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
	QueryDocumentSnapshot,
} from 'firebase/firestore';

import { Category } from '../../store/categories/categories.types';

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

export type AdditionalInformation = {
	displayName?: string;
};

export type UserData = {
	createdAt: Date;
	displayName: string;
	email: string;
};

export const createUserDocumentFromAuth = async (
	userAuth: User,
	additional = {} as AdditionalInformation
): Promise<QueryDocumentSnapshot<UserData> | void> => {
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
			console.error(err);
		}
	}

	return userSnapshot as QueryDocumentSnapshot<UserData>;
};

export const createAuthUserWithEmailAndPassword = async (email: string, password: string) => {
	if (!email || !password) return;
	return await createUserWithEmailAndPassword(auth, email, password);
};

export const signInAuthUserWithEmailAndPassword = async (email: string, password: string) => {
	if (!email || !password) return;
	return await signInWithEmailAndPassword(auth, email, password);
};

export const signOutAuthUser = async () => {
	return await signOut(auth);
};

export const onAuthStateChangedListener = (callback: NextOrObserver<User>) =>
	onAuthStateChanged(auth, callback);

export type ObjectToAdd = {
	title: string;
};

export const addCollectionAndDocuments = async <T extends ObjectToAdd>(
	collectionKey: string,
	objectsToAdd: T[]
): Promise<void> => {
	const collectionRef = collection(db, collectionKey);
	const batch = writeBatch(db);
	objectsToAdd.forEach((object) => {
		const docRef = doc(collectionRef, object.title.toLowerCase());
		batch.set(docRef, object);
	});

	await batch.commit();
};

export const getCategoriesAndDocuments = async (): Promise<Category[]> => {
	const collectionRef = collection(db, 'categories');
	const q = query(collectionRef);

	const querySnapshot = await getDocs(q);
	return querySnapshot.docs.map((docSnapshot) => docSnapshot.data() as Category);
};

export const getCurrentUser = ():Promise<User | null> => {
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
