import React, { useState } from 'react';
import './index.css';

function Form(props) {
    const [task, setTask] = useState("");

    function handleChangeInput(event) {
        let inputTask = event.target.value;

        setTask(inputTask);
    }

    function handleAddItemToList(event) {
        event.preventDefault();
        if(task) {
            props.onAddItem(task);

            setTask("")
        }
    }


    return (
        <div className="box-form">
            <p>Create new Project</p>
            <input type="text" onChange={handleChangeInput} placeholder="Project name" />
            <button type='submit' onClick={handleAddItemToList}>Create Project</button>
        </div>
    )

}

export default Form;