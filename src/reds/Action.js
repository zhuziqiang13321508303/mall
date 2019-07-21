

var Action={
	addItem(msg){
		return{
			type:'ADD',
			text:msg
		}
	},
	login(msg){
		return{
			type:'LOGIN',
			text:msg
		}
	}
}
export default Action;