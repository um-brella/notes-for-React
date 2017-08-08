import React,{Component} from 'react';
export default class SideBar extends Component{
    render(){
        return(
            <div className="panel panel-default">
                <div className="panel-heading">所有笔记</div>
                <ul className="list-group">
                    <li className="list-group-item">第一个笔记</li>
                    <li className="list-group-item">第二个笔记</li>
                </ul>
                <div className="panel-footer text-center"><a href="/" className="iconfont icon-addition_fill navbar-link"></a></div>
            </div>
        )
    }
}
