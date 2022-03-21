import { Fragment, useContext } from 'react';
import { Outlet } from 'react-router-dom';

import { ReactComponent as CrwnLogo } from '../../assets/crown.svg';
import { UserContext } from '../../contexts/user.context';
import { CartContext } from '../../contexts/cart.context';
import CartIcon from '../../components/cart-icon/cart-icon.component';
import CartDropdown from '../../components/cart-dropdown/cart-dropdown.component';

import { signOutAuthUser } from '../../utils/firebase/firebase.utils';

import {
	NavigationContainer,
	NavLinksContainer,
	LogoContainer,
	NavLink,
} from './navigation.styles.js';

const Navigation = () => {
	const { currentUser } = useContext(UserContext);
	const { isCartOpen } = useContext(CartContext);
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
						<NavLink as='span' className='nav-link' onClick={signOutAuthUser}>
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
