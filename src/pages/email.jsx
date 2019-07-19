import {
  Form,
  Input,
  Tooltip,
  Icon,
  Cascader,
  Select,
  Row,
  Col,
  Checkbox,
  Button,
  AutoComplete,
  Modal,
} from 'antd';
import React,{Component} from "react";
import options from "../assets/city";
const { Option } = Select;
// const AutoCompleteOption = AutoComplete.Option;

class RegistrationForm extends React.Component {
constructor(props){
    super(props);
    this.state = {
        confirmDirty: false,
        autoCompleteResult: [],
      };
}
  handleSubmit(e){
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
          let hide=false;
        this.props.getValue(values,hide);
        console.log('Received values of form: ', values);
      }
    });
  };
  handleWebsiteChange(e){
      console.log(e.target.value);
      
    let autoCompleteResult;
    if (!e) {
      autoCompleteResult = [];
    } else {
      autoCompleteResult = ['.com', '.org', '.net'].map(domain => `${e}${domain}`);
    }
    this.setState({autoCompleteResult});
  };
  //取消按钮
  cancel(){
      let hide=false;
      this.props.getValue('',hide);
      console.log("你点击了取消按钮");
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const { autoCompleteResult } = this.state;
    console.log(this.props);
    const formItemLayout = {
        labelCol: {
          xs: { span: 24 },
          sm: { span: 8 },
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 16 },
        },
      };
      const tailFormItemLayout = {
        wrapperCol: {
          xs: {
            span: 24,
            offset: 0,
          },
          sm: {
            span: 16,
            offset: 8,
          },
        },
      };
    const prefixSelector = getFieldDecorator('prefix', {
      initialValue: '86',
    })(
      <Select style={{ width: 70 }}>
        <Option value="86">+86</Option>
        <Option value="87">+87</Option>
      </Select>,
    );
    return (
      <Form  onSubmit={this.handleSubmit.bind(this)} {...formItemLayout}>
        <Form.Item label="货主姓名">
          {getFieldDecorator('nickname', {initialValue:this.props.shows?this.props.nickname:"",
            rules: [{ required: true, message: 'Please input your nickname!', whitespace: true }],
          })(<Input/>)}
        </Form.Item>
        <Form.Item label="电话号码">
          {getFieldDecorator('phone', {initialValue:this.props.shows?this.props.phone:"",
            rules: [{ required: true, message: 'Please input your phone number!' }],
          })(<Input addonBefore={prefixSelector} style={{ width:'100%'}}/>)}
        </Form.Item>
        <Form.Item label="邮寄地址">
          {getFieldDecorator('residence', {
            // rules: [
            //   { type: 'array', required: true, message: 'Please select your habitual residence!' },
            // ],
          })(<Cascader options={options}   placeholder={this.props.shows?this.props.residence:''}/>)}
        </Form.Item>
        <Form.Item label="详细地址">
          {getFieldDecorator('address', {initialValue:this.props.shows?this.props.address:"",
            rules: [{ required: true, message: '请填写详细地址' }],
          })(<Input/>)}
        </Form.Item>
        <Form.Item >
           
          <Button type="primary" htmlType="submit" {...tailFormItemLayout}>
            保存并使用
          </Button>
        </Form.Item>
        <Form.Item>
            <Button type="primary" onClick={this.cancel.bind(this)} {...tailFormItemLayout}>
                取消
            </Button>
        </Form.Item>
      </Form>
    );
  }
}

const WrappedRegistrationForm = Form.create({name:"获取发货信息"})(RegistrationForm);

class Email extends Component{
    constructor(props){
        super(props);
        this.state={
            visible:false,
            show:false,
        }
    }
    showModal(){
        this.setState({
          visible: true,
          show:false,
        });
      };
    
      handleOk(e){
        console.log(e);
        this.setState({
          visible: false,
        });
      };
    
      handleCancel(e){
        console.log(e);
        this.setState({
          visible: false,
        });
      };
      //编辑按钮
      initValue(){
        this.setState({
            visible: true,
            show:true
          });
      }
      getValue(value,hide){
          console.log(value,hide);
          this.setState({
              visible:hide
          })
      }
    render(){
        return(
            <div>
                <Button type="primary" onClick={this.showModal.bind(this)}>
                    Open Modal
                </Button>
                <Modal
                title="Basic Modal"
                visible={this.state.visible}
                onOk={this.handleOk.bind(this)}
                onCancel={this.handleCancel.bind(this)}
                footer={null}
                >
                    <WrappedRegistrationForm nickname="朱自强" phone="13321508303" residence="河南省/郑州市/扶沟县" address="河南省郑州市扶沟县吕潭乡" shows={this.state.show} getValue={this.getValue.bind(this)}/>
                </Modal>
                <Button onClick={this.initValue.bind(this)}>编辑</Button>
            </div>
        )
    }
}
export default Email;
