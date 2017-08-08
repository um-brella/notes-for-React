import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import Main from "./components/Main";
//import store from './store';
import './index.less';


ReactDOM.render(
    <Main/>,
    document.querySelector('#root')
);