import React,{Component} from 'react';
import {Icon,Menu,Carousel,Empty,Row, Col,Popover,BackTop,Modal} from "antd";
import {NavLink} from "react-router-dom";
import CompanyMessage from "./companyMessage.jsx";
import Fixed from "./fixed.jsx";
import TopNav from "./topNav.jsx";
import '../css/home.css';
import $ from "jquery";
const { SubMenu }  = Menu;
class Home extends Component{
    constructor(props){
        super(props)
        this.state={
            show:"block",
            // arr1:[{name:"首页",href:"#/home"},{name:"合宙官网",href:"#/home"},{name:"荣耀官网",href:"#"},{name:"企业购",href:"#"}],
            // arr2:[{name:"请登录",href:"#/login"},{name:"注册",href:"#/register"},{name:"我的订单",href:"#/order"}],
            arr3:[{name:"华为P30",href:"#"},{name:"荣耀20",href:"#"},{name:"Mate  20系列",href:"#"},{name:"荣耀V20",href:"#"}],
            // reverse:"down",
            // arr4:[{name:"EMUI",href:"https://www.baidu.com"},{name:"开发商城",href:"#"},{name:"终端",href:"#"},{name:"联盟",href:"#"}],
            // showHide:"none",
            current:"mail",
            backgrounds:"#f9f9f9",
            //current: 'mail',
            // flag:"down",
             showHides:"none",
            // bg:"#f9f9f9",
            // arr5:[{name:"服务中心",href:"https://www.baidu.com"},{name:"联系客服",href:"#"}],
            // bgs:"#f9f9f9",
            flag2:"down",
            //showHides2:"none",
            // arr6:[
            //     {name:"商城首页",href1:"https://www.baidu.com",href2:"https://www.baidu.com"},
            //     {name:"频道",href1:"#",brand1:"华为专区",brand2:"华为专区",href2:"https://www.baidu.com",href2:"https://www.baidu.com"},
            //     {name:"产品",href1:"#",href2:"https://www.baidu.com",brand1:"华为专区",brand2:"华为专区"},
            //     {name:"增值服务",href1:"#",brand1:"华为专区",brand2:"华为专区",href2:"https://www.baidu.com"},
            //     {name:"会员",href:"#",brand1:"华为专区",brand2:"华为专区",href2:"https://www.baidu.com"}
            // ],
            // number:0,
            // bgss:"#f9f9f9",
            // showHides3:"none",
            arr7:[
                {name:"手机",href1:"https://www.baidu.com",produce:[{name:'荣耀',href:"#"},{name:'HUAWEI',href:"#"},{name:'P系列',href:"#"}]},
                {name:"手机",href1:"https://www.baidu.com",produce:[{name:'荣耀',href:"#"},{name:'HUAWEI',href:"#"},{name:'P系列',href:"#"}]},
                {name:"手机",href1:"https://www.baidu.com",produce:[{name:'荣耀',href:"#"},{name:'HUAWEI',href:"#"},{name:'P系列',href:"#"}]},
                {name:"手机",href1:"https://www.baidu.com",produce:[{name:'荣耀',href:"#"},{name:'HUAWEI',href:"#"},{name:'P系列',href:"#"}]},
                {name:"手机",href1:"https://www.baidu.com",produce:[{name:'荣耀',href:"#"},{name:'HUAWEI',href:"#"},{name:'P系列',href:"#"}]},
                {name:"手机",href1:"https://www.baidu.com",produce:[{name:'荣耀',href:"#"},{name:'HUAWEI',href:"#"},{name:'P系列',href:"#"}]},
            ],
            arr8:[
                {produce:[{img:'#',tip:"手机1",href:"#"},{img:'#',tip:"鼠标1",href:"#"},{img:'#',tip:"移动电源1",href:"#"},{img:'#',tip:"鼠标2",href:"#"},{img:'#',tip:"鼠标2",href:"#"},{img:'#',tip:"鼠标2",href:"#"},{img:'#',tip:"查看全部",href:"#"}]},
                {produce:[{img:'#',tip:"手机2",href:"#"},{img:'#',tip:"鼠标2",href:"#"},{img:'#',tip:"移动电源2",href:"#"},{img:'#',tip:"鼠标2",href:"#"},{img:'#',tip:"查看全部",href:"#"},{img:'#',tip:"鼠标2",href:"#"},{img:'#',tip:"查看全部",href:"#"},{img:'#',tip:"鼠标2",href:"#"},{img:'#',tip:"查看全部",href:"#"}]},
                {produce:[{img:'#',tip:"手机3",href:"#"},{img:'#',tip:"鼠标3",href:"#"},{img:'#',tip:"移动电源3",href:"#"},{img:'#',tip:"鼠标2",href:"#"},{img:'#',tip:"查看全部",href:"#"},{img:'#',tip:"鼠标2",href:"#"},{img:'#',tip:"查看全部",href:"#"},{img:'#',tip:"鼠标2",href:"#"},{img:'#',tip:"查看全部",href:"#"},{img:'#',tip:"鼠标2",href:"#"},{img:'#',tip:"查看全部",href:"#"}]},
                {produce:[{img:'#',tip:"手机4",href:"#"},{img:'#',tip:"鼠标4",href:"#"},{img:'#',tip:"移动电源4",href:"#"},{img:'#',tip:"查看全部",href:"#"}]},
                {produce:[{img:'#',tip:"手机5",href:"#"},{img:'#',tip:"鼠标5",href:"#"},{img:'#',tip:"移动电源5",href:"#"},{img:'#',tip:"查看全部",href:"#"}]},
                {produce:[{img:'#',tip:"手机6",href:"#"},{img:'#',tip:"鼠标6",href:"#"},{img:'#',tip:"移动电源6",href:"#"},{img:'#',tip:"查看全部",href:"#"}]},
            ],
            arr9:["none","none","none","none","none","none"],
            arr10:[
                "https://www.baidu.com","https://www.baidu.com","https://www.baidu.com",
                "https://ant.design/components/icon-cn/","https://ant.design/components/icon-cn/","https://ant.design/components/icon-cn/"
            ],
            arr11:[
            {img:'#',tip:"企业购特惠",href:"#"},{img:'#',tip:"会员领券",href:"#"},
            {img:'#',tip:"以旧换新",href:"#"},{img:'#',tip:"navo5系列",href:"#"},
            {img:'#',tip:"荣耀数码",href:"#"},{img:'#',tip:"华为数码",href:"#"}
          ],
          arr12:[
            {img:'#',name:"荣耀20",href:"#",price:2399,tip:"最高优惠800"},
            {img:'#',name:"荣耀20",href:"#",price:2399,tip:"最高优惠800"},
            {img:'#',name:"荣耀20",href:"#",price:2399,tip:"最高优惠800"},
            {img:'#',name:"荣耀20",href:"#",price:2399,tip:"最高优惠800"},
            {img:'#',name:"荣耀20",href:"#",price:2399,tip:"最高优惠800"},
            {img:'#',name:"荣耀20",href:"#",price:2399,tip:"最高优惠800"},
            {img:'#',name:"荣耀20",href:"#",price:2399,tip:"最高优惠800"},
            {img:'#',name:"荣耀20",href:"#",price:2399,tip:"最高优惠800"}
        ],
        arr13:[],
        arr130:[],
        arr14:[
            {title:"购物相关",produce:[{tip:"鼠标1",href:"#"},{tip:"移动电源1",href:"#"},{tip:"手机2",href:"#"},{tip:"鼠标2",href:"#"}]},
            {title:"保修与退换货",produce:[{tip:"鼠标1",href:"#"},{tip:"移动电源1",href:"#"},{tip:"手机2",href:"#"},{tip:"鼠标2",href:"#"}]},
            {title:"维修与技术支持",produce:[{tip:"鼠标1",href:"#"},{tip:"移动电源1",href:"#"},{tip:"手机2",href:"#"},{tip:"鼠标2",href:"#"}]},
            {title:"特色服务",produce:[{tip:"鼠标1",href:"#"},{tip:"移动电源1",href:"#"},{tip:"手机2",href:"#"},{tip:"鼠标2",href:"#"}]},
            {title:"关于我们",produce:[{tip:"鼠标1",href:"#"},{tip:"移动电源1",href:"#"},{tip:"手机2",href:"#"},{tip:"鼠标2",href:"#"}]},
        ],
        visible:false,
        arr15:[{content:"公告内容1",href:"#"},{content:"公告内容2",href:"#"},{content:"公告内容3",href:"#"},
        {content:"公告内容4",href:"#"},{content:"公告内容5",href:"#"},{content:"公告内容6",href:"#"},{content:"公告内容1",href:"#"}],
        top:0,
        counts:0,
        left:0,
        right:5,
        arr16:[],
        }
        this.recommend=this.recommend.bind(this);
        //this.hotSell=this.hotSell.bind(this);
    }
    //设定定时器
    componentDidMount(){
        clearInterval(this.interval);
        let _this=this,i=1;
        this.interval = setInterval(()=>{
            if(i<_this.state.arr15.length){
                $('#ul').stop().animate({'top':-43*i+'px'},1000);
                i++;
            }else{
                i=1;
                $('#ul').css({'top':'0'});
                $('#ul').stop().animate({'top':-43*i+'px'},1000);
                i++;
            }
           
        }, 2000);
        this.recommend(3);
        this.recommend(2);
        this.recommend(1);
        this.recommend(0);
        //this.hotSell();
    }
    //轮播图产品调用接口
    //热销产品接口调用
    //精品推荐接口调用
    recommend(value){
        let  _this=this;
        var url= "/api/mall/recommended_product?type="+value;
        var xhr = new XMLHttpRequest(); 
        xhr.open("get", url,true);
        xhr.send();
        xhr.onreadystatechange = function(){
            if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                let body=JSON.parse(xhr.responseText).data;
                if(value===3){
                    _this.setState({arr130:body},()=>{
                        let arr=_this.state.arr130.slice(0,5);
                        _this.setState({arr13:arr});
                    });
                }
               if(value===2){
                   _this.setState({arr12:body})
               }
               if(value===1){
                    _this.setState({})
               }
               if(value===0){
                   _this.setState({
                        arr16:body
                   })
                   console.log("ooooo===",body);
               }
                console.log("fff=========",body);
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
        console.log("获取精品推荐列表");
    }
   //开启定时器
   mouseLeave9(){
    clearInterval(this.interval);
    let _this=this,i=this.state.counts+1;
    this.interval = setInterval(()=>{
        if(i<_this.state.arr15.length){
            $('#ul').stop().animate({'top':-43*i+'px'},1000);
            i++;
        }else{
            i=1;
            $('#ul').css({'top':'0'});
            $('#ul').stop().animate({'top':-43*i+'px'},1000);
            i++;
        }
    }, 2000);
   }
    //清除定时器
    componentWillUnmount() {
        clearInterval(this.interval);
      }
    mouseEnter9(index){
        clearInterval(this.interval);
        this.setState({counts:index})
    }
    //关闭顶部物超所值
    topclose(){
        this.setState({show:"none"})
    }
    handleClick(e){
        this.setState({
          current: e.key,
        });
    }
    //搜索按钮
    search(){
        console.log("您点击了搜索按钮");
    }
    //更多精彩符号反转
    // handleEnter(){
    //     this.setState({reverse:"up",showHide:"block",backgrounds:"#fff"});
    // }
    // handleLeave(){
    //     this.setState({reverse:"down",showHide:"none", backgrounds:"#f9f9f9"});
    // }
    // mouseEnter(){
    //     this.setState({flag:"up",showHides:"block",bg:"#fff"});
    // }
    // mouseLeave(){
    //     this.setState({flag:"down",showHides:"none", bg:"#f9f9f9"});
    // }
    // mouseEnter2(){
    //     this.setState({flag2:"up",showHides2:"block",bgs:"#fff"});
    // }
    // mouseLeave2(){
    //     this.setState({flag2:"down",showHides2:"none", bgs:"#f9f9f9"});
    // }
    // mouseEnter3(){
    //     this.setState({showHides3:"block",bgss:"#fff"});
    // }
    // mouseLeave3(){
    //     this.setState({showHides3:"none", bgss:"#f9f9f9"});
    // }
    mouseEnter4(index){
        let arr10=["none","none","none","none","none","none"];
        arr10[index]="flex";
        this.setState({arr9:arr10});
    }
    mouseLeave4(){
        let arr10=["none","none","none","none","none","none"];
        this.setState({arr9:arr10});
    }
    //轮播图的上一页与下一页的切换
    next() {
        this.slider.slick.slickNext();
      }
      prev() {
        this.slider.slick.slickPrev();
      }
      //精品商品数据获取
      leftData(){
          if(this.state.left>=5){
            let lefts=this.state.left-5;
            let rights=this.state.right-5;
            this.setState({left:lefts,right:rights});
          }else{
              this.setState({left:0,right:5})
          }
          let arr=this.state.arr130.slice(this.state.left,this.state.right);
          this.setState({arr13:arr});
          console.log("你点击了获取left数据");
      }
      rightData(){
        let length=this.state.arr130.length-5;
        if(this.state.right<=length){
            let lefts=this.state.left+5;
            let rights=this.state.right+5;
            this.setState({left:lefts,right:rights});
        }else{
            let length=this.state.arr130.length;
            let lengths=this.state.arr130.length-5
            this.setState({right:length,left:lengths});
        }
        let arr=this.state.arr130.slice(this.state.left,this.state.right);
        this.setState({arr13:arr});
        console.log("你点击了获取right数据");
    }
    
    render(){
        const showHide=this.state.showHide;
        const _this=this;
        // if(this.state.arr16[0]){
        //     let image=this.state.arr16[0].image
        // }
        return(
            <div className="home-container">
                  <NavLink to="/cheapproduct/1">
                        <div className="home-top" title="荣耀" style={{display:this.state.show}}>
                                <div className="home-top-word"><a href="#">荣耀20系列新品开售享2999元豪礼</a></div>
                                <div className="home-top-close" title="关闭" onClick={this.topclose.bind(this)}>X</div>
                                {/* <img src={this.state.arr16[0]?this.state.arr16[0].image:''} className="home-top-image"/> */}
                        </div>
                </NavLink>
                {/* <div className="top-nav">
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
                                                return  <div key={index}><a key={index} href={item.href} style={{display:"block"}}>{item.name}</a></div>
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
                </div> */}
                 <TopNav/>
                <div className="home-middle-nav">
                    <div className="home-middle-container">
                        <div className="home-middle-left">
                            <img src="#" className="home-middle-navimg"/>
                            <div className="home-special-one"><a href="#">华为专区</a></div>
                            <div className="home-special-two"><a href="#">荣耀专区</a></div>
                            <div className="home-middle-list">
                                {
                                    this.state.arr3.map((item,index)=>{
                                        return <a key={index} href={item.href}>{item.name}</a>
                                    })
                                }
                            </div>
                        </div>
                        <div className="home-middle-search">
                            <input placeholder="请输入搜索内容" ref={ref=>this.searchs=ref} className="home-search-input"/>
                            <span  onClick={this.search.bind(this)}><Icon type="search" className="home-search-tag"/></span>
                        </div>
                    </div>
                </div>
                <div className="home-slide-show">
                    <div className="home-slide-container">
                        <Carousel autoplay ref={el =>this.slider = el}>
                            <div>
                                <h3>1</h3>
                            </div>
                            <div>
                                <h3>2</h3>
                            </div>
                            <div>
                                <h3>3</h3>
                            </div>
                            <div>
                                <h3>4</h3>
                            </div>
                        </Carousel>
                        <div className="home-tag-one"><Icon type="left" onClick={this.next.bind(this)} style={{color:"#fff",fontSize:15}}/></div>
                        <div className="home-tag-two"><Icon type="right" onClick={this.prev.bind(this)} style={{color:"#fff",fontSize:15}}/></div>   
                    </div>
                    
                    <div className="home-slide-top"  onMouseLeave={this.mouseLeave4.bind(this)}>
                        <div className="home-slide-appear">
                                {
                                    this.state.arr7.map((item,index)=>{
                                        return(
                                            <div key={index}  onMouseEnter={_this.mouseEnter4.bind(_this,index)}>
                                                <h3><a href={item.href1}>{item.name}</a></h3>
                                                <div>
                                                    {item.produce.map((item2,index2)=>{
                                                        return <span key={index2}><a href={item2.href}>{item2.name}</a></span>
                                                    })}
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                        </div>
                        
                        <div className="home-slide-showhide">
                                {
                                    this.state.arr8.map((item,index)=>{
                                         return( <div key={index} style={{display:_this.state.arr9[index]}}>
                                            <div>
                                               {
                                                    item.produce.slice(0,4).map((item2,index2)=>{
                                                       
                                                        return (
                                                            <div key={index2}>
                                                                <a href={item2.href}>
                                                                    <img src={item2.img}/>
                                                                    <span>{item2.tip}</span>
                                                                </a>
                                                            </div>
                                                        )
                                                    })
                                                }
                                            </div>

                                            <div>
                                               {
                                                    item.produce.slice(4,8).map((item2,index2)=>{
                                                       
                                                        return (
                                                            <div key={index2}>
                                                                <a href={item2.href}>
                                                                    <img src={item2.img}/>
                                                                    <span>{item2.tip}</span>
                                                                </a>
                                                            </div>
                                                        )
                                                    })
                                                }
                                            </div>
                                            <div>
                                               {
                                                    item.produce.slice(8,12).map((item2,index2)=>{
                                                        
                                                        return (
                                                            <div key={index2}>
                                                                <a href={item2.href}>
                                                                    <img src={item2.img}/>
                                                                    <span>{item2.tip}</span>
                                                                </a>
                                                            </div>
                                                        )
                                                    })
                                                }
                                            </div>
                                            <div>
                                               {
                                                    item.produce.slice(12,16).map((item2,index2)=>{
                                                       
                                                        return (
                                                            <div key={index2}>
                                                                <a href={item2.href}>
                                                                    <img src={item2.img}/>
                                                                    <span>{item2.tip}</span>
                                                                </a>
                                                            </div>
                                                        )
                                                    })
                                                }
                                            </div>
                                        </div>)
                                    })
                                }
                        </div>
                    </div>
                </div>
                <div className="home-person-sign">
                    <Row type="flex">
                        <Col span={6} order={3}>
                            <div>
                                <h3><a href="#">公告</a></h3>
                                <div>
                                    <ul id="ul" ref={ref=>this.ul=ref} onMouseLeave={this.mouseLeave9.bind(this)}>
                                        {this.state.arr15.map((item,index)=>{
                                              return (<li key={index} onMouseEnter={this.mouseEnter9.bind(this,index)}><a href={item.href}>{item.content}</a></li>)
                                        })}
                                    </ul>
                                </div>
                            </div>
                            <div>
                                <span><Icon type="qrcode" style={{fontSize:14,color:"#cacbf7"}}/><a href="#login">优购码</a></span>
                                <span><Icon type="insurance" style={{fontSize:14,color:"#e86666"}}/><a href="#login">实名认证</a></span>
                                <span><Icon type="security-scan" style={{fontSize:14,color:"#7fe0b8"}}/><a href="#login">补购保障</a></span>
                            </div>
                        </Col>
                        <Col span={12} order={2}>
                            <ul>
                                {
                                    _this.state.arr11.map((item,index)=>{
                                        return (<li key={index}>
                                            <div><img src={item.img}/></div>
                                            <a href={item.href}>{item.tip}</a>
                                        </li>)
                                    })
                                }
                            </ul>
                        </Col>
                        <Col span={6} order={1}>
                            <div className="home-sign-img">
                                <Icon type="user" style={{fontSize:40}}/>
                            </div>
                        <div className="home-new-person">
                            <div>
                                <span>你好！&nbsp;请</span>
                                <a href="#/login">登录</a>/
                                <a href="#/register">注册</a>
                            </div>
                            <div>
                                <a>新人福利</a>
                                <a>会员频道</a>
                            </div>
                        </div>
                        </Col>
                    </Row>
                </div>
                <div className="home-hot-sell">
                    <div className="home-hot-container">
                        <h2>热销产品</h2>
                        <div className="home-hot-play">
                            <div className="home-hot-big">
                               {/* <NavLink to={"/detail/"+item.id}><img src="#"/></NavLink> */}
                               <img src="#"/>
                            </div>
                                <ul>
                                    {
                                        _this.state.arr12.map((item,index)=>{
                                            return (
                                                <NavLink to={"/detail/"+item.product_id} key={index}>
                                                    <li>
                                                        <img src={item.image}/>
                                                        <div>{item.name}</div>
                                                        <div>{item.desc}</div>
                                                        <div>￥{item.price}</div>
                                                    </li>
                                                </NavLink>
                                            )
                                        })
                                    }
                                </ul>
                        </div>
                    </div>
                </div>
                <div  className="home-good-commend">
                    <div  className="home-good-container">
                         <h2>精品推荐</h2>
                         <div className="home-good-play">
                             <ul>
                                 {
                                   _this.state.arr13.map((item,index)=>{
                                         return (<NavLink to={"/detail/"+item.product_id} key={index}>
                                            <li>
                                                <div>
                                                    <img src={item.image}/>
                                                    <div>{item.desc}</div>
                                                </div>
                                                <div>{item.name}</div>
                                                <div>￥{item.price}</div>
                                            </li>
                                         </NavLink>)
                                     })
                                 }
                             </ul>
                             <div className="home-good-left" onClick={this.leftData.bind(this)}><Icon type="left" style={{fontSize:16,color:"#444"}}/></div>
                             <div className="home-good-right"  onClick={this.rightData.bind(this)}><Icon type="right" style={{fontSize:16,color:"#444"}}/></div>
                         </div>
                    </div>
                </div>
                <div className="home-end-introduce">
                    <div className="home-end-container">
                        <div className="home-end-safe">
                            <a href="#"><Icon type="sketch" style={{color:"red"}}/>&nbsp;百强企业&nbsp;品质保证</a>
                            <a href="#"><Icon type="smile" style={{color:"red"}}/>&nbsp;7天退货&nbsp;15天换货</a>
                            <a href="#"><Icon type="dollar" style={{color:"red"}}/>&nbsp;48元起免运费</a>
                            <a href="#"><Icon type="environment" style={{color:"red"}}/>&nbsp;1000家维修网点&nbsp;全国联保</a>
                        </div>
                        <div className="home-end-expand">
                            <div className="home-end-list">
                               
                            </div>
                            <div className="home-end-service">

                            </div>
                        </div>
                        <CompanyMessage/>
                    </div>
                </div>
                <Fixed/>
            </div>
        )
    }
}
export default Home;
