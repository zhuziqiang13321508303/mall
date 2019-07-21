var Todolist=((state='',action)=>{
	switch (action.type){
		case 'ADD':
			let name=action.text;
			return name
		default:
			return state;
	}
})

export default Todolist;