import { createAction } from '../../utils/reducers/reducers.utils';
import { CATEGORIES_TYPES } from './categories.types';

export const fetchCategoriesStart = () => createAction(CATEGORIES_TYPES.FETCH_CATEGORIES_START);

export const fetchCategoriesSuccess = (categoriesArray) =>
	createAction(CATEGORIES_TYPES.FETCH_CATEGORIES_SUCCESS, categoriesArray);

export const fetchCategoriesFailed = (error) =>
	createAction(CATEGORIES_TYPES.FETCH_CATEGORIES_FAILED, error);
