import React,{Component} from 'react';
import CompanyMessage from "./companyMessage.jsx";
import Fixed from "./fixed.jsx";
import TopMessage from "./topMessage.jsx";
import Action from '../reds/Action';
import Store from '../reds/Store';
import {NavLink} from "react-router-dom";
import {Pagination,message,Breadcrumb} from "antd";
import '../css/productClass.css';
class ProductClass extends Component{
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
    //点击分页器获取新数据
    onChange(page,pagesize){
            let back=10*(page-1);
            let forward=page*10;
            this.setState({back:back,forward:forward});
            console.log(page,pagesize);
    }
    render(){
        let back=this.state.back;
        let forward=this.state.forward;
        return(
            <div className="class-container">
               <TopMessage/>
               <div className="vary-nav">
                    <div className="vary-nav-container">
                            <div>
                                <Breadcrumb separator=">">
                                    <Breadcrumb.Item href="#/home">{this.state.arrNav[0]}</Breadcrumb.Item>
                                    <Breadcrumb.Item href="">{this.state.arrNav[1]}</Breadcrumb.Item>
                                    <Breadcrumb.Item href="">{this.state.arrNav[2]}</Breadcrumb.Item>
                                </Breadcrumb>
                            </div>
                            <div>
                                <span>分类:</span>
                                    {this.state.arrName.map((item,index)=>{
                                       return(  <span key={index}>
                                                    {item}
                                                </span>) 
                                    })}
                            </div>
                            <div>
                                <span>排序:</span>
                                <span>上架时间</span>
                                <span>价格</span>
                                <span>评价</span>
                            </div>
                    </div>
               </div>
                <div className="class-section">
                    <div className="class-product">
                            {
                                this.state.arrClass.slice(back,forward).map((item,index)=>{
                                    return (
                                      
                                            <div key={index}>
                                                <NavLink to={"/detail/"+item.id}>
                                                    <img src={item.image}/>
                                                    <div>{item.name}</div>
                                                    <div>￥{item.price}</div>
                                                    <p>
                                                        <span>选购</span>
                                                        <span>0人评价</span>
                                                    </p>
                                                </NavLink>
                                        </div>
                                        
                                    )
                                })
                            }
                    </div>
                    <div className="class-piganation">
                        <div className="class-piganation-container">
                            <Pagination defaultCurrent={1} total={this.state.len} pageSize={10} onChange={this.onChange.bind(this)}/>
                        </div>
                    </div>
                </div>
                <Fixed info={this.state.info}/>
                <CompanyMessage/>
            </div>
        )
    }
}
export default ProductClass;