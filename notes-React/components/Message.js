import React,{Component} from 'react';
import {connect} from 'react-redux';
import messageActions from '../store/action/success_message';
import {bindActionCreators} from 'redux';
class Message extends Component{
    render(){
        return(
            <div className="bg-danger text-center">{this.props.sucMsg}</div>
        )
    }
}

let mapStateToProps=(state)=>({
    sucMsg: state.sucMsg.sucMsg
});
let mapDispatchToProps=(dispatch)=>
    bindActionCreators(messageActions,dispatch);

export default connect(
    mapStateToProps,mapDispatchToProps
)(Message)