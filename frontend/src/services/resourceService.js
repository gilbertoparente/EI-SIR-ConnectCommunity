import api from "./api";

export const getResourcesByGroup = async (groupId) => {

    const response = await api.get(
        `/resources/group/${groupId}`
    );

    return response.data;

};

export const uploadResource = async (formData) => {

    const response = await api.post(

        "/resources/upload",

        formData,

        {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        }

    );

    return response.data;

};

export const deleteResource = async (id) => {

    const response = await api.delete(
        `/resources/${id}`
    );

    return response.data;

};