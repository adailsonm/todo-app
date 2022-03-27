import React, { useEffect, useState } from "react";
import './index.css';

function Task(props) {
    const [taskFinish, setTaskFinish] = useState(false);

    const filterTasksTodo = props.tasks.filter(task => {
        return task.status === 1;
    });

    const filterTasksDone = props.tasks.filter(task => {
        return task.status === 2;
    });

    function handleCheckFinish() {
        if(taskFinish === false) {
            console.log("entrou");
            setTaskFinish(true);
        } 
    }
    return (
        <div className="list">
            <ul className="task-status-list">
                <li>
                    <p>To do</p>
                </li>
                { filterTasksTodo.map(task => {
                    return (
                        <>
                            <ul className="confirms">
                                <li>
                                    <div>
                                        <input type="checkbox" onChange={() => handleCheckFinish()}/>
                                    </div>
                                    <label>{task.description}</label>
                                </li>
                            </ul>
                        </>
                    )
                })}
                <li>
                    <p>Done</p>
                </li>
                { filterTasksDone.map(task => {
                    return (
                        <>
                            <ul className="confirms">
                                <li>
                                    <div>
                                        <input type="checkbox" checked={task.finished_at}/>
                                    </div>
                                    <label>{ task.description } {task.finished_at !== undefined ? `- ${task.finished_at}` : '' }</label>
                                </li>
                            </ul>
                        </>
                    )
                })}
            </ul>
            
        </div>

    );   
}

export default Task;