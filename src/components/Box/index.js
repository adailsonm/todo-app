import React, { useEffect, useRef, useState } from "react";
import Task from '../Task';
import './index.css';
import { api } from "../../service/api";

export function Box(props) {
    const [task, setTask] = useState('');
    const handleStoreTaskAndAssociateProject = async (id) => {
        let response = await api.post(`/projects/${id}/associate/task`, {
            description: task,
        });

    }
    return (
        <div className="container">
                    <>
                        <div className="title">
                            <span>
                                {props.project.name}
                            </span>
                        </div>
                        <Task tasks={props.project.tasks}/>
                        <div className="addTask">
                            <input type="text" value={task} onChange={event => setTask(event.target.value)} placeholder="Task" />
                            <button onClick={() => handleStoreTaskAndAssociateProject(props.project._id)}>Adicionar</button>
                        </div>
                    </>
        </div>
    );
}
