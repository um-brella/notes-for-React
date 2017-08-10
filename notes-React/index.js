import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import Main from "./containers/Main";
import store from './store';
import './index.less';

import {HashRouter as Router} from 'react-router-dom';

ReactDOM.render(
    <Provider store={store}>
        <Router>
            <Main/>
        </Router>

    </Provider>,
    document.querySelector('#root')
);