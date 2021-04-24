import React from 'react';
import { useState } from 'react';

const AddTask = ({ addTask }) => {
    const [text, setText] = useState('');
    const [day, setDay] = useState('');
    const [reminder, setReminder] = useState(false);
    const onSubmit = (e) => {
        e.preventDefault();

        addTask({text,day,reminder});
        setText('');
        setDay('');
        setReminder(false);
    }
    return (
        <form onSubmit={onSubmit} className="add-form">
            <div className="form-control">
                <label>Task</label>
                <input required value={text} type="text"
                    onChange={(e) => setText(e.target.value)}
                    placeholder='Add a task' />
            </div>
            <div className="form-control">
                <label>Day & Time</label>
                <input required type="text" value={day}
                    onChange={(e) => setDay(e.target.value)}
                    placeholder='Add Day & Time' />
            </div>
            <div className="form-control">
                <label>SetReminder</label>
                <input checked={reminder} 
                    type="checkbox" 
                    value={reminder}
                    onChange={(e) => setReminder(e.currentTarget.checked)}
                    value="Reminder" />
            </div>
            <input className='btn btn-block' type="submit" value="Save" />
        </form>
    )
}
export default AddTask;