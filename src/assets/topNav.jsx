import React,{Component} from "react";
import {Icon,Empty} from "antd";
export default class TopNav extends Component{
    constructor(props){
        super(props)
        this.state={
            arr1:[{name:"首页",href:"#/home"},{name:"合宙官网",href:"#/home"},{name:"荣耀官网",href:"#"},{name:"企业购",href:"#"}],
            arr2:[{name:"请登录",href:"#/login"},{name:"注册",href:"#/register"},{name:"我的订单",href:"#/order"}],
            arr4:[{name:"EMUI",href:"https://www.baidu.com"},{name:"开发商城",href:"#"},{name:"终端",href:"#"},{name:"联盟",href:"#"}],
            arr5:[{name:"服务中心",href:"https://www.baidu.com"},{name:"联系客服",href:"#"}],
            arr6:[
                {name:"商城首页",href1:"https://www.baidu.com",href2:"https://www.baidu.com"},
                {name:"频道",href1:"#",brand1:"华为专区",brand2:"华为专区",href2:"https://www.baidu.com",href2:"https://www.baidu.com"},
                {name:"产品",href1:"#",href2:"https://www.baidu.com",brand1:"华为专区",brand2:"华为专区"},
                {name:"增值服务",href1:"#",brand1:"华为专区",brand2:"华为专区",href2:"https://www.baidu.com"},
                {name:"会员",href:"#",brand1:"华为专区",brand2:"华为专区",href2:"https://www.baidu.com"}
            ],
            reverse:"down",
            showHide:"none",
            bg:"#f9f9f9",
            flag:"down",
            showHides2:"none",
            bgss:"#f9f9f9",
            number:0,
            showHides3:"none",
        }
    }
    //更多精彩符号反转
    handleEnter(){
        this.setState({reverse:"up",showHide:"block",backgrounds:"#fff"});
    }
    handleLeave(){
        this.setState({reverse:"down",showHide:"none", backgrounds:"#f9f9f9"});
    }
    mouseEnter(){
            this.setState({flag:"up",showHides:"block",bg:"#fff"});
        }
    mouseLeave(){
        this.setState({flag:"down",showHides:"none", bg:"#f9f9f9"});
    }
    mouseEnter2(){
        this.setState({flag2:"up",showHides2:"block",bgs:"#fff"});
    }
    mouseLeave2(){
        this.setState({flag2:"down",showHides2:"none", bgs:"#f9f9f9"});
    }
    mouseEnter3(){
        this.setState({showHides3:"block",bgss:"#fff"});
    }
    mouseLeave3(){
        this.setState({showHides3:"none", bgss:"#f9f9f9"});
    }
    render(){
        const showHide=this.state.showHide;
        return(
            <div className="top-nav">
                <div className="top-nav-container">
                    <div className="top-nav-left">
                        <div>
                            {this.state.arr1.map((item,index)=>{
                                            return <a key={index} href={item.href}>{item.name}</a>
                                    })}
                        </div>
                        <div className="top-nav-more"  onMouseLeave={this.handleLeave.bind(this)} style={{background:this.state.backgrounds,left:this.state.lefts}} onMouseEnter={this.handleEnter.bind(this)} >
                            <div className="top-nav-detail">
                                <span>更多精彩</span>
                                <Icon type={this.state.reverse}/>
                            </div>
                            <div className="home-nav-hidden" style={{display:showHide}}>
                                {this.state.arr4.map((item,index)=>{
                                    return <div key={index}><a key={index} href={item.href} style={{display:"block"}}>{item.name}</a></div>
                                })}
                            </div>
                        </div>
                    </div>
                    <div className="top-navright-container">
                        <div className="top-nav-right">
                            <div className="top-right-div">
                                {this.state.arr2.map((item,index)=>{
                                                    return <a key={index} href={item.href}>{item.name}</a>
                                            })}
                            </div>
                        </div>
                        <div className="top-person-container"  onMouseLeave={this.mouseLeave.bind(this)} style={{background:this.state.bg}} onMouseEnter={this.mouseEnter.bind(this)}>
                            <div className="top-right-person">
                                <div className="top-right-kehu">
                                    客户服务
                                    <Icon type={this.state.flag}/>
                                    &nbsp;|
                                </div>
                                <div className="top-right-showperson" style={{display:this.state.showHides}}>
                                        {
                                            this.state.arr5.map((item,index)=>{
                                            return  <div key={index}><a key={index} href={item.href}>{item.name}</a></div>
                                            })
                                        }
                                </div>                               
                            </div>
                        </div>
                        <div className="top-net-container"  onMouseLeave={this.mouseLeave2.bind(this)} style={{background:this.state.bgs}} onMouseEnter={this.mouseEnter2.bind(this)}>
                            <div className="top-net-nav">
                                网站导航
                                <Icon type={this.state.flag2}/>
                                &nbsp;|
                            </div>
                            <div className="net-nav-hide" style={{display:this.state.showHides2}}>
                                    <ul>
                                        {this.state.arr6.map((item,index)=>{
                                            return (<li key={index}>
                                                <h2>{item.name}</h2>
                                                <a href={item.href1}>{item.brand1}</a>
                                                <a href={item.href2}>{item.brand2}</a>
                                                </li>)
                                        })} 
                                    </ul>
                            </div>
                        </div>
                        <div className="top-produce-container"  onMouseLeave={this.mouseLeave3.bind(this)} style={{background:this.state.bgss}} onMouseEnter={this.mouseEnter3.bind(this)}>
                            <div className="top-nav-produce">
                                <Icon type="shopping-cart" style={{fontSize:16}}/>
                                <span><a href="#/cart">购物车({this.state.number})</a></span>
                            </div>
                            <div className="net-nav-produce" style={{display:this.state.showHides3}}>
                                    <Empty description="您的购物车是空的，快去选购吧"/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
        
}