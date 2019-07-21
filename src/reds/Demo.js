import React from 'react';
import Action from './Action';
import Store from './Store';

class Demo extends React.Component{
	constructor(props){
		super(props)
		this.state={
			info:Store.getState().list,
			username:Store.getState().name
		}
		
		this.changeitem=this.changeitem.bind(this)
	}
	
	changeitem(){
		this.setState({
			info:Store.getState().list,
			username:Store.getState().name
		})
	}
	
	componentDidMount(){
		Store.subscribe(this.changeitem)
	}
	
	add(){
		 Store.dispatch(Action.addItem(this.refs.ipt.value))   
	}
	login(){
//		Store.dispatch(Action.login(this.refs.ipt1.value))
		var _this=this;	
		Store.dispatch((dispatch)=>{
			setTimeout(function(){
				dispatch(Action.login(_this.refs.ipt1.value))
			},2000)
		})
	}
	
	render(){
		return(
			<div>
				<h2>redux---{this.state.username}</h2>
				<input type="text" ref="ipt"/>
				<button onClick={this.add.bind(this)}>添加</button>
				{
					this.state.info.map((item,i)=>{
						return(
							<div key={i}>{item}</div>
						)
					})
				}
				
				<hr/>
				<input type="text" ref="ipt1"/>
				<button onClick={this.login.bind(this)}>登陆</button>
			</div>
		)
	}
}

export default Demo;
