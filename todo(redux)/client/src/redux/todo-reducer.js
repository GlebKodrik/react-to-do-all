import { TodoAPI } from "../api/api";

const TODO_GET = 'todo/TODO_GET'
const ADD_TODO_ITEM = 'todo/ADD_TODO_ITEM'
const DELETE_TODO_ITEM = 'todo/DELETE_TODO_ITEM'
const SET_CHECKER_TODO = 'todo/SET_CHECKER_TODO'

let initialState = {
  responses: []
}

const todoReducer = (state = initialState , action) =>{
    switch(action.type){
      case TODO_GET: {
        return{
          ...state,
          responses: action.data,
        }
      }
      case SET_CHECKER_TODO: {
        return{
          ...state,
            responses: state.responses.map(item => {
              if(action.id === item._id){
                return {...item, checker: action.bool}
              }
              else return {...item}
            })
      }}
      case DELETE_TODO_ITEM: {
        return{
          ...state,
          responses: state.responses.filter(item => item._id !== action.id)
        }
      }
      case ADD_TODO_ITEM: {
        return{
          ...state,
          responses: [...state.responses, action.item]
        }
      }
        default: 
            return state;
    }
}
const getTodoRes = (data) => ({type: TODO_GET , data});
const addTodoItem = (item) => ({type: ADD_TODO_ITEM , item});
const deleteTodoItem = (id) => ({type: DELETE_TODO_ITEM , id});
const setCheckerTodoItem = (id,bool) => ({type: SET_CHECKER_TODO , id , bool});

export const todoGet = () => async (dispath) =>{
  let res = await TodoAPI.getTodo();
  dispath(getTodoRes(res.data));
}

export const deleteTodoItemThunk = (id) => async (dispath) =>{
  let res = await TodoAPI.deleteTodoItem(id);
  dispath(deleteTodoItem(id));
}

export const addTodoThunk = (title , checker , date) => async (dispath) => {
  let res = await TodoAPI.addTodoItem(title , checker , date);
  dispath(addTodoItem(res.data));
}

export const setCheckerTodoThunk = (id,bool) => async (dispath) => {
  let res = await TodoAPI.setChecker(id , bool);
  dispath(setCheckerTodoItem(id,bool));
}
export default todoReducer;
