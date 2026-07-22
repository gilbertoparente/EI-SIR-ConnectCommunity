import api from "./api";

// Obter mensagens de uma sessão
export const getMessagesBySession = async (sessionId) => {

    const response = await api.get(
        `/chat/session/${sessionId}`
    );

    return response.data;

};