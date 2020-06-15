import React from 'react';
import { MyApp } from './MyApp';
import { ThemeProvider } from '@ui5/webcomponents-react';
import { HashRouter } from 'react-router-dom';

function App() {
	return (
		<HashRouter>
			<ThemeProvider>
				<MyApp />
			</ThemeProvider>
		</HashRouter>
	);
}

export default App;
