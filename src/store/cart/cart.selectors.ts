import { createSelector } from 'reselect';
import { RootState } from '../store';
import { CartState } from './cart.reducer';

export const selectCartReducer = (state: RootState): CartState => state.cart;

export const selectCartItems = createSelector([selectCartReducer], (cart) => cart.cartItems);

export const selectNewCartCount = createSelector([selectCartItems], (cartItems) =>
	cartItems.reduce((total, cartItem) => total + cartItem.quantity, 0)
);

export const selectNewCartTotal = createSelector([selectCartItems], (cartItems) =>
	cartItems.reduce((total, cartItem) => total + cartItem.quantity * cartItem.price, 0)
);

export const selectToggleCart = createSelector([selectCartReducer], (cart) => cart.isCartOpen);
