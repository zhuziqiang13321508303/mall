import React,{Component} from 'react';
import CompanyMessage from "../assets/companyMessage.jsx";
import TopMessage from "../assets/topMessage.jsx";
import '../css/orderlist.css';
import { Steps,Input,Button,message} from 'antd';
//import Tables from "../assets/orderdisplay.jsx";
import options from "../assets/city";
import imgLogo from "../assets/images/hezhou.jpg";
const { Step } = Steps;
const { TextArea } = Input;
class Orderlist extends Component{
    constructor(props){
        super(props)
        this.state={
            arr:[],
        }
        this.getAddress=this.getAddress.bind(this);
    }
    componentDidMount(){
        this.getAddress();
    }
  
    
      //获取地址列表
      getAddress(){
        let  _this=this;
        var url= "/api/mall/delivery";
        var xhr = new XMLHttpRequest(); 
        xhr.open("get", url,true);
        xhr.send();
        xhr.onreadystatechange = function(){
            if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                let body=JSON.parse(xhr.responseText).data;
                // let arr=[],allMoney=0;
                // for(let j=0;j<body.length;j++){
                //     arr=arr.concat(body[j].items);
                // }
                // for(let i=0;i<arr.length;i++){
                //     allMoney+=arr[i].amount*arr[i].price
                // }
                // console.log(arr,allMoney);
                _this.setState({arr:body});
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
        console.log("获取订单列表");
      }
      //点击删除订单按钮
      delete(id){
        let _this=this
        console.log("dsdsdssdsdsdds",id);
        let url=`/api/mall/delivery/${id}`;
        var xhr=new XMLHttpRequest();
        xhr.open("DELETE",url) 
        xhr.send();
        xhr.onreadystatechange=function(){
            if(xhr.readyState === XMLHttpRequest.DONE) {
                if(xhr.status === 200) {
                    _this.getAddress();
                    message.success("删除成功");
                } else {
                    message.error("删除失败，请稍后重试")
                }
            }
        }
          console.log("你点击了删除按钮");
      }
     //点击进入支付按钮
     payMoney(id){
         this.props.history.push(`/payment/${id}`)
         console.log("你点击了进入支付按钮");
     }
      
     
    render(){
        return(
            <div className="orderlist-container">
                 <div className="top-nav">
                    <div className="top-nav-container">
                        <TopMessage/>
                    </div>
                </div>
                 <div className="orderlist-top">
                    <div className="orderlist-top-container">
                        <div className="orderlist-top-left">
                            <img src={imgLogo}/>
                            <h2>确认订单</h2>
                        </div>
                        <div className="orderlist-top-right">
                        <Steps current={2} size="small">
                            <Step title="完成" description="我的购物车" />
                            <Step title="完成" description="预览订单" />
                            <Step title="执行中" description="成功提交订单" />
                        </Steps>
                        </div>
                    </div>
                </div>
                <div className="orderlist-tip">
                    <div className="orderlist-tip-container">
                        <span>产品名称</span>
                        <span>数量</span>
                        <span>价格</span>
                        <span>收货信息</span>
                        <span>删除</span>
                        <span>付款</span>
                    </div>
                </div>
               <div className="orderlist-play">
                    <div className="orderlist-play-container">
                            {
                                this.state.arr.map((item,index)=>{
                                    return(
                                        <div key={index}>
                                            
                                            <div className="orderlist-play-detail">
                                                {
                                                    item.items.map((demo,index)=>{
                                                        return(
                                                            <div key={index} className="orderlist-play-details">
                                                                <span>{demo.product}</span>
                                                                <span>{demo.amount}</span>
                                                                <span>{demo.price}</span>
                                                            </div>
                                                        )
                                                    })
                                                }
                                            </div>
                                            <div className="orderlist-play-message">
                                                <div>
                                                    <span>{item.recipient}</span>
                                                    <span>{item.phone}</span>
                                                    <span>{item.address}</span>
                                                </div>
                                                <Button onClick={this.delete.bind(this,item.id)} type="primary">删除</Button>
                                                <Button onClick={this.payMoney.bind(this,item.id)} type="primary">进入支付页面</Button> 
                                            </div>
                                        </div>
                                    )
                                })
                            }
                    </div>
               </div>
               {/* <div className="orderlist-display">
                    <div className="orderlist-display-container">
                            <Tables/>
                    </div>
               </div> */}
                {/* <div className="orderlist-submit">
                   <div className="orderlist-submit-container">
                            <div>商品总金额：{this.state.money}￥</div>
                            <div>
                                <Button onClick={this.payMoney.bind(this)} type="primary">进入支付页面</Button>
                            </div>
                   </div>
                </div>   */}
                <CompanyMessage/>
            </div>
        )
    }
}
export default Orderlist;