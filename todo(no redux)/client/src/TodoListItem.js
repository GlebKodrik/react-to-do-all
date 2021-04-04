import React from 'react'
import s from './TodoList.module.css'
import { Checkbox } from '@material-ui/core';

export const TodoListItem = (props) => {
    const cln = ['todo'];
    if (props.checker) {
        cln.push('completed');
    }
    return (
        <li className={cln.join(' ')}>
            <label>
                 <input type="checkbox"
                       checked={props.checker}
                       onChange={() => props.chooseChecker(props._id, !props.checker)}/>
                <span>{props.title}</span>
                <div className={s.dateDeleteWrap}>
                    <span>{props.date}</span>
                    
            </div>
            
        </label>
        <i className="material-icons red-text"
                       onClick={() => props.todoDelete(props._id)}>delete_forever</i>
</li>
)
}
