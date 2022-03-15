import { Routes, Route } from 'react-router-dom';

import Home from './routes/home/home.component';
import Navigation from './routes/navigation/navigation.component';
import SignIn from './routes/signin/signin.component';

const App = () => (
	<Routes>
		<Route path='/' element={<Navigation />}>
			<Route index element={<Home />} />
			<Route path='/shop' element />
			<Route path='/signin' element={<SignIn />} />
		</Route>
	</Routes>
);

export default App;
