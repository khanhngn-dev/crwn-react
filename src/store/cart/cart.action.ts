import { withMatcher, createAction, ActionWithPayload } from '../../utils/reducers/reducers.utils';
import { CART_TYPES, CartItem } from './cart.types';

const addCartItem = (cartItems: CartItem[], productToAdd: CartItem): CartItem[] => {
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

const removeCartItem = (cartItems: CartItem[], productToRemove: CartItem): CartItem[] => {
	const existingCartItem = cartItems.find((product) => product.id === productToRemove.id);

	if (existingCartItem && existingCartItem.quantity === 1) {
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

const clearCartItem = (cartItems: CartItem[], productToClear: CartItem): CartItem[] =>
	cartItems.filter((product) => product.id !== productToClear.id);

export type SetIsCartOpen = ActionWithPayload<CART_TYPES.TOGGLE_CART, boolean>;

export type SetCartItem = ActionWithPayload<CART_TYPES.SET_CART_ITEM, CartItem[]>;

export const setCartItem = withMatcher(
	(cartItems: CartItem[]): SetCartItem => createAction(CART_TYPES.SET_CART_ITEM, cartItems)
);

export const addItemToCart = (cartItems: CartItem[], productToAdd: CartItem): SetCartItem => {
	const newCartItems = addCartItem(cartItems, productToAdd);
	return setCartItem(newCartItems);
};

export const removeItemFromCart = (
	cartItems: CartItem[],
	productToRemove: CartItem
): SetCartItem => {
	const newCartItems = removeCartItem(cartItems, productToRemove);
	return setCartItem(newCartItems);
};

export const clearItem = (cartItems: CartItem[], productToClear: CartItem): SetCartItem => {
	const newCartItems = clearCartItem(cartItems, productToClear);
	return setCartItem(newCartItems);
};

export const setIsCartOpen = withMatcher(
	(boolean: boolean): SetIsCartOpen => createAction(CART_TYPES.TOGGLE_CART, boolean)
);
