import React,{Component} from 'react' 
import {MyLayout}     from '../components/layout.jsx';
import ReactDOM     from 'react-dom';
import {Card,Tabs,Table,message} from 'antd';
import Swiper from "swiper/dist/js/swiper.js"
import 'swiper/dist/css/swiper.min.css'
import { callbackify } from 'util';
const { TabPane } = Tabs;
class Recent extends Component{
    constructor(props) {
        super(props); 
        this.state = {
          tab:1,
          records:1
        };
        this.get_msg = this.get_msg.bind(this); 
        this.get_product=this.get_product.bind(this)
      }
    componentWillMount(){
        this.get_msg() 
        // this.get_product()
    }  
    componentDidMount(){
      // simulate img loading

        new Swiper('.swiper-container', {
          loop:true,
        //   runCallbacksOnInit : false,//初始化时不触发slideChange
        //   autoplay:true,
        //   speed:1000,
        //   setWrapperSize :true,
          slidesPerView:2,
        //   spaceBetween:15,
        //   touchAngle : 50,
          // effect:'coverflow',          //滑动效果
        //   pagination: {
        //     el: '.swiper-pagination',
        //     clickable: true,
        //   },
        //   navigation: {
        //     nextEl: '.swiper-button-next',
        //     prevEl: '.swiper-button-prev',
        //   },

        slidesPerGroup : 1,
        //加上这三句话即可
        paginationClickable: true,
        observer:true,//修改swiper自己或子元素时，自动初始化swiper
        observeParents:true,//修改swiper的父元素时，自动初始化swiper
        autoplay: {
            disableOnInteraction: false,
            delay: 2500,
        },
        preventLinksPropagation: false
		//   autoplay: {
		// 	delay: 5000,  
		// 	disableOnInteraction: false,
		//   },
		//   speed: 700,
		//   allowTouchMove: false,
		//   lazy: {
		// 	loadPrevNext: true,
		// 	loadPrevNextAmount: 3,
		//   },
		//   centeredSlides: true,
		//   spaceBetween : 50,
		//   slidesOffsetBefore: 40,
		//   loop: true,
		//   slidesPerView : 'auto',
		//   on: {
		// 	slideChangeTransitionEnd: function(){
		// 	  this.slides.transition(this.params.autoplay.delay+this.params.speed).transform('translate3d(-60px, 0, 0)');
		// 	},
		// 	slideChangeTransitionStart: function(){
		// 	  this.slides.transition(this.params.speed).transform('translate3d(0, 0, 0)');
		// 	},
		//   },

        })
   

    }
    get_product(){//获取产品详细信息,触发浏览历史
        // 400很有可能参数错误   915 62 384
        console.log(11)
        let url="/api/mall/product/915"
        let self=this
        var callback=function(err,res){
            if(err){
                message.error("订单获取失败")
            }else{
                // console.log(res)
                console.log(res.data)
                // self.setState({records:res.data})
            }
        }
        var xhr=new XMLHttpRequest()
        xhr.open('GET',url)
        xhr.send(null)
        xhr.onreadystatechange=function(){
            if(xhr.readyState === XMLHttpRequest.DONE) {
                if(xhr.status === 200) {
                    callback(null,JSON.parse(xhr.responseText)) 
                } else {
                    callback(xhr.responseText,null);
                }
            }
        }
    } 
    get_msg(){
        console.log(11)
        let url="/api/mall/product_browsing_history"
        let self=this
        var callback=function(err,res){
            if(err){
                message.error("订单获取失败")
            }else{
                // console.log(res)
                console.log(res.data)
                self.setState({records:res.data},()=>console.log(self.state.records))
            }
        }
        var xhr=new XMLHttpRequest()
        xhr.open('GET',url)
        xhr.send(null)
        xhr.onreadystatechange=function(){
            if(xhr.readyState === XMLHttpRequest.DONE) {
                if(xhr.status === 200) {
                    callback(null,JSON.parse(xhr.responseText)) 
                } else {
                    callback(xhr.responseText,null);
                }
            }
        }
    } 
    render(){
        let self=this
        let records=self.state.records
        let content=null
        if(records===1){
            content=<div>暂时没有最近浏览</div>
        }else{
            content=records.map((item,index)=>(
                <div key={index} className="swiper-slide">
                  <img style={{width:100,height:100}}  src={item.image} alt=""/>
                </div>
            ))
        }
        return (
            <MyLayout>
                <Card className="myorder order_card" title="最近浏览"  style={{ width: '90%' }}>
                    <div className="swiper-container">
                    <div className="swiper-wrapper">
                        {content}
                    </div>
                    </div>
                </Card>
            </MyLayout>
        )
    }
}
export default Recent
export {Recent}