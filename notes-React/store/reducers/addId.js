import * as types from '../action-types';
//初始值 list就是列表
//{completed:false 是否已完成，默认值为false； title:'' //todo的内容； id:}
let initState={showId:''};
export default function (state=initState,action) {
    switch (action.type){
        case types.ADD_ID:
            console.log(action._id);
            return {showId:action._id};
        default:
            return state;
    }
}