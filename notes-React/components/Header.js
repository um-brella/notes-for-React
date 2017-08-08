import React,{Component} from 'react';

export default class Header extends Component{
    render(){
        return(
            <nav className="navbar navbar-inverse">
                <div className="container-fluid">
                    <div className="navbar-header">
                        <a href="/" className="navbar-brand">云端笔记</a>
                    </div>
                    <ul className="nav navbar-nav">
                        <li><a href="/"><i className="iconfont icon-addition"></i>&nbsp;添加笔记</a></li>
                        <li><a href="/">&nbsp;注册</a></li>
                        <li><a href="/">&nbsp;登陆</a></li>
                    </ul>
                    <ul className="nav navbar-nav navbar-right">
                        <li>
                            <a href="https://github.com/um-brella/notes-for-React"><i className="iconfont icon-github"></i>&nbsp;&nbsp;Github</a>
                        </li>
                    </ul>
                </div>
            </nav>
        )
    }
}