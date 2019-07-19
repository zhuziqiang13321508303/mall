import React,{Component} from 'react';
import CompanyMessage from "./companyMessage.jsx";
import '../css/orderlist.css';
import { Steps,Input,Button} from 'antd';
import options from "../assets/city";
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
                _this.setState({arr:body})
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
      delete(){
          console.log("你点击了删除按钮");
      }
     //点击进入支付按钮
     payMoney(){
         console.log("你点击了进入支付按钮");
     }
      
     
    render(){
        return(
            <div className="orderlist-container">
                 <div className="orderlist-top">
                    <div className="orderlist-top-container">
                        <div className="orderlist-top-left">
                            <img src="#"/>
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
                        <span>收货地址</span>
                        <span>产品名称</span>
                        <span>数量</span>
                        <span>价格</span>
                    </div>
                </div>
               <div className="orderlist-play">
                    <div className="orderlist-play-container">
                            {
                                this.state.arr.map((item,index)=>{
                                    return(
                                        <div key={index}>
                                            <div className="orderlist-play-message">
                                                <span>{item.recipient}</span>
                                                <span>{item.phone}</span>
                                                <span>{item.address}</span> 
                                            </div>
                                            <div className="orderlist-play-detail">
                                                {
                                                    item.items.map((demo,index)=>{
                                                        return(
                                                            <div key={index} className="orderlist-play-details">
                                                                <span>{demo.product}</span>
                                                                <span>{demo.amount}</span>
                                                                <span>{demo.price}</span>
                                                                <button onClick={this.delete.bind(this,item.id)} className="orderlist-delete">删除</button>
                                                            </div>
                                                        )
                                                    })
                                                }
                                            </div>
                                            
                                        </div>
                                    )
                                })
                            }
                    </div>
               </div>
                <div className="orderlist-submit">
                   <div className="orderlist-submit-container">
                            
                            <Button onClick={this.payMoney.bind(this)} type="primary">进入支付页面</Button>
                   </div>
                </div>  
                <CompanyMessage/>
            </div>
        )
    }
}
export default Orderlist;