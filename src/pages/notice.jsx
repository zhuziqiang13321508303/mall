import React,{Component} from 'react' 
import {MyLayout}     from '../components/layout.jsx';
import ReactDOM     from 'react-dom';
import {Card,Tabs,Table,Form,Select,Input,Button,DatePicker,Icon,Tooltip,List,Avatar,Modal} from 'antd';
import { visible } from 'ansi-colors';
import huawei from '../assets/images/huawei.jpg'
import leftlogo from '../assets/images/leftlogo.jpg'
import CommonHeader from '../components/header.jsx'
import ad from "../assets/images/ad.jpg"
const {FormItem} = Form.Item;
const {Option}=Select;
const { TabPane } = Tabs;
class Notice extends Component{
    constructor(props){
        super(props); 
        this.state = {
          tab:1,
          index:1,
        };
        this.handleChange = this.handleChange.bind(this)
      } 
    handleChange(e) {
        this.setState({tab:e-0});
    }
    serviceClick(){
        Modal.success({
            title:<h2 style={{fontWeight:500}}>商务合作</h2>,
            content: (
              <div style={{fontSize:'18px',fontWeight:700,}}>
                <p>联系人：陆相成</p>
                <p>手机号：177-172-58958</p>
                <p>邮箱：luat@openluat.com</p>
                <p>QQ：2639962780</p>
              </div>
            ),
            onOk() {},
        });
    }
    render(){
        const data = [
            {
              title: 'Ant Design Title 1',
            },
            {
              title: 'Ant Design Title 2',
            },
            {
              title: 'Ant Design Title 3',
            },
            {
              title: 'Ant Design Title 4',
            },
          ];
        return (
            <div className='my_layout'>   
                <CommonHeader/>
                <div className="breadcrumb_area">
                <div className="fcn"><a href="javascript:;" title="首页">首页</a>&nbsp;&gt;&nbsp;<span>商城公告</span></div>
                </div> 
                <div className="true_notice_container">
                    <div className="true_notice_fl">
	                <div className="notice_current"><a href="/#/notice" title="商城公告"><span>商城公告</span></a></div>
                    <div className="advertisement">
                        <a href="javascript:;"><img src={ad} alt=""/></a>
                    </div>
                    </div>
                    <div className="true_notice_right">
                        <div className="part_area">
                        <div className="part_area_title"></div>
                        </div>
                        <List
                        pagination={{defaultCurrent:1,total:50,pageSize:10}}
                        itemLayout="horizontal"
                        // loading
                        size="small"
                        dataSource={data}
                        renderItem={item => (
                          <List.Item extra="2019.07.07">
                            <List.Item.Meta
                              avatar={<Avatar style={{backgroundColor:"#fc5121"}} icon="mail" />}
                              title={<a href="https://ant.design">{item.title}</a>}
                              description="Ant Design, a design language for background applications, is refined by Ant UED Team"
                            />
                            {/* <div>Content</div> */}
                          </List.Item>
                        )}
                      />
                    </div>
                </div>
                 <div  onClick={this.serviceClick} className="fixed_service">
                 <Icon className="customer_service" type="customer-service" />
                </div> 

            </div>
        )
    }
}

export default Notice
export {Notice}