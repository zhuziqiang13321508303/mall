import React,{Component} from 'react' 
import {MyLayout}     from '../components/layout.jsx';
import ReactDOM     from 'react-dom';
import {Card,Tabs,Table,Form,Select,Input,Button,DatePicker} from 'antd';
import { visible } from 'ansi-colors';
import huawei from '../assets/images/huawei.jpg'
const {FormItem} = Form.Item;
const {Option}=Select;
const { TabPane } = Tabs;
class Reset extends Component{
    constructor(props) {
        super(props); 
        this.state = {
          tab:1,
        };
        this.handleChange=this.handleChange.bind(this)
      } 
      handleChange(tab){
          this.setState({tab})
      }
    render(){
        let content=null;
        if(this.state.tab===1){
            content = <WrappedResetForm handleChange={this.handleChange}/>;
        }else if(this.state.tab===2){
            content = <WrappedVerificationForm handleChange={this.handleChange}/>;
        }else if(this.state.tab===3){
            content = <WrappedNewpassForm handleChange={this.handleChange}/>;
        }
        return (
            <div style={{backgroundColor:"#f1f1f1"}}>
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
            <div className="reset_container">
                {content}
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


class ResetForm extends Component{
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
        this.props.handleChange(2)
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
    render(){
        const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form;
        return (
            <div>
            <div className="reset_head">
            <h3 style={{margin:0}}><span>找回密码</span></h3>
            </div>
            <div className="reset_body">  
                <p>输入合宙账号</p>
                <p>输入注册华为账号的手机号或邮件地址</p>
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
                      })(<Input style={{display:"block",width:'90%',outline:0,backgroundColor:'#f7f7f7',margin:"0 auto"}} placeholder='请输入手机号码/邮件地址'/>)}
                    </Form.Item> 
                </div>
                <Button type='primary' className="login login_button" htmlType='submit' loading={this.state.loading_relay}>下一步</Button>
                </Form>
                <p>输入手机号时，请填写正确的区域前缀，如：</p>
                <p>1. 不加前缀：135********</p>
                <p>2. 加前缀+86：+86135********</p>
                <p>3. 加前缀0086：0086135******</p>
            </div>
            </div>
        )
    }
}
const WrappedResetForm = Form.create()(ResetForm);


class VerificationForm extends Component{
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
        this.props.handleChange(3)
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
    render(){
        const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form;
        return (
            <div>
            <div className="reset_head">
            <h3 style={{margin:0}}><span>找回密码2</span></h3>
            </div>
            <div className="reset_body">  
                <p>手机号找回密码</p>
                <p>若您的手机号现在能接收短信，请点击获取验证码</p>
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
                      })(<Input style={{display:"block",width:'90%',outline:0,backgroundColor:'#f7f7f7',margin:"0 auto"}} placeholder='请输入手机号码/邮件地址'/>)}
                    </Form.Item> 
                </div>
                <Button type='primary' className="login login_button" htmlType='submit' loading={this.state.loading_relay}>下一步</Button>
                </Form>
            </div>
            </div>
        )
    }
}
const WrappedVerificationForm = Form.create()(VerificationForm);

class NewpassForm extends Component{
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
        this.props.handleChange(3)
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
    render(){
        const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form;
        return (
            <div>
            <div className="reset_head">
            <h3 style={{margin:0}}><span>找回密码3</span></h3>
            </div>
            <div className="reset_body">  
                <p>设置新密码</p>
                <p>如果您有其他设备使用此帐号，设置新密码后需重新登录，以确保正常使用合宙服务。</p>     
                <Form onSubmit={(e)=>this.handleSubmit(e)}>
                <div>
                <div >密码</div>
                <Form.Item >
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
                  })(<Input type="password"  placeholder="请输入密码" />)}
                </Form.Item> 

                <div >确认密码</div>
                <Form.Item >
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
                  })(<Input type="password"  placeholder="请再次输入密码" />)}
                </Form.Item> 
                </div>
                <Button type='primary' className="login login_button" htmlType='submit' loading={this.state.loading_relay}>下一步</Button>
                </Form>
            </div>
            </div>
        )
    }
}
const WrappedNewpassForm = Form.create()(NewpassForm);
export default Reset
export {Reset}