import React,{Component} from 'react';
import Message from '../components/Message';
import {connect} from 'react-redux';
import messageActions from '../store/action/success_message';
import {bindActionCreators} from 'redux';
import {ajax} from '../util';

//登陆组件
class SignIn extends Component{
    //表单提交
    HandleSubmit(event){
        event.preventDefault();
        ajax({
            url:'http://localhost:9090/user/signin',
            method:'POST',
            data:JSON.stringify({
                username:this.refs.username.value,
                password:this.refs.password.value
            }),
            types:2
        }).then((res)=>{
            if("success" in res){
                this.props.addMessage(res.success);
                this.props.fn();
                this.props.history.push('/list');
            }
            else {
                this.message = res.error;
                this.props.history.replace('/signin');
                this.refs.username.value=this.refs.password.value="";
            }
        },(err)=>{
            console.log(err);
        });
    };
    render(){
        return(
            <div>
                <div className="container">
                    <div className="row">
                        {this.message?<div className="bg-danger text-center">{this.message}</div>:null}
                        <Message/>
                        <div className="col-md-6 col-md-offset-3">
                            <form className="form-horizontal" onSubmit={this.HandleSubmit.bind(this)}>
                                <h2 className="form-signin-heading">登陆</h2>
                                <div className="form-group row">
                                    <label htmlFor="inputUserName" className="control-label col-md-2">用户名</label>
                                    <div className="col-md-10 input-group">
                        <span className="input-group-addon">
                            <span className="glyphicon glyphicon-user"></span>
                        </span>
                                        <input type="text" id="inputUserName" className="form-control" placeholder="Username" name="username" ref='username' required />
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <label htmlFor="inputPassword" className="control-label col-md-2">密码</label>
                                    <div className="col-md-10 input-group">
                        <span className="input-group-addon">
                            <span className="glyphicon glyphicon-lock"></span>
                        </span>
                                        <input type="password" id="inputPassword" className="form-control" placeholder="Password" name="password" ref='password' required />
                                    </div>
                                </div>

                                <div className="form-group">
                                    <div className="col-md-10 col-md-offset-2">
                                        <button className="btn btn-lg btn-primary btn-block" type="submit">提交</button>
                                    </div>
                                </div>
                            </form>
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
)(SignIn)