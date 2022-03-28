import { CART_TYPES } from './cart.types';
import { createAction } from '../../utils/reducers/reducers.utils';

const addCartItem = (cartItems, productToAdd) => {
	const existingCartItem = cartItems.find((product) => product.id === productToAdd.id);
	return existingCartItem
		? cartItems.map((product) =>
				product.id === productToAdd.id
					? {
							...product,
							quantity: product.quantity + 1,
					  }
					: product
		  )
		: [...cartItems, { ...productToAdd, quantity: 1 }];
};

const removeCartItem = (cartItems, productToRemove) => {
	const existingCartItem = cartItems.find((product) => product.id === productToRemove.id);

	if (existingCartItem.quantity === 1) {
		return cartItems.filter((product) => product.id !== productToRemove.id);
	} else {
		return cartItems.map((product) =>
			product.id === productToRemove.id
				? {
						...product,
						quantity: product.quantity - 1,
				  }
				: product
		);
	}
};

const clearCartItem = (cartItems, productToClear) =>
	cartItems.filter((product) => product.id !== productToClear.id);

export const addItemToCart = (cartItems, productToAdd) => {
	const newCartItems = addCartItem(cartItems, productToAdd);
	return createAction(CART_TYPES.SET_CART_ITEM, newCartItems);
};

export const removeItemFromCart = (cartItems, productToRemove) => {
	const newCartItems = removeCartItem(cartItems, productToRemove);
	return createAction(CART_TYPES.SET_CART_ITEM, newCartItems);
};

export const clearItem = (cartItems, productToClear) => {
	const newCartItems = clearCartItem(cartItems, productToClear);
	return createAction(CART_TYPES.SET_CART_ITEM, newCartItems);
};

export const setIsCartOpen = (boolean) => createAction(CART_TYPES.TOGGLE_CART, boolean);
