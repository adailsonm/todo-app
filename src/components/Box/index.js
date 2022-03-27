import React, { useEffect, useState } from "react";
import Task from '../Task';
import './index.css';
import { api } from "../../service/api";
import { toast } from "react-toastify";

export function Box(props) {
    const [descriptionTask, setDescriptionTask] = useState('');
    
    const handleStoreTaskAndAssociateProject = async (id) => {
        try {
            let response = await api.post(`/projects/${id}/associate/task`, {
                description: descriptionTask,
            });
            props.onTaskCreate()
            
            toast.success(response.data.message, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            })
        } catch(error) {
            if(error.response) {
                toast.error(error.response.data.message, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            }
        }


    }
    return (
        <div className="container">
            <>
                <div className="title">
                    <span>
                        {props.project.name}
                    </span>
                </div>
                <Task tasks={props.project.tasks} key={Math.random()}/>
                <div className="addTask">
                    <input type="text" value={descriptionTask} onChange={event => setDescriptionTask(event.target.value)} placeholder="Task" />
                    <button onClick={() => handleStoreTaskAndAssociateProject(props.project._id)}>Adicionar</button>
                </div>
            </>
        </div>
    );
}
