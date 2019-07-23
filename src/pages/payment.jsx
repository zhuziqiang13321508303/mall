import React,{Component} from 'react' 
import {MyLayout}     from '../components/layout.jsx';
import ReactDOM     from 'react-dom';
import {Card,Tabs,Table, message,Modal,Button} from 'antd';
import QRCode from 'qrcode.react'
import successmsg from '../assets/images/success_icon.png'
import { hidden } from 'ansi-colors';
const { TabPane } = Tabs;
class Order extends Component{
    constructor(props) {
        super(props); 
        this.state = {
          tab:1,
          records:[],
        };
        this.handleChange = this.handleChange.bind(this); 
        this.get_historyDelivery=this.get_historyDelivery.bind(this)
        this.handleOk=this.handleOk.bind(this)
        this.handleCancel=this.handleCancel.bind(this)
        this.modal_body=this.modal_body.bind(this)
    } 
    componentWillMount(){
        console.log(this.props.match.params.delivery_id)
        this.get_historyDelivery()
    }
    handleChange(e) {
        this.setState({tab:e-0});
    }
    get_historyDelivery(){//根据delivery_id获取订单列表当前项
        let url="/api/mall/delivery?page=0&page_size=10"
        var self=this
        var callback=function(err,res){
            if(err){
                message.error(err.msg)
            }else{
                console.log(res.data)
                let currentDelivery=res.data.filter((item)=>{
                    return item.id==self.props.match.params.delivery_id
                })
                self.setState({current:currentDelivery},()=>{
                    console.log(self.state.current)
                })
            }
        }
        var xhr=new XMLHttpRequest()
        xhr.open('GET',url)
        xhr.send(null)
        xhr.onreadystatechange=function(){
            if(xhr.readyState === XMLHttpRequest.DONE) {
                if(xhr.status === 200) {
                    callback(null,JSON.parse(xhr.responseText)) 
                } else {
                    callback(JSON.parse(xhr.responseText),null);
                }
            }
        }
    }
    finalPay(e,payment_method){//获取支付二维码
        e.preventDefault(); 
        var self=this
        let delivery_id=self.state.current[0].id
        let url=`/api/mall/delivery/${delivery_id}/payment_method?method=${payment_method}&need_refresh=1`
        //默认二维码need_refresh=0不重新更新，这样的话二维码一段时间后会失效
        var callback=function(err,res){
            if(err){
                message.error(err.msg)
            }else{
                console.log(res.data)
                self.setState({url:res.data.code_url,qrcode_visible:true},()=>{
                    console.log(self.state.url)
                })
            }
        }
        var xhr=new XMLHttpRequest()
        xhr.open('GET',url)
        xhr.send(null)
        xhr.onreadystatechange=function(){
            if(xhr.readyState === XMLHttpRequest.DONE){
                if(xhr.status === 200) {
                    callback(null,JSON.parse(xhr.responseText)) 
                } else {
                    callback(JSON.parse(xhr.responseText),null);
                }
            }
        }
    }
    modal_body(){
        let self=this
        let modal_body=null
        if(self.state.url){
            modal_body=(<div style={{textAlign:"center"}}>
                <QRCode level="L" size={256} value={self.state.url}/>
                <p>请使用微信扫一扫扫描二维码支付</p>
            </div>)
        }
        console.log(modal_body)
        return modal_body
    }
    handleOk(){
		this.setState({qrcode_visible:false,url:''});
	}
	handleCancel(){
		this.setState({qrcode_visible:false,url:''});
	}
    render(){
        let self=this
        let current=[{id:'',total_price:''}]
        if(self.state.current){
            current=self.state.current
        }
        console.log(current)
        return (
            <MyLayout>
                <Card className="myorder order_card" title="合宙收银台"  style={{ width: '90%' }}>
                    <div style={{overflow:'hidden',width:"1270px"}}>
                    <div className="payment_infomsg"><img style={{width:"64px",height:"64px",margin:"30px 21px 0 34px"}} src={successmsg} alt=""/></div>
                    <div className="payment_infowords">
                        <div className="payment_infowords_01">
                            <h4 className="pull-left payment_infowords_02">订单提交成功，只差付款了~</h4>
                            <div className="pull-left">
                                <span className="payment_infowords_03">订单号：</span>
                                <span style={{color:"#da3232"}}>{current[0].id}</span>
                            </div>
                            <div className="pull-right">
                                <span className="payment_infowords_04">订单金额：</span>
                                <span className="payment_infowords_05">{current[0].total_price}</span>
                            </div>
                        </div>
                        <h5>请您在10分钟内完成支付，否则本次支付将自动取消。</h5>
                        <p className="payment_infowords_06">订单含付款减库存商品，支付完成才会为您预留库存，库存不足时系统将自动取消未支付的订单。</p>
                        <p className="payment_infowords_06">今天23:59前付款，预计2天内送达（受付款完成时间等因素可能发生变化）</p>
                    </div>
                    </div>
                    <div className="pay_wx">
                        <a onClick={(e) => {this.finalPay(e,0);}}>
                            <img src="https://res.vmallres.com/ips/pc/20190523/images/serverIcon/2x/WXPAY.png?v=20190523" alt="微信支付"/>
                        </a>
                    </div>
                    <div className="pay_alipay">
                        <a onClick={(e) => {this.finalPay(e,1)}}>
                            <img src="https://res.vmallres.com/ips/pc/20190523/images/serverIcon/2x/ALIPAY.png?v=20190523" alt="支付宝"/>
                        </a>
                    </div>
                    <Modal 
							width="600px"
							title="支付二维码"
							visible={this.state.qrcode_visible}
							onOk={this.handleOk}
                            onCancel={this.handleCancel}
                            footer={[
                                <Button key="back" onClick={this.handleCancel}>
                                  更换支付方式
                                </Button>,
                                <Button key="submit" type="primary"  onClick={this.handleOk}>
                                  已完成支付
                                </Button>,
                            ]}
					>
							{self.modal_body()}
					</Modal>
                </Card>
            </MyLayout>
        )
    }
}
export default Order
export {Order}