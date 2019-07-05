import React,{ Component } from "react";
import { Comment, Avatar, Form, Button, List, Input } from 'antd';
import moment from 'moment';

const { TextArea } = Input;
const CommentList = ({ comments }) => (
  <List
    dataSource={comments}
    header={`${comments.length} ${comments.length > 1 ? 'replies' : 'reply'}`}
    itemLayout="horizontal"
    renderItem={props => <Comment {...props} />}
  />
);

const Editor = ({ onChange, onSubmit,  value }) => (
  <div>
    <Form.Item>
      <TextArea rows={4} onChange={onChange} value={value} style={{width:200}}/>
    </Form.Item>
    <Form.Item>
      <Button htmlType="submit"  onClick={onSubmit} type="primary">
            添加评论
      </Button>
    </Form.Item>
  </div>
);
// import Img from "./img.jsx";
// class Demo extends Component{
//     constructor(props){
//         super(props)
//         this.state={
//             // 缩略图
//             minImg: "",
//             // 高清图
//             maxImg: "",
//         }
//     }
//     render(){
//         let _this=this;
//         const { minImg, maxImg } = this.state;
//         return(
//             <div className="top">
//                 <div className="demo">
//                     <ul>
//                             {
//                                 this.state.arr3.map((item,index)=>{
//                                     return (
//                                         <li key={index} href={item.href}>
//                                             {item.name}
//                                         </li>
//                                     )
//                                 })
//                             }
//                     </ul>
//                 </div>
//                     <Img minImg={minImg} maxImg={maxImg} style={{marginTop:20}}/>
//             </div>
//         )
//     }
// }

class Demo extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            comments: [],
            value: '',
          };
          console.log(this.state.comments);
    }
    
    //点击添加评论按钮
    handleSubmit(){
        //如果内容为空，直接返回
      if (!this.state.value) {
        return;
      }
  
    //   this.setState({
    //     submitting: true,
    //   });
  
      setTimeout(() => {
        this.setState({
          value: '',
          comments: [
            {
              author: 'Han Solo',
              avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
              content: <p>{this.state.value}</p>,
              datetime: moment().fromNow(),
            },
            ...this.state.comments,
          ],
        });
      }, 1000);
    };
    //多行输入框内容变化
    handleChange(e){
      this.setState({
        value: e.target.value,
      });
      console.log(e.target.value);
    };
  
    render() {
      const {comments,value } = this.state;
  
      return (
        <div>
          {comments.length > 0 && <CommentList comments={comments}/>}
          <Comment
            avatar={
              <Avatar
                src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                alt="Han Solo"
              />
            }
            content={
              <Editor
                onChange={this.handleChange.bind(this)}
                onSubmit={this.handleSubmit.bind(this)}
                value={value}
              />
            }
          />
        </div>
      );
    }
  }
export default Demo;