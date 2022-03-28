import { createContext, useReducer } from 'react';
import { createAction } from '../utils/reducers/reducers.utils';

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

export const INITIAL_STATE = {
	cartCount: 0,
	cartItems: [],
	cartTotal: 0,
	isCartOpen: false,
};

export const CART_ACTION_TYPES = {
	TOGGLE_CART: 'TOGGLE_CART',
	SET_CART_ITEM: 'SET_CART_ITEM',
};

const cartReducer = (state, action) => {
	const { type, payload } = action;
	switch (type) {
		case CART_ACTION_TYPES.TOGGLE_CART:
			return {
				...state,
				isCartOpen: payload,
			};
		case CART_ACTION_TYPES.SET_CART_ITEM:
			return {
				...state,
				...payload,
			};
		default:
			throw new Error(`Unhandled type of ${type} in cartReducer`);
	}
};

export const CartContext = createContext({
	isCartOpen: false,
	setIsCartOpen: () => {},
	cartItems: [],
	addItemToCart: () => {},
	removeItemFromCart: () => {},
	clearItem: () => {},
	cartCount: 0,
	cartTotal: 0,
});

export const CartProvider = ({ children }) => {
	const [{ cartItems, isCartOpen, cartCount, cartTotal }, dispatch] = useReducer(
		cartReducer,
		INITIAL_STATE
	);

	const updateCartItemsReducer = (newCartItems) => {
		const newCartCount = newCartItems.reduce((total, cartItem) => total + cartItem.quantity, 0);

		const newCartTotal = newCartItems.reduce(
			(total, cartItem) => total + cartItem.quantity * cartItem.price,
			0
		);

		dispatch(
			createAction(CART_ACTION_TYPES.SET_CART_ITEM, {
				cartItems: newCartItems,
				cartCount: newCartCount,
				cartTotal: newCartTotal,
			})
		);
	};

	const addItemToCart = (productToAdd) => {
		const newCartItems = addCartItem(cartItems, productToAdd);
		updateCartItemsReducer(newCartItems);
	};

	const removeItemFromCart = (productToRemove) => {
		const newCartItems = removeCartItem(cartItems, productToRemove);
		updateCartItemsReducer(newCartItems);
	};

	const clearItem = (productToClear) => {
		const newCartItems = clearCartItem(cartItems, productToClear);
		updateCartItemsReducer(newCartItems);
	};

	const setIsCartOpen = () => {
		dispatch(createAction(CART_ACTION_TYPES.TOGGLE_CART, !isCartOpen));
	};

	const value = {
		isCartOpen,
		setIsCartOpen,
		addItemToCart,
		removeItemFromCart,
		clearItem,
		cartItems,
		cartCount,
		cartTotal,
	};
	return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
