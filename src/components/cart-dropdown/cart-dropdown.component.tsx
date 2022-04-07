import { useCallback, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
// import { CartContext } from '../../contexts/cart.context';
import Button from '../button/button.component';
import CartItemElement from '../cart-item/cart-item.component';
import { selectCartItems } from '../../store/cart/cart.selectors';

import { CartDropdownContainer, EmptyMessage, CartItems } from './cart-dropdown.styles';

const CartDropdown = () => {
	const cartItems = useSelector(selectCartItems);
	// const { cartItems } = useContext(CartContext);
	const navigate = useNavigate();

	const goToCheckOutHandler = useCallback(() => {
		navigate('/checkout');
	}, []);

	return (
		<CartDropdownContainer className='cart-dropdown-container'>
			<CartItems className='cart-items'>
				{cartItems.length ? (
					cartItems.map((cartItem) => <CartItemElement key={cartItem.id} cartItem={cartItem} />)
				) : (
					<EmptyMessage>Your cart is empty</EmptyMessage>
				)}
			</CartItems>
			<Button onClick={goToCheckOutHandler}>GO TO CHECKOUT</Button>
		</CartDropdownContainer>
	);
};

export default CartDropdown;
