import React,{Component} from 'react' 
import {MyLayout}     from '../components/layout.jsx';
import ReactDOM     from 'react-dom';
import {Card,Tabs,Table} from 'antd';
const { TabPane } = Tabs;
class Order extends Component{
    constructor(props) {
        super(props); 
        this.state = {
          tab:1
        };
        this.handleChange = this.handleChange.bind(this); 
      } 
    handleChange(e) {
        this.setState({tab:e-0});
    }
    render(){
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
        let columns=[
            {title:'商品',dataIndex:'products',key:"products"},
            {title:'单价/元',dataIndex:'unit_price',key:"unit_price"},
            {title:'数量',dataIndex:'quantity',key:"quantity"},
            {title:'实付款/元',dataIndex:'payment',key:"payment"},
            {title:'订单状态及操作',dataIndex:'state',key:"state"},
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