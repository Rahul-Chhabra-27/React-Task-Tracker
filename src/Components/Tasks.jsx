import React from 'react';
import Task from './Task';

const Tasks = ({ tasks , onDelete ,onToggle }) => {
    return(
        <React.Fragment>
            {tasks.map((task,i) => {
                return <Task
                 onToggle={onToggle}
                 onDelete={onDelete}
                 key={i} task={task} />
            })}
        </React.Fragment>
    )
}
export default Tasks;