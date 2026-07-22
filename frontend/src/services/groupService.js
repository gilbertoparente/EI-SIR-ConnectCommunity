import api from "./api";

// Listar grupos
export const getGroups = async () => {

    const response = await api.get("/groups");

    return response.data;

};

// Criar grupo
export const createGroup = async (groupData) => {

    const response = await api.post("/groups", groupData);

    return response.data;

};

// Entrar num grupo
export const joinGroup = async (groupId) => {

    const response = await api.post(`/groups/${groupId}/join`);

    return response.data;

};

// Obter detalhes de um grupo
export const getGroupById = async (groupId) => {

    const response = await api.get(`/groups/${groupId}`);

    return response.data;

};

// Eliminar grupo
export const deleteGroup = async (groupId) => {

    const response = await api.delete(`/groups/${groupId}`);

    return response.data;

};

// Sair do grupo
export const leaveGroup = async (groupId) => {

    const response = await api.post(`/groups/${groupId}/leave`);

    return response.data;

};

