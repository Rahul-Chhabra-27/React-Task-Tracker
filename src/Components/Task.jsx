import React from 'react';
import Button from './Button'

const Task = ({ task, onDelete, onToggle }) => {
    return (
        <div className= {`task ${task.reminder ? 'reminder':''}`} onDoubleClick={() => onToggle(task.id)}>
            <h3>{task.text}
                <Button onClick={() => onDelete(task.id)} color='red'
                    text='delete' />
            </h3>
            <p>{task.day}</p>
        </div>

    )
}
export default Task;