import React, { useEffect, useState } from "react"
import { TodoList } from "./TodoList"
import {useDispatch, useSelector} from "react-redux";
import { Button } from "@material-ui/core"
import { todoGet , addTodoThunk, deleteTodoItemThunk, setCheckerTodoThunk} from "./redux/todo-reducer";
import { getTodoItem } from "./redux/todo-selectors";

export const TodoMain = () => {
  const responses = useSelector(getTodoItem)
  const [todoTitle, setTodoTitle] = useState("")
  const [error, setError] = useState("")
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(todoGet());
  }, [])

  const todo = [...responses].reverse()

  const getDate = () => {
    const date = new Date()
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    }
    return date.toLocaleString("ru", options)
  }

  const addTodo = () => {
    if(todoTitle === "") {setError("Пустое поле"); return;}
    dispatch(addTodoThunk(todoTitle, false , getDate()));
    setTodoTitle("");
  }

  const chooseChecker = (id , bool) =>{
    dispatch(setCheckerTodoThunk(id,bool));
  }
  
  const todoDelete = (id) => {
    dispatch(deleteTodoItemThunk(id));
  }

  return (
    <div className="container">
      <h1>ToDo List</h1>
      <div>
        <div className="input-field">
          <input
            type="text"
            value={todoTitle}
            onChange={(event) => setTodoTitle(event.target.value)}
          />
          <label>Задача</label>
          {error && <div className="error">{error}</div>}
        </div>
        <Button onClick={addTodo} variant="contained" color="primary">
          Добавить
        </Button>
      </div>
      <TodoList todos={todo} todoDelete={todoDelete} chooseChecker={chooseChecker}/>
    </div>
  )
}

export default TodoMain
