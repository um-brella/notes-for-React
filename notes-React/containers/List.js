import React,{Component} from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import SideBar from "../components/SideBar";
import Content from "../components/Content";
import {connect} from 'react-redux';
import messageActions from '../store/action/success_message';
import {bindActionCreators} from 'redux';
import Message from '../components/Message';

class List extends Component{
    render(){
        return(
            <div>
                <div className="container-fluid">
                    <div className="row">
                        <Message/>
                        <div className="col-sm-4">
                            <SideBar/>
                        </div>
                        <div className="col-sm-8">
                            <Content/>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

let mapStateToProps=(state)=>({});
let mapDispatchToProps=(dispatch)=>(
    bindActionCreators(messageActions,dispatch)
);
export default connect(
    mapStateToProps,mapDispatchToProps
)(List)