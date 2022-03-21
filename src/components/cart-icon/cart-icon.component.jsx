import { useContext } from 'react';

import { CartContext } from '../../contexts/cart.context';

import { ShoppingIcon, CartIconContainer, CartItemCount } from './cart-icon.styles.js';

const CartIcon = () => {
	const { isCartOpen, setIsCartOpen, cartCount } = useContext(CartContext);
	const toggleIsCartOpen = () => setIsCartOpen(!isCartOpen);
	return (
		<CartIconContainer className='cart-icon-container' onClick={toggleIsCartOpen}>
			<ShoppingIcon className='shopping-icon' />
			<CartItemCount className='item-count'>{cartCount}</CartItemCount>
		</CartIconContainer>
	);
};

export default CartIcon;
