import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, combineReducers } from 'redux';

import './index.css';
import App from './App';
import instructionsReducer from './store/reducers/instructions';


const rootReducer = combineReducers({
    instructions: instructionsReducer,
})

const  store = createStore(rootReducer);

const app = (
    <Provider store={store}>
        <App />
    </Provider>
);

ReactDOM.render(app, document.getElementById('root'));
