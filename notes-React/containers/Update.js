import React,{Component} from 'react';
import {
    HashRouter as Router,Route,Link
} from 'react-router-dom';
import List from '../containers/List';
import {ajax} from '../util';
import {connect} from 'react-redux';
import addIdActions from '../store/action/addId';
import messageActions from '../store/action/success_message';
import {bindActionCreators} from 'redux';

class Update extends Component{
    showNoteWillUpdate = ()=>{
        ajax({
            url:'http://localhost:9090/notes/show/'+this.props.showId,
            method:'GET',
        }).then((res)=>{
            this.lastTitle=res.article.title;
            this.lastContent=res.article.content;
        },(err)=>{
            console.log(err);
        });
    };
    componentDidMount(){
        this.showNoteWillUpdate();
    };
    handleClick(event){
        event.preventDefault();
        ajax({
            url:'http://localhost:9090/notes/update/'+this.props.showId,
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
                this.props.history.replace('/update');
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
                                        修改
                                        <Link to="/list" className="iconfont icon-close navbar-link" style={{float:'right',cursor:'pointer'}}></Link>
                                        <a className="iconfont icon-right navbar-link" style={{float:'right',cursor:'pointer',marginRight:5}} onClick={this.handleClick.bind(this)}></a>

                                    </h3>
                                </div>
                                <div className="panel-body">
                                    <div className="input-group">
                                        <span className="input-group-addon" id="basic-addon1">标题</span>
                                        <input type="text" className="form-control" aria-describedby="basic-addon1" defaultValue={this.lastTitle} ref='title'/>
                                    </div>
                                    <textarea className="form-control" rows="8" style={{marginTop:10}} defaultValue={this.lastContent} ref='content'></textarea>
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
let mapStateToProps=(state)=>({
    showId: state.showId.showId
});
let mapDispatchToProps=(dispatch)=> (
    {
        ...bindActionCreators(addIdActions, dispatch),
        ...bindActionCreators(messageActions,dispatch)
    }
);
export default connect(
    mapStateToProps,mapDispatchToProps
)(Update)