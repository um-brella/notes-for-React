import React,{Component} from 'react';
import {
    HashRouter as Router,Route,Link,Switch,withRouter
} from 'react-router-dom';
import Signin from '../containers/SignIn';
import Signup from '../containers/SignUp';
import List from '../containers/List';
import Update from '../containers/Update';
import Add from '../containers/Add';
import {ajax} from '../util';
import {connect} from 'react-redux';
import messageActions from '../store/action/success_message';
import {bindActionCreators} from 'redux';

//头部组件
class Header extends Component{
    constructor(){
        super();
        this.state = {username: '',avatar:''};
    }
    //检测登陆
    checkLogin = ()=>{
        ajax({
            url:'http://localhost:9090/user/signin',
            method:'GET',
        }).then((res)=>{
            this.setState({
                username: res.user.username,
                avatar:res.user.avatar
            });
        },(err)=>{
            console.log(err);
        });
    };
    componentDidMount(){
        this.checkLogin();
    };
    //退出登陆
    handleClick=()=>{
        ajax({
            url:'http://localhost:9090/user/signout',
            method:'GET',
        }).then(res=>{
            this.props.addMessage(res.success);
            this.checkLogin();
            this.props.history.push('/signin');
        },(err)=>{
            console.log(err);
        })
    };
    render(){
        let userSignShow=<ul className="nav navbar-nav">
            <li><Link to="/signup">&nbsp;注册</Link></li>
            <li><Link to="/signin">&nbsp;登陆</Link></li>
        </ul>;
        let addNotes=<ul className="nav navbar-nav">
            <li><Link to="/add"><i className="iconfont icon-addition"></i>&nbsp;添加笔记</Link></li>
        </ul>;
        let userInfo=null;
        let userOut=null;
        if(this.state.username){
            userInfo=<li>
                <a style={{cursor:'pointer'}}>
                    <img src={this.state.avatar} alt="" style={{height:25,borderRadius:'50%'}}/>
                    <span style={{marginLeft:'5px'}}>{this.state.username}</span>
                </a>
            </li>;
            userOut=<li style={{cursor:'pointer'}}>
                <a onClick={this.handleClick}>&nbsp;退出登陆</a>
            </li>;
        }
        return(
            <Router>
                <div>
                    <nav className="navbar navbar-inverse">
                        <div className="container-fluid">
                            <div className="navbar-header">
                                <Link to="/list" className="navbar-brand">云端笔记</Link>
                            </div>
                            {this.state.username?addNotes:userSignShow}
                            <ul className="nav navbar-nav navbar-right">
                                <li>
                                    <a href="https://github.com/um-brella/notes-for-React"><i className="iconfont icon-github"></i>&nbsp;&nbsp;Github</a>
                                </li>
                                {userInfo}
                                {userOut}
                            </ul>
                        </div>
                    </nav>
                    <Switch>
                        <Route path="/list" component={List}/>
                        <Route path="/add" component={Add}/>
                        <Route path="/signup" component={Signup}/>
                        <Route path="/signin" render={(props)=>{

                            return  <Signin fn={this.checkLogin} {...props}/>
                        }}/>
                        <Route path="/update" component={Update}/>
                    </Switch>
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
)(withRouter(Header))