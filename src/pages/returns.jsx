import React,{Component} from 'react' 
import {MyLayout}     from '../components/layout.jsx';
import ReactDOM     from 'react-dom';
import {Card,Tabs,Table} from 'antd';
const { TabPane } = Tabs;
class Ruturns extends Component{
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
            <TabPane tab="申请退换货" key="1">   
            </TabPane>
            <TabPane tab="退换货记录" key="2">        
            </TabPane>
        </Tabs>
        )
        let dataSource=[]
        let columns=[]
        if(this.state.tab===1){
            columns=[
                {title:'订单商品信息(为您展示最近半年已签收的订单)',dataIndex:'message',key:"message"},
                {title:'数量',dataIndex:'quantity',key:"quantity"},
                {title:'实付总额',dataIndex:'total_fee',key:"total_fee"},
                {title:'操作',dataIndex:'operation',key:"operation"},
            ]
        }else if(this.state.tab===2){
            columns=[
                {title:'最近六个月',dataIndex:'last_halfyear',key:"last_halfyear"},
                {title:'退换货订单信息',dataIndex:'order_message',key:"order_message"},
                {title:'状态',dataIndex:'status',key:"status"},
                {title:'操作',dataIndex:'operation',key:"operation"},
            ]
        }
        return (
            <MyLayout>
                <Card className="myorder order_card" title="我的退换货" extra={tabs} style={{ width: '90%' }}>
                    <Table className="order_table" dataSource={dataSource} columns={columns} />
                </Card>
            </MyLayout>
        )
    }
}
export default Ruturns
export {Ruturns}