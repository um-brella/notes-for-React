import React,{Component} from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import SideBar from "../components/SideBar";
import Content from "../components/Content";

export default class List extends Component{
    render(){
        return(
            <div>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-sm-4">
                            <SideBar/>
                        </div>
                        <div className="col-sm-8">
                            <Content/>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}