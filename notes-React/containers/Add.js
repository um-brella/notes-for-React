import React,{Component} from 'react';
import {
    HashRouter as Router,Route,Link
} from 'react-router-dom';
import List from '../containers/List';
import {ajax} from '../util';
import {connect} from 'react-redux';
import messageActions from '../store/action/success_message';
import {bindActionCreators} from 'redux';

//增加笔记组件
class Add extends Component{
    //点击提交
    handleClick(event){
        event.preventDefault();
        ajax({
            url:'http://localhost:9090/notes/add',
            method:'POST',
            data:JSON.stringify({
                title:this.refs.title.value,
                content:this.refs.content.value
            }),
            types:2
        }).then((res)=>{
            if("success" in res){
                this.props.addMessage(res.success);
                this.props.history.push('/list');
            }
            else {
                this.message = res.error;
                this.props.history.replace('/add');
            }
        },(err)=>{
            console.log(err);
        });
    };
    render(){
        return(
            <Router>
                <div className="container">
                    <div className="row">
                        {this.message?<div className="bg-danger text-center">{this.message}</div>:null}
                        <div className="col-md-6 col-md-offset-3">
                            <div className="panel panel-default">
                                <div className="panel-heading">
                                    <h3 className="panel-title">
                                        新增
                                        <Link to="/list" className="iconfont icon-close navbar-link" style={{float:'right',cursor:'pointer'}}></Link>
                                        <a className="iconfont icon-right navbar-link" style={{float:'right',cursor:'pointer',marginRight:5}} onClick={this.handleClick.bind(this)}></a>

                                    </h3>
                                </div>
                                <div className="panel-body">
                                    <div className="input-group">
                                        <span className="input-group-addon" id="basic-addon1">标题</span>
                                        <input type="text" className="form-control" aria-describedby="basic-addon1" ref='title'/>
                                    </div>
                                    <textarea className="form-control" rows="8" style={{marginTop:10}} ref='content'></textarea>
                                </div>
                            </div>
                        </div>
                    </div>
                    <Route path="/list" component={List}/>
                </div>
            </Router>
        )
    }
}
let mapStateToProps=(state)=>({});
let mapDispatchToProps=(dispatch)=>(
    bindActionCreators(messageActions,dispatch)
);
export default connect(
    mapStateToProps,mapDispatchToProps
)(Add)