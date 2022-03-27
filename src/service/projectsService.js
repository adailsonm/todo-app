import { api } from "../../service/api";

const getProjects = async() => {
        try {
            const response = await api.get('/projects');
            return response.data.items;
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

module.exports = {getProjects}