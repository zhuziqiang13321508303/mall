import React,{Component} from 'react' 
import {MyLayout}     from '../components/layout.jsx';
import ReactDOM     from 'react-dom';
import {Card,Tabs,Table,Form,Select,Input,Button,DatePicker,Icon,Tooltip} from 'antd';
import { visible } from 'ansi-colors';
import huawei from '../assets/images/huawei.jpg'
import leftlogo from '../assets/images/leftlogo.jpg'
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
    render(){
        let dataSource=[]
        let columns=[
            {title:'类型',dataIndex:'type',key:"type"},
            {title:'标题',dataIndex:'title',key:"title"},
            {title:'时间',dataIndex:'time',key:"time"},
            {title:'操作',dataIndex:'operation',key:"operation"},
        ]
        return (
            <div className="notice_container">
            <div className="mainpage">
                <div className="boxCenter">
                    <div className="footer">
                        <Input
                            className="footer_input"
                            placeholder="请输入您要咨询的问题"
                            prefix={<Icon type="plus-circle" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            addonAfter={
                              <button className="footer_button">发送</button>
                            }
                        />
                    </div>
                </div>
                <div className="notice_left">
                    <div className="leftlogo">
                        <img src={leftlogo} alt=""/>
                    </div>
                    <div className="topname">
                        <h2 style={{color:'#fff'}}><span> ——— 热门问题 ——— </span></h2>
                    </div>
                    <ul className="questionList">
                        <li><a href="javascript:void(0)">荣耀20系列发货时间</a></li>
                        <li><a href="javascript:void(0)">荣耀20系列发货时间</a></li>
                        <li><a href="javascript:void(0)">荣耀20系列发货时间</a></li>
                        <li><a href="javascript:void(0)">荣耀20系列发货时间</a></li>
                        <li><a href="javascript:void(0)">荣耀20系列发货时间</a></li>
                        <li><a href="javascript:void(0)">荣耀20系列发货时间</a></li>
                        <li><a href="javascript:void(0)">荣耀20系列发货时间</a></li>
                        <li><a href="javascript:void(0)">荣耀20系列发货时间</a></li>
                    </ul>
                </div>
                <div className="notice_right"></div>
            </div>
            </div>
        )
    }
}

export default Notice
export {Notice}