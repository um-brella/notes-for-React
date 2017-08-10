/*
* 待办事项的数组
* 过滤类型*/

import {combineReducers} from 'redux';
import sucMsg from './sucMsg';
let reducers=combineReducers({
    sucMsg
});
export default reducers;