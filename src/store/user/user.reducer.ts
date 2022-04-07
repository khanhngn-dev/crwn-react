import { AnyAction } from 'redux';
import { UserData } from '../../utils/firebase/firebase.utils';
import {
	signInFailure,
	signInSuccess,
	signOutFailure,
	signOutSuccess,
	signUpFailure,
} from './user.action';

export type UserState = {
	readonly currentUser: null | UserData;
	readonly isLoading: boolean;
	readonly error: null | Error;
};

const INITIAL_STATE: UserState = {
	currentUser: null,
	isLoading: false,
	error: null,
};

export const userReducer = (state = INITIAL_STATE, action: AnyAction) => {
	if (signInSuccess.match(action)) {
		return {
			...state,
			currentUser: action.payload,
		};
	}
	if (signOutSuccess.match(action)) {
		return {
			...state,
			currentUser: null,
		};
	}
	if (signOutFailure.match(action) || signInFailure.match(action) || signUpFailure.match(action)) {
		return {
			...state,
			error: action.payload,
		};
	}
	return state;
	// const { type, payload } = action;
	// switch (type) {
	// 	case USER_TYPES.SIGN_IN_SUCCESS:
	// 		return {
	// 			...state,
	// 			currentUser: payload,
	// 		};
	// 	case USER_TYPES.SIGN_OUT_SUCCESS:
	// 		return {
	// 			...state,
	// 			currentUser: null,
	// 		};
	// 	case USER_TYPES.SIGN_IN_FAILURE:
	// 	case USER_TYPES.SIGN_OUT_FAILURE:
	// 	case USER_TYPES.SIGN_UP_FAILURE:
	// 		return {
	// 			...state,
	// 			error: payload,
	// 		};
	// 	default:
	// 		return state;
	// }
};
