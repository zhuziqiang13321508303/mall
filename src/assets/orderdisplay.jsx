import React,{Component} from "react";
import { Table,message} from 'antd';
class Tables extends Component{
    constructor(props){
        super(props)
        this.state={
            arr:[],
        }
        this.getOrderlist=this.getOrderlist.bind(this);
        this.handle=this.handle.bind(this);
        // this.deleteProduct=this.deleteProduct.bind(this);
    }
    componentDidMount(){
        this.getOrderlist();
    }
    //获取订单列表
    getOrderlist(){
        let  _this=this;
        var url= "/api/mall/delivery";
        var xhr = new XMLHttpRequest(); 
        xhr.open("get", url,true);
        xhr.send();
        xhr.onreadystatechange = function(){
            if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                let body=JSON.parse(xhr.responseText).data;
                _this.setState({arr:body})
                console.log("fff=========",body);
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
        console.log("获取订单列表");
      }
      //处理列表中的数据
      handle(){
            let arrOne=this.state.arr;
            let _this=this;
            let data=[];
            let obj={};
            let number=0
            // for(let i=0;i<arrOne.length;i++){
            //     obj.name=arrOne[i].recipient;
            //     obj.phone=arrOne[i].phone;
            //     obj.address=arrOne[i].address;
            //     obj.id=arrOne[i].id;
            //     for(let j=0;j<arrOne[i].items.length;j++){
            //         obj.key=++number;
            //         obj.productname=arrOne[i].items[j].product;
            //         obj.amount=arrOne[i].items[j].amount;
            //         obj.price=arrOne[i].items[j].price;
            //         data.push(obj);
            //     }
            // }    
            for(let i=0;i<arrOne.length;i++){
                for (let j=0;j<arrOne[i].items.length;j++){
                    data.push({key:Math.random(),
                        name:arrOne[i].recipient,
                        phone:arrOne[i].phone,
                        address:arrOne[i].address,
                        productname:arrOne[i].items[j].product,
                        price:arrOne[i].items[j].price,
                        amount:arrOne[i].items[j].amount,
                        id:arrOne[i].id-0
                    })                
                }
            } 
            const columns = [
                  {
                    title: '姓名',
                    dataIndex: 'name',
                    key: 'name',
                  },
                  {
                    title: '电话',
                    dataIndex: 'phone',
                    key: 'phone',
                  },
                  {
                    title: '收货地址',
                    dataIndex: 'address',
                    key: 'address',
                  },
                  {
                    title: '商品名称',
                    dataIndex:'productname',
                    key: 'productname',
                  },
                  {
                    title: '数量',
                    dataIndex: 'amount',
                    key: 'amount',
                  },
                  {
                    title: '价格',
                    dataIndex: 'price',
                    key: 'price',
                  },
                  {
                    title: '操作',
                    key: 'action',
                    render: (text,arrOne,index) => {
                    return(
                            <span onClick={_this.deleteProduct.bind(this,arrOne.id)}>删除</span>
                    )},
                  },
                ];
            console.log(arrOne,number);
            return (<Table columns={columns} dataSource={data}/>)  
      }
      //删除订单
      deleteProduct(id){
        let self=this
        console.log("dsdsdssdsdsdds",id);
        let url=`/api/mall/delivery/${id}`;
        var xhr=new XMLHttpRequest();
        xhr.open("DELETE",url) 
        xhr.send();
        xhr.onreadystatechange=function(){
            if(xhr.readyState === XMLHttpRequest.DONE) {
                if(xhr.status === 200) {
                    message.success("删除成功");
                    self.getOrderlist()
                } else {
                    message.error("删除失败，请稍后重试")
                }
            }
        }
      }
    render(){
        return(
                <div>
                    {this.handle()}
                </div>
        )
    }
}
export default Tables;