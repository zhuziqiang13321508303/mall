import React,{Component} from 'react';
import '../css/orderlist.css';
import { Steps,Modal,Icon,Input,Popconfirm,Button} from 'antd';

const { Step } = Steps;
const { TextArea } = Input;
class Orderlist extends Component{
    constructor(props){
        super(props)
        this.state={
            data1:{img:"#",desc:"荣耀20 PRO DXO全球第二高分 4800万全焦段AI四摄 双光学防抖 麒麟980全网通版8GB+128GB 幻夜星河",price:1299,number:2},
            step:0,
            visible:false,
            arr:[],
            show:"none",
            flag:false,
            indexs:0,
            lengths:false,
        }
    }

    showModal(){
        this.setState({
          visible: true,
        });
      };
    
      handleOk(e){
        let obj={};
        obj.name=this.name.state.value;
        obj.phone=this.phone.state.value;
        obj.address=this.address.textAreaRef.value;
        if(!this.state.flag){
            this.state.arr.push(obj);
        }else{
            this.state.arr[this.state.indexs]=obj;
            this.setState({arr:this.state.arr});
            console.log(this.state.arr[this.state.indexs]);
        }
        if(this.state.arr.length>2){
            console.log(this.state.arr.length);
            this.setState({lengths:true})
        }
        this.name.state.value="";
        this.phone.state.value="";
        this.address.textAreaRef.value="";
        this.setState({
          visible: false,
          show:"block",
          flag:false,
        });
        console.log(this.state.arr);
      };
    
      handleCancel(e){
        console.log(e);
        this.setState({
          visible: false,
          flag:false,
        });
      };
      //删除地址按钮
      confirm(index){
          let _this=this;
          let arr1=this.state.arr;
          arr1.splice(index,1);
          this.setState({arr:arr1},function(){
            if(_this.state.arr.length<=2){
                _this.setState({lengths:false})
                console.log(_this.state.arr.length);
            }
          })
          console.log(arr1);
          console.log("你点击了删除按钮",index);
      }
      cancel(){
        console.log("你点击了取消按钮");
      }
      //编辑地址按钮
      edit(index){
          let obj=this.state.arr[index];
          this.name.state.value=obj.name;
          this.phone.state.value=obj.phone;
          this.address.textAreaRef.value=obj.address;
          this.setState({flag:true,indexs:index})
          this.showModal();
          console.log("你点击了编辑地址按钮",index,obj);
      }
    render(){
        let _this=this;
        console.log("又刷新了一次");
        let styles=this.state.lengths?{position:"absolute",top:54,right:180,width:146,height:30,lineHeight:"30px",textAlign:"center",color:"#666",fontSize:14,cursor:"pointer",border:"1px solid #333"}:{width:350,height:120,lineHeight:"120px",textAlign:"center",color:"#666",fontSize:14,cursor:"pointer",border:"1px solid #333"};
        return(
            <div className="orderlist-container">
                 <div className="orderlist-top">
                    <div className="orderlist-top-container">
                        <div className="orderlist-top-left">
                            <img src="#"/>
                            <h2>确认订单</h2>
                        </div>
                        <div className="orderlist-top-right">
                            <Steps current={this.state.step} size="small" progressDot>
                                <Step title="填写核对订单" className="cart-top-step"/>
                                <Step title="成功提交订单" className="cart-top-step"/>
                            </Steps>
                        </div>
                    </div>
                </div>

                <div className="orderlist-address">
                    <div className="orderlist-address-container">
                        <div className="orderlist-address-input" style={{display:this.state.show}}>
                            <ul>
                                {
                                    this.state.arr.map((item,index)=>{
                                        console.log(item);
                                     return (<li key={index}>
                                            <div>
                                                <span>{item.name}</span>
                                                <span>{item.phone}</span>
                                            </div>
                                            <p>{item.address}</p>
                                            <span>
                                                <i onClick={this.edit.bind(this,index)}>
                                                    <Icon type="edit"/>编辑</i>&nbsp;&nbsp;
                                                <i>
                                                    <Popconfirm
                                                    title="确定要删除吗"
                                                    onConfirm={this.confirm.bind(this)}
                                                    onCancel={this.cancel.bind(this)}
                                                    okText="Yes"
                                                    cancelText="No"
                                                    >
                                                        <Icon type="delete"/>删除
                                                    </Popconfirm>                                  
                                                </i>
                                            </span>
                                        </li>)
                                    })
                                }
                            </ul>
                        </div>
                        <div className="orderlist-new-address" onClick={this.showModal.bind(this)} style={styles}>
                            +新增收货地址
                        </div>
                        <Modal
                        title="添加地址"
                        visible={this.state.visible}
                        onOk={this.handleOk.bind(this)}
                        onCancel={this.handleCancel.bind(this)}
                        okText="保存并使用"
                        cancelText="取消"
                        bodyStyle={{width:600,height:200}}
                        >
                            <div className="orderlist-modal-content">
                                <div><span>货主姓名:</span><Input type="text"  ref={ref=>this.name=ref}/></div>
                                <div><span>联系电话:</span><Input type="text" ref={ref=>this.phone=ref}/></div>
                                <div><span>收货地址:</span><Input.TextArea rows={3} ref={ref=>this.address=ref}/></div>
                            </div>
                        </Modal>
                    </div>
                </div>

                <div className="orderlist-product-list">
                    <div className="orderlist-product-container">
                        <div className="orderlist-detail-message">
                            <img src={this.state.data1.img}/>
                            <p>{this.state.data1.desc}</p>
                            <span>X{this.state.data1.number}</span>
                            <span>￥{this.state.data1.number*this.state.data1.price}</span>
                        </div>
                        <div className="orderlist-cheap-ticket">
                            <div className="orderlist-ticket-left">
                                <span>优惠与抵用</span>
                                <span>仅适用于自营实物商品</span>
                            </div>
                            <div className="orderlist-ticket-right">
                                <p>商品金额{}</p>
                                <p>运费{}</p>
                                <p>优惠金额{}</p>
                                <p>结算金额{}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="orderlist-count">
                    <div className="orderlist-count-container">
                        <div className="orderlist-data-all">
                            <div>
                                <div>应付总额:{this.state.data1.number*this.state.data1.price}</div>
                                <div>可获得积分:{140}</div>
                            </div>
                            <div className="orderlist-address-again">diubvjhfubj</div>
                            <Button>提交订单</Button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default Orderlist;