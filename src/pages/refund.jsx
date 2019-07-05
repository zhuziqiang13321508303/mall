import React,{Component} from 'react' 
import {MyLayout}     from '../components/layout.jsx';
import ReactDOM     from 'react-dom';
import {Card,Tabs,Table} from 'antd';
const { TabPane } = Tabs;
class Personal extends Component{
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
            <TabPane tab="最近六个月" key="1">   
            </TabPane>
            <TabPane tab="六个月以前" key="2">        
            </TabPane>
        </Tabs>
        )
        let orders=[]
        let dataSource=[]
        let columns=[
            {title:'订单号',dataIndex:'order_number',key:"order_number"},
            {title:'退款编号',dataIndex:'refund_number',key:"refund_number"},
            {title:'申请退款时间',dataIndex:'refund_time',key:"refund_time"},
            {title:'退款金额',dataIndex:'refund_fee',key:"refund_fee"},
            {title:'退款状态',dataIndex:'refund_state',key:"refund_state"},
        ]
        return (
            <MyLayout>
                <Card className="myorder order_card" title="我的退款" extra={tabs} style={{ width: '90%' }}>
                    <Table className="order_table" dataSource={dataSource} columns={columns} />
                </Card>
            </MyLayout>
        )
    }
}
export default Personal
export {Personal}