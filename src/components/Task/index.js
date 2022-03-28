import { format, parse, parseISO } from "date-fns";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { api } from "../../service/api";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons'

import './index.css';

function Task(props) {
    const [taskFinish, setTaskFinish] = useState(false);

    const filterTasksTodo = props.tasks.filter(task => {
        return task.status === 1;
    });

    const filterTasksDone = props.tasks.filter(task => {
        return task.status === 2;
    });

    const handleCheckFinish = async (id) =>  {
        try {
            let response = await api.put(`/tasks/${id}`, {
                finished_at: new Date(),
                status: 2,
            });
            props.onTaskUpdate();
            toast.success(response.data.message, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            })
            setTaskFinish(true);

        } catch(error) {
            setTaskFinish(false);
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

    const handleRemoveTask = async (id) =>  {
        try {
            let response = await api.delete(`/tasks/${id}`);
            props.onTaskUpdate();
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

    const formattedDate = (date) => format(parseISO(date), 'dd/MM/yyyy HH:mm');
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
                                        <input type="checkbox" onChange={() => handleCheckFinish(task._id)} />
                                    </div>
                                    <label>{task.description}</label>
                                    <div className="actions">
                                        <button onClick={() => {}}><FontAwesomeIcon icon={faEdit}/></button>
                                        <button onClick={() => handleRemoveTask(task._id)}><FontAwesomeIcon icon={faTrash}/></button>
                                    </div>

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
                                    <div className="container-label">
                                        <label>{ task.description }</label>
                                        <label className="finished-label">{task.finished_at !== undefined ? `Finalizado em: ${formattedDate(task.finished_at)}` : '' }</label>
                                    </div>
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