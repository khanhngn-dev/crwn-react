import { Fragment } from 'react';
import { Outlet } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { selectCurrentUser } from '../../store/user/user.selector';
import { selectToggleCart } from '../../store/cart/cart.selectors';

import { ReactComponent as CrwnLogo } from '../../assets/crown.svg';
import CartIcon from '../../components/cart-icon/cart-icon.component';
import CartDropdown from '../../components/cart-dropdown/cart-dropdown.component';

import { signOutStart } from '../../store/user/user.action';
import {
	NavigationContainer,
	NavLinksContainer,
	LogoContainer,
	NavLink,
} from './navigation.styles.js';

const Navigation = () => {
	const dispatch = useDispatch();
	const currentUser = useSelector(selectCurrentUser);
	const isCartOpen = useSelector(selectToggleCart);

	const signOutHandler = () => dispatch(signOutStart());
	return (
		<Fragment>
			<NavigationContainer className='navigation'>
				<LogoContainer className='logo-container' to='/'>
					<CrwnLogo className='logo' />
				</LogoContainer>
				<NavLinksContainer className='nav-links-container'>
					<NavLink className='nav-link' to='/shop'>
						SHOP
					</NavLink>
					{currentUser ? (
						<NavLink as='span' className='nav-link' onClick={signOutHandler}>
							SIGN OUT
						</NavLink>
					) : (
						<NavLink className='nav-link' to='/auth'>
							SIGN IN
						</NavLink>
					)}
					<CartIcon />
				</NavLinksContainer>
				{isCartOpen && <CartDropdown />}
			</NavigationContainer>
			<Outlet />
		</Fragment>
	);
};

export default Navigation;
