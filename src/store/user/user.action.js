import { createAction } from '../../utils/reducers/reducers.utils';
import { USER_TYPES } from './user.types';

export const setCurrentUser = (user) => createAction(USER_TYPES.SET_CURRENT_USER, user);

export const checkUserSession = () => createAction(USER_TYPES.CHECK_USER_SESSION);

export const googleSignInStart = () => createAction(USER_TYPES.GOOGLE_SIGN_IN_START);

export const emailSignInStart = (email, password) =>
	createAction(USER_TYPES.EMAIL_SIGN_IN_START, { email, password });

export const signInSuccess = (user) => createAction(USER_TYPES.SIGN_IN_SUCCESS, user);

export const signInFailure = (err) => createAction(USER_TYPES.SIGN_IN_FAILURE, err);

export const signUpStart = (email, password, displayName) =>
	createAction(USER_TYPES.SIGN_UP_START, { email, password, displayName });

export const signUpSuccess = (user, additional) =>
	createAction(USER_TYPES.SIGN_UP_SUCCESS, { user, additional });

export const signUpFailure = (err) => createAction(USER_TYPES.SIGN_UP_FAILURE, err);

export const signOutStart = () => createAction(USER_TYPES.SIGN_OUT_START);

export const signOutSuccess = () => createAction(USER_TYPES.SIGN_OUT_SUCCESS);

export const signOutFailure = (err) => createAction(USER_TYPES.SIGN_OUT_FAILURE, err);
