import React,{Component} from 'react';
export default class Content extends Component{
    render(){
        return(
            <div className="panel panel-default">
                <div className="panel-heading">
                    <h3 className="panel-title text-right">
                        <a href="javascript:void(0);" className="iconfont icon-fullscreen navbar-link"></a>&nbsp;
                        <a
                            href="" className="iconfont icon-brush_fill navbar-link"></a>&nbsp;
                        <a
                            href="" className="iconfont icon-empty_fill navbar-link"></a>
                    </h3>
                </div>
                <div className="panel-body">
                    Panel content
                </div>
            </div>
        )
    }
}