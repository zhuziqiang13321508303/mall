import React,{Component} from 'react';
import {Icon,Carousel,Row, Col} from "antd";
import {NavLink} from "react-router-dom";
import CompanyMessage from "../assets/companyMessage.jsx";
import Fixed from "../assets/fixed.jsx";
import TopMessage from "../assets/topMessage.jsx";
// import Action from '../reds/Action';
// import Store from '../reds/Store';
import imgLogo from "../assets/images/hezhou.jpg";
import '../css/home.css';
import $ from "jquery";
class Home extends Component{
    constructor(props){
        super(props)
        this.state={
            show:"block",
            arr3:[{name:"华为P30",href:"#"},{name:"荣耀20",href:"#"},{name:"Mate  20系列",href:"#"},{name:"荣耀V20",href:"#"}],
            current:"mail",
            backgrounds:"#f9f9f9",
            showHides:"none",
            flag2:"down",
            arrClass:[],
            arrProduct:[],
            arr9:["none","none","none","none","none"],
            arr11:[
            {img:'#',tip:"企业购特惠",href:"#"},{img:'#',tip:"会员领券",href:"#"},
            {img:'#',tip:"以旧换新",href:"#"},{img:'#',tip:"navo5系列",href:"#"},
            {img:'#',tip:"荣耀数码",href:"#"},{img:'#',tip:"华为数码",href:"#"}
          ],
        arrHot:[],
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
        arrCheaps:[],
        arrCheap:[],
        arrBanner:[],
        banner:"none",
        infos:'',
        }
        this.recommend=this.recommend.bind(this);
        this.get=this.get.bind(this);
        this.changeNumber=this.changeNumber.bind(this);
        this.getClass=this.getClass.bind(this);
        this.getClassList=this.getClassList.bind(this);
        this.handleData=this.handleData.bind(this);
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
        this.get();
        this.changeNumber();
        this.getClass();
        this.getClassList();
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
                //console.log("eee=========fffffff",body);
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
        //console.log("aaaa++++++=====oooooopppp=");
    }
    //获取产品列表
    get(){
        let  _this=this;
        var url= "/api/mall/product";
        var xhr = new XMLHttpRequest(); 
        xhr.open("get", url,true);
        xhr.send();
        xhr.onreadystatechange = function(){
            if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                let body=JSON.parse(xhr.responseText).data;
                let arr=[];
                for(let j=1;j<6;j++){
                    let obj={};
                    obj.produce=body.slice(0*j,4*j);
                    arr.push(obj);
                }
                _this.setState({arrProduct:arr});
                //console.log("fff=========eeeeeeee",body,arr);
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
        //console.log("获取精品推荐列表");
    }
      //获取产品分类列表
      getClass(){
        let  _this=this;
        var url= "/api/mall/product_class";
        var xhr = new XMLHttpRequest(); 
        xhr.open("get", url,true);
        xhr.send();
        xhr.onreadystatechange = function(){
            if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                let body=JSON.parse(xhr.responseText).data;
               _this.handleData(body);
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
        //console.log("获取产品分类");
    }
    //对商品分类数据进行处理
    handleData(body){
        let arrTwos=body.slice(5);
        let arrThree=[];
        for(let j=0;j<5;j++){
            let obj={};
            obj.name=body[j].name;
            obj.id=body[j].id; 
            obj.level=1;
            obj.parent=0;
            arrThree.push(obj);
            for(let i=0;i<arrThree.length;i++){
                let arrTwo=[];
                switch(arrThree[i].name){
                    case body[0].name:
                       arrTwo.push(arrTwos[0]);
                       arrTwo.push(arrTwos[1]);
                       obj.produce=arrTwo;
                       break;
                    case body[1].name:
                        arrTwo.push(arrTwos[2]);
                        arrTwo.push(arrTwos[3]);
                        arrTwo.push(arrTwos[4]);
                        obj.produce=arrTwo;
                        break;
                    case body[2].name:
                            arrTwo.push(arrTwos[5]);
                            arrTwo.push(arrTwos[6]);
                            obj.produce=arrTwo;
                            break;
                    case body[3].name:
                            arrTwo.push(arrTwos[7]);
                            obj.produce=arrTwo;
                            break;
                    case body[4].name:
                            arrTwo.push(arrTwos[8]);
                            arrTwo.push(arrTwos[9]);
                            obj.produce=arrTwo;
                            break;
                }
            }
            
        }
        this.setState({arrClass:arrThree})
    }
    //获取分类详细产品
    getClassList(){
        let  _this=this;
        var url= "/api/mall/product_class?parent=2";
        var xhr = new XMLHttpRequest(); 
        xhr.open("get", url,true);
        xhr.send();
        xhr.onreadystatechange = function(){
            if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                let body=JSON.parse(xhr.responseText).data;
                //console.log("fff=====hhhhhh====eeeeeeee",body);
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
        //console.log("获取精品推荐列表");
    }
    //产品分类跳转
    leapClass(index){
        let arr=this.state.arrClass[index].name;
        this.props.history.push("/productclass/"+arr);
        //console.log("你点击了大分类按钮",index,arr);
    }
    leapMidClass(item,index){
        let arrOne=this.state.arrClass[item].name;
        let arrTwo=this.state.arrClass[item].produce[index].name;
        let arr=[];
        arr.push(arrOne);
        arr.push(arrTwo);
        this.props.history.push("/productclass/"+arr);
        //console.log("你点击了中分类按钮",item,index,arrOne,arrTwo,arr);
    }
    leapSingle(clas,item,index){
        let arrOne=this.state.arrClass[clas].name;
        let number=item*4+index;
        let arrTwo=this.state.arrProduct[clas].produce[number].name;
        let arr=[];
        arr.push(arrOne);
        arr.push(arrTwo);
        this.props.history.push("/productclass/"+arr);
        //console.log("你点击了单个商品按钮",clas,item,index,number,arrTwo,arr);
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
                   _this.setState({arrHot:body})
               }
               if(value===1){
                   let arr=[];
                   for(let m=0;m<5;m++){
                       arr=arr.concat(body)
                   }
                    _this.setState({arrCheap:body,arrBanner:arr,banner:"block"},()=>{
                        console.log("yyyyyyyyy======",arr);
                    })
               }
               if(value===0){
                   _this.setState({
                        arrCheaps:body
                   })
                   console.log("ooooo===",body);
               }
                //console.log("fff=========",body);
            }else if (xhr.status === 401) {
                //console.error(xhr.responseText);
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
        //console.log("获取精品推荐列表");
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
    mouseEnterInform(index){
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
        let  _this=this;
        let searchWord=this.searchs.value;
        var url= "/api/mall/product?search_name="+searchWord;
        var xhr = new XMLHttpRequest(); 
        xhr.open("get", url,true);
        xhr.send();
        xhr.onreadystatechange = function(){
            if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                let body=JSON.parse(xhr.responseText).data;
                if(body.length){
                    _this.props.history.push("/detail/"+body[0].id);
                }else{
                    _this.props.history.push("/noresult/"+searchWord);
                }
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
    }
    mouseEnterTop(index){
        let arr10=["none","none","none","none","none"];
        arr10[index]="flex";
        this.setState({arr9:arr10});
    }
    mouseLeaveTop(){
        let arr10=["none","none","none","none","none"];
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
          //console.log("你点击了获取left数据");
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
        //console.log("你点击了获取right数据");
    }
    render(){
        const _this=this;
        return(
            <div className="home-container">
                  <NavLink to="/cheapproduct/1">
                        <div className="home-top" title="荣耀" style={{display:this.state.show}}>
                                <div className="home-top-word"><a href="#">荣耀20系列新品开售享2999元豪礼</a></div>
                                <div className="home-top-close" title="关闭" onClick={this.topclose.bind(this)}>X</div>
                                <img src={this.state.arrCheap[0]?this.state.arrCheap[0].image:''} className="home-top-image"/>
                        </div>
                </NavLink>
                <div className="top-nav">
                    <div className="top-nav-container">
                        <TopMessage/>
                    </div>
                </div>
                <div className="home-middle-nav">
                    <div className="home-middle-container">
                        <div className="home-middle-left">
                            <img src={imgLogo} className="home-middle-navimg"/>
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
                <div className="home-slide-show" style={{display:this.state.banner}}>
                    <div className="home-slide-container">
                        <Carousel autoplay ref={el =>this.slider = el}>
                            {
                                this.state.arrBanner.map((item,index)=>{
                                    return(
                                        <div key={index}>
                                            <NavLink to={"/detail/"+item.product_id}>
                                                <img src={item.image} className="home-banner-img"/>
                                            </NavLink>
                                        </div>
                                    )
                                })
                            }
                        </Carousel>
                        <div className="home-tag-one"><Icon type="left" onClick={this.next.bind(this)} style={{color:"#fff",fontSize:15}}/></div>
                        <div className="home-tag-two"><Icon type="right" onClick={this.prev.bind(this)} style={{color:"#fff",fontSize:15}}/></div>   
                    </div>
                    
                    <div className="home-slide-top"  onMouseLeave={this.mouseLeaveTop.bind(this)}>
                        <div className="home-slide-appear">
                                {
                                    this.state.arrClass.map((item,index)=>{
                                        return(
                                            <div key={index}  onMouseEnter={_this.mouseEnterTop.bind(this,index)}>
                                                <h3 onClick={_this.leapClass.bind(this,index)}><a href={item.href1}>{item.name}</a></h3>
                                                <div>
                                                    {item.produce.map((item2,index2)=>{
                                                        return <span key={index2} onClick={_this.leapMidClass.bind(this,index,index2)}><a href={item2.href}>{item2.name}</a></span>
                                                    })}
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                        </div>
                        
                        <div className="home-slide-showhide">
                                {
                                    this.state.arrProduct.map((item,index)=>{
                                         return( <div key={index} style={{display:_this.state.arr9[index]}}>
                                            <div>
                                               {
                                                    item.produce.slice(0,4).map((item2,index2)=>{
                                                        return (
                                                            <div key={index2} onClick={_this.leapSingle.bind(this,index,0,index2)}>
                                                                    <img src={item2.image}/>
                                                                    <span>{item2.name}</span>
                                                            </div>
                                                        )
                                                    })
                                                }
                                            </div>

                                            <div>
                                               {
                                                    item.produce.slice(4,8).map((item2,index2)=>{
                                                       
                                                        return (
                                                            <div key={index2} onClick={_this.leapSingle.bind(this,index,1,index2)}>
                                                                    <img src={item2.image}/>
                                                                    <span>{item2.name}</span>
                                                            </div>
                                                        )
                                                    })
                                                }
                                            </div>
                                            <div>
                                               {
                                                    item.produce.slice(8,12).map((item2,index2)=>{
                                                        
                                                        return (
                                                            <div key={index2} onClick={_this.leapSingle.bind(this,index,2,index2)}>
                                                                    <img src={item2.image}/>
                                                                    <span>{item2.name}</span>
                                                            </div>
                                                        )
                                                    })
                                                }
                                            </div>
                                            <div>
                                               {
                                                    item.produce.slice(12,16).map((item2,index2)=>{
                                                       
                                                        return (
                                                            <div key={index2} onClick={_this.leapSingle.bind(this,index,3,index2)}>
                                                                    <img src={item2.image}/>
                                                                    <span>{item2.name}</span>
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
                                              return (<li key={index} onMouseEnter={this.mouseEnterInform.bind(this,index)}><a href={item.href}>{item.content}</a></li>)
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
                                        _this.state.arrHot.map((item,index)=>{
                                            return (
                                                <NavLink to={"/detail/"+item.product_id} key={index}>
                                                    <li>
                                                        <div><img src={item.image}/></div>
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
                <Fixed number={this.state.infos}/>
            </div>
        )
    }
}
export default Home;
