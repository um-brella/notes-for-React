import {createStore} from 'redux';
import reducers from './reducers';
let store=createStore(reducers);

//把store变成全局变量，方便在控制台使用，上线前删掉
//window._store=store;

export default store;