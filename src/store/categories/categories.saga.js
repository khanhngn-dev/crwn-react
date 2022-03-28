import { takeLatest, all, call, put } from 'redux-saga/effects';
import { getCategoriesAndDocuments } from '../../utils/firebase/firebase.utils';
import { fetchCategoriesSuccess, fetchCategoriesFailed } from './categories.action';
import { CATEGORIES_TYPES } from './categories.types';

export function* fetchCategoriesAsync() {
	try {
		// Call wherever an effect happens
		// First argument is the function
		// Second argument is the parameters passed to the function
		const categoriesArray = yield call(getCategoriesAndDocuments, 'categories');
		yield put(fetchCategoriesSuccess(categoriesArray));
	} catch (err) {
		yield put(fetchCategoriesFailed(err));
	}
}

export function* onFetchCategories() {
	// Receive actions and take the latest
	// Respond to the first argument
	// Run the second argument
	yield takeLatest(CATEGORIES_TYPES.FETCH_CATEGORIES_START, fetchCategoriesAsync);
}

export function* categoriesSaga() {
	// Yield until everything in the array has finished before continue
	yield all([call(onFetchCategories)]);
}
