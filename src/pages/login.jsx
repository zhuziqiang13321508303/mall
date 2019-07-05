import React,{Component} from 'react' 
import {MyLayout}     from '../components/layout.jsx';
import ReactDOM     from 'react-dom';
import {Card,Tabs,Table,Form,Select,Input,Button,DatePicker,message} from 'antd';
import { visible } from 'ansi-colors';
import huawei from '../assets/images/huawei.jpg'
const {FormItem} = Form.Item;
const {Option}=Select;
const { TabPane } = Tabs;
class Login extends Component{
    constructor(props) {
        super(props); 
        this.state = {
          tab:1,
          index:1,
        };
        this.handleChange = this.handleChange.bind(this)
      } 
    handleChange(e) {
        this.setState({tab:e-0});
    }
    render(){
        let dataSource=[]
        let columns=[
            {title:'类型',dataIndex:'type',key:"type"},
            {title:'标题',dataIndex:'title',key:"title"},
            {title:'时间',dataIndex:'time',key:"time"},
            {title:'操作',dataIndex:'operation',key:"operation"},
        ]
        // let content = <WrappedLoginEmailForm/>;
        return (
            <div>
            <header className="register_header">
                <div className="head_center">
                    <div className="main_logo">
                      <img src={huawei}/> 
                    </div> 
                    <div className="website_name"> 
                        <b style={{fontSize: '18px',marginTop: '-5px',float: 'left',color:'#cccccc'}}>|</b>
                        <b style={{fontSize: '18px',marginTop: '-3px',float: 'left',marginLeft:'18px'}}>合宙商城</b> 
                    </div>
                </div>
            </header>
                <div className="login_notice">
                    <span className="login_prompt_icon">依据《网络安全法》，为保障您的帐号安全与正常使用，请尽快绑定您的手机号，感谢您的理解及支持！</span>
                </div>
                <div style={{backgroundColor:"#081638",height:590}}>
                    <div className="g">
                        <div className="login_area">
                            <div className="h">
                             <span>帐号登录</span>  
                            </div>   
                            <WrappedLoginEmailForm history={this.props.history}/>
                        </div>  
                    </div>
                </div>
                
                <div className="ft">
                        <div className="warrant-area">
                        	<p style={{textAlign: 'center',lineHeight: '12px',height:'12px',marginTop: '10px'}}>
                        	Copyright&nbsp;©&nbsp;2011-2019&nbsp;&nbsp;上海合宙有限公司&nbsp;&nbsp;版权所有&nbsp;&nbsp;保留一切权利&nbsp;&nbsp;苏B2-20070200号&nbsp;|&nbsp;苏ICP备09062682号-9
                        	</p>
                        </div>
                </div>
            </div>
        )
    }
}


class LoginEmailForm extends Component{
    constructor(props) {
        super(props); 
        this.state = {
          loading_relay:false
        };
        this.handleSubmit = this.handleSubmit.bind(this); 
      } 
    componentDidMount() {

    }
    //登录按钮
    handleSubmit(e){
        let _this=this;
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
          if (!err) {
            var url= "/api/site/login";
            var xhr = new XMLHttpRequest();
            var data2 = new FormData();
            data2.append('name',values.telephone);
            data2.append('password',values.password);
            xhr.open("POST", url,true);
            xhr.send(data2);
            xhr.onreadystatechange = function(){
              if (xhr.readyState === XMLHttpRequest.DONE) {
                if (xhr.status === 200) {
                    let body=JSON.parse(xhr.responseText);
                    _this.props.history.push("/home");
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
              console.log("aaaa====");
            console.log('Received values of form: ', values);
          }
        });
    };
    validator_phonenumber(rule,value,callback){ 
        if(!value){
            callback();
        }else {
            if(value.length!==11){
                callback('请输入11位手机号码');
            }else if(value%1!==0||value<0){
                callback('请输入正整数');
            }else{
                callback();
            } 
        }
    }
    handleSelectChange(){

    }
    render(){
        const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form;
        return (
            <Form onSubmit={(e)=>this.handleSubmit(e)}>
            <div>
                <Form.Item>
                  {getFieldDecorator('telephone', {
                    validateTrigger:'onBlur',
                    rules: [{
                        required: true, message: '手机号码不能为空',
                    },{
                        validator:this.validator_phonenumber
                    }]
                  })(<Input style={{display:"block",width:'90%',outline:0,backgroundColor:'#f7f7f7',margin:"0 auto"}} placeholder='请输入手机号码/姓名'/>)}
                </Form.Item> 
            </div>

            <div>
                <Form.Item>
                  {getFieldDecorator('password', {
                    validateTrigger:'onBlur',
                    rules: [
                      {
                        required: true,
                        message: '请输入密码',
                      },{
                        min:6,message:"密码长度需大于6位"
                    },{
                        max:15,message:"密码长度需小于15位"
                    }
                    ]
                  })(<Input style={{display:"block",width:'90%',outline:0,backgroundColor:'#f7f7f7',margin:"0 auto"}}  type="password"  placeholder="请输入密码" />)}
                </Form.Item> 
            </div>
            <Button type='primary' className="login login_button" htmlType='submit' loading={this.state.loading_relay}>登录</Button>
        </Form>
            )
    }
}
const WrappedLoginEmailForm = Form.create({ name: 'login_form' })(LoginEmailForm);
export default Login
export {Login}