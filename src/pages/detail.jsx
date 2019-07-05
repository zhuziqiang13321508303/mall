import React,{Component} from 'react';
import { Breadcrumb,InputNumber,Button} from 'antd';
import Img from "./img.jsx";
import '../css/detail.css';
class Detail extends Component{
    constructor(props){
        super(props)
        this.state={
            data1:[{name:"首页",href:"#/home"},{name:"手机",href:"#"},{name:"荣耀",href:"#"},{name:"荣耀20 PRO DXO全球第二高分 4800万全焦段AI四摄 双光学防抖 麒麟980全网通版8GB+128GB 幻夜星河",href:"#"}],
            // 缩略图
            minImg: "",
            // 高清图
            maxImg: "",
        }
    }

    // componentDidMount(){
    //     let _this=this;
    //         var url= "/api/site/product";
    //         var xhr = new XMLHttpRequest();
    //         xhr.open("GET", url,true);
    //         xhr.send();
    //         xhr.onreadystatechange = function(){
    //           if (xhr.readyState === XMLHttpRequest.DONE) {
    //             if (xhr.status === 200) {
    //                 let body=JSON.parse(xhr.responseText);
    //                 let body1=body.data;
    //                 _this.setState({data:body1});
    //                 console.log("eee=========",body1,_this.state.data.slice(0,8));
    //             }else if (xhr.status === 401) {
    //                 console.error(xhr.responseText);
    //                 var code = null;
    //                 try{
    //                     code = JSON.parse(xhr.responseText)["code"];
    //                     if(code==33){
    //                         browserHistory.push("/login");
    //                     }else{
    //                         let  msg = JSON.parse(xhr.responseText)["msg"];
    //                         message.error(msg,10);
    //                     }
    //                 }catch(e){
                      
    //                 }
    //             }else{
    //               let  msg = JSON.parse(xhr.responseText)["msg"];
    //                 message.error(msg,10);
    //             }
    //           }
    //         };
    //         console.log("aaaa++++++======");
    // }

    //改变数量
    onChange(value){

        console.log("你点击了更改数量按钮",value);
    }
    //加入购物车按钮
    addCart(){
        let _this=this;
        var url= "/api/site/product";
        var xhr = new XMLHttpRequest();
        xhr.open("GET", url,true);
        xhr.send();
        xhr.onreadystatechange = function(){
            if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                let body=JSON.parse(xhr.responseText);
                let body1=body.data;
                _this.setState({data:body1});
                console.log("eee=========",body1,_this.state.data.slice(0,8));
            }else if (xhr.status === 401) {
                console.error(xhr.responseText);
                var code = null;
                try{
                    code = JSON.parse(xhr.responseText)["code"];
                    if(code==33){
                        browserHistory.push("/login");
                    }else{
                        let  msg = JSON.parse(xhr.responseText)["msg"];
                        message.error(msg,10);
                    }
                }catch(e){
                    
                }
            }else{
                let  msg = JSON.parse(xhr.responseText)["msg"];
                message.error(msg,10);
            }
            }
        };
        console.log("你点击了加入购物车按钮");
    }
    //立即下单按钮
    addOrder(){
        console.log("你点击了立即下单按钮");
    }
    render(){
        const { minImg, maxImg } = this.state;
        return(
            <div className="detail-container">
                <div className="detail-bread">
                    <div className="detail-bread-container">
                        <Breadcrumb separator=">">
                            {
                                this.state.data1.map((item,index)=>{
                                    return (<Breadcrumb.Item key={index}><a href={item.href}>{item.name}</a></Breadcrumb.Item>)
                                })
                            } 
                        </Breadcrumb>
                    </div>
                </div>
                <div className="detail-main">
                    <div className="detail-main-container">
                        <Img minImg={minImg} maxImg={maxImg} />    
                    </div>
                    <div className="detail-add">
                        <InputNumber min={1} defaultValue={1} onChange={this.onChange.bind(this)} />
                        <Button type="primary" onClick={this.addCart.bind(this)}>加入购物车</Button>
                        <Button type="primary" onClick={this.addOrder.bind(this)}>立即下单</Button>
                    </div>
                </div>
            </div>
        )
    }
}
export default Detail;