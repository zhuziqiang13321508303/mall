import React,{Component} from 'react' 
import ReactDOM     from 'react-dom';
import PropTypes from 'prop-types';
import { BrowserRouter as Router, Route,Redirect,NavLink,Link,Switch} from "react-router-dom";
import { Layout, Button, Menu, Breadcrumb, Icon , Dropdown, Modal, Modalm, Alert, Input,message} from 'antd';
import CommonHeader from './header.jsx'

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;
class MyLayout extends Component{
    constructor(props) {
        super(props); 
        this.state = {
          text: props.initialValue,
          key:'0'
        };
        this.handleChange = this.handleChange.bind(this); 
        this.handleTitleChange = this.handleTitleChange.bind(this); 
      } 
      handleChange(event) {
        this.setState({ 
          text: event.target.value
        });
      } 
      handleTitleChange({item,key}){
        console.log(this.state.key)
        // console.log(typeof key)
        this.setState({ 
          key
        });
      }
    //   handleBlur=()=>{  
    //     console.log(this); // React Component Instance
    //   }
    render(){
       let navs=[{'title':'站内信','to':'/message'},
        {'title':'我的订单','to':'/order'},
        {'title':'我的退换货','to':'/returns'},
        {'title':'我的退款','to':'/refund'},
        {'title':'我的积分','to':'/credit'},
        {'title':'我的地址','to':'/address'},
        {'title':'我的近期浏览','to':'/recent_browse'},
        ]
        return (
        <Layout className='my_layout'>
            <CommonHeader/>
            <Layout>
              <Sider className='layout_sider'>
              <Menu
					  theme="light"
            mode="inline"
					  selectedKeys={[this.state.key]}
					  onClick={this.handleTitleChange}
					  // style={{ height: '90%' }}
					>
            {
						  navs.map(function(item,i){
										return (
											<Menu.Item key={i}>
												{/* <Icon type={i} /> */}
												<Link to={item.to} >{item.title}</Link>
												{/* <span >{item.title}</span> */}
											</Menu.Item>
										);
                  }
							  )
						}
              </Menu>
              </Sider>
              <Content className='layout_content'>{this.props.children}</Content>
            </Layout>
			<Footer style={{ textAlign: 'center' }}>
			   Copyright © Forever
			</Footer>
        </Layout>
        )
    }
}
export default MyLayout
export {MyLayout}