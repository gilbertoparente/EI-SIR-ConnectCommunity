import api from "./api";

// Listar sessões de um grupo
export const getSessionsByGroup = async (groupId) => {

    const response = await api.get(
        `/sessions/group/${groupId}`
    );

    return response.data;

};

        // Obter uma sessão pelo ID
        export const getSessionById = async (id) => {

            const response = await api.get(
                `/sessions/${id}`
            );

            return response.data;

        };

// Criar sessão
export const createSession = async (sessionData) => {

    const response = await api.post(
        "/sessions",
        sessionData
    );

    return response.data;

};

// Atualizar sessão
export const updateSession = async (id, sessionData) => {

    const response = await api.put(
        `/sessions/${id}`,
        sessionData
    );

    return response.data;

};

// Eliminar sessão
export const deleteSession = async (id) => {

    const response = await api.delete(
        `/sessions/${id}`
    );

    return response.data;

};

// Entrar numa sessão
export const joinSession = async (id) => {

    const response = await api.post(
        `/sessions/${id}/join`
    );

    return response.data;

};

// Sair de uma sessão
export const leaveSession = async (id) => {

    const response = await api.post(
        `/sessions/${id}/leave`
    );

    return response.data;

};