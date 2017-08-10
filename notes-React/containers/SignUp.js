import React, {Component} from 'react';
import {ajax} from '../util';
import {connect} from 'react-redux';
import messageActions from '../store/action/success_message';
import {bindActionCreators} from 'redux';

class SignUp extends Component {
    HandleSubmit(event){
        event.preventDefault();
        let formData = new FormData();
        formData.append('username', this.refs.username.value);
        formData.append('password', this.refs.password.value);
        formData.append('email', this.refs.email.value);
        formData.append('avatar', this.refs.avatar.files[0]);
        ajax({
            url:'http://localhost:9090/user/signup',
            method:'POST',
            data:formData
        }).then((res)=>{
            if("success" in res){
                this.props.addMessage(res.success);
                this.props.history.push('/signin');
            }
            else {
                this.message = res.error;
                this.props.history.replace('/signup');
                this.refs.username.value=this.refs.password.value=this.refs.email.value="";
            }
        },(err)=>{
            console.log(err);
        });
    };
    render() {
        return (
            <div className="container">
                <div className="row">
                    {this.message?<div className="bg-danger text-center">{this.message}</div>:null}
                    <div className="col-md-6 col-md-offset-3">
                        <form className="form-horizontal" onSubmit={this.HandleSubmit.bind(this)}>
                            <h2 className="form-signin-heading">注册</h2>
                            <div className="form-group row">
                                <label htmlFor="inputUserName" className="control-label col-md-2">用户名</label>
                                <div className="col-md-10 input-group">
                        <span className="input-group-addon">
                            <span className="glyphicon glyphicon-user"></span>
                        </span>
                                    <input type="text" id="inputUserName" className="form-control"
                                           placeholder="Username" name="username"  ref="username" required/>
                                </div>
                            </div>
                            <div className="form-group row">
                                <label htmlFor="inputPassword" className="control-label col-md-2">密码</label>
                                <div className="col-md-10 input-group">
                        <span className="input-group-addon">
                            <span className="glyphicon glyphicon-lock"></span>
                        </span>
                                    <input type="password" id="inputPassword" className="form-control"
                                           placeholder="Password" name="password"  ref="password" required/>
                                </div>
                            </div>
                            <div className="form-group row">
                                <label htmlFor="inputEmail" className="control-label col-md-2">邮箱</label>
                                <div className="col-md-10 input-group">
                        <span className="input-group-addon">
                            <span className="glyphicon glyphicon-envelope"></span>
                        </span>
                                    <input type="email" id="inputEmail" className="form-control"
                                           placeholder="Email address" name="email"  ref="email" required/>
                                </div>
                            </div>
                            <div className="form-group row">
                                <label htmlFor="inputAvatar" className="control-label col-md-2">头像</label>
                                <div className="col-md-10 input-group">
                        <span className="input-group-addon">
                            <span className="glyphicon glyphicon-upload"></span>
                        </span>
                                    <input type="file" id="inputAvatar" className="form-control" placeholder="Avatar"
                                           name="avatar"  ref="avatar" required/>
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
        )
    }
}

let mapStateToProps=(state)=>({});
let mapDispatchToProps=(dispatch)=>(
    bindActionCreators(messageActions,dispatch)
);
export default connect(
    mapStateToProps,mapDispatchToProps
)(SignUp)