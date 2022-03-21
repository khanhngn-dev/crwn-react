import { createContext, useState, useEffect } from 'react';

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
	const [isCartOpen, setIsCartOpen] = useState(false);
	const [cartItems, setCartItems] = useState([]);
	const [cartCount, setCartCount] = useState(0);
	const [cartTotal, setCartTotal] = useState(0);

	useEffect(() => {
		const newCartCount = cartItems.reduce((total, cartItem) => (total += cartItem.quantity), 0);
		setCartCount(newCartCount);
	}, [cartItems]);

	useEffect(() => {
		const newCartTotal = cartItems.reduce(
			(total, cartItem) => (total += cartItem.quantity * cartItem.price),
			0
		);
		setCartTotal(newCartTotal);
	}, [cartItems]);

	const addItemToCart = (productToAdd) => {
		setCartItems(addCartItem(cartItems, productToAdd));
	};

	const removeItemFromCart = (productToRemove) => {
		setCartItems(removeCartItem(cartItems, productToRemove));
	};

	const clearItem = (productToClear) => {
		setCartItems(clearCartItem(cartItems, productToClear));
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
