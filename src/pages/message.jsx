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
        let dataSource=[]
        let columns=[
            {title:'类型',dataIndex:'type',key:"type"},
            {title:'标题',dataIndex:'title',key:"title"},
            {title:'时间',dataIndex:'time',key:"time"},
            {title:'操作',dataIndex:'operation',key:"operation"},
        ]
        return (
            <MyLayout>
                <Card className="myorder order_card" title="消息中心"  style={{ width: '90%' }}>
                    <Tabs onchange={()=>{}} type="card">
                        <TabPane tab="站内信" key="1"></TabPane>
                        <TabPane tab="互动消息" key="2"> </TabPane>
                    </Tabs>
                    <Table className="order_table" dataSource={dataSource} columns={columns} />
                </Card>
            </MyLayout>
        )
    }
}
export default Order
export {Order}