import React,{Component} from 'react' 
import {MyLayout}     from '../components/layout.jsx';
import ReactDOM     from 'react-dom';
import PropTypes from 'prop-types';
import {Card,Tabs,Table,Form,Select,Input,Button,message} from 'antd';
import '../components/region.json'
const { TabPane } = Tabs;
const FormItem = Form.Item;
const Option = Select.Option;
class Address extends Component{
    constructor(props) {
        super(props); 
        this.state = {
          tab:1,
          province:"",
          provinceIndex:null,
          city:'选择城市',
          count:'选择区/县',
          cityArr:[],
          countArr:[],
          customer_type:'',
          identAddress:'',
          customerName:'',
          customerPhone:'',
          customerAddress:'',
        };
        this.handleChange = this.handleChange.bind(this); 
        this.get_msg = this.get_msg.bind(this); 
      } 
    componentWillMount(){
        this.get_msg()
    }
    componentDidMount(){
        //class格式render与componentDidMount内的this指向Address，但是函数的this不指向Address，必须bind一下才能正确指向
    }
    handleChange(e){
        this.setState({tab:e-0});
    }
    // get_msg(){
    //     let url='/api/mall/myself'
    //     var self=this
    //     var callback=function(err,res){
    //         if(err){

    //         }else{
    //             console.log(res)
    //             this.setState({address:res.data.address,
    //                 area:res.data.area,
    //                 city:res.data.city,
    //                 credit:res.data.credit,
    //                 customer_id:res.data.customre_id,
    //                 province:res.data.province,
    //                 user_id:res.data.user_id
    //             })
    //         }
    //     }

    //     var xhr=new XMLHttpRequest()
    //     xhr.open("GET",url)
    //     xhr.send(null)
    //     xhr.onreadystatechange=function(){
    //         if(xhr.readyState === XMLHttpRequest.DONE) {
    //             if(xhr.status === 200) {
    //                 // console.log(xhr.responseText)
    //                 callback(null,JSON.parse(xhr.responseText));
    //             } else {
    //                 callback(JSON.parse(xhr.responseText),null);
    //             }
    //         }
    //     }

    // }
    get_msg(){
        let url='/api/mall/shipping_address'
        var self=this
        var callback=function(err,res){
            if(err){

            }else{
                console.log(res)
                console.log([res.data])
                self.setState({records:[res.data]})
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
    render(){
        console.log(this.state.records)
        let dataSource=this.state.records
        let columns=[
            {title:'收货人',dataIndex:'name',key:"name"},
            {title:'收货地址',dataIndex:'address',key:"address"},
            {title:'邮编',dataIndex:'zip_code',key:"zip_code"},
            {title:'手机/电话',dataIndex:'phone',key:"phone"},
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
            let url=`/api/mall/shipping_address`
            var data=new FormData();
            data.append('name',values.name)
            data.append('address',values.address)
            data.append('phone',values.phone)
            // data.append('province',"上海市")
            // data.append('city',"上海市")
            // data.append('area',"普陀区")
            var self=this
            var callback=function(err,res){
            if(err){
                message.error(err.msg);
            }else{   
                message.success("添加成功");
            }
            }

            var xhr=new XMLHttpRequest()
            xhr.open("POST",url) 
            xhr.send(data)
            xhr.onreadystatechange=function(){
                if(xhr.readyState === XMLHttpRequest.DONE) {
                    if(xhr.status === 200) {
                        console.log(xhr.responseText)
                        callback(null,JSON.parse(xhr.responseText));
                    } else {
                        callback(JSON.parse(xhr.responseText),null);
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
    provinceOption(){
        return (
            region.map(function(array, index){
                return (
                    <Option key={index} >{array.name}</Option>
                )
            })
        )
    }
    cityOption(){
        return(
            this.state.cityArr.map(function(array,index){
                return(
                    <Option key={index} >{array.name}</Option>
                )
            })
        )
    }
    countOption(){
        return(
            this.state.countArr.map(function(array,index){
                return(
                    <Option key={index} value={array}>{array}</Option>
                )
            })
        )
    }
    provinceChange(value){
        let self = this;
        let city = self.state.city;
        if(value!='选择省份'){
            let cityArr =  region[value].city;
            self.setState({'province':region[value].name,'cityArr':cityArr,'provinceIndex':value,'city':'选择城市'});
        }
    }
    cityChange(value){
        let self = this;
        let provinceIndex = self.state.provinceIndex;
        if(value!='选择城市'){
            let countArr = region[provinceIndex].city[value].area;
            let city =region[provinceIndex].city[value].name;
            self.setState({'countArr':countArr,'city':city,'count':''})
        }
    }
    countChange(value){
        let self = this;
        self.setState({'count':value})
    }
    render(){
        let self=this
        // console.log(this,1)//AddressForm 
        const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form;
        return (
        <Form onSubmit={(e)=>this.handleSubmit(e)} ref="form1">
                <span style={{display:"inline-block",fontSize:16,width:'150px',height:"32px"}}>收货人:</span>
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
                            validator:this.validator_consignee
                        }]
                    })(
                        <Input style={{width:'100%',marginLeft:0}}  placeholder='' addonBefore='' addonAfter='' />
                    )}
                </FormItem>
                <div></div>
                <span style={{display:"inline-block",fontSize:16,width:'150px',height:"32px"}}>手机号码:</span>
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
                <div className='input_wrap' id='area1' style={{'position':'relative'}}>
                <span style={{display:"inline-block",fontSize:16,width:'150px',height:"32px"}}>地址:</span>
                    <Select  defaultValue="选择省份" value={self.state.province} style={{ 'width': 120}} onChange={self.provinceChange} getPopupContainer = {()=> document.getElementById('area1')}>
                        {self.provinceOption()}
                    </Select>
                    <Select defaultValue='选择城市'  value={self.state.city}  style={{ 'width': 200 ,'margin':'0 10px' }} onChange={self.cityChange} getPopupContainer = {()=> document.getElementById('area1')}>
                        {self.cityOption()}
                    </Select>
                    <Select defaultValue="选择区/县"  value={self.state.count} style={{ 'width': 200 ,'margin':'0 10px' }} onChange={self.countChange}>
                        {self.countOption()}
                    </Select>
                {/* <FormItem  style={{display:"inline-block",width:'50%'}}>
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
                </FormItem> */}
                </div>
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
                <Button type='primary' size="large" style={{float:'right',marginLeft:'20px'}}  loading={false}>清空</Button>        
                <Button type='primary' size="large" style={{float:'right'}} htmlType='submit' loading={false}>添加新地址</Button>  
            </Form>
            )
    }
}
const WrappedAddressForm = Form.create({ name: 'address_form' })(AddressForm);

export default Address
export {Address}