import api from "./api";

// Obter conversa com um utilizador
export const getConversation = async (userId) => {

    const response = await api.get(

        `/privateMessages/${userId}`

    );

    return response.data;

};

// Guardar mensagem (caso seja necessário sem Socket)
export const sendPrivateMessage = async (data) => {

    const response = await api.post(

        "/privateMessages",

        data

    );

    return response.data;

};