import * as types from '../action-types';
export default {
    addMessage(sucMsg){
        //增加成功信息
        return {type:types.SUCCESS_MESSAGE,sucMsg};
    }
}