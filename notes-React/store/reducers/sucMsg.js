import * as types from '../action-types';
//初始值 list就是列表
//{completed:false 是否已完成，默认值为false； title:'' //todo的内容； id:}
let initState={sucMsg:''};
export default function (state=initState,action) {
    switch (action.type){
        case types.SUCCESS_MESSAGE:
            return {sucMsg:action.sucMsg};
        default:
            return state;
    }
}