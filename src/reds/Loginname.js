

var Loginname=((state='',action)=>{
	switch (action.type){
		case 'LOGIN':
			let name='';
			name=action.text;
			return name
		default:
			return state	

	}
})

export default Loginname;
