import React from 'react' 
import {hot} from "react-hot-loader/root"
import { HashRouter as Router, Route,Redirect,NavLink,Switch} from "react-router-dom";
import './assets/common.css'
//import "antd/dist/antd.css";
import Login from "./pages/login.jsx"
import Order from "./pages/order.jsx"
import Returns from "./pages/returns.jsx"
import Refund from "./pages/refund.jsx"
import Credit from "./pages/credit.jsx"
import Address from "./pages/address.jsx"
import Message from "./pages/message.jsx"
import Register from "./pages/register.jsx"
import Notice from "./pages/notice.jsx"
import Reset from "./pages/pswreset.jsx"
import Home from './pages/home.jsx';
import Detail from './pages/detail.jsx';
import Cart from './pages/cart.jsx';
import List from './pages/list.jsx';
import OrderList from './pages/Orderlist.jsx';
import PreviewList from './pages/previewlist.jsx';
import Preview from './pages/preview.jsx';
import Email from './pages/email.jsx';
import CheapProduct from './pages/cheapProduct.jsx';
import ProductClass from './pages/productClass.jsx';
class App extends React.Component{
    render(){
        return (
                <Router >
                    <div>
                    <Switch>
                        <Route path="/login" component={Login}></Route>
                        <Route path="/register" component={Register}></Route>
                        <Route path="/order" component={Order}></Route>
                        <Route path="/returns" component={Returns}></Route>
                        <Route path="/refund" component={Refund}></Route>
                        <Route path="/credit" component={Credit}></Route>
                        <Route path="/address" component={Address}></Route>
                        <Route path="/message" component={Message}></Route>
                        <Route path="/notice" component={Notice}></Route>
                        <Route path="/reset" component={Reset}></Route>
                        <Route path="/home" component={Home}></Route>
                        <Route path="/detail/:id" component={Detail}></Route>
                        <Route path="/cart" component={Cart}></Route>
                        <Route path="/list" component={List}></Route>
                        <Route path="/orderlist" component={OrderList}></Route>
                        <Route path="/previewlist/:ids" component={PreviewList}></Route>
                        <Route path="/preview/:amount" component={Preview}></Route>
                        <Route path="/email" component={Email}></Route>
                        <Route path="/cheapproduct/:1" component={CheapProduct}></Route>
                        <Route path="/productclass" component={ProductClass}></Route>
                        <Redirect to='/home'/>
                    </Switch>
                    </div>
                </Router>
        )
    }
}

export default hot(App)
