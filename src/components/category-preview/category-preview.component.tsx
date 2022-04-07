import { FC } from 'react';
import { Link } from 'react-router-dom';
import { CartItem } from '../../store/cart/cart.types';
import { CategoryItem } from '../../store/categories/categories.types';

import ProductCard from '../product-card/product-card.component';

import './category-preview.styles.scss';

type CategoryPreviewProps = {
	title: string;
	products: CategoryItem[];
};

const CategoryPreview: FC<CategoryPreviewProps> = ({ title, products }) => {
	return (
		<div className='category-preview-container'>
			<h2>
				<Link to={title.toLowerCase()} className='title'>
					{title.toUpperCase()}
				</Link>
			</h2>
			<div className='preview'>
				{products
					.filter((_, index) => index < 4)
					.map((product) => (
						<ProductCard key={product.id} product={product as CartItem} />
					))}
			</div>
		</div>
	);
};

export default CategoryPreview;
