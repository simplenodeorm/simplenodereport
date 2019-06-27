import React from 'react';
import ReactDOM from 'react-dom';
import {App} from './App';
import localStorage from '../../__mocks__/localStorageMock';

window.localStorage = localStorage;

it('App renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<App />, div);
    ReactDOM.unmountComponentAtNode(div);
});