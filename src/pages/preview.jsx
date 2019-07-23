import React,{Component} from 'react';
import '../css/previewlist.css';
import { Steps,Modal,Icon,Input,Popconfirm,Button,Cascader,message,Form,Checkbox,Select,Tooltip,Row,Col,AutoComplete} from 'antd';
import options from "../assets/city";
import TopMessage from "../assets/topMessage.jsx";
import CompanyMessage from "../assets/companyMessage.jsx";
import imgLogo from "../assets/images/hezhou.jpg";
import $ from 'jquery';
const { Step } = Steps;
const { TextArea } = Input;
class Preview extends Component{
        constructor(props){
                super(props)
                this.state={
                    datas:{},
                    cartdata:[],
                    addressList:[],
                    show:false,
                    showss:false,
                    recipients:'',
                    provinces:'',
                    citys:'',
                    areas:'',
                    phones:'',
                    names:'',
                    addresss:'',
                    records:'',
                }
                this.get_msg=this.get_msg.bind(this);
                this.get_myself=this.get_myself.bind(this);
                this.grossMoney=this.grossMoney.bind(this);
                this.handleOk=this.handleOk.bind(this);
            }
            componentDidMount(){
                let self=this
                console.log(this.props.match.params.amount);
                let obj={};
                let cart_items=[];
                obj.id=this.props.match.params.amount.split(",")[0]-0;
                obj.amount=this.props.match.params.amount.split(",")[1]-0;
                cart_items.push(obj);
                console.log("zzzzz=======",cart_items)
                this.setState({cart_items},()=>{
                    console.log(self.state.cart_items)
                    self.get_myself()
                })
                //this.getAddress();
                // if(this.state.addressList.length){
                //     this.setState({show:"block"})
                // }
            }
            //获取个人信息
            get_myself(){//获取个人信息，拿到地址
                let url="/api/mall/myself";
                var self=this
                var xhr=new XMLHttpRequest()
                xhr.open('GET',url)
                xhr.send(null)
                xhr.onreadystatechange=function(){
                    if(xhr.readyState === XMLHttpRequest.DONE) {
                        if(xhr.status === 200) {
                            let res=JSON.parse(xhr.responseText);
                            let arr=[];
                            let recordss=res.data.last_shipping_address;
                            arr.push(res.data.last_shipping_address);
                            self.setState({
                                records:res.data,
                                addressList:arr,
                                recipients:recordss.name,
                                phones:recordss.phone,
                                provinces:recordss.province,
                                citys:recordss.city,
                                areas:recordss.area,
                                addresss:recordss.address,
                            },self.get_msg)
                            console.log("ggggg=====",res.data,res.data.last_shipping_address)
                        } else {
                            message.fail("个人信息获取失败");
                        }
                    }
                }
            }
            //获取预览订单接口
            get_msg(){//订单预览接口
                let url="/api/mall/delivery_preview"
                let self=this
                let records=self.state.records.last_shipping_address;
                var xhr=new XMLHttpRequest()
                let data=new FormData()
                console.log(JSON.stringify(self.state.cart_items));
                data.append('products',JSON.stringify(self.state.cart_items))
                data.append('recipient',records.name)
                data.append('phone',records.phone)
                data.append('province',records.province)
                data.append('city',records.city)
                data.append('area',records.area)
                data.append('address',records.address)
                xhr.open('POST',url)
                xhr.send(data)
                xhr.onreadystatechange=function(){
                    if(xhr.readyState === XMLHttpRequest.DONE) {
                        if(xhr.status === 200) {
                            let res=JSON.parse(xhr.responseText);
                            self.setState({
                                datas:res.data,
                                cartdata:res.data.items,
                            })
                            console.log("mmmm====",res);
                        } else {
                            message.fail("订单获取失败")
                        }
                    }
                }
            }
            //控制弹窗显示隐藏
            showModal(){
                this.setState({
                    showss:false,
                    visible: true,
                });
            };
        //省市区三级联动
        onChange(value){
            this.setState({province:value[0],city:value[1],area:value[2]})
            console.log(value,value[0],value[1],value[2],this.optionadd);  
        }
        //获取地址列表
        getAddress(){
            let  _this=this;
            var url= "/api/mall/shipping_address";
            var xhr = new XMLHttpRequest(); 
            xhr.open("get", url,true);
            xhr.send();
            xhr.onreadystatechange = function(){
                if (xhr.readyState === XMLHttpRequest.DONE) {
                if (xhr.status === 200) {
                    let body=JSON.parse(xhr.responseText).data;
                    _this.setState({addressList:body},function(){
                        if(_this.state.addressList.length>2){
                            console.log("77777=====");
                            _this.setState({lengths:true})
                        }else{
                            _this.setState({lengths:false})
                        }
                    })
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
            console.log("获取地址列表");
        }
        //添加地址
        handleOk(value){
            let obj={};
                let _this=this;
                obj.name=value.nickname;
                obj.phone=value.phone;
                obj.address=value.address;
                obj.province=value.residence[0];
                obj.city=value.residence[1];
                obj.area=value.residence[2];
                if(!this.state.flag){
                    var url= "/api/mall/shipping_address";
                    var xhr = new XMLHttpRequest(); 
                    let data=new FormData();
                    data.append("name",value.nickname);
                    data.append("phone",value.phone);
                    data.append("province",value.residence[0]);
                    data.append("city",value.residence[1]);
                    data.append("area",value.residence[2]);
                    data.append("address",value.address);
                    xhr.open("POST", url,true);
                    xhr.send(data);
                    xhr.onreadystatechange = function(){
                        if (xhr.readyState === XMLHttpRequest.DONE) {
                        if (xhr.status === 200) {
                            let body=xhr.responseText;
                            let arr= _this.state.addressList;
                            arr.push(obj)
                            _this.setState({addressList:arr});
                            console.log("eee=========",body);
                            _this.getAddress();
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
                    
                }else{
                    var url= "/api/mall/shipping_address/"+this.state.indexs;
                    var xhr = new XMLHttpRequest(); 
                    let data=new FormData();
                    data.append("name",value.nickname);
                    data.append("phone",value.phone);
                    data.append("province",value.residence[0]);
                    data.append("city",value.residence[1]);
                    data.append("area",value.residence[2]);
                    data.append("address",value.address);
                    _this.setState({
                        recipients:value.nickname,
                        phones:value.phone,
                        provinces:value.residence[0],
                        citys:value.residence[1],
                        areas:value.residence[2],
                        addresss:value.address,
                    })
                    xhr.open("PUT", url,true);
                    xhr.send(data);
                    xhr.onreadystatechange = function(){
                        if (xhr.readyState === XMLHttpRequest.DONE) {
                        if (xhr.status === 200) {
                            let body=xhr.responseText;
                            console.log("eeeffffff=========",body);
                            _this.getAddress();
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
                    this.state.addressList.push(obj);
                }
                this.setState({
                visible: false,
                show:"block",
                flag:false,
                });
        };
         //编辑地址按钮
         edits(index){
            console.log("333-=======",index);
            for(let j=0;j<this.state.addressList.length;j++){
                if(this.state.addressList[j].id===index){
                let obj=this.state.addressList[j];
                let residences=''+obj.province+"/"+obj.city+"/"+obj.area;
                console.log("objjjj=====",obj,residences);
                this.setState({
                    visible: true,
                    showss:true,
                    names:obj.name,
                    phones:obj.phone,
                    address:obj.address,
                    residence:residences,
                    flag:true,
                    indexs:index,
                    visible:true,
                }) 
                }
            }
        }
        //删除地址按钮
        confirm(index){
            let _this=this;
            var url= "/api/mall/shipping_address/"+index;
            var xhr = new XMLHttpRequest(); 
            xhr.open("DELETE", url,true);
            xhr.send();
            console.log("hcbfdshcbd",index);
            xhr.onreadystatechange = function(){
                if (xhr.readyState === XMLHttpRequest.DONE) {
                if (xhr.status === 200) {
                    let arr=_this.state.addressList;
                    console.log("llll======",arr);
                    arr.splice(index,1);
                    console.log("2222======",arr);
                    _this.setState({addressList:arr});
                    _this.getAddress();
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
            // this.getAddress();
        }
        //取消地址增加
        handleCancel(e){
            console.log(e);
                this.setState({
                visible: false,
                flag:false,
                });
          };
          //获取子元素数据按钮
          getValue(value,hide){
            console.log(value,hide);
            this.setState({
                visible:hide
            })
            if(value){
                this.handleOk(value);
            }
           
        }
        onCancels(){
            this.setState({
                visible: false,
            });
        }
          //计算初始商品总金额
          grossMoney(){
                let arr=this.state.cartdata;
                let zong=0;
                arr.map((item,index)=>{
                    zong+=item.price*item.amount
                })
                return zong
          }
          //提交订单按钮
          submitOrder(){
            let url="/api/mall/delivery"
            let self=this
            let records=self.state.records.last_shipping_address;
            var callback=function(err,res){
                if(err){
                    message.fail("订单获取失败")
                }else{
                    self.props.history.push("/orderlist");
                    //self.props.history.push("/order");
                }
            }
            var xhr=new XMLHttpRequest()
            let data=new FormData()
            data.append('payment_type',0)
            data.append('products',JSON.stringify(self.state.cart_items));
            data.append('recipient',this.state.recipients)
            data.append('phone',this.state.phones)
            data.append('province',this.state.provinces)
            data.append('city',this.state.citys)
            data.append('area',this.state.areas)
            data.append('address',this.state.addresss)
            xhr.open('POST',url)
            console.log("yyyyyy=====yyyyyy",JSON.stringify(self.state.cart_items));
            xhr.send(data)
            xhr.onreadystatechange=function(){
                if(xhr.readyState === XMLHttpRequest.DONE) {
                    if(xhr.status === 200) {
                        callback(null,JSON.parse(xhr.responseText)) 
                    } else {
                        callback(xhr.responseText,null);
                    }
                }
            }
            console.log("你点击了提交订单按钮");
          }
          cancel(){
            console.log("你点击了取消按钮");
          }
           //地址改变按钮
           varyAddress(index){
            $("#list li").eq(index).addClass('listname').siblings().removeClass('listname');
          this.setState({
              recipients:this.state.addressList[index].name,
              phones:this.state.addressList[index].phone,
              provinces:this.state.addressList[index].province,
              citys:this.state.addressList[index].city,
              areas:this.state.addressList[index].area,
              addresss:this.state.addressList[index].address,
          })
          console.log("你点击了地址改变按钮",index,this.state.addressList[index],$("#list"), $("#list li").eq(index));
        }
        //删除预览商品按钮
        // deleteId(){

        // }
        render(){
            let _this=this;
            console.log("又刷新了一次");
            let styles=this.state.lengths?{position:"absolute",top:10,right:180,width:146,height:30,lineHeight:"30px",textAlign:"center",color:"#666",fontSize:14,cursor:"pointer",border:"1px solid #333"}:{width:240,height:120,lineHeight:"120px",textAlign:"center",color:"#666",fontSize:14,cursor:"pointer",border:"1px solid #333"};
            return(
                <div>
                    <div className="top-nav">
                        <div className="top-nav-container">
                            <TopMessage/>
                        </div>
                    </div>
                    <div className="previewlist-top">
                        <div className="previewlist-top-container">
                            <div className="previewlist-top-left">
                                <img src={imgLogo}/>
                                <h2>预览订单</h2>
                            </div>
                            <div className="previewlist-top-right">
                                <Steps current={1} size="small">
                                    <Step title="完成" description="我的购物车" />
                                    <Step title="进行中" description="预览订单" />
                                    <Step title="等待中" description="成功提交订单" />
                                </Steps>
                            </div>
                        </div>
                    </div>
                    <div className="previewlist-address">
                        <div className="previewlist-address-container">
                            <Button type="primary" onClick={this.getAddress.bind(this)} className="previewlist-address-display">获取地址列表</Button>
                            <div className="previewlist-address-input" style={{display:this.state.show}}>
                                <ul id="list">
                                    {
                                        this.state.addressList.map((item,index)=>{
                                        return (<li key={index} onClick={this.varyAddress.bind(this,index)}>
                                                <div>
                                                    <span>{item.name}</span>
                                                    <span>{item.phone}</span>
                                                </div>
                                                <p>{item.address}</p>
                                                <span>
                                                    <i onClick={this.edits.bind(this,item.id)}>
                                                        <Icon type="edit"/>编辑</i>&nbsp;&nbsp;
                                                    <i>
                                                        <Popconfirm
                                                        title="确定要删除吗"
                                                        onConfirm={this.confirm.bind(this,item.id)}
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
                            <div className="previewlist-new-address" onClick={this.showModal.bind(this)} style={styles}>
                                +新增收货地址
                            </div>
                            <Modal
                            title="收货信息"
                            visible={this.state.visible}
                            onCancel={this.handleCancel.bind(this)}
                            footer={null}
                            >
                                <WrappedRegistrationForm nickname={this.state.showss?this.state.names:''} phone={this.state.showss?this.state.phones:''} residence={this.state.showss?this.state.residence:''} address={this.state.showss?this.state.address:''} getValue={this.getValue.bind(this)}/>
                            </Modal>
                        </div>
                    </div>
                    <div className="previewlist-product-list">
                        <div className="previewlist-product-container">
                            <div className="previewlist-detail-message">
                                {
                                    this.state.cartdata.map((item,index)=>{
                                            return(
                                                <div key={index}>
                                                    <img src={item.image}/>
                                                    <p>{item.desc}vjfdvhbfgjbn</p>
                                                    <span>X{item.amount}</span>
                                                    <span>￥{item.amount*item.price}</span>
                                                    {/* <button onClick={this.deleteId.bind(this)}>删除</button> */}
                                                </div>
                                            )
                                    })
                                }
                                
                            </div>
                            <div className="previewlist-cheap-ticket">
                                <div className="previewlist-ticket-left">
                                    <span>优惠与抵用</span>
                                    <span>仅适用于自营实物商品</span>
                                </div>
                                <div className="previewlist-ticket-right">
                                    <p>商品金额{this.grossMoney()}</p>
                                    <p>运费{}</p>
                                    <p>优惠金额{}</p>
                                    <p>结算金额{}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="previewlist-count">
                        <div className="previewlist-count-container">
                            <div className="previewlist-data-all">
                                <div>
                                    <div>应付总额:{50000}</div>
                                    <div>可获得积分:{5000}</div>
                                </div>
                                <div className="previewlist-address-again">
                                    <div>配送至：{this.state.addresss}</div>
                                    <span>{this.state.recipients}</span>
                                    <span>{this.state.phones}</span>
                                </div>
                                <Button onClick={this.submitOrder.bind(this)}>提交订单</Button>
                            </div>
                        </div>
                    </div>
                    <CompanyMessage/>
                </div>
            )
        }
}


const { Option } = Select;

class RegistrationForm extends React.Component {
constructor(props){
    super(props);
    this.state = {
        confirmDirty: false,
        autoCompleteResult: [],
        // nickname:this.props.nickname,
        // phone:this.props.phone,
        // address:this.props.address,
        // residence:this.props.residence
      };
}
  handleSubmit(e){
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
          let hide=false;
        this.props.getValue(values,hide);
        console.log('Received values of form: ', values);
      }
    });
  };
  //取消按钮
  cancel(){
      let hide=false;
      this.props.getValue('',hide);
      console.log("你点击了取消按钮");
  }
  componentWillReceiveProps(){
    console.log("oooooooooooooo=========",this.props);
    this.setState({
        nickname:this.props.nickname,
        phone:this.props.phone,
        address:this.props.address,
        residence:this.props.residence,
    })
};
  render(){
    const { getFieldDecorator } = this.props.form;
    const { autoCompleteResult } = this.state;
    console.log(this.props);
    const formItemLayout = {
        labelCol: {
          xs: { span: 24 },
          sm: { span: 8 },
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 16 },
        },
      };
      const tailFormItemLayout = {
        wrapperCol: {
          xs: {
            span: 24,
            offset: 0,
          },
          sm: {
            span: 16,
            offset: 8,
          },
        },
      };
    const prefixSelector = getFieldDecorator('prefix', {
      initialValue: '86',
    })(
      <Select style={{ width: 70 }}>
        <Option value="86">+86</Option>
        <Option value="87">+87</Option>
      </Select>,
    );
    return (
      <Form  onSubmit={this.handleSubmit.bind(this)} {...formItemLayout}>
        <Form.Item label="货主姓名">
          {getFieldDecorator('nickname', {initialValue:this.state.nickname,
            rules: [{ required: true, message: 'Please input your nickname!', whitespace: true }],
          })(<Input/>)}
        </Form.Item>
        <Form.Item label="电话号码">
          {getFieldDecorator('phone', {initialValue:this.state.phone,
            rules: [{ required: true, message: 'Please input your phone number!' }],
          })(<Input addonBefore={prefixSelector} style={{ width:'100%'}}/>)}
        </Form.Item>
        <Form.Item label="邮寄地址">
          {getFieldDecorator('residence', {
            rules: [
              { type: 'array', required: true, message: 'Please select your habitual residence!' },
            ],
          })(<Cascader options={options}   placeholder={this.state.residence}/>)}
        </Form.Item>
        <Form.Item label="详细地址">
          {getFieldDecorator('address', {initialValue:this.state.address,
            rules: [{ required: true, message: '请填写详细地址' }],
          })(<Input/>)}
        </Form.Item>
        <Form.Item >
           
          <Button type="primary" htmlType="submit" {...tailFormItemLayout}>
            保存并使用
          </Button>
        </Form.Item>
        <Form.Item>
            <Button type="primary" onClick={this.cancel.bind(this)} {...tailFormItemLayout}>
                取消
            </Button>
        </Form.Item>
      </Form>
    );
  }
}

const WrappedRegistrationForm = Form.create({name:"获取发货信息"})(RegistrationForm);

export default Preview;
