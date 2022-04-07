import { CategoryItem } from "../categories/categories.types";

export enum CART_TYPES {
	TOGGLE_CART = 'cart/TOGGLE_CART',
	SET_CART_ITEM = 'cart/SET_CART_ITEM',
	SET_CART_COUNT = 'cart/SET_CART_COUNT',
	SET_CART_TOTAL = 'cart/SET_CART_TOTAL',
}

export type CartItem = CategoryItem & {
	quantity: number;
}