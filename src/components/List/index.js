import React,{ useEffect, useState } from "react";
import { toast } from 'react-toastify';
import { api } from "../../service/api";
import { Box } from '../Box';

export function List() {
    const [projects, setProjects] = useState([]);
    useEffect(() => {
        const getProjects = async () => {
            try {
                const response = await api.get('/projects');
                setProjects(response.data.items);
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
        getProjects();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [projects]);

    return(
        <>
            {
                projects ? projects.map((project) => {
                    return (
                        <Box project={project}/>
                    )
                }) : ''}
        </>

    )
}
