import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';
import { createScrollMiddleware } from 'react-redux-scroll';

import App from './components/App';
import reducers from './reducers';

const scrollMiddleware = createScrollMiddleware();

const store = createStore(
	reducers,
	{},
	applyMiddleware(scrollMiddleware, reduxThunk)
);

ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.querySelector('#root')
);
