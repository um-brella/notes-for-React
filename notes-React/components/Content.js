import React,{Component} from 'react';
import {connect} from 'react-redux';
import addIdActions from '../store/action/addId';
import messageActions from '../store/action/success_message';
import {bindActionCreators} from 'redux';
import {ajax} from '../util';
import {
    HashRouter as Router,Route,Link,withRouter
} from 'react-router-dom';


class Content extends Component{
    constructor(props){
        super(props);
        this.state = {noteEle: null};
    };
    showNote = ()=>{
        ajax({
            url:'http://localhost:9090/notes/show/'+this.props.showId,
            method:'GET',
        }).then((res)=>{
            this.setState({
                noteEle:<div>
                    <h3>{res.article.title}</h3>
                    <p>{res.article.content}</p>
                </div>
                })
            },(err)=>{
            console.log(err);
        });
    };
    componentWillReceiveProps(){
        window.timer=setTimeout(()=>{
            this.props.showId?this.showNote():null;
        },0);
    };
    componentWillUnmount(){
        clearTimeout(window.timer);
    };
    delClick=()=>{
        ajax({
            url:'http://localhost:9090/notes/delete/'+this.props.showId,
            method:'GET',
        }).then(res=>{
            this.props.addMessage(res.success);
            this.props.history.go(0);
        },(err)=>{
            console.log(err);
        })
    };
    render(){
        return(
            <Router>
                <div>
                    <div className="panel panel-default">
                        <div className="panel-heading">
                            <h3 className="panel-title text-right">
                                <Link
                                    to='/update' className="iconfont icon-brush_fill navbar-link"></Link>&nbsp;
                                <a
                                    href="" className="iconfont icon-empty_fill navbar-link" onClick={this.delClick}></a>
                            </h3>
                        </div>
                        <div className="panel-body">
                            {this.state.noteEle}
                        </div>
                    </div>

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
)(withRouter(Content))