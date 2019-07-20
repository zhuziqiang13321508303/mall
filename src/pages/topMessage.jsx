import React from "react";
import { Menu} from 'antd';
export default class TopMessage extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            current: 'mail',
          };
        
    } 
    handleClick(e){
      console.log('click ', e);
      this.setState({
        current: e.key,
      });
    };
    render() {
      return (
        <Menu onClick={this.handleClick.bind(this)} mode="horizontal" selectedKeys={[this.state.current]} style={{display:"flex",justifyContent:"space-around",width:"100%"}}>
          <Menu.Item key="mail">
                <a href="#/home">首页</a>
          </Menu.Item>
          <Menu.Item key="app" >
                Navigation Two
          </Menu.Item>
          <Menu.Item key="orange">
                Navigation Three
          </Menu.Item>
          <Menu.Item key="banana">
                Navigation Four
          </Menu.Item>
          <Menu.Item key="peal">
                <a href="#/cart">购物车</a>
          </Menu.Item>
          <Menu.Item key="watermelon">
                <a href="#/order">我的订单</a>
          </Menu.Item>
        </Menu>
      );
    }
  }