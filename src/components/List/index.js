import React,{ useEffect, useState } from "react";
import { toast } from 'react-toastify';
import { api } from "../../service/api";
import { Box } from '../Box';
import { ProjectForm } from "../ProjectForm";
import './index.css';

export function List() {
    const [projects, setProjects] = useState([]);
    
    const getProjects = async () => {
        try {
            const response = await api.get('/projects');
            setProjects(response.data.items);
        } catch(error) {
            setProjects([])
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

    useEffect(() => {
        setTimeout(() => {
            getProjects();

        }, 200)
    }, []);

    return(
        <div className="box-container">
            {
                projects.length > 0 ? projects.map((project) => {
                    return (
                        <Box project={project} key={project._id} onTaskCreate={() => getProjects()}/>
                    )
                }) : <div className="container">Não há projeto associado ao seu usuário</div> 
            }
            <ProjectForm onCreateProject={() => getProjects()}/>
        </div>

    )
}
