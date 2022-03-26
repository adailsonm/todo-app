import React, { useEffect, useState } from "react";
import Task from '../Task';
import './index.css';
import { api } from "../../service/api";

export function Box() {
    const [projects, setProjects] = useState([]);
    useEffect(() => {
        const getProjects = async () => {
            const response = await api.get('/projects');
            setProjects(response.data.items);
        }
        getProjects();
    }, [])
    return (
        <div className="container">
            {projects ? projects.map((project) => {
                return (
                    <>
                        <div className="title">
                            <span>
                                {project.name}
                            </span>
                        </div>
                        <Task tasks={project.tasks}/>
                    </>
                )
            }) : <h1>Nenhum</h1>}

        </div>
    );
}
