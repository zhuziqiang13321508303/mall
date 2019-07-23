import React,{Component} from 'react';
import { Breadcrumb,InputNumber,Button,message,Popconfirm,Menu, Icon} from 'antd';
import CompanyMessage from "../assets/companyMessage.jsx";
import Fixed from "../assets/fixed.jsx";
import TopMessage from "../assets/topMessage.jsx";
// import Action from '../reds/Action';
// import Store from '../reds/Store';
import Img from "../assets/img.jsx";
import $ from "jquery";
import '../css/detail.css';
class Detail extends Component{
    constructor(props){
        super(props)
        this.state={
            data1:{},
            // 缩略图
            minImg: "",
            // 高清图
            maxImg: "",
            visible:false,
            ids:[],
            id:'',
            number:1,
            infos:'',
            current: 'mail',
            stylemove:false,
        }
        this.showModal=this.showModal.bind(this);
        this.changeNumber=this.changeNumber.bind(this);
        this.handleClick=this.handleClick.bind(this);
    }

    componentDidMount(){
        let _this=this;
        var url= "/api/mall/product/"+this.props.match.params.id;
        var xhr = new XMLHttpRequest();
        xhr.open("GET", url,true);
        xhr.send();
        xhr.onreadystatechange = function(){
            if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                let body=JSON.parse(xhr.responseText).data;
                    _this.setState({data1:body,minImg:body.image,maxImg:body.image,id:body.id,number:1});
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
        //console.log("aaaa++++++======");
        this.changeNumber();
        window.addEventListener('scroll', this.handleScroll.bind(this)) //监听滚动
    }
    componentWillUnmount() { 
        //最后移除监听器，以防多个组件之间导致this的指向紊乱
      window.removeEventListener('scroll', this.handleScroll.bind(this)) 
    }
    //滚动条事件
    handleScroll(e){
        let _this=this;
      if(e.srcElement.scrollingElement.scrollTop>750){
              _this.setState({stylemove:true});
              if(e.srcElement.scrollingElement.scrollTop>1000&&e.srcElement.scrollingElement.scrollTop<1300){
                _this.setState({current:"app"});
              }if(e.srcElement.scrollingElement.scrollTop>1500&&e.srcElement.scrollingElement.scrollTop<1800){
                _this.setState({current:"apeal"});
              }if(e.srcElement.scrollingElement.scrollTop>1900){
                _this.setState({current:"ham"});
              }
              //console.log(e.srcElement.scrollingElement.scrollHeight,e.srcElement.scrollingElement.scrollTop)
      }if(e.srcElement.scrollingElement.scrollTop<750){
          _this.setState({stylemove:false,current:"mail"});
      }
    }
    //商品详情参数部分变更
    handleClick(e){
        //console.log('click ', e);
        this.setState({
          current: e.key,
        });
            if(e.key==="mail"){
                $("html,body").animate({ scrollTop:700}, 1000)
            }if(e.key==="app"){
                $("html,body").animate({ scrollTop:1000}, 1000)
            }if(e.key==="apeal"){
                $("html,body").animate({ scrollTop:1500}, 1000)
            }if(e.key==="ham"){
                $("html,body").animate({ scrollTop:2000}, 1000)
            }
      };
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
    //改变数量
    onChange(value){ 
        this.setState({number:value});
        //console.log("你点击了更改数量按钮",value);
    }
    //加入购物车按钮
    addCart(){
        let _this=this;
        var url= "/api/mall/cart_item";
        var xhr = new XMLHttpRequest();
        var data2 = new FormData();
        data2.append('product_id',this.state.data1.id);
        data2.append('amount',this.state.number);
        console.log(this.state.data1.id,this.state.number);
        xhr.open("POST", url,true);
        xhr.send(data2);
        xhr.onreadystatechange = function(){
            if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                //let body=JSON.parse(xhr.responseText);
                _this.showModal();
                let body=xhr.responseText;
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
        console.log("你点击了加入购物车按钮");
    }
    //立即下单按钮
    addOrder(){
        let id_arr=[];
        id_arr.push(this.props.match.params.id);
        id_arr.push(this.state.number);
        this.props.history.push(`/preview/${id_arr}`)
        console.log("你点击了立即下单按钮",this.props.match.params.id,this.state.number);
    }
    //弹窗显示按钮
    showModal(){
        this.setState({
          visible: true,
        });
      };
    //提示框确定按钮
    confirm(){
        this.setState({
            visible: false,
          });
          this.props.history.push("/cart");
          console.log("bbbbb");
    }
    //取消按钮
    handleCancel(){
        this.setState({
            visible: false,
          });
    }
    render(){
        const { minImg, maxImg } = this.state;
        let styles=this.state.stylemove?{position:"fixed",top:0,left:0}:{position:"static"}
        return(
            <div className="detail-container">
                <div className="top-nav">
                    <div className="top-nav-container">
                        <TopMessage/>
                    </div>
                </div>
                <div className="detail-bread">
                    <div className="detail-bread-container">
                        <Breadcrumb separator=">">
                            <Breadcrumb.Item>
                                <a href="#/home">首页</a>
                            </Breadcrumb.Item>
                            <Breadcrumb.Item>{this.state.data1.name}</Breadcrumb.Item>
                            <Breadcrumb.Item>
                                {this.state.data1.desc}
                            </Breadcrumb.Item>
                        </Breadcrumb>
                    </div>
                </div>
                <div className="detail-main">
                    <div className="detail-main-container">
                        <Img minImg={minImg} maxImg={maxImg} transids={this.props.match.params.id}/>  
                        <div className="detail-description">
                            <p>{this.state.data1.desc}vcufdvbfhdvb</p>
                            <div className="detail-price">
                                <div>
                                    <span>价格</span>
                                    <span>￥{this.state.data1.price}</span>
                                </div>
                                <div>
                                    <span>促销</span>
                                    <span>限时特惠</span>
                                </div>
                            </div>
                            <div className="detail-serverice">服务说明</div>
                            <div className="detail-code">商品编码</div>
                            <div className="detail-product">已选商品</div>
                            <div className="detail-add">
                                <InputNumber size="large" min={1} defaultValue={1} onChange={this.onChange.bind(this)}/>
                                <Popconfirm
                                placement="top"
                                title="好货不容错过，考虑清楚哦"
                                onConfirm={this.confirm.bind(this)}
                                onCancel={this.handleCancel.bind(this)}
                                okText="去结算"
                                cancelText="再逛逛"
                                >

                                    <Button style={{background:"#ff600c",marginLeft:20}} size="large" type="primary" onClick={this.addCart.bind(this)}>加入购物车</Button>
                                </Popconfirm>
                                <Button style={{background:"#ca151d",marginLeft:20}} size="large" type="primary" onClick={this.addOrder.bind(this)}>立即下单</Button>
                            </div> 
                        </div>  
                    </div>
                    <div className="detail-relatve" style={styles}>
                        <div className="detail-relatve-container">
                            <Menu onClick={this.handleClick} selectedKeys={[this.state.current]} mode="horizontal" style={{width:"100%",display:"flex",justifyContent:"space-around"}}>
                                <Menu.Item key="mail">
                                    商品详情
                                </Menu.Item>
                                <Menu.Item key="app">
                                    规格参数
                                </Menu.Item>
                                <Menu.Item key="apeal">
                                    包装与售后
                                </Menu.Item>
                                <Menu.Item key="ham">
                                    用户评价
                                </Menu.Item>
                            </Menu>
                        </div>
                    </div>
                    <div className="detail-parameter">
                        <div className="detail-parameter-container">
                                <div>
                                    <h2>商品详情</h2>
                                </div>
                                <div>
                                    <h2>规格参数</h2>
                                </div>
                                <div>
                                    <h2>包装与售后</h2>
                                </div>
                                <div>
                                    <h2>用户评价</h2>
                                </div>
                        </div>
                    </div>
                        <CompanyMessage/>
                        <Fixed number={this.state.infos}/>
                    </div>   
            </div>
        )
    }
}
export default Detail;