import React,{Component} from 'react';
import CompanyMessage from "./companyMessage.jsx";
import {Link,NavLink} from "react-router-dom";
import {Pagination,message} from "antd";
import '../css/list.css';
class List extends Component{
    constructor(props){
        super(props)
        this.state={
            data:[],
            pages:1,
            back:0,
            forward:8,
            show:"none",
            arr:["none","none","none","none","none","none","none","none"],
        }
    }

    componentDidMount(){
            let _this=this;
            var url= "/api/mall/product";
            var xhr = new XMLHttpRequest();
            xhr.open("GET", url,true);
            xhr.send();
            xhr.onreadystatechange = function(){
              if (xhr.readyState === XMLHttpRequest.DONE) {
                if (xhr.status === 200) {
                    let body=JSON.parse(xhr.responseText);
                    let body1=body.data;
                    _this.setState({data:body1});
                    //console.log("eee=========",body1,_this.state.data.slice(0,8));
                }else if (xhr.status === 401) {
                    //console.error(xhr.responseText);
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
            //console.log("aaaa++++++======");
    }
    //鼠标划入
    mouseEnter(index){
        let arr1=this.state.arr;
        arr1[index]="block";
        this.setState({arr:arr1})
        //console.log("aa======",index);
    }
    //鼠标划出
    mouseLeave(index){
       let arr2=["none","none","none","none","none","none","none","none"];
        this.setState({arr:arr2});
        //console.log("bb======",index);
    }
    //点击分页器获取新数据
    onChange(page,pagesize){
            let back=8*(page-1);
            let forward=page*8;
            this.setState({back:back,forward:forward});
            //console.log(page,pagesize);
    }
    //加入购物车按钮
    addCart(item){
        let _this=this;
        var url= "/api/mall/cart_item";
        var xhr = new XMLHttpRequest();
        var data3 = new FormData();
        data3.append('product_id',item);
        data3.append('amount',1);
        //console.log("ccc=========",data3.get("product_id"),data3.get("amount"));
        xhr.open("POST", url,true);
        xhr.send(data3);
        //console.log("eee=========",data3.get("product_id"),data3.get("amount"));
        xhr.onreadystatechange = function(){
            if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                //let body=xhr.responseText;
                 //console.log("eee=========");
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
        //console.log("你点击了加入购物车按钮",item);
    }
    render(){
        let back=this.state.back;
        let forward=this.state.forward;
        return(
            <div className="list-container">
                <h1>合宙精品</h1>
                <div className="list-section">
                    <div className="list-product">
                            {
                                this.state.data.slice(back,forward).map((item,index)=>{
                                    
                                    return (
                                      
                                            <div key={index} onMouseEnter={this.mouseEnter.bind(this,index)} onMouseLeave={this.mouseLeave.bind(this,index)}>
                                                <NavLink to={"/detail/"+item.id}>
                                                    <img src={item.image}/>
                                                    <div>{item.name}</div>
                                                    <div>{item.model}</div>
                                                    <div>￥{item.price}</div>
                                                </NavLink>
                                                <button style={{display:this.state.arr[index]}} onClick={this.addCart.bind(this,item.id)}>加入购物车</button>
                                            </div>
                                        
                                    )
                                })
                            }
                    </div>
                    <div className="list-piganation">
                        <Pagination defaultCurrent={1} total={869} pageSize={8} onChange={this.onChange.bind(this)}/>
                    </div>
                </div>
                <CompanyMessage/>
            </div>
        )
    }
}
export default List;