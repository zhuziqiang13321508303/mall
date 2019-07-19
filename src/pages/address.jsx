import React,{Component} from 'react' 
import {MyLayout}     from '../components/layout.jsx';
import ReactDOM     from 'react-dom';
import PropTypes from 'prop-types';
import {Card,Tabs,Table,Form,Select,Input,Button,message,Modal} from 'antd';
const { TabPane } = Tabs;
const {confirm}=Modal;
const FormItem = Form.Item;
const Option = Select.Option;
class Address extends Component{
    constructor(props) {
        super(props); 
        this.state = {
          tab:1,
          change_visible:false,
          records:[],
          re:[]
        };
        this.get_msg = this.get_msg.bind(this); 
        this.addressChange = this.addressChange.bind(this); 
        this.changeCancel = this.changeCancel.bind(this);
        this.handleChangeSubmit = this.handleChangeSubmit.bind(this);
        this.showPropsConfirm = this.showPropsConfirm.bind(this);
        this.handleDeleteSubmit = this.handleDeleteSubmit.bind(this);  
      } 
    componentWillMount(){
        this.get_msg()
    }
    componentDidMount(){
        //class格式render与componentDidMount内的this指向Address，但是函数的this不指向Address，必须bind一下才能正确指向
    }
    get_msg(){
        let url='/api/mall/shipping_address'
        var self=this
        var callback=function(err,res){
            if(err){
                message.error("地址获取失败")
            }else{
                console.log(res)
                console.log(res.data)
                self.setState({records:res.data})
            }
        }
        var xhr=new XMLHttpRequest()
        xhr.open("GET",url)
        xhr.send(null)
        xhr.onreadystatechange=function(){
            if(xhr.readyState === XMLHttpRequest.DONE) {
                if(xhr.status === 200) {
                    // console.log(xhr.responseText)
                    callback(null,JSON.parse(xhr.responseText));
                } else {
                    callback(JSON.parse(xhr.responseText),null);
                }
            }
        }
    }
    addressChange(re){
        console.log(re,2)
        this.setState({change_visible:true,re:re})
    }
    changeCancel(){
        this.setState({change_visible:false})
    }
    handleChangeSubmit(e){
        let self=this
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
          if (!err) {
            console.log('Received values of form: ', values);
            let url=`/api/mall/shipping_address/${this.state.re.id-0}`
            var data=new FormData();
            data.append('name',values.name)
            data.append('address',values.address)
            data.append('phone',values.phone)
            data.append('province',values.province)
            data.append('city',values.city)
            data.append('area',values.area)
            var xhr=new XMLHttpRequest()
            xhr.open("PUT",url) 
            xhr.send(data)
            xhr.onreadystatechange=function(){
                if(xhr.readyState === XMLHttpRequest.DONE) {
                    if(xhr.status === 200) {
                        message.success("修改成功");
                        self.setState({change_visible:false})
                        self.get_msg()
                    } else {

                    }
                }
            }
          }
        });
    };
    handleDeleteSubmit(re){
        let self=this
        this.props.form.validateFields((err, values) => {
          if (!err) {
            console.log('Received values of form: ', values);
            let url=`/api/mall/shipping_address/${re.id}`
            var xhr=new XMLHttpRequest()
            xhr.open("DELETE",url) 
            xhr.send()
            xhr.onreadystatechange=function(){
                if(xhr.readyState === XMLHttpRequest.DONE) {
                    if(xhr.status === 200) {
                        message.success("删除成功");
                        self.setState({change_visible:false})
                        self.get_msg()
                    } else {

                    }
                }
            }
          }
        });
    }
    showPropsConfirm(re){
        let self=this
        confirm({
            title: '确定删除此条地址?',
            content: '',
            okText: '确定',
            okType: 'danger',
            okButtonProps: {
              disabled: false,
            },
            cancelText: '取消',
            onOk() {
              self.handleDeleteSubmit(re)
            },
            onCancel() {
            },
          });
    }
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
        let self=this
        console.log(this.state.records,1)
        let dataSource=this.state.records
        for(let i=0;i<dataSource.length;i++){
            dataSource[i].key=Math.random()
        }
        let columns=[
            {title:'收货人',dataIndex:'name',key:"name"},
            {title:'收货地址',dataIndex:'address',key:"address"},
            {title:'手机/电话',dataIndex:'phone',key:"phone"},
            {title:'操作',dataIndex:'operation',key:"operation",
            render:(t,re)=>(<span><Button onClick={()=>this.addressChange(re)}>修改</Button><Button onClick={()=>this.showPropsConfirm(re)}>删除</Button></span>)},
        ] 
        const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form;
        let content=null 
        if(self.state.change_visible){
            content=(
                <Form onSubmit={self.handleChangeSubmit} >
                        <FormItem >
                            {getFieldDecorator('name', {
                                initialValue:self.state.re.name,
                                rules: [{
                                    required: self.state.required, message: '请填写完毕后提交',
                                }]
                            })(
                                <Input type='text' placeholder={self.state.re.name} />
                            )}
                        </FormItem>
                        <FormItem>
                            {getFieldDecorator('address', {
                                initialValue:self.state.re.address,
                                rules: [{
                                    required: self.state.required, message: '请填写完毕后提交',
                                }]
                            })(
                                <Input type='text' placeholder={self.state.re.address} />
                            )}
                        </FormItem>
                        <FormItem>
                            {getFieldDecorator('phone', {
                                initialValue:self.state.re.phone,
                                rules: [{
                                    required: self.state.required, message: '请填写完毕后提交',
                                },{
                                    validator:this.validator_phonenumber
                                }]
                            })(
                                <Input type='text' placeholder={self.state.re.phone} />
                            )}
                        </FormItem>
                        <span style={{display:"inline-block",fontSize:16,width:'100px',height:"32px",lineHeight:"32px"}}>省:</span>
                    <FormItem   style={{display:"inline-block",width:100}}>
                        {getFieldDecorator('province', {
                            initialValue:self.state.re.province,
                            rules: [{
                                required: true, message: '请填写省份',
                            }]
                        })(
                            <Input style={{width:'100%',marginLeft:0}}  placeholder='' addonBefore='' addonAfter='' />
                        )}
                    </FormItem>
                      <span style={{display:"inline-block",fontSize:16,width:'100px',height:"32px",lineHeight:"32px",paddingLeft:10}}>市:</span>
                    <FormItem   style={{display:"inline-block",width:100}}>
                        {getFieldDecorator('city', {
                            initialValue:self.state.re.city,
                            rules: [{
                                required: true, message: '请填写市',
                            }]
                        })(
                            <Input style={{width:'100%',marginLeft:0}}  placeholder='' addonBefore='' addonAfter='' />
                        )}
                    </FormItem>
                       <span style={{display:"inline-block",fontSize:16,width:'100px',height:"32px",lineHeight:"32px",paddingLeft:10}}>区:</span>
                    <FormItem   style={{display:"inline-block",width:100}}>
                        {getFieldDecorator('area', {
                            initialValue:self.state.re.area,
                            rules: [{
                                required: true, message: '请填写区',
                            }]
                        })(
                            <Input style={{width:'100%',marginLeft:0}}  placeholder='' addonBefore='' addonAfter='' />
                        )}
                    </FormItem>  
                        {/* {alert} */}
                        <Button key="back" size="large" onClick={self.handleCancel}>取消</Button>
                        <Button key="submit" style={{marginLeft:5}} type="primary" size="large" htmlType='submit' loading={self.state.btn_loading}>提交</Button>
                </Form>
            )
        }
        return (
            <MyLayout>
                <Card className="myorder order_card" title="收货地址管理" style={{ width: '90%' }}>
                    {<WrappedAddressForm get_msg={self.get_msg}/>}
                    <Table className="order_table" dataSource={dataSource} columns={columns} />
                </Card>
                <Modal 
					width={'80%'}
					title='修改地址' 
					visible={self.state.change_visible}
					onCancel={self.changeCancel}
					footer={null}
				>	
                    {content}
				</Modal>
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

Address = Form.create()(Address);



class AddressForm extends Component{
    constructor(props) {
        super(props); 
        this.state = {

        };
        this.handleSubmit = this.handleSubmit.bind(this); 
      } 
    componentDidMount() {
    }
    handleSubmit(e){
        // console.log(this,1)
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
          if (!err) {
            console.log('Received values of form: ', values);
            let url=`/api/mall/shipping_address`
            var data=new FormData();
            data.append('name',values.name)
            data.append('address',values.address)
            data.append('phone',values.phone)
            data.append('province',values.province)
            data.append('city',values.city)
            data.append('area',values.area)
            var self=this
            var xhr=new XMLHttpRequest()
            xhr.open("POST",url) 
            xhr.send(data)
            xhr.onreadystatechange=function(){
                if(xhr.readyState === XMLHttpRequest.DONE) {
                    if(xhr.status === 200) {
                        message.success("添加成功");
                        self.props.get_msg()
                    } else {
                        
                    }
                }
            }
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
        let self=this
        // console.log(this,1)//AddressForm 
        const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form;
        return (
        <Form onSubmit={(e)=>this.handleSubmit(e)} ref="form1">
                <span style={{display:"inline-block",fontSize:16,width:'100px',height:"32px"}}>收货人:</span>
                <FormItem   style={{display:"inline-block",width:'50%'}}>
                    {getFieldDecorator('name', {
                        validateTrigger:'onBlur',
                        // initialValue:50,
                        rules: [{
                            required: true, message: '请填写收货人',
                        },{
                            min:2,message:"收货人长度为2-20个字符"
                        },{
                            max:20,message:"收货人长度为2-20个字符"
                        },{
                            // validator:this.validator_consignee
                        }]
                    })(
                        <Input style={{width:'100%',marginLeft:0}}  placeholder='' addonBefore='' addonAfter='' />
                    )}
                </FormItem>
                <div></div>
                <span style={{display:"inline-block",fontSize:16,width:'100px',height:"32px"}}>手机号码:</span>
                <FormItem style={{display:"inline-block",width:'50%'}}>
                    {getFieldDecorator('phone', {
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
                <span style={{display:"inline-block",fontSize:16,width:'100px',height:"32px",lineHeight:"32px"}}>省:</span>
                <FormItem   style={{display:"inline-block",width:100}}>
                    {getFieldDecorator('province', {
                        validateTrigger:'onBlur',
                        rules: [{
                            required: true, message: '请填写省份',
                        }]
                    })(
                        <Input style={{width:'100%',marginLeft:0}}  placeholder='' addonBefore='' addonAfter='' />
                    )}
                </FormItem>
                  <span style={{display:"inline-block",fontSize:16,width:'100px',height:"32px",lineHeight:"32px",paddingLeft:10}}>市:</span>
                <FormItem   style={{display:"inline-block",width:100}}>
                    {getFieldDecorator('city', {
                        validateTrigger:'onBlur',
                        rules: [{
                            required: true, message: '请填写市',
                        }]
                    })(
                        <Input style={{width:'100%',marginLeft:0}}  placeholder='' addonBefore='' addonAfter='' />
                    )}
                </FormItem>
                   <span style={{display:"inline-block",fontSize:16,width:'100px',height:"32px",lineHeight:"32px",paddingLeft:10}}>区:</span>
                <FormItem   style={{display:"inline-block",width:100}}>
                    {getFieldDecorator('area', {
                        validateTrigger:'onBlur',
                        rules: [{
                            required: true, message: '请填写区',
                        }]
                    })(
                        <Input style={{width:'100%',marginLeft:0}}  placeholder='' addonBefore='' addonAfter='' />
                    )}
                </FormItem>
                <div></div>
                <span style={{display:"inline-block",fontSize:16,width:'100px',height:"32px"}}>收货地址:</span>
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
                <span style={{display:"inline-block",fontSize:16,width:'100px',height:"32px"}}>邮编:</span>
                <FormItem  style={{display:"inline-block",width:'50%'}}>
                    {getFieldDecorator('zip_code', {
                            rules: [{
                                // required: true, message: '请输入正确的邮编',
                                // pattern:/^[0-8][0-7]\d{4}$/
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
const WrappedAddressForm = Form.create({})(AddressForm);

export default Address
export {Address}