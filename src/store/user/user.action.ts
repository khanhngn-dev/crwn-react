import { User } from 'firebase/auth';
import { UserData, AdditionalInformation } from '../../utils/firebase/firebase.utils';
import {
	createAction,
	Action,
	ActionWithPayload,
	withMatcher,
} from '../../utils/reducers/reducers.utils';
import { USER_TYPES } from './user.types';

export type SetCurrentUser = ActionWithPayload<USER_TYPES.SET_CURRENT_USER, UserData>

export const setCurrentUser = withMatcher(
	(user: UserData): SetCurrentUser => createAction(USER_TYPES.SET_CURRENT_USER, user)
);

export type CheckUserSession = Action<USER_TYPES.CHECK_USER_SESSION>;

export const checkUserSession = withMatcher(
	(): CheckUserSession => createAction(USER_TYPES.CHECK_USER_SESSION)
);

export type GoogleSignInStart = Action<USER_TYPES.GOOGLE_SIGN_IN_START>;

export const googleSignInStart = withMatcher(
	(): GoogleSignInStart => createAction(USER_TYPES.GOOGLE_SIGN_IN_START)
);

export type EmailSignInStart = ActionWithPayload<
	USER_TYPES.EMAIL_SIGN_IN_START,
	{ email: string; password: string }
>;

export const emailSignInStart = withMatcher(
	(email: string, password: string): EmailSignInStart =>
		createAction(USER_TYPES.EMAIL_SIGN_IN_START, { email, password })
);

export type SignInSuccess = ActionWithPayload<USER_TYPES.SIGN_IN_SUCCESS, UserData>;

export const signInSuccess = withMatcher(
	(user: UserData & { id: string }): SignInSuccess => createAction(USER_TYPES.SIGN_IN_SUCCESS, user)
);

export type SignInFailure = ActionWithPayload<USER_TYPES.SIGN_IN_FAILURE, Error>;

export const signInFailure = withMatcher(
	(err: Error): SignInFailure => createAction(USER_TYPES.SIGN_IN_FAILURE, err)
);

export type SignUpStart = ActionWithPayload<
	USER_TYPES.SIGN_UP_START,
	{ email: string; password: string; displayName: string }
>;

export const signUpStart = withMatcher(
	(email: string, password: string, displayName: string): SignUpStart =>
		createAction(USER_TYPES.SIGN_UP_START, { email, password, displayName })
);

export type SignUpSuccess = ActionWithPayload<
	USER_TYPES.SIGN_UP_SUCCESS,
	{ user: User; additional: AdditionalInformation }
>;

export const signUpSuccess = withMatcher(
	(user: User, additional: AdditionalInformation): SignUpSuccess =>
		createAction(USER_TYPES.SIGN_UP_SUCCESS, { user, additional })
);

export const signUpFailure = withMatcher((err: Error) =>
	createAction(USER_TYPES.SIGN_UP_FAILURE, err)
);

export type SignOutStart = Action<USER_TYPES.SIGN_OUT_START>;

export const signOutStart = withMatcher(
	(): SignOutStart => createAction(USER_TYPES.SIGN_OUT_START)
);

export type SignOutSuccess = Action<USER_TYPES.SIGN_OUT_SUCCESS>;

export const signOutSuccess = withMatcher(
	(): SignOutSuccess => createAction(USER_TYPES.SIGN_OUT_SUCCESS)
);

export type SignOutFailure = ActionWithPayload<USER_TYPES.SIGN_OUT_FAILURE, Error>;

export const signOutFailure = withMatcher(
	(err: Error): SignOutFailure => createAction(USER_TYPES.SIGN_OUT_FAILURE, err)
);
