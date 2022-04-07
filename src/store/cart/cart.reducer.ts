// import { CART_TYPES } from './cart.types';
import { setIsCartOpen, setCartItem } from './cart.action';
import { CartItem } from './cart.types';
import { AnyAction } from 'redux';

export type CartState = {
	readonly cartItems: CartItem[];
	readonly isCartOpen: boolean;
};

export const INITIAL_STATE: CartState = {
	// cartCount: 0,
	// cartTotal: 0,
	cartItems: [],
	isCartOpen: false,
};

export const cartReducer = (state = INITIAL_STATE, action: AnyAction): CartState => {
	if (setIsCartOpen.match(action)) {
		return { ...state, isCartOpen: action.payload };
	}

	if (setCartItem.match(action)) {
		return { ...state, cartItems: action.payload };
	}

	return state;
	// const { type, payload } = action;
	// switch (type) {
	// 	case CART_TYPES.TOGGLE_CART:
	// 		return {
	// 			...state,
	// 			isCartOpen: payload,
	// 		};
	// 	case CART_TYPES.SET_CART_ITEM:
	// 		return {
	// 			...state,
	// 			cartItems: payload,
	// 		};
	// 	default:
	// 		return state;
	// }
};
