/*
* 待办事项的数组
* 过滤类型*/

import {combineReducers} from 'redux';
import sucMsg from './sucMsg';
import showId from './addId';
let reducers=combineReducers({
    sucMsg,showId
});
export default reducers;