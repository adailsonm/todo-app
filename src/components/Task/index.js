import React, { useEffect, useState } from "react";
import { api } from "../../service/api";
import './index.css';

function Task(props) {
    const [task, setTask] = useState({});

    const filterTasksTodo = props.tasks.filter(task => {
        return task.status === 1;
    });

    const filterTasksDone = props.tasks.filter(task => {
        return task.status === 2;
    });

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
                                        <input type="checkbox"/>
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
                                    <label>{ task.description }</label>
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