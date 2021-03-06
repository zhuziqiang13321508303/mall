import React,{ Component} from "react";
import Fixed from "../assets/fixed.jsx";
import CompanyMessage from "../assets/companyMessage.jsx";
import TopMessage from "../assets/topMessage.jsx";
// import Action from '../reds/Action';
// import Store from '../reds/Store';
import imgLogo from "../assets/images/hezhou.jpg";
import '../css/cart.css';
import { Steps,Checkbox,InputNumber,Popconfirm,message,Tooltip,Button,Icon,Empty} from 'antd';
const { Step } = Steps;
class Cart extends Component{
    constructor(props){
        super(props)
        this.state={
            arrProduct: [],
            step:0,
            allNumber:0,
            allCount:0.00,
            allMoney:0.00,
            styles:'',
            checkall:false,
            flag:false,
            id:[],
            zongOne:0,
            datas:{},
            allMounts:0,
            empty:"block",
        }
    }
    // 全选按钮
    onChange(e) {
        console.log(`checked = ${e.target.checked}`);
        if(this.state.checkall){
            console.log("ccc======");
			this.setState({checkall:false})
		}else{
            let ids=[];
            
            let arr=this.state.arrProduct;
            for(let j=0;j<arr.length;j++){
                let obj={};
                obj.id=arr[j].id;
                ids.push(obj);
            }
            this.setState({id:ids})
            console.log(ids);
			this.setState({checkall:true})
		}
		var _this=this;
		this.state.arrProduct.map((item,i)=>{
			item.selected=!_this.state.checkall
        })
        this.zongNumber();
        this.zong();
      }
      //单选按钮
      onChange2(i){
        let list1=this.state.arrProduct;
        let _this=this;
		list1[i].selected=!list1[i].selected
		this.setState({arrProduct:list1},function(){
			var sel=this.state.arrProduct.filter(function(item){
				return item.selected==true
            })
            console.log(sel);
			sel.length==this.state.arrProduct.length?this.setState({checkall:true}):this.setState({checkall:false})
            let ids=[];
            
            for(let i=0;i<sel.length;i++){
                // ids.push(sel[i].id)
                let obj={};
                obj.id=sel[i].id;
                ids.push(obj);
            }
            _this.setState({id:ids})
            console.log(ids);
        })
        this.zongNumber();
        this.zong();
      }
      //商品数量变化输入框
      onChange1(id,value) {
        //value是默认形参，它的位置应放在后面
        let _this=this;
        var url= "/api/mall/cart_item/"+id;
        var xhr = new XMLHttpRequest();
        let data=new FormData();
        data.append("amount",value);
        console.log("bbbb======",value,id);
        xhr.open("PUT", url,true);
        xhr.send(data);
        xhr.onreadystatechange = function(){
            if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                let body=xhr.responseText;
                _this.getCart();
                console.log("eee=========",body);
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
        //console.log('changed',i, value);
        this.zongNumber();
        this.zong();
      }
      //删除商品按钮
      confirm(index,id){
        let _this=this;
        var url= "/api/mall/cart_item/"+id;
        var xhr = new XMLHttpRequest(); 
        console.log("bbbb======",index,id);
        xhr.open("DELETE", url,true);
        xhr.send();
        xhr.onreadystatechange = function(){
            if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                let body=xhr.responseText;
                _this.getCart();
                console.log("eee=========",body);
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
        var arr2=this.state.arrProduct;
        arr2.splice(index,1);
        this.setState({arrProduct:arr2})
        message.success('删除成功');
  }
      cancel(e) {
        console.log(e);
        message.error('你点击了取消按钮');
      }
      //批量删除按钮
      onClick(){
        let arr2=this.state.arrProduct.filter((item)=>{
                    return item.selected===true
            });
        if(arr2.length<=0){
            alert("请选择要删除的商品")
        }else{
            let arr=[];
            for(let m=0;m<arr2.length;m++){
                let obj={};
                obj.id=arr2[m].id;
                arr.push(obj);
            }
            let _this=this;
            var url= "/api/mall/cart_item";
            var xhr = new XMLHttpRequest(); 
            let data=new FormData();
            data.append("items",JSON.stringify(arr));
            xhr.open("DELETE", url,true);
            xhr.send(data);
            xhr.onreadystatechange = function(){
                if (xhr.readyState === XMLHttpRequest.DONE) {
                if (xhr.status === 200) {
                    let body=xhr.responseText;
                    alert("删除成功")
                    _this.getCart();
                    console.log("eee=========",body);
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
        }
      }
      //总金额计算
      zong(){
        var zong=0;
        this.state.arrProduct.map((item,i)=>{
            if(item.selected==true){
                zong+=item.price*item.amount
            }
        })
        this.setState({zongOne:zong})
        }
        //计算总件数
        zongNumber(){
            var zong=0;
            this.state.arrProduct.map((item,i)=>{
                if(item.selected==true){
                    zong+=item.amount
                }
            })
            
            this.setState({allNumber:zong})
        }
      //结算按钮生成订单
      countAll(){
            let checked_arr=this.state.arrProduct.filter((item)=>
                item.selected==true
            )
            console.log(checked_arr)
            let id_arr=checked_arr.map((item)=>{
                return item.id
            })
            console.log("cccccaaa====",id_arr)
            if(checked_arr.length===0){
                alert("您还未选择任何商品");
            }else{
                this.props.history.push(`/previewlist/${id_arr}`)
            }
            console.log("你点击了结算按钮");
        }
        
    
    //获取购物车列表
      componentDidMount(){
        window.addEventListener('scroll', this.handleScroll.bind(this)) //监听滚动
        window.addEventListener('resize', this.handleResize.bind(this)) //监听窗口大小改变
        this.getCart();
      }
      getCart(){
        let _this=this;
        var url= "/api/mall/cart_item";
        var xhr = new XMLHttpRequest();
        xhr.open("GET", url,true);
        xhr.send();
        xhr.onreadystatechange = function(){
            if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                let body=JSON.parse(xhr.responseText).data;
                let allMount=0;
                for(let i=0;i<body.length;i++){
                    allMount+=body[i].amount
                }  
                _this.setState({arrProduct:body,allMounts:allMount});
                if(body.length==0){
                    _this.setState({empty:"block"});
                    //_this.state.checkall=!_this.state.checkall;
                }if(body.length!=0){
                    console.log(body.length);
                    _this.setState({empty:"none"})
                }
                console.log("eee=========",body,allMount,body.length);
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
      }
      componentWillUnmount() { 
          //最后移除监听器，以防多个组件之间导致this的指向紊乱
        window.removeEventListener('scroll', this.handleScroll.bind(this)) 
        window.removeEventListener('resize', this.handleResize.bind(this))
      }
    
      handleScroll(e){
          let _this=this;
        if(e.srcElement.scrollingElement.scrollHeight-e.srcElement.scrollingElement.scrollTop>1200){
                _this.setState({styles:"fixed"});
                //console.log(e.srcElement.scrollingElement.scrollHeight-e.srcElement.scrollingElement.scrollTop)
        }if(e.srcElement.scrollingElement.scrollHeight-e.srcElement.scrollingElement.scrollTop<1200){
            _this.setState({styles:''})
        }
      }
    
      handleResize(e){
        //console.log('浏览器窗口大小改变事件', e.target.innerWidth)
      }
    render(){
        let _this=this;
        return(
            <div className="cart-container">
                 <div className="top-nav">
                    <div className="top-nav-container">
                        <TopMessage/>
                    </div>
                </div>
                <div className="cart-top">
                    <div className="cart-top-container">
                        <div className="cart-top-left">
                            <img src={imgLogo}/>
                            <h2>我的购物车</h2>
                        </div>
                        <div className="cart-top-right">
                        <Steps current={0} size="small">
                            <Step title="进行中" description="我的购物车" />
                            <Step title="等待中" description="填写核对订单" />
                            <Step title="。。。" description="成功提交订单" />
                        </Steps>
                        </div>
                    </div>
                </div>
                <div className="cart-product-column">
                        <div className="cart-product-left">
                            <Checkbox onChange={this.onChange.bind(this)} checked={this.state.checkall}>全选</Checkbox>
                            <em>商品</em>
                        </div>
                        <div className="cart-product-right">
                            <span>单价</span>
                            <span>数量</span>
                            <span>小计</span>
                            <span>操作</span>
                        </div>
                </div>
                <div className="cart-product-list">
                <Empty description="您的购物车是空的，请赶紧选购吧" style={{display:this.state.empty,marginTop:185}}/>
                    <ul>
                        {
                            _this.state.arrProduct.map((item,index)=>{
                                return (<li key={index}>
                                            <div>
                                                <Checkbox onChange={this.onChange2.bind(this,index)} checked={item.selected}></Checkbox>
                                                <img src={item.image}/>
                                                <p>{item.desc}</p>
                                            </div>
                                            <div>
                                                <em>￥{item.price}</em>
                                                <InputNumber min={1} defaultValue={item.amount} onChange={this.onChange1.bind(this,item.id)} style={{mrginLeft:40}}/>
                                                <em>{item.price*item.amount}</em>
                                                <Popconfirm
                                                    title="您确认要删除该商品吗？"
                                                    onConfirm={this.confirm.bind(this,index,item.id)}
                                                    onCancel={this.cancel.bind(this)}
                                                    okText="是"
                                                    cancelText="否"
                                                >
                                                删除
                                                </Popconfirm>
                                            </div>
                                </li>)
                            })
                        }
                    </ul>
                </div>
                <div className="cart-all-container"  style={{position:_this.state.styles,left:0,bottom:0}}>
                    <div className="cart-all-count">
                        <div className="cart-all-left">
                            <Checkbox onChange={this.onChange.bind(this)} checked={this.state.checkall}>全选</Checkbox>
                            <span onClick={this.onClick.bind(this)}>
                                删除
                            </span>
                        </div>
                    
                        <div className="cart-all-right">
                            <div className="cart-top-bottom">
                                <div className="cart-all-top">
                                    总计：<span>￥{this.state.zongOne}</span>
                                    <Tooltip placement="top" title="不含运费">
                                        <Icon type="question-circle" />
                                    </Tooltip>
                                </div>
                                <div className="cart-all-bottom">
                                    已选择<span>{this.state.allNumber}</span>件商品,优惠：￥<span>{this.state.allCount}</span>
                                </div>
                            </div>
                            <div className="cart-all-button" onClick={this.countAll.bind(this)}>立即结算</div>
                        </div>
                    </div> 
                </div>
               <div className="cart-bottom">{this.state.info}</div>
               <Fixed number={this.state.allMounts}/>
               <CompanyMessage/>
            </div>
        )
    }
}
export default Cart;