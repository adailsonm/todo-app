import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { api } from '../../service/api';
import './index.css';

export function ProjectForm(props) {
    const [project, setProject] = useState("");

    function handleChangeInput(event) {
        let inputTask = event.target.value;
        setProject(inputTask);
    }

    async function handleCreateProject(event) {
        event.preventDefault();
        
        try {
            let response = await api.post('/projects', {
                name: project
            });
            props.onCreateProject();
            toast.success(response.data.message, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            })
            setProject('');
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
        <div className="box-form">
            <p>Create new Project</p>
            <input type="text" value={project} onChange={handleChangeInput} placeholder="Project name" />
            <button type='submit' onClick={handleCreateProject}>Create Project</button>
        </div>
    )

}
