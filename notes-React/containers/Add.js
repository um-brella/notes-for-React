import React,{Component} from 'react';
import {
    HashRouter as Router,Route,Link
} from 'react-router-dom';
import List from '../containers/List';
export default class Add extends Component{
    render(){
        return(
            <Router>
                <div className="container">
                    <div className="row">
                        <div className="col-md-6 col-md-offset-3">
                            <div className="panel panel-default">
                                <div className="panel-heading">
                                    <h3 className="panel-title">
                                        新增
                                        <Link to="/list" className="iconfont icon-close navbar-link" style={{float:'right',cursor:'pointer'}}></Link>
                                        <a className="iconfont icon-right navbar-link" style={{float:'right',cursor:'pointer'}}></a>

                                    </h3>
                                </div>
                                <div className="panel-body">
                                    Panel content
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