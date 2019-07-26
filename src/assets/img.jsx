import React, { Component } from "react";
import $ from "jquery";
class Img extends Component {
  constructor(props) {
    super(props);
    this.state = {
      /**
       * 图片放大镜参数列表
       * 组件宽高必须大于鼠标悬停小方块 ！！！
       */
      dataImg:[],
      numbers:0,
      nextNumber:0,
      updateNumber:0,
      params: {
        // 放大倍数
        scale: 4,
        // 组件宽
        width: "400",
        // 组件高
        height: "400"
      },
      // 缩略图
      minImg:'',
      // 大图
      maxImg:'',

      // 开关
      magnifierOff: false,
      // 图片加载情况
      imgLoad: false,
      /**
       * 样式
       */
      cssStyle: {
        // 图片容器样式
        imgContainer: {
          width: "400px",
          height: "400px",
          border: "1px solid #ccc",
          cursor: "move",
          position: "relative"
        },
        imgContainerBelow:{
            width:"400px",
            height:"90px",
            display:"flex",
            justifyContent:"space-around",
            alignItems:"center",
        },
        // 鼠标悬停小方块样式
        mouseBlock: {
          position: "absolute",
          top: "0",
          left: "0",
          width: "200px",
          height: "200px",
          background: "rgba(0,0,0,0.1)",
          zIndex: 99
        },
        // 鼠标悬停遮罩层样式
        maskBlock: {
          position: "absolute",
          top: "0",
          left: "0",
          width: "100%",
          height: "100%",
          background: "rgba(0,0,0,0)",
          zIndex: 100
        },

        //  放大镜容器样式
        magnifierContainer: {
          position: "absolute",
          left: "410px",
          top: "10px",
          width: "400px",
          height: "400px",
          border: "1px solid red",
          overflow: "hidden",
          zIndex: 198
        },
        // 图片样式
        imgStyle: {
          width: "100%",
          height: "100%"
        },
        // 图片放大样式
        // 此处图片宽高不能设置为百分比，在scale的作用下，放大的只是图片初始的宽高 ！！！
        imgStyle2: {
          width: "400px",
          height: "400px",
          position: "absolute",
          top: 0,
          left: 0,
          transform: "scale(4)",
          transformOrigin: "top left"
        }
      }
    };
  }

  /**
   * 生命周期函数
   */
  // 组件初始化
  componentDidMount() {
    this.updataImg(this.props);
    this.setState({minImg:"",maxImg:""})
  }
  
  // props 变化时更新
  componentWillReceiveProps(nextProps) {
    let _this=this;
    // let numberUpdate=this.state.updateNumber+1;
    // this.setState({updateNumber:numberUpdate},()=>{
    //   if(_this.state.updateNumber===1){
    //       _this.updataImg(nextProps);
    //   }
    // })
    this.updataImg(nextProps);
    if(nextProps.transids){
      var url= "/api/mall/product/"+nextProps.transids;
      var xhr = new XMLHttpRequest();
      xhr.open("GET", url,true);
      xhr.send();
      xhr.onreadystatechange = function(){
          if (xhr.readyState === XMLHttpRequest.DONE) {
          if (xhr.status === 200) {
              let body=JSON.parse(xhr.responseText).data.images;
              let bodySole={};
              bodySole.url=nextProps.minImg;
              let arr=[];
              arr.unshift(bodySole);
              let arrAll=arr.concat(body);
              let number=_this.state.numbers+1;
              _this.setState({dataImg:arrAll,numbers:number},()=>{
                    if(_this.state.numbers===1){
                      $("#img img").eq(0).css({"border":"1px solid red"});
                    }
              });  
              //console.log("eee=========",body,bodySole);
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
    //console.log("bbb===ccccc",nextProps,nextProps.transids);
  }

  /**
   * 方法
   */
  // 鼠标移入
  mouseEnter(){
    this.setState({
      magnifierOff: true
    });
  };
  // 鼠标移除
  mouseLeave(){
    this.setState({
      magnifierOff: false
    });
  };
  // 鼠标移动
  mouseMove(event){
    // console.log(event);
    let e = event.nativeEvent;
    this.calculationBlock(e.offsetX, e.offsetY);
  };

  // 计算相关参数
  calculationBlock(offsetX, offsetY) {
    let cssStyle = JSON.parse(JSON.stringify(this.state.cssStyle));
    /* 小方块位置 */
    // 防止鼠标移动过快导致计算失误，只要小于或者大于对应值，直接设置偏移量等于最小值或者最大值
    if (offsetX < 100) {
      offsetX = 100;
    }
    if (offsetX > 300) {
      offsetX = 300;
    }
    if (offsetY < 100) {
      offsetY = 100;
    }
    if (offsetY > 300) {
      offsetY = 300;
    }
    cssStyle.mouseBlock.left = parseFloat(offsetX - 100) + "px";
    cssStyle.mouseBlock.top = parseFloat(offsetY - 100) + "px";

    /* 计算图片放大位置 */
    cssStyle.imgStyle2.left = parseFloat(-(offsetX - 100) * 4) + "px";
    cssStyle.imgStyle2.top = parseFloat(-(offsetY - 100) * 4) + "px";

    this.setState({
      cssStyle: cssStyle
    });
  }
  // 更新图片
  updataImg(props) {
    this.setState({
      minImg: props.minImg,
      maxImg: props.maxImg
    });
  }


  // 图片加载情况
  handleImageLoaded(e) {
    // console.log(e);
    this.setState({ imgLoad: true });
  }

  // 图片加载中
  handleImageErrored() {
    this.setState({ imgLoad: false });
  }
  mouseEnters(index){
    this.setState({minImg:this.state.dataImg[index].url,maxImg:this.state.dataImg[index].url});
    $("#img img").eq(index).css({"border":"1px solid red"}).siblings().css({"border":"1px solid #333"});
  }
  render() {
    const { cssStyle, magnifierOff, minImg, maxImg, imgLoad } = this.state;
    return (
      <div>
            <div style={cssStyle.imgContainer} className="imgContainer">
                <img style={cssStyle.imgStyle} src={this.state.minImg} alt="" />
                <div
                    style={cssStyle.maskBlock}
                    onMouseEnter={this.mouseEnter.bind(this)}
                    onMouseLeave={this.mouseLeave.bind(this)}
                    onMouseMove={this.mouseMove.bind(this)}
                />
                {magnifierOff && <div style={cssStyle.mouseBlock} />}
            </div>
            <div style={cssStyle.imgContainerBelow} className="imgContainerBelow" id="img">
                {
                  this.state.dataImg.map((item,index)=>{
                    return(
                      <img src={item.url} key={index} style={{width:60,height:60,border:"1px solid #333",padding:5}} onMouseEnter={this.mouseEnters.bind(this,index)}/>
                    )
                  })
                }
            </div>
            {magnifierOff && (
                <div style={cssStyle.magnifierContainer}>
                    <img
                    style={cssStyle.imgStyle2}
                    src={this.state.maxImg}
                    onLoad={this.handleImageLoaded.bind(this)}
                    onError={this.handleImageErrored.bind(this)}
                    alt=""
                    />
                    {!imgLoad && "failed to load"}
                </div>
            )}
      </div>
    );
  }
}

export default Img;
