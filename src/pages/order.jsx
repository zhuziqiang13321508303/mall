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
          records:[]
        };
        this.handleChange = this.handleChange.bind(this); 
        this.get_msg = this.get_msg.bind(this);
        this.delivery = this.delivery.bind(this);
        this.deliveryDelete = this.deliveryDelete.bind(this);
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
                self.setState({records:res.data})
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
    render(){
        let self=this
        let tabs=(
        <Tabs defaultActiveKey="1" onChange={this.handleChange}>
            <TabPane tab="最近六月内订单" key="1">   
            </TabPane>
            <TabPane tab="六个月前订单" key="2">        
            </TabPane>
        </Tabs>
        )
        let orders=[]
        if(this.state.tab===1){
            orders=["全部有效订单","待支付","待评价","待收货","已完成","已取消"]
        }else if(this.state.tab===2){
            orders=["全部有效订单","已完成","已取消"]
        }
        let dataSource=[]
        let records=self.state.records
        for(let i=0;i<records.length;i++){
            for (let j=0;j<records[i].items.length;j++){
                dataSource.push({key:Math.random(),
                    products:records[i].items[j].product,
                    unit_price:records[i].items[j].price,
                    quantity:records[i].items[j].amount,
                    payment_status:records[i].payment_status==0?'未付款':'已付款',
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
                console.log(record)
                if(record.payment_status==="未付款"){
                    return <div><button className="order_paynow">立即支付</button><button onClick={()=>self.deliveryDelete(record.id)} className="order_cancle">取消订单</button></div>
                }else{
                    return <div><button className="order_list">订单详情</button></div>
                }
            }
        },
        ]
        return (
            <MyLayout>
                <Card className="myorder order_card" title="我的订单" extra={tabs} style={{ width: '90%' }}>
                    <div>
                    {orders.map(function(item,i){
						    return (
						    	<span className="order_span" key={i}>{item}</span>
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