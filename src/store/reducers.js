// настройка хранилища Redux 

import {combineReducers} from '@reduxjs/toolkit'
import todosReducer from '../features/todos/todosSlice'
import themeReducer from '../features/todos/themeSlice'
import modalReducer from '../features/todos/modalSlice'
import visionReducer from '../features/todos/visionSlice'









export const rootReducer = combineReducers({
	
		todos : todosReducer,
		theme : themeReducer,
		modal : modalReducer,
		vision: visionReducer,
	



	


	
		

	
})

export default rootReducer;