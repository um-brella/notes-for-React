import React,{Component} from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import Header from "./Header";
import SideBar from "./SideBar";
import Content from "./Content";

export default class Main extends Component{
    render(){
        return(
            <div>
                <Header/>
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