import { useNavigate } from 'react-router-dom';
import { DirectoryItemContainer, BackgroundImage, Body } from './directory-item.styles';

const DirectoryItem = ({ directory }) => {
	const { imageUrl, title, route } = directory;
	const navigate = useNavigate();

	const onNavigate = () => navigate(route);
	return (
		<DirectoryItemContainer className='directory-item-container' onClick={onNavigate}>
			<BackgroundImage className='background-image' imageUrl={imageUrl} />
			<Body className='body'>
				<h2>{title.toLocaleUpperCase()}</h2>
				<p>Shop Now</p>
			</Body>
		</DirectoryItemContainer>
	);
};

export default DirectoryItem;
