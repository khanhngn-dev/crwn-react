import { CART_TYPES } from './cart.types';

export const INITIAL_STATE = {
	// cartCount: 0,
	// cartTotal: 0,
	cartItems: [],
	isCartOpen: false,
};

export const cartReducer = (state = INITIAL_STATE, action) => {
	const { type, payload } = action;
	switch (type) {
		case CART_TYPES.TOGGLE_CART:
			return {
				...state,
				isCartOpen: payload,
			};
		case CART_TYPES.SET_CART_ITEM:
			return {
				...state,
				cartItems: payload,
			};
		default:
			return state;
	}
};
