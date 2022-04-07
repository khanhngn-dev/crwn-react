import { takeLatest, call, all, put } from 'typed-redux-saga/macro';
import { USER_TYPES } from './user.types';
import {
	signInSuccess,
	signInFailure,
	signUpSuccess,
	signUpFailure,
	signOutSuccess,
	signOutFailure,
	EmailSignInStart,
	SignUpStart,
	SignUpSuccess,
} from './user.action';
import {
	getCurrentUser,
	createUserDocumentFromAuth,
	signInWithGooglePopup,
	signInAuthUserWithEmailAndPassword,
	createAuthUserWithEmailAndPassword,
	signOutAuthUser,
	AdditionalInformation,
} from '../../utils/firebase/firebase.utils';
import { User } from 'firebase/auth';

export function* getSnapshotFromUserAuth(userAuth: User, additional?: AdditionalInformation) {
	try {
		const userSnapshot = yield* call(createUserDocumentFromAuth, userAuth, additional);
		if (userSnapshot) yield* put(signInSuccess({ id: userSnapshot.id, ...userSnapshot.data() }));
	} catch (err) {
		yield* put(signInFailure(err as Error));
	}
}

export function* isUserAuthenticated() {
	try {
		const userAuth = yield* call(getCurrentUser);
		if (!userAuth) return;
		yield* call(getSnapshotFromUserAuth, userAuth);
	} catch (err) {
		yield* put(signInFailure(err as Error));
	}
}

export function* signInWithGoogle() {
	try {
		const { user } = yield* call(signInWithGooglePopup);
		yield* call(getSnapshotFromUserAuth, user);
	} catch (err) {
		yield* put(signInFailure(err as Error));
	}
}

export function* signInWithEmail({ payload: { email, password } }: EmailSignInStart) {
	try {
		const userCred = yield* call(signInAuthUserWithEmailAndPassword, email, password);
		if (userCred) {
			const { user } = userCred;
			yield* call(getSnapshotFromUserAuth, user);
		}
	} catch (err) {
		yield* put(signInFailure(err as Error));
	}
}

export function* signUp({ payload: { email, password, displayName } }: SignUpStart) {
	try {
		const userCred = yield* call(createAuthUserWithEmailAndPassword, email, password);
		if (userCred) {
			const { user } = userCred;
			yield* put(signUpSuccess(user, { displayName }));
		}
	} catch (err) {
		yield* put(signUpFailure(err as Error));
	}
}

export function* signInAfterSignUp({ payload: { user, additional } }: SignUpSuccess) {
	yield* call(getSnapshotFromUserAuth, user, additional);
}

export function* signOut() {
	try {
		yield* call(signOutAuthUser);
		yield* put(signOutSuccess());
	} catch (err) {
		yield* put(signOutFailure(err as Error));
	}
}

export function* onGoogleSignInStart() {
	yield* takeLatest(USER_TYPES.GOOGLE_SIGN_IN_START, signInWithGoogle);
}

export function* onEmailSignInStart() {
	yield* takeLatest(USER_TYPES.EMAIL_SIGN_IN_START, signInWithEmail);
}

export function* onSignUpStart() {
	yield* takeLatest(USER_TYPES.SIGN_UP_START, signUp);
}

export function* onSignUpSuccess() {
	yield* takeLatest(USER_TYPES.SIGN_UP_SUCCESS, signInAfterSignUp);
}

export function* onSignOutStart() {
	yield* takeLatest(USER_TYPES.SIGN_OUT_START, signOut);
}

export function* onCheckUserSession() {
	yield* takeLatest(USER_TYPES.CHECK_USER_SESSION, isUserAuthenticated);
}
export function* userSaga() {
	yield* all([
		call(onCheckUserSession),
		call(onGoogleSignInStart),
		call(onEmailSignInStart),
		call(onSignUpStart),
		call(onSignUpSuccess),
		call(onSignOutStart),
	]);
}
