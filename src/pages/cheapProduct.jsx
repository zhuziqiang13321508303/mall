import React,{Component} from "react";
import {NavLink} from "react-router-dom";
import "../css/cheap.css";
class CheapProduct extends Component{
    constructor(props){
        super(props)
        this.state={

        }
    }
    render(){
        return(
            <div>
                <div className="cheap-top">
                    <div><img src="#" className="cheap-top-navimg"/></div>
                    <div>签到抽奖千玺大礼包</div>
                </div>
                <div className="cheap-big-image">
                    <NavLink to="detail/1"><img src="#"/></NavLink>
                </div>
                <div className="cheap-hot">
                    <div className="cheap-hot-container">

                    </div>
                </div>
            </div>
        )
    }
}
export default CheapProduct;