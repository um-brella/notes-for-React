import React,{Component} from 'react';
import {ajax} from '../util';
import {
    HashRouter as Router,Route,Link
} from 'react-router-dom';
import Add from '../containers/Add';
import {connect} from 'react-redux';
import addIdActions from '../store/action/addId';
import {bindActionCreators} from 'redux';

class SideBar extends Component{
    constructor(){
        super();
        this.state = {notesEle: null};
    };
    handleClick(_id){
        this.props.addId(_id);
    };
    notesContent = ()=>{
        ajax({
            url:'http://localhost:9090/notes/list',
            method:'GET',
        }).then((res)=>{
            this.setState({
                notesEle:res.articles.map((item,index)=>{
                    return <li className="list-group-item" key={index} style={{cursor:'pointer'}} onClick={this.handleClick.bind(this,item._id)}>
                        <h3>{item.title} <span style={{fontWeight:'normal', fontSize:12,float:'right',color:'rgba(0,0,0,.5)',lineHeight:'26px'}}>{item.localtime}</span></h3>
                    </li>
                })
            });
        },(err)=>{
            console.log(err);
        });
    };
    componentDidMount(){
        this.notesContent();
    };
    render(){
        return(
            <Router>
                <div>
                    <div className="panel panel-default">
                        <div className="panel-heading">所有笔记</div>
                        <ul className="list-group">
                            {this.state.notesEle}
                        </ul>
                        <div className="panel-footer text-center">
                            <Link to="/add" className="iconfont icon-addition_fill navbar-link"></Link>
                        </div>
                    </div>
                    <Route path="/add" component={Add}/>
                </div>
            </Router>
        )
    }
}

let mapStateToProps=(state)=>({});
let mapDispatchToProps=(dispatch)=>(
    bindActionCreators(addIdActions,dispatch)
);
export default connect(
    mapStateToProps,mapDispatchToProps
)(SideBar)
