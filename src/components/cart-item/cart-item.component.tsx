import { FC, memo } from 'react';
import { CartItem } from '../../store/cart/cart.types';
import './cart-item.styles.scss';

type CartItemProps = {
	cartItem: CartItem;
};

const CartItemElement: FC<CartItemProps> = memo(({ cartItem }) => {
	const { name, quantity, imageUrl, price } = cartItem;
	return (
		<div className='cart-item-container'>
			<img src={imageUrl} alt={name} />
			<div className='item-details'>
				<span className='name'>{name}</span>
				<span className='price'>
					{price} x {quantity}
				</span>
			</div>
		</div>
	);
});

export default CartItemElement;
