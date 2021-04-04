import React from 'react'
import {TodoListItem} from "./TodoListItem";
export const TodoList = ({todos , ...props}) => {
    return (
        <ul>
            {todos.map(item => <TodoListItem key={item._id} {...props}  {...item}/>)}
        </ul>
    )
}
