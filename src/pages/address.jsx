import React,{Component} from 'react' 
import {MyLayout}     from '../components/layout.jsx';
import ReactDOM     from 'react-dom';
import PropTypes from 'prop-types';
import {Card,Tabs,Table,Form,Select,Input,Button} from 'antd';
const { TabPane } = Tabs;
const FormItem = Form.Item;
const Option = Select.Option;
class Address extends Component{
    constructor(props) {
        super(props); 
        this.state = {
          tab:1
        };
        this.handleChange = this.handleChange.bind(this); 
      } 
    componentDidMount(){
        //class格式render与componentDidMount内的this指向Address，但是函数的this不指向Address，必须bind一下才能正确指向
    }
    componentWillUnmount(){
  
    }
    handleChange(e){
        this.setState({tab:e-0});
    }
    render(){
        let dataSource=[]
        let columns=[
            {title:'收货人',dataIndex:'consignee',key:"consignee"},
            {title:'收货地址',dataIndex:'address',key:"address"},
            {title:'邮编',dataIndex:'zip_code',key:"zip_code"},
            {title:'手机/电话',dataIndex:'phonenumber',key:"phonenumber"},
            {title:'操作',dataIndex:'operation',key:"operation"},
        ]  
        return (
            <MyLayout>
                <Card className="myorder order_card" title="收货地址管理" style={{ width: '90%' }}>
                    {<WrappedAddressForm/>}
                    <Table className="order_table" dataSource={dataSource} columns={columns} />
                </Card>
            </MyLayout>
        )
    }
    }
Address.propTypes = {
    form:PropTypes.any
};
Address.defaultProps = {
    name: 'Stranger'
};


class AddressForm extends Component{
    constructor(props) {
        super(props); 
        this.state = {
          
        };
        this.handleSubmit = this.handleSubmit.bind(this); 
      } 
    componentDidMount() {
        // console.log(this,2)//AddressForm 
        // To disabled submit button at the beginning.
        // this.props.form.validateFields();
    }
    handleSubmit(e){
        // console.log(this,1)
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
    render(){
        // console.log(this,1)//AddressForm 
        const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form;
        // Only show error after a field is touched.
        // const consigneeError = isFieldTouched('consignee') && getFieldError('consignee');
        // const phonenumberError = isFieldTouched('phonenumber') && getFieldError('phonenumber');
        // const addressError = isFieldTouched('address') && getFieldError('address');
        // const zip_codeError = isFieldTouched('zip_code') && getFieldError('zip_code');
        return (
        <Form onSubmit={(e)=>this.handleSubmit(e)} ref="form1">
                <span style={{display:"inline-block",fontSize:16,width:'150px',height:"32px"}}>收货人:</span>
                <FormItem   style={{display:"inline-block",width:'50%'}}>
                    {getFieldDecorator('consignee', {
                        validateTrigger:'onBlur',
                        // initialValue:50,
                        rules: [{
                            required: true, message: '请填写收货人',
                        },{
                            min:2,message:"收货人长度为2-20个字符"
                        },{
                            max:20,message:"收货人长度为2-20个字符"
                        },{
                            validator:this.validator_consignee
                        }]
                    })(
                        <Input style={{width:'100%',marginLeft:0}}  placeholder='' addonBefore='' addonAfter='' />
                    )}
                </FormItem>
                <div></div>
                <span style={{display:"inline-block",fontSize:16,width:'150px',height:"32px"}}>手机号码:</span>
                <FormItem style={{display:"inline-block",width:'50%'}}>
                    {getFieldDecorator('phonenumber', {
                            validateTrigger:'onBlur',
                            rules: [{
                                required: true, message: '手机号码不能为空',
                            },{
                                validator:this.validator_phonenumber
                            }]
                        })(
                        <Input style={{width:'100%',marginLeft:0}} placeholder='请输入11位手机号码' addonBefore='' addonAfter='' />
                    )}
                </FormItem>
                <div></div>
                <span style={{display:"inline-block",fontSize:16,width:'150px',height:"32px"}}>收货地址:</span>
                <FormItem  style={{display:"inline-block",width:'50%'}}>
                    {getFieldDecorator('address', {
                            rules: [{
                                required: true, message: '请输入收货地址(省市区街道)',
                            },{
                                // validator:self.validatorNum1
                            }]
                        })(
                            <Input style={{width:'100%',marginLeft:0}}  placeholder='请输入省市区街道' addonBefore='' addonAfter='' />
                    )}
                </FormItem>
                <div></div>
                <span style={{display:"inline-block",fontSize:16,width:'150px',height:"32px"}}>邮编:</span>
                <FormItem  style={{display:"inline-block",width:'50%'}}>
                    {getFieldDecorator('zip_code', {
                            rules: [{
                                required: true, message: '请输入正确的邮编',
                                pattern:/^[0-8][0-7]\d{4}$/
                            },{
                                // validator:self.validatorNum2
                            }]
                        })(
                            <Input style={{width:'100%',marginLeft:0}} type='number' placeholder='请输入邮编' addonBefore='' addonAfter='' />
                    )}
                </FormItem>

                <Button type='primary' size="large" style={{float:'right',marginLeft:'20px'}}  loading={false}>清空</Button>        
                <Button type='primary' size="large" style={{float:'right'}} htmlType='submit' loading={false}>添加新地址</Button>  
            </Form>
            )
    }
}
const WrappedAddressForm = Form.create({ name: 'address_form' })(AddressForm);

export default Address
export {Address}