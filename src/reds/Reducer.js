
import {combineReducers} from 'redux';
import Todolist from './Todolist'
import Loginname from './Loginname'

var Reducer=combineReducers({
	list:Todolist,
	name:Loginname
})



export default Reducer;