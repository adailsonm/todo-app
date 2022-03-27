import React, { useEffect, useState } from "react";
import Task from '../Task';
import './index.css';
import { api } from "../../service/api";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons'
import Modal from "../Modal";

export function Box(props) {
    const [descriptionTask, setDescriptionTask] = useState('');
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [dataModal, setDataModal] = useState({});

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

    const handleDeleteProject = async (id) => {
        try {
            let response = await api.delete(`/projects/${id}`);
            props.onTaskCreate();
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

    const handleEditProject = async (id) => {
        let response = await api.get(`/projects/${id}`);
        setDataModal(response.data.item);
        setIsModalVisible(true);

    }
    return (
        <div className="container">
            { isModalVisible ? 
                <Modal onClose={() => setIsModalVisible(false)}>
                    <div className="edit-modal">
                        <label for="name">Nome do Projeto: </label>
                        <input type="text" name="name" value={dataModal.name} className="inputText"/>
                        <h4>Usuários associados: </h4>
                        <div className="assoc-user">
                            { dataModal.users.length > 0 ? dataModal.users.map((item) => {
                                return (
                                    <>
                                        <input type="checkbox" checked/>
                                        <label>{item.name}</label>
                                    </>
                                )
                            }) : <h1>Não há usuário associado a este projeto</h1>}
                            
                        </div>

                    </div>
                </Modal>
            : null}
            <>
                <div className="container-title">
                    <div className="title">
                        <span>
                            {props.project.name}
                        </span>
                        <div className="actions">
                            <button onClick={() => handleEditProject(props.project._id)}>
                                <FontAwesomeIcon icon={faEdit} />
                            </button>
                            <button onClick={() => handleDeleteProject(props.project._id)}>
                                <FontAwesomeIcon icon={faTrash}/>
                            </button>
                        </div>
                    </div>

                </div>

                
                <Task tasks={props.project.tasks} key={Math.random()} onTaskUpdate={props.onTaskCreate}/>
                <div className="addTask">
                    <input type="text" value={descriptionTask} onChange={event => setDescriptionTask(event.target.value)} placeholder="Task" />
                    <button onClick={() => handleStoreTaskAndAssociateProject(props.project._id)}>Adicionar</button>
                </div>
            </>
        </div>
    );
}
