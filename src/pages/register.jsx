import React,{Component} from 'react' 
import {MyLayout}     from '../components/layout.jsx';
import ReactDOM     from 'react-dom';
import {Card,Tabs,Table,Form,Select,Input,Button,DatePicker,message} from 'antd';
import { visible } from 'ansi-colors';
import huawei from '../assets/images/huawei.jpg'
const {FormItem} = Form.Item;
const {Option}=Select;
const { TabPane } = Tabs;
class Register extends Component{
    constructor(props) {
        super(props); 
        this.state = {
          tab:1,
          index:1,
          
        };
        this.handleChange = this.handleChange.bind(this)
        this.topSelectChange=this.topSelectChange.bind(this)
       
        
      } 
    handleChange(e) {
        this.setState({tab:e-0});
    }
    topSelectChange(e,index){
        e.preventDefault()    
        this.setState({index})
        if(index===1){
            this.refs.phoneSelect.className="phone_wrap red"
            this.refs.emailSelect.className="mail_wrap green"
        }else if(index===2){
            this.refs.emailSelect.className="mail_wrap red"
            this.refs.phoneSelect.className="phone_wrap green"
        }
    }
    render(){
        let dataSource=[]
        let columns=[
            {title:'类型',dataIndex:'type',key:"type"},
            {title:'标题',dataIndex:'title',key:"title"},
            {title:'时间',dataIndex:'time',key:"time"},
            {title:'操作',dataIndex:'operation',key:"operation"},
        ]
        let content = null;
        if (this.state.index === 1) {
            content = <WrappedRegisterPhoneForm />
        } else if (this.state.index === 2) {
            content = <WrappedRegisterEmailForm />
        }
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
            <div className="wp1">
                <div className="register_content" id="registerForm">
                    <div className="reg_tab clearfix" style={{visibility:'visible'}}>
                        <a className="phone_wrap red" href="#" ref="phoneSelect" onClick={(e)=>this.topSelectChange(e,1)}>
                            <i className="phone_icon"></i>
                            <span id="tabphone" className="tab_phone" style={{width:'66px'}}>手机号</span>
                        </a>
                        <a className="mail_wrap green" href="#" ref="emailSelect" onClick={(e)=>this.topSelectChange(e,2)}>
                            <i className="mail_icon"></i>
                            <span id="tabmail" className="tab_mail" style={{width:'66px'}}>电子邮箱</span>
                        </a>
                    </div>
                    <div className="login">
                        已有合宙账号
                        <a href="/#/login" className="login_a" title="登录">登录</a>
                    </div>
                    {content}
                </div>
            </div>
            </div>
        )
    }
}



class RegisterPhoneForm extends Component{
    constructor(props) {
        super(props); 
        this.state = {
          loading_relay:false,
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        
      } 
    componentDidMount() {

    }
     //获取短信验证码按钮
     getCode(){
      let self =this;
      let phone=this.state.phone;
      var url= "/api/site/verification_code?phone="+phone;
      var xhr = new XMLHttpRequest();
      xhr.open("GET", url, true);
      xhr.send();
      xhr.onreadystatechange = function(){
        if (xhr.readyState === XMLHttpRequest.DONE) {
          if (xhr.status === 200) {
              let body=xhr.responseText;
              console.log(body);
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

      console.log("cccc========");

    }
    //注册按钮
    handleSubmit(e){
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
          if (!err) {
          console.log('Received values of form: ', values);
          let self =this;
          var url= "/api/site/registeruser";
          var xhr = new XMLHttpRequest();
          var data2 = new FormData();
          data2.append('name',values.area);
          data2.append('phone',values.telephone);
          data2.append('password',values.password);
          data2.append('verification_code',values.virification);
          xhr.open("POST", url,true);
          xhr.send(data2);
          xhr.onreadystatechange = function(){
            if (xhr.readyState === XMLHttpRequest.DONE) {
              if (xhr.status === 200) {
                  let body=JSON.parse(xhr.responseText);
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
                this.setState({phone:value})
                console.log("ddd=========",this.state.phone);
                callback();
            } 
        }
    }
    handleSelectChange(){

    }
    render(){
        let _this=this;
        const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form;
        return (
            <Form onSubmit={(e)=>this.handleSubmit(e)} className="reg_detail">
            <div className="input_container">
                <div className="input_left">国家/地区</div>
                <Form.Item className="input_content ">
                  {getFieldDecorator('area', {
                    initialValue: 'cn',
                    validateTrigger:'onBlur',
                    rules: [
                      {
                        required: true,
                        message: '请选择国家/地区',
                      }
                    ]
                  })(<Select
                    className="register area_select"
                    onChange={this.handleSelectChange}
                  >
                    <Option value="cn">中国</Option>
                    <Option value="aomen">中国澳门特别行政区</Option>
                  </Select>)}         
                </Form.Item> 
            </div>

            <div className="input_container" >
                <Form.Item className="input_left">
                  {getFieldDecorator('telephone_area', {
                    initialValue:"cn",
                    validateTrigger:'onBlur',
                    rules: [
                      {
                        required: true,
                        message: '',
                      }
                    ]
                  })(<Select
                    onChange={this.handleSelectChange}
                  >

                    <Option value="cn">+86中国</Option>
                    <Option value="aomen">+61澳大利亚</Option>
                  </Select>)}
                </Form.Item> 
                
                <Form.Item className="input_content">
                  {getFieldDecorator('telephone', {
                    validateTrigger:'onBlur',
                    rules: [{
                        required: true, message: '手机号码不能为空',
                    },{
                        validator:_this.validator_phonenumber.bind(this)
                    }]
                  })(<Input className="input_area" placeholder='请输入11位手机号码'/>)}
                </Form.Item> 
            </div>

            <div className="input_container">
                <div className="input_left">短信验证码</div>
                <Form.Item className="input_content">
                  {getFieldDecorator('virification', {
                    validateTrigger:'onBlur',
                    rules: [
                      {
                        required: true,
                        message: '请输入验证码',
                      }
                    ]
                  })(<Input  className="password input_area" placeholder="请输入验证码" />)}
                  <button onClick={_this.getCode.bind(this)}>获取验证码</button>
                </Form.Item> 
            </div>

            <div className="input_container">
                <div className="input_left">密码</div>
                <Form.Item className="input_content">
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
                  })(<Input type="password" className="password input_area" placeholder="请输入密码" />)}
                </Form.Item> 
            </div>

            <div className="input_container" >
                <div className="input_left">确认密码</div>
                <Form.Item className="input_content">
                  {getFieldDecorator('password_confirm', {
                    validateTrigger:'onBlur',
                    rules: [
                      {
                        required: true,
                        message: '请再次输入密码',
                      },{
                        min:6,message:"密码长度需大于6位"
                    },{
                        max:15,message:"密码长度需小于15位"
                    }
                    ]
                  })(<Input type="password" className="input_area" placeholder="请再次输入密码" />)}
                </Form.Item> 
            </div>

            <div className="input_container" >
                <div className="input_left">出生日期</div>
                <Form.Item className="input_content">
                  {getFieldDecorator('birth_date', {
                    rules: [{ type: 'object', required: true, message: '请选择出生日期' }]
                  })( <DatePicker/>)}
                </Form.Item> 
            </div>
            <Button type='primary' className="register_button" htmlType='submit' loading={this.state.loading_relay} >注册</Button>
        </Form>
            )
    }
}
const WrappedRegisterPhoneForm = Form.create({ name: 'address_form' })(RegisterPhoneForm);


class RegisterEmailForm extends Component{
    constructor(props) {
        super(props); 
        this.state = {
          loading_relay:false
        };
        this.handleSubmit = this.handleSubmit.bind(this); 
      } 
    componentDidMount() {

    }
    handleSubmit(e){
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
          if (!err) {
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
            <Form onSubmit={(e)=>this.handleSubmit(e)} className="reg_detail">
            <div className="input_container">
                <div className="input_left">国家/地区</div>
                <Form.Item className="input_content ">
                  {getFieldDecorator('area', {
                    initialValue: 'cn',
                    validateTrigger:'onBlur',
                    rules: [
                      {
                        required: true,
                        message: '请选择国家/地区',
                      }
                    ]
                  })(<Select
                    className="register area_select"
                    onChange={this.handleSelectChange}
                  >
                    <Option value="cn">中国</Option>
                    <Option value="aomen">中国澳门特别行政区</Option>
                  </Select>)}         
                </Form.Item> 
            </div>

            <div className="input_container">
                <div className="input_left">邮件地址</div>
                <Form.Item className="input_content">
                  {getFieldDecorator('email_address', {
                    validateTrigger:'onBlur',
                    rules: [
                      {
                        required: true,
                        message: '请输入邮件地址',
                      }
                    ]
                  })(<Input  className="password input_area" placeholder="请输入邮件地址" />)}
                </Form.Item> 
            </div>

            <div className="input_container">
                <div className="input_left">邮件验证码</div>
                <Form.Item className="input_content">
                  {getFieldDecorator('email_virification', {
                    validateTrigger:'onBlur',
                    rules: [
                      {
                        required: true,
                        message: '请输入邮件验证码',
                      }
                    ]
                  })(<Input  className="password input_area" placeholder="请输入邮件验证码" />)}
                </Form.Item> 
            </div>

            <div className="input_container">
                <div className="input_left">密码</div>
                <Form.Item className="input_content">
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
                  })(<Input type="password" className="password input_area" placeholder="请输入密码" />)}
                </Form.Item> 
            </div>

            <div className="input_container" >
                <div className="input_left">确认密码</div>
                <Form.Item className="input_content">
                  {getFieldDecorator('password_confirm', {
                    validateTrigger:'onBlur',
                    rules: [
                      {
                        required: true,
                        message: '请再次输入密码',
                      },{
                        min:6,message:"密码长度需大于6位"
                    },{
                        max:15,message:"密码长度需小于15位"
                    }
                    ]
                  })(<Input type="password" className="input_area" placeholder="请再次输入密码" />)}
                </Form.Item> 
            </div>

            <div className="input_container" >
                <Form.Item className="input_left">
                  {getFieldDecorator('telephone_area', {
                    initialValue:"cn",
                    validateTrigger:'onBlur',
                    rules: [
                      {
                        required: true,
                        message: '',
                      }
                    ]
                  })(<Select
                    onChange={this.handleSelectChange}
                  >
                    <Option value="cn">+86中国</Option>
                    <Option value="aomen">+61澳大利亚</Option>
                  </Select>)}
                </Form.Item> 
                
                <Form.Item className="input_content">
                  {getFieldDecorator('telephone', {
                    validateTrigger:'onBlur',
                    rules: [{
                        required: true, message: '手机号码不能为空',
                    },{
                        validator:this.validator_phonenumber
                    }]
                  })(<Input className="input_area" placeholder='请输入11位手机号码'/>)}
                </Form.Item> 
            </div>

            <div className="input_container">
                <div className="input_left">短信验证码</div>
                <Form.Item className="input_content">
                  {getFieldDecorator('virification', {
                    validateTrigger:'onBlur',
                    rules: [
                      {
                        required: true,
                        message: '请输入验证码',
                      }
                    ]
                  })(<Input  className="password input_area" placeholder="请输入验证码" />)}
                </Form.Item> 
            </div>

            <div className="input_container" >
                <div className="input_left">出生日期</div>
                <Form.Item className="input_content">
                  {getFieldDecorator('birth_date', {
                    rules: [{ type: 'object', required: true, message: '请选择出生日期' }]
                  })( <DatePicker/>)}
                </Form.Item> 
            </div>
            <Button type='primary' className="register_button" htmlType='submit' loading={this.state.loading_relay}>注册</Button>
        </Form>
            )
    }
}
const WrappedRegisterEmailForm = Form.create({ name: 'address_form' })(RegisterEmailForm);
export default Register
export {Register}