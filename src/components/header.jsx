import React,{Component} from 'react' 
import ReactDOM     from 'react-dom';
import PropTypes from 'prop-types';
import { BrowserRouter as Router, Route,Redirect,NavLink,Link,Switch} from "react-router-dom";
import { Layout, Button, Menu, Breadcrumb, Icon , Dropdown, Modal, Modalm, Alert, Input,message} from 'antd';
import logoimg from '../assets/images/hezhou.jpg'

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;
class CommonHeader extends Component{
    constructor(props) {
        super(props); 
        this.state = {
        };
      }
    render(){
        return(
            <header className='layout_header'>
              <div className="layout_header_center">
              <div className="left">
                <div className="logo">
                  <a href="#" title="Luat.com-合宙商城">
                    <img src={logoimg} style={{width:250,height:36}}/>
                  </a>
                </div>
                <div className="naver" >
                  <ul id="naver" className="clearfix">
                    <li id="nav_0"><a href="#" target="_blank"><span>手机</span></a></li>
                    <li id="nav_1"><a href="#" target="_blank"><span>笔记本</span></a></li>
                    <li id="nav_2"><a href="#" target="_blank"><span>智能</span></a></li>
                    <li id="nav_3"><a href="#" target="_blank"><span>家居</span></a></li>
                    <li id="nav_4"><a href="#" target="_blank"><span>手机</span></a></li>
                  </ul>
                </div>
              </div>
              <div className="right">
                <div className="search-bar-form" >
                  <form method="get" omsubmit="return search(this)">
                    <input type="text" className="text" maxLength="200" />
                    <Button className="submit_button" icon="search" />
                  </form>
                </div>
                <div className="search_bar_key">
                  <div className="search_bar">
                  {/* <a href="javascript:void(0);" onClick={()=>{}} style={{color:'#CF0A2C'}} rel="nofollow">nova 5 Pro</a>
                  <a href="javascript:void(0);" onClick={()=>{}} style={{color:'#CF0A2C'}} rel="nofollow">荣耀</a> */}
                  </div>
                </div>
              </div>
              </div>
            </header>
        )
    }
}
export default CommonHeader
export {CommonHeader}