import axios from "axios"

const instance = axios.create({
  baseURL: 'http://localhost:3000/',
  withCredentials: true,
});

export const TodoAPI = {
  getTodo(){
    return instance.get('todo/');
  },
  addTodoItem(title , checker , date){
    return instance.post('todo/', {title , checker , date})
  },
  deleteTodoItem(id){
    return instance.delete('todo/' + id);
  },
  setChecker(id , bool){
    return instance.put('todo/' + id , {checker: bool});
  }
}