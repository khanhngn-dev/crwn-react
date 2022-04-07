// import { useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';

// import { CartContext } from '../../contexts/cart.context';
import { selectNewCartCount, selectToggleCart } from '../../store/cart/cart.selectors';
import { setIsCartOpen } from '../../store/cart/cart.action';

import { ShoppingIcon, CartIconContainer, CartItemCount } from './cart-icon.styles';

const CartIcon = () => {
	const dispatch = useDispatch();
	const cartCount = useSelector(selectNewCartCount);
	const isCartOpen = useSelector(selectToggleCart);
	// const { isCartOpen, setIsCartOpen, cartCount } = useContext(CartContext);
	const toggleIsCartOpen = () => dispatch(setIsCartOpen(!isCartOpen));
	return (
		<CartIconContainer className='cart-icon-container' onClick={toggleIsCartOpen}>
			<ShoppingIcon className='shopping-icon' />
			<CartItemCount className='item-count'>{cartCount}</CartItemCount>
		</CartIconContainer>
	);
};

export default CartIcon;
