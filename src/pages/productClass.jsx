import React,{Component} from 'react';
import CompanyMessage from "../assets/companyMessage.jsx";
import Fixed from "../assets/fixed.jsx";
import TopMessage from "../assets/topMessage.jsx";
import $ from "jquery";
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
            arrNav:[],
            arrName:[],
            infos:'',
            arrClassList:[],
            lens:0,
        }
        this.getClass=this.getClass.bind(this);
        this.changeNumber=this.changeNumber.bind(this);
        this.getClassList=this.getClassList.bind(this);
        this.handleData=this.handleData.bind(this);
        this.handleDetail=this.handleDetail.bind(this);
    }

    componentDidMount(){
        this.getClass();
        this.changeNumber();
        this.getClassList();
        //console.log(this.props.match.params.productclass);
    }
    //获取产品分类列表
    getClassList(){
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
    //对商品分类接口的数据进行处理的函数
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
        this.handleDetail(arrThree);
    }
    //处理url参数
    handleDetail(arrThree){
        let arrLength=this.state.arrNav;
        let stringArr=this.props.match.params.productclass.split(",");
        let lengthss=stringArr.length;
        arrLength.push("首页");
        arrLength=arrLength.concat(stringArr);
        for(let m=0;m<arrThree.length;m++){
            if(arrLength[1]===arrThree[m].name){
                let arrNavs=["全部"];
                for(let n=0;n<arrThree[m].produce.length;n++){
                    arrNavs.push(arrThree[m].produce[n].name);
                }
                this.setState({arrClassList:arrThree,arrNav:arrLength,lens:lengthss,arrName:arrNavs})
            }
            for(let n=0;n<arrThree[m].produce.length;n++){
                if(stringArr[lengthss-1]===arrThree[m].produce[n].name){
                    console.log("lengthsslengthsslengthss",stringArr[lengthss-1],arrThree[m].produce[n].name,n);
                    $("#fontcolor span").eq(n+2).css({"color":"red"}).siblings().css({"color":"#333"});
                }else{
                    $("#fontcolor span").eq(1).css({"color":"red"}).siblings().css({"color":"#333"});
                }
            }
        }
    }
    //导航栏字体颜色改变按钮
    changeColor(index){
        $("#fontcolor span").eq(index+1).css({"color":"red"}).siblings().css({"color":"#333"});
        //console.log("你点击了改变导航栏字体颜色按钮",index);
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
                //console.log("eee=========",body);
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
        //console.log("获取商品类别");
    }
    //点击分页器获取新数据
    onChange(page,pagesize){
            let back=10*(page-1);
            let forward=page*10;
            this.setState({back:back,forward:forward});
            //console.log(page,pagesize);
    }
    render(){
        let back=this.state.back;
        let forward=this.state.forward;
        let _this=this;
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
                            <div id="fontcolor">
                                <span>分类:</span>
                                    {this.state.arrName.map((item,index)=>{
                                       return(  <span key={index} onClick={_this.changeColor.bind(this,index)}>
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
                <Fixed number={this.state.infos}/>
                <CompanyMessage/>
            </div>
        )
    }
}
export default ProductClass;