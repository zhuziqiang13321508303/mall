import React,{Component} from 'react';
import CompanyMessage from "../assets/companyMessage.jsx";
import Fixed from "../assets/fixed.jsx";
import TopMessage from "../assets/topMessage.jsx";
import {NavLink} from "react-router-dom";
import {message,Icon,Empty} from "antd";
import '../css/searchResult.css';
class SearchResult extends Component{
    constructor(props){
        super(props)
        this.state={
            back:0,
            forward:10,
            len:0,
            arrClass:[],
            arrNav:["首页","手机","荣耀"],
            arrName:["全部","华为","荣耀","华为note","华为","荣耀","华为note"],
            infos:'',
        }
        this.getClass=this.getClass.bind(this);
        this.changeNumber=this.changeNumber.bind(this);
    }

    componentDidMount(){
        this.getClass();
        this.changeNumber();
    }
     //调取购物车中商品
     changeNumber(){
        let _this=this;
        var url= "/api/mall/cart_item";
        var xhr = new XMLHttpRequest();
        xhr.open("GET", url,true);
        xhr.send();
        xhr.onreadystatechange = function(){
            if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                let body=JSON.parse(xhr.responseText).data;
                let allMount=0;
                for(let i=0;i<body.length;i++){
                    allMount+=body[i].amount
                }
                 _this.setState({infos:allMount});
                console.log("eee=========fffffff",body);
            }else if (xhr.status === 401) {
                console.error(xhr.responseText);
                var code = null;
                try{
                    code = JSON.parse(xhr.responseText)["code"];
                    if(code==33){
                        browserHistory.push("/login");
                    }else{
                        let  msg = JSON.parse(xhr.responseText)["msg"];
                        message.error(msg,10);
                    }
                }catch(e){
                    
                }
            }else{
                let  msg = JSON.parse(xhr.responseText)["msg"];
                message.error(msg,10);
            }
            }
        };
        console.log("aaaa++++++=====oooooopppp=");
    }
    //获取商品分类
    getClass(){
        let _this=this;
        var url= "/api/mall/product";
        var xhr = new XMLHttpRequest();
        xhr.open("GET", url,true);
        xhr.send();
        xhr.onreadystatechange = function(){
            if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                let body=JSON.parse(xhr.responseText).data;
                let lengths=body.length;
                    _this.setState({arrClass:body,len:lengths});
                console.log("eee=========",body);
            }else if (xhr.status === 401) {
                console.error(xhr.responseText);
                var code = null;
                try{
                    code = JSON.parse(xhr.responseText)["code"];
                    if(code==33){
                        browserHistory.push("/login");
                    }else{
                        let  msg = JSON.parse(xhr.responseText)["msg"];
                        message.error(msg,10);
                    }
                }catch(e){
                    
                }
            }else{
                let  msg = JSON.parse(xhr.responseText)["msg"];
                message.error(msg,10);
            }
            }
        };
        console.log("获取商品类别");
    }
    render(){
        let back=this.state.back;
        let forward=this.state.forward;
        return(
            <div className="search-container">
               <TopMessage/>
               <div className="search-nav">
                    <div className="search-nav-container" style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
                        <Empty description="抱歉没有找到相关商品，为您推荐以下商品！"/>
                    </div>
               </div>
                <div className="search-section">
                    <div className="search-product">
                            {
                                this.state.arrClass.slice(back,forward).map((item,index)=>{
                                    return (
                                      
                                            <div key={index}>
                                                <NavLink to={"/detail/"+item.id}>
                                                    <img src={item.image}/>
                                                    <div>{item.name}</div>
                                                    <div>￥{item.price}</div>
                                                </NavLink>
                                        </div>
                                        
                                    )
                                })
                            }
                    </div>
                </div>
                <Fixed number={this.state.infos}/>
                <CompanyMessage/>
            </div>
        )
    }
}
export default SearchResult;