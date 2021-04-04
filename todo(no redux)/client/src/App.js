import axios from "axios"
import React, { useEffect, useState } from "react"
import { TodoList } from "./TodoList"
import { Button } from "@material-ui/core"

const App = () => {
  const [todoTitle, setTodoTitle] = useState("")
  const [responses, setResponses] = useState([])
  const [error, setError] = useState("")
  useEffect(() => {
    axios.get("todo/").then((res) => {
      setResponses(res.data)
    })
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

  const addTodo = (e) => {
    e.preventDefault()
    axios
      .post("todo/", {
        title: todoTitle,
        checker: false,
        date: getDate(),
      })
      .then((res) => {
        setTodoTitle("")
        setResponses([...responses, res.data])
      })
  }

  const chooseChecker = (id, bool) => {
    axios
      .put("todo/" + id, {
        checker: bool,
      })
      .then((res) => {
        setResponses((responses) =>
          responses.map((item) => {
            if (id === item._id) return { ...item, checker: bool }
            else return { ...item }
          })
        )
      })
  }

  const todoDelete = (id) => {
    console.log(id)
    axios
      .delete("todo/" + id)
      .then((res) => {
        setResponses([...responses].filter((m) => m._id !== id))
      })
      .catch((err) => {
        console.log(err.message)
      })
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
      <TodoList
        todos={todo}
        todoDelete={todoDelete}
        chooseChecker={chooseChecker}
      />
    </div>
  )
}

export default App
