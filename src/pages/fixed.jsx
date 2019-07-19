import React,{Component} from "react";
import {Icon,Popover,BackTop,Modal,Badge} from "antd";
export default class Fixed extends Component{
    constructor(props){
        super(props)
        this.state={
            visible:false,
        }
    }
    showModal(){
        this.setState({
          visible: true,
        });
      };
    handleOk(e){
        this.setState({
          visible: false,
        });
      };
      handleCancel(e){
        this.setState({
          visible: false,
        });
      };
    render(){
      console.log(this.props.number);
        return(
            <div className="home-fixed">
            <div><Popover content="购物车" placement="left"><a href="#/cart"><Badge count={this.props.number}><Icon type="shopping-cart" style={{fontSize:38,color:"#ccc"}} title="购物车"/></Badge></a></Popover></div>
            <div><Popover content="在线客服" placement="left"><Icon type="customer-service" style={{fontSize:38,color:"#ccc"}} title="在线客服" onClick={this.showModal.bind(this)}/></Popover></div>
            <div><Popover content="意见反馈" placement="left"><a href="#"><Icon type="form" style={{fontSize:38,color:"#ccc"}} title="意见反馈"/></a></Popover></div>
            <div><Popover content="返回顶部" placement="left"> <BackTop style={{position:"absolute",left:4,bottom:8}}><Icon type="arrow-up" style={{fontSize:38,color:"#ccc"}} title="返回顶部"/></BackTop></Popover></div>
            <Modal
            title="商务合作"
            visible={this.state.visible}
            onOk={this.handleOk.bind(this)}
            onCancel={this.handleCancel.bind(this)}
            >
            <p>联系人：陆相成</p>
            <p>手机号：177-172-58958</p>
            <p>邮箱：luat@openluat.com</p>
            <p>QQ:2639962780</p>
            </Modal>
        </div>
        
        )
    }
        
}