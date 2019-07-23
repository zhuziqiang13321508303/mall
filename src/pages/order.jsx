import React,{Component} from 'react' 
import {MyLayout}     from '../components/layout.jsx';
import ReactDOM     from 'react-dom';
import {Card,Tabs,Table,message} from 'antd';
const { TabPane } = Tabs;
class Order extends Component{
    constructor(props) {
        super(props); 
        this.state = {
          tab:1,
          records:[],
          records2:[]
        };
        this.handleChange = this.handleChange.bind(this)
        this.get_msg = this.get_msg.bind(this)
        this.delivery = this.delivery.bind(this)
        this.deliveryDelete = this.deliveryDelete.bind(this)
        this.orderTypeChange=this.orderTypeChange.bind(this)
        this.deliveryConfirm = this.deliveryConfirm.bind(this)
        this.orderPay=this.orderPay.bind(this)
    } 
    componentWillMount(){
        this.get_msg()
    }
    // put post 都是form delete get 都是let url=`/api/mall/delivery/${id}`
    delivery(){//模拟创建订单
        let url="/api/mall/delivery"
        var self=this
        let data=new FormData()
        data.append('payment_type',0)
        data.append('products',JSON.stringify([{"id":382,"amount":1}]))
        data.append('recipient',"fangzhou")
        data.append('phone',15556961568)
        data.append('province','shanghai')
        data.append('city','putuo')
        data.append('area','guanfuxilu')
        data.append('address','sahnghaiputuo')
        var callback=function(err,res){
            if(err){
                message.error("订单请求失败")
            }else{
                console.log(res)
                console.log(res.data)
                self.setState({records:res.data})
            }
        }
        var xhr=new XMLHttpRequest()
        xhr.open("POST",url)
        xhr.send(data)
        xhr.onreadystatechange=function(){
            if(xhr.readyState === XMLHttpRequest.DONE) {
                if(xhr.status === 200) {
                    callback(null,JSON.parse(xhr.responseText)) 
                } else {
                    callback(xhr.responseText,null);
                }
            }
        }
    }
    get_msg(){//获取订单渲染
        let url="/api/mall/delivery"
        var self=this
        var callback=function(err,res){
            if(err){
                message.error("订单获取失败")
            }else{
                // console.log(res)
                console.log(res.data)
                self.setState({records:res.data,records2:res.data})
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
                    callback(xhr.responseText,null);
                }
            }
        }
    }
    deliveryDelete(id){//删除订单再次渲染
        console.log(id)
        let self=this
        let url=`/api/mall/delivery/${id}`
        var xhr=new XMLHttpRequest()
        xhr.open("DELETE",url) 
        xhr.send()
        xhr.onreadystatechange=function(){
            if(xhr.readyState === XMLHttpRequest.DONE) {
                if(xhr.status === 200) {
                    message.success("删除成功");
                    self.get_msg()
                } else {
                    message.error("删除失败，请稍后重试")
                }
            }
        }
    }
    handleChange(e) {
        this.setState({tab:e-0});
    }
    orderTypeChange(value){
        console.log(value)
        let self=this
        switch(value){
            case 0:
                self.setState({records2:self.state.records})
                break;
            case 1:
                self.setState({records2:self.state.records.filter((item)=>{
                    return item.payment_status==0
                })})
                break;
            case 2:
                self.setState({records2:self.state.records.filter((item)=>{
                    return item.payment_status==1&&item.customer_status==0
                })})
                break;
            case 3:
                    self.setState({records2:self.state.records.filter((item)=>{
                        return item.payment_status==1&&item.customer_status==1
                    })})
                    break;
            default:
                self.setState({records2:[]})
        }
    }
    deliveryConfirm(delivery_id){//确认收货
        console.log(delivery_id)
        let url=`/api/mall/delivery/${delivery_id}/confirm`
        var self=this
        let data=new FormData()
        var callback=function(err,res){
            if(err){
                message.error(err.msg)
            }else{
                message.success("确认收货成功")
            }
        }
        var xhr=new XMLHttpRequest()
        xhr.open("POST",url)
        xhr.send(data)
        xhr.onreadystatechange=function(){
            if(xhr.readyState === XMLHttpRequest.DONE) {
                if(xhr.status === 200) {
                    callback(null,xhr.responseText) 
                } else {
                    callback(JSON.parse(xhr.responseText),null);
                }
            }
        }
    }
    orderPay(delivery_id){
        this.props.history.push(`/payment/${delivery_id}`)
    }
    render(){
        let self=this
        // let tabs=(
        // <Tabs defaultActiveKey="1" onChange={this.handleChange}>
        //     <TabPane tab="最近六月内订单" key="1">   
        //     </TabPane>
        //     <TabPane tab="六个月前订单" key="2">        
        //     </TabPane>
        // </Tabs>
        // )
        // let orders=[]
        // if(this.state.tab===1){
        //     orders=["全部有效订单","待支付","待收货","已完成","待评价","已取消"]
        // }else if(this.state.tab===2){
        //     orders=["全部有效订单","已完成","已取消"]
        // }
        let orders=["全部有效订单","待支付","待收货","已完成"]
        let dataSource=[]
        let records=self.state.records2
        console.log(records)
        for(let i=0;i<records.length;i++){
            for (let j=0;j<records[i].items.length;j++){
                let status=''
                // payment_status: 0未付款 1已付款 2错误 3已退款
                // customer_status 0未收货 1已确认收货
                if(records[i].payment_status==0){
                    status='未付款'
                }else if(records[i].payment_status==1&&records[i].customer_status==0){
                    status="已付款"
                }else if(records[i].payment_status==1&&records[i].customer_status==1){
                    status='已收货'
                }else if(records[i].payment_status==3){
                    status='已退款'
                }
                dataSource.push({key:Math.random(),
                    products:records[i].items[j].product,
                    unit_price:records[i].items[j].price,
                    quantity:records[i].items[j].amount,
                    payment_status:status,
                    id:records[i].id-0
                })                
            }
        }
        console.log(dataSource)
        let columns=[
            {title:'商品',dataIndex:'products',key:"products"},
            {title:'单价/元',dataIndex:'unit_price',key:"unit_price"},
            {title:'数量',dataIndex:'quantity',key:"quantity"},
            {title:'付款状态',dataIndex:'payment_status',key:"payment_status"},
            {title:'订单状态及操作',dataIndex:'state',key:"state",render:(text,record,index)=>{
                if(record.payment_status==="未付款"){
                    return <div><button onClick={()=>self.orderPay(record.id)} className="order_paynow">立即支付</button><button onClick={()=>self.deliveryDelete(record.id)} className="order_cancle">取消订单</button></div>
                }else if(record.payment_status==="已付款"){
                    return <div><button className="order_list">订单详情</button><button onClick={()=>self.deliveryConfirm(record.id)} className="order_list">确认收货</button></div>
                }else if(record.payment_status==="已收货"){
                    return <div><button className="order_list">订单详情</button></div>
                }else if(record.payment_status==="已退款"){
                    return null
                }
            }
        },
        ]
        return (
            <MyLayout>
                {/* <Card className="myorder order_card" title="我的订单" extra={tabs} style={{ width: '90%' }}> */}
                <Card className="myorder order_card" title="我的订单" style={{ width: '90%' }}>
                    <div>
                    {orders.map(function(item,i){
						    return (
						    	<a className="order_span" key={i} onClick={(e)=>{e.preventDefault();self.orderTypeChange(i)}}>{item}</a>
						    );
                        }
                    )}
                    </div> 
                    <Table className="order_table" dataSource={dataSource} columns={columns} />
                </Card>
            </MyLayout>
        )
    }
}
export default Order
export {Order}