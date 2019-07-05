import React,{ Component} from "react";
import '../css/cart.css';
import { Steps,Checkbox,InputNumber,Popconfirm,message,Tooltip,Button,Icon} from 'antd';

const { Step } = Steps;
class Child extends Component{
    constructor(props){
        super(props)
        this.state={
            arr1: [
                {img:'#',desc:"手机发动机和v法国帮扶开发v国家颁发给非公开部门分工v地方v放大来看副代表美国反恐",price:1299,number:1,selected:false},
                {img:'#',desc:"手机发动机和v法国帮扶开发v国家颁发给非公开部门分工v地方v放大来看副代表美国反恐",price:1299,number:1,selected:false},
                {img:'#',desc:"手机发动机和v法国帮扶开发v国家颁发给非公开部门分工v地方v放大来看副代表美国反恐",price:1299,number:1,selected:false},
                {img:'#',desc:"手机发动机和v法国帮扶开发v国家颁发给非公开部门分工v地方v放大来看副代表美国反恐",price:1299,number:1,selected:false},
            ],
            step:0,
            allNumber:0,
            allCount:0.00,
            allMoney:0.00,
            styles:'',
            checkall:false,
            flag:false,
        }
    }
    // 全选按钮
    onChange(e) {
        console.log(`checked = ${e.target.checked}`);
        if(this.state.checkall){
			this.setState({checkall:false})
		}else{
			this.setState({checkall:true})
		}
		var _this=this;
		this.state.arr1.map((item,i)=>{
			item.selected=!_this.state.checkall
		})
      }
      //单选按钮
      onChange2(i){
        var list1=this.state.arr1;
		list1[i].selected=!list1[i].selected
		this.setState({arr1:list1},function(){
			var sel=this.state.arr1.filter(function(item){
				return item.selected==true
			})
			sel.length==this.state.arr1.length?this.setState({checkall:true}):this.setState({checkall:false})
			
		})
      }
      //商品数量变化输入框
      onChange1(i,value) {
        console.log('changed',i, value);
       
      }
      //删除商品按钮
      confirm(index,e){
        console.log(e);
        message.success('删除成功');
        var arr2=this.state.arr1;
        arr2.splice(index,1);
        this.setState({arr1:arr2})
  }
      cancel(e) {
        console.log(e);
        message.error('你点击了取消按钮');
      }
      //批量删除按钮
      onClick(){
             var arr2=this.state.arr1.filter((item)=>{
            return item.selected===true
        });
        if(arr2.length<=0){
            alert("请选择要删除的商品")
        }else{
            var arr3=this.state.arr1.filter((item)=>{
                return item.selected===false
            });
            this.setState({arr1:arr3})
            console.log(arr3,arr2);
            alert("删除成功")
            this.state.checkall=false;
        }
      }
      //总金额计算
      zong(){
        var zong=0;
        this.state.arr1.map((item,i)=>{
            if(item.selected==true){
                zong+=item.price*item.number
            }
        })
        
        return zong;
        }
      //结算按钮
      countAll(){
          console.log("你点击了结算按钮");
      }
      //浏览器滚动条事件
      componentDidMount() {
        window.addEventListener('scroll', this.handleScroll.bind(this)) //监听滚动
        window.addEventListener('resize', this.handleResize.bind(this)) //监听窗口大小改变
      }
    
      componentWillUnmount() { 
          //最后移除监听器，以防多个组件之间导致this的指向紊乱
        window.removeEventListener('scroll', this.handleScroll.bind(this)) 
        window.removeEventListener('resize', this.handleResize.bind(this))
      }
    
      handleScroll(e){
          let _this=this;
        if(e.srcElement.scrollingElement.scrollHeight-e.srcElement.scrollingElement.scrollTop>730){
                _this.setState({styles:"fixed"});
                //console.log(e.srcElement.scrollingElement.scrollHeight-e.srcElement.scrollingElement.scrollTop)
        }if(e.srcElement.scrollingElement.scrollHeight-e.srcElement.scrollingElement.scrollTop<700){
            _this.setState({styles:''})
        }
        //e.srcElement.scrollingElement.scrollTop为距离滚动条顶部高度
        // e.srcElement.scrollingElement.scrollHeight为整个文档高度
      }
    
      handleResize(e){
        console.log('浏览器窗口大小改变事件', e.target.innerWidth)
      }
    render(){
        let _this=this;
        return(
            <div className="cart-container">
                <div className="cart-top">
                    <div className="cart-top-container">
                        <div className="cart-top-left">
                            <img src="#"/>
                            <h2>我的购物车</h2>
                        </div>
                        <div className="cart-top-right">
                            <Steps current={this.state.step} size="small" progressDot>
                                <Step title="我的购物车" className="cart-top-step"/>
                                <Step title="填写核对订单" className="cart-top-step"/>
                                <Step title="成功提交订单" className="cart-top-step"/>
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
                    <ul>
                        {
                            _this.state.arr1.map((item,index)=>{
                                return (<li key={index}>
                                            <div>
                                                <Checkbox onChange={this.onChange2.bind(this,index)} checked={item.selected}></Checkbox>
                                                <img src={item.img}/>
                                                <p>{item.desc}</p>
                                            </div>
                                            <div>
                                                <em>￥{item.price}</em>
                                                <InputNumber min={1} value={1} onChange={this.onChange1.bind(this,index)} style={{mrginLeft:40}}/>
                                                <em>{item.price*item.number}</em>
                                                <Popconfirm
                                                    title="您确认要删除该商品吗？"
                                                    onConfirm={this.confirm.bind(this,index)}
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
                            <span
                                            //title="您确认要删除该商品吗？"
                                            // onConfirm={this.confirm2.bind(this)}
                                            // onCancel={this.cancel2.bind(this)}
                                            // okText="是"
                                            // cancelText="否"
                                            onClick={this.onClick.bind(this)}
                                        >
                                        删除
                            </span>
                        </div>
                    
                        <div className="cart-all-right">
                            <div className="cart-top-bottom">
                                <div className="cart-all-top">
                                    总计：<span>￥{this.zong.bind(this)()}</span>
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
               <div className="cart-bottom"></div>
            </div>
        )
    }
}
export default Child;